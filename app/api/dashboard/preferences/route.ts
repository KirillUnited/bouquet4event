import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { groq } from "next-sanity";
import { z } from "zod";

const PreferencesSchema = z.object({
  bouquetCategory: z.string().min(1).optional(),
  deliveryAddress: z.string().min(3).optional(),
  deliveryInterval: z.string().min(2).optional(),
});

export async function GET() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("auth_token")?.value;
    const user = jwt ? await verifyJwt(jwt) : null;
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const clientWithToken = client.withConfig({ token });
    const prefs = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && email == $email][0]{
        bouquetCategory,
        deliveryAddress,
        deliveryInterval,
        amoLeadId,
      }`,
      { email: user.email }
    );

    return NextResponse.json({ preferences: prefs });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to load preferences", message: err?.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("auth_token")?.value;
    const user = jwt ? await verifyJwt(jwt) : null;
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const parsed = PreferencesSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
    }

    const clientWithToken = client.withConfig({ token });
    const account = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && email == $email][0]{ _id, amoLeadId }`,
      { email: user.email }
    );
    if (!account?._id) return NextResponse.json({ error: "Account not found" }, { status: 404 });

    // Update Sanity document
    const updated = await clientWithToken.patch(account._id).set(parsed.data).commit();

    // Optionally sync to AmoCRM if lead is linked
    try {
      if (account.amoLeadId) {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/amo/update-lead`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadId: account.amoLeadId, preferences: parsed.data }),
        });
      }
    } catch {}

    return NextResponse.json({ ok: true, preferences: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update preferences", message: err?.message }, { status: 500 });
  }
}


