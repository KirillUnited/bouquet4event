import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { groq } from "next-sanity";
import { z } from "zod";

const UpdateAccountSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(5).optional(),
  region: z.string().min(2).optional(),
});

export async function GET() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("auth_token")?.value;
    const user = jwt ? await verifyJwt(jwt) : null;
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const clientWithToken = client.withConfig({ token });
    const account = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && email == $email][0]{
        _id,
        userId,
        email,
        name,
        phone,
        region,
        totalAmount,
        referralLink,
        bouquetCategory,
        deliveryAddress,
        deliveryInterval,
        lastLoginAt,
        amoLeadId,
        amoContactId
      }`,
      { email: user.email }
    );

    return NextResponse.json({ account });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to load account", message: err?.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("auth_token")?.value;
    const user = jwt ? await verifyJwt(jwt) : null;
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const parsed = UpdateAccountSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
    }

    const clientWithToken = client.withConfig({ token });
    const account = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && email == $email][0]{ _id }`,
      { email: user.email }
    );
    if (!account?._id) return NextResponse.json({ error: "Account not found" }, { status: 404 });

    const updated = await clientWithToken.patch(account._id).set(parsed.data).commit();

    return NextResponse.json({ ok: true, account: updated });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update account", message: err?.message }, { status: 500 });
  }
}


