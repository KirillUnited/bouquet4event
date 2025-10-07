import { NextResponse } from "next/server";
import { z } from "zod";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import bcrypt from "bcryptjs";
import { groq } from "next-sanity";

const ResetSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ResetSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
    }

    const clientWithToken = client.withConfig({ token });
    const reset = await clientWithToken.fetch(
      groq`*[_type == "passwordResetToken" && token == $token][0]`,
      { token: parsed.data.token } as Record<string, unknown>
    );
    if (!reset) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (new Date(reset.expiresAt).getTime() < Date.now()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    const user = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && userId == $userId][0]`,
      { userId: reset.userId } as Record<string, unknown>
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    await clientWithToken.patch(user._id).set({ password: passwordHash, resetToken: null, resetTokenExpires: null }).commit();

    // delete the reset token doc
    await clientWithToken.delete(reset._id);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: "Reset failed", message: err?.message }, { status: 500 });
  }
}


