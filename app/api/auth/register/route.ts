import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { signJwtAsync } from "@/lib/auth";
import { groq } from "next-sanity";

const RegisterSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  region: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  bouquetCategory: z.string().optional(),
  deliveryAddress: z.string().optional(),
  deliveryDate: z.string().optional(),
  deliveryInterval: z.string().optional(),
  bouquetWishes: z.string().optional(),
  accountSum: z.number().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Неверный формат данных", details: parsed.error.format() }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const clientWithToken = client.withConfig({ token });

    const existing = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && email == $email][0]{ _id }`,
      { email }
    );
    if (existing) {
      return NextResponse.json({ error: "Email уже зарегистрирован" }, { status: 409 });
    }

    const userId = uuidv4();
    const referralId = uuidv4();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
    const referralLink = siteUrl ? `${siteUrl}/?ref=${referralId}` : referralId;
    const passwordHash = await bcrypt.hash(password, 10);

    const created = await clientWithToken.create({
      _type: "userAccount",
      userId,
      name: parsed.data.name,
      phone: parsed.data.phone,
      region: parsed.data.region,
      email,
      password: passwordHash,
      referralId,
      referralLink,
      bouquetCategory: parsed.data.bouquetCategory,
      deliveryAddress: parsed.data.deliveryAddress,
      deliveryDate: parsed.data.deliveryDate,
      deliveryInterval: parsed.data.deliveryInterval,
      bouquetWishes: parsed.data.bouquetWishes,
      accountSum: parsed.data.accountSum,
      privacyPolicy: true,
      createdAt: new Date().toISOString(),
    });

    // Create AmoCRM lead
    let amoLeadId: number | undefined;
    try {
      const amoResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/amo/create-lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: parsed.data.name,
          phone: parsed.data.phone,
          bouquetCategory: parsed.data.bouquetCategory,
          deliveryAddress: parsed.data.deliveryAddress,
          deliveryDate: parsed.data.deliveryDate,
          deliveryInterval: parsed.data.deliveryInterval,
          bouquetWishes: parsed.data.bouquetWishes,
          accountSum: parsed.data.accountSum ?? 5000,
          referralLink,
        }),
      });

      if (amoResponse.ok) {
        const amoData = await amoResponse.json();
        amoLeadId = amoData.leadId;
        
        // Update user with AmoCRM lead ID
        await clientWithToken.patch(created._id).set({ amoLeadId }).commit();
      } else {
        console.error("Failed to create AmoCRM lead:", await amoResponse.text());
        // Don't fail registration if AmoCRM fails, just log the error
      }
    } catch (amoError) {
      console.error("AmoCRM integration error:", amoError);
      // Don't fail registration if AmoCRM fails, just log the error
    }

    const tokenJwt = await signJwtAsync({ sub: userId, email }, "7d");

    return NextResponse.json({ 
      userId: created._id, 
      token: tokenJwt,
      amoLeadId,
      referralLink 
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: "Registration failed", message: err?.message }, { status: 500 });
  }
}


