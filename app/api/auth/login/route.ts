import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { signJwtAsync } from "@/lib/auth";
import { groq } from "next-sanity";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Неверный формат данных", details: parsed.error.format() }, { status: 400 });
    }

    const clientWithToken = client.withConfig({ token });
    const user = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && email == $email][0]`,
      { email: parsed.data.email }
    );
    if (!user?.password) {
      return NextResponse.json({ error: "Неверный пароль или логин" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(parsed.data.password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Неверный пароль или логин" }, { status: 401 });
    }

    // update lastLoginAt
    await clientWithToken.patch(user._id).set({ lastLoginAt: new Date().toISOString() }).commit();

    const tokenJwt = await signJwtAsync({ sub: user.userId, email: user.email }, "7d");

    return NextResponse.json({ token: tokenJwt }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: "Login failed", message: err?.message }, { status: 500 });
  }
}


