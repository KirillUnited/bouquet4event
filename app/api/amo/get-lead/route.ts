import { NextResponse } from "next/server";
import { z } from "zod";
import { createAmoCRMClient } from "@/lib/amo-client";
import { mapAmoCRMLeadToUser } from "@/lib/amo-mappers";

const GetLeadSchema = z.object({
  leadId: z.string().optional(),
  email: z.string().email().optional(),
}).refine(data => data.leadId || data.email, {
  message: "Either leadId or email must be provided",
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("leadId");
    const email = searchParams.get("email");

    const parsed = GetLeadSchema.safeParse({ leadId, email });
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { leadId: parsedLeadId, email: parsedEmail } = parsed.data;

    // Create AmoCRM client
    const amoClient = createAmoCRMClient();

    let lead;
    
    if (parsedLeadId) {
      // Get lead by ID
      lead = await amoClient.getLead(parseInt(parsedLeadId));
    } else if (parsedEmail) {
      // Find lead by email
      lead = await amoClient.findLeadByEmail(parsedEmail);
      
      if (!lead) {
        return NextResponse.json(
          { error: "Lead not found", message: `No lead found for email: ${parsedEmail}` },
          { status: 404 }
        );
      }
    }

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    // Map AmoCRM lead to user format
    const userData = mapAmoCRMLeadToUser(lead);

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        lead: {
          id: lead.id,
          name: lead.name,
          price: lead.price,
          created_at: lead.created_at,
          updated_at: lead.updated_at,
          status_id: lead.status_id,
          pipeline_id: lead.pipeline_id,
        },
        userData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get lead error:", error);
    
    // Handle specific AmoCRM errors
    if (error.message?.includes("AmoCRM")) {
      return NextResponse.json(
        { 
          error: "AmoCRM integration error", 
          message: error.message,
          details: "Failed to fetch lead from AmoCRM. Please check your AmoCRM configuration."
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get lead", message: error?.message },
      { status: 500 }
    );
  }
}
