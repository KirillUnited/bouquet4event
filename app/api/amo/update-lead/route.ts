import { NextResponse } from "next/server";
import { z } from "zod";
import { createAmoCRMClient } from "@/lib/amo-client";
import { mapUserUpdateToAmoCRMLead } from "@/lib/amo-mappers";

const UpdateLeadSchema = z.object({
  leadId: z.number(),
  email: z.string().email().optional(),
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

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const parsed = UpdateLeadSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { leadId, ...userData } = parsed.data;

    // Create AmoCRM client
    const amoClient = createAmoCRMClient();

    // Map user data to AmoCRM lead update format
    const leadUpdateData = mapUserUpdateToAmoCRMLead(userData);

    // Update lead in AmoCRM
    const updatedLead = await amoClient.updateLead(leadId, leadUpdateData);

    return NextResponse.json(
      {
        success: true,
        leadId: updatedLead.id,
        lead: {
          id: updatedLead.id,
          name: updatedLead.name,
          price: updatedLead.price,
          updated_at: updatedLead.updated_at,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update lead error:", error);
    
    // Handle specific AmoCRM errors
    if (error.message?.includes("AmoCRM")) {
      return NextResponse.json(
        { 
          error: "AmoCRM integration error", 
          message: error.message,
          details: "Failed to update lead in AmoCRM. Please check your AmoCRM configuration."
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update lead", message: error?.message },
      { status: 500 }
    );
  }
}
