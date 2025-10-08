import { NextResponse } from "next/server";
import { z } from "zod";
import { createAmoCRMClient } from "@/lib/amo-client";
import { mapUserToAmoCRMLead } from "@/lib/amo-mappers";

const CreateLeadSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  bouquetCategory: z.string().optional(),
  deliveryAddress: z.string().optional(),
  deliveryDate: z.string().optional(),
  deliveryInterval: z.string().optional(),
  bouquetWishes: z.string().optional(),
  accountSum: z.number().optional(),
  referralLink: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateLeadSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const userData = parsed.data;

    // Create AmoCRM client
    const amoClient = createAmoCRMClient();

    // Map user data to AmoCRM lead format
    const leadData = mapUserToAmoCRMLead(userData);

    // Create lead in AmoCRM
    const lead = await amoClient.createLead(leadData);

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        lead: {
          id: lead.id,
          name: lead.name,
          price: lead.price,
          created_at: lead.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create lead error:", error);
    
    // Handle specific AmoCRM errors
    if (error.message?.includes("AmoCRM")) {
      return NextResponse.json(
        { 
          error: "AmoCRM integration error", 
          message: error.message,
          details: "Failed to create lead in AmoCRM. Please check your AmoCRM configuration."
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create lead", message: error?.message },
      { status: 500 }
    );
  }
}
