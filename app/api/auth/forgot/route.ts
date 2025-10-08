import { NextResponse } from "next/server";
import { z } from "zod";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { randomBytes } from "crypto";
import { groq } from "next-sanity";

const ForgotSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ForgotSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
    }

    const clientWithToken = client.withConfig({ token });
    const user = await clientWithToken.fetch(groq`*[_type == "userAccount" && email == $email][0]`, { email: parsed.data.email });
    if (!user) {
      // Avoid leaking which emails exist
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const resetToken = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString();

    // store in dedicated collection
    await clientWithToken.create({
      _type: "passwordResetToken",
      userId: user.userId,
      token: resetToken,
      expiresAt,
      createdAt: new Date().toISOString(),
    });

    // Optionally also mirror on user for quick lookup
    await clientWithToken.patch(user._id).set({ resetToken, resetTokenExpires: expiresAt }).commit();

    // TODO: send reset email using /lib/email or Resend
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: "Request failed", message: err?.message }, { status: 500 });
  }
}


