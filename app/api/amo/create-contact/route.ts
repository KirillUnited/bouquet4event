import { NextResponse } from "next/server";
import { z } from "zod";
import { createAmoCRMClient } from "@/lib/amo-client";
import { mapUserToAmoCRMContact } from "@/lib/amo-mappers";

const CreateContactSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  bouquetCategory: z.string().optional(),
  deliveryAddress: z.string().optional(),
  deliveryDate: z.string().optional(),
  deliveryInterval: z.string().optional(),
  bouquetWishes: z.string().optional(),
  referralLink: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateContactSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const userData = parsed.data;

    // Create AmoCRM client
    const amoClient = createAmoCRMClient();

    // Map user data to AmoCRM contact format
    const contactData = mapUserToAmoCRMContact(userData);

    // Create contact in AmoCRM
    const contact = await amoClient.createContact(contactData);

    return NextResponse.json(
      {
        success: true,
        contactId: contact.id,
        contact: {
          id: contact.id,
          name: contact.name,
          first_name: contact.first_name,
          last_name: contact.last_name,
          created_at: contact.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create contact error:", error);
    
    // Handle specific AmoCRM errors
    if (error.message?.includes("AmoCRM")) {
      return NextResponse.json(
        { 
          error: "AmoCRM integration error", 
          message: error.message,
          details: "Failed to create contact in AmoCRM. Please check your AmoCRM configuration."
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create contact", message: error?.message },
      { status: 500 }
    );
  }
}
