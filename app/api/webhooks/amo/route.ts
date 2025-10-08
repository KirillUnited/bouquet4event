import { NextResponse } from "next/server";
import { z } from "zod";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { groq } from "next-sanity";

// AmoCRM webhook payload schema
const AmoCRMWebhookSchema = z.object({
  leads: z.object({
    add: z.array(z.object({
      id: z.number(),
      name: z.string(),
      price: z.number().optional(),
      custom_fields_values: z.array(z.object({
        field_name: z.string(),
        values: z.array(z.object({
          value: z.union([z.string(), z.number(), z.boolean()]),
        })),
      })).optional(),
    })).optional(),
    update: z.array(z.object({
      id: z.number(),
      name: z.string(),
      price: z.number().optional(),
      custom_fields_values: z.array(z.object({
        field_name: z.string(),
        values: z.array(z.object({
          value: z.union([z.string(), z.number(), z.boolean()]),
        })),
      })).optional(),
    })).optional(),
    delete: z.array(z.object({
      id: z.number(),
    })).optional(),
  }).optional(),
  contacts: z.object({
    add: z.array(z.object({
      id: z.number(),
      name: z.string(),
      custom_fields_values: z.array(z.object({
        field_name: z.string(),
        values: z.array(z.object({
          value: z.union([z.string(), z.number(), z.boolean()]),
        })),
      })).optional(),
    })).optional(),
    update: z.array(z.object({
      id: z.number(),
      name: z.string(),
      custom_fields_values: z.array(z.object({
        field_name: z.string(),
        values: z.array(z.object({
          value: z.union([z.string(), z.number(), z.boolean()]),
        })),
      })).optional(),
    })).optional(),
    delete: z.array(z.object({
      id: z.number(),
    })).optional(),
  }).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = AmoCRMWebhookSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Invalid AmoCRM webhook payload:", parsed.error);
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const clientWithToken = client.withConfig({ token });

    // Process lead updates
    if (data.leads) {
      if (data.leads.update) {
        for (const lead of data.leads.update) {
          await processLeadUpdate(clientWithToken, lead);
        }
      }

      if (data.leads.delete) {
        for (const lead of data.leads.delete) {
          await processLeadDelete(clientWithToken, lead.id);
        }
      }
    }

    // Process contact updates
    if (data.contacts) {
      if (data.contacts.update) {
        for (const contact of data.contacts.update) {
          await processContactUpdate(clientWithToken, contact);
        }
      }

      if (data.contacts.delete) {
        for (const contact of data.contacts.delete) {
          await processContactDelete(clientWithToken, contact.id);
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("AmoCRM webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function processLeadUpdate(clientWithToken: any, lead: any) {
  try {
    // Find user by AmoCRM lead ID
    const user = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && amoLeadId == $leadId][0]`,
      { leadId: lead.id }
    );

    if (!user) {
      console.log(`No user found for AmoCRM lead ID: ${lead.id}`);
      return;
    }

    // Extract updated data from AmoCRM lead
    const updates: any = {};
    
    if (lead.custom_fields_values) {
      for (const field of lead.custom_fields_values) {
        switch (field.field_name) {
          case "Account Sum":
            updates.accountSum = parseFloat(field.values[0]?.value) || user.accountSum;
            break;
          case "Bouquet Category":
            updates.bouquetCategory = field.values[0]?.value || user.bouquetCategory;
            break;
          case "Delivery Address":
            updates.deliveryAddress = field.values[0]?.value || user.deliveryAddress;
            break;
          case "Delivery Date":
            updates.deliveryDate = field.values[0]?.value || user.deliveryDate;
            break;
          case "Delivery Interval":
            updates.deliveryInterval = field.values[0]?.value || user.deliveryInterval;
            break;
          case "Bouquet Wishes":
            updates.bouquetWishes = field.values[0]?.value || user.bouquetWishes;
            break;
        }
      }
    }

    // Update user in Sanity
    if (Object.keys(updates).length > 0) {
      await clientWithToken.patch(user._id).set(updates).commit();
      console.log(`Updated user ${user._id} from AmoCRM lead ${lead.id}`);
    }
  } catch (error) {
    console.error(`Error processing lead update for ID ${lead.id}:`, error);
  }
}

async function processLeadDelete(clientWithToken: any, leadId: number) {
  try {
    // Find user by AmoCRM lead ID
    const user = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && amoLeadId == $leadId][0]`,
      { leadId }
    );

    if (user) {
      // Mark user as inactive or handle deletion
      await clientWithToken.patch(user._id).set({ 
        isActive: false,
        deletedAt: new Date().toISOString()
      }).commit();
      console.log(`Marked user ${user._id} as inactive due to AmoCRM lead deletion`);
    }
  } catch (error) {
    console.error(`Error processing lead deletion for ID ${leadId}:`, error);
  }
}

async function processContactUpdate(clientWithToken: any, contact: any) {
  try {
    // Find user by AmoCRM contact ID
    const user = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && amoContactId == $contactId][0]`,
      { contactId: contact.id }
    );

    if (!user) {
      console.log(`No user found for AmoCRM contact ID: ${contact.id}`);
      return;
    }

    // Extract updated data from AmoCRM contact
    const updates: any = {};
    
    if (contact.custom_fields_values) {
      for (const field of contact.custom_fields_values) {
        switch (field.field_name) {
          case "Phone":
            updates.phone = field.values[0]?.value || user.phone;
            break;
          case "Email":
            updates.email = field.values[0]?.value || user.email;
            break;
        }
      }
    }

    // Update user in Sanity
    if (Object.keys(updates).length > 0) {
      await clientWithToken.patch(user._id).set(updates).commit();
      console.log(`Updated user ${user._id} from AmoCRM contact ${contact.id}`);
    }
  } catch (error) {
    console.error(`Error processing contact update for ID ${contact.id}:`, error);
  }
}

async function processContactDelete(clientWithToken: any, contactId: number) {
  try {
    // Find user by AmoCRM contact ID
    const user = await clientWithToken.fetch(
      groq`*[_type == "userAccount" && amoContactId == $contactId][0]`,
      { contactId }
    );

    if (user) {
      // Mark user as inactive or handle deletion
      await clientWithToken.patch(user._id).set({ 
        isActive: false,
        deletedAt: new Date().toISOString()
      }).commit();
      console.log(`Marked user ${user._id} as inactive due to AmoCRM contact deletion`);
    }
  } catch (error) {
    console.error(`Error processing contact deletion for ID ${contactId}:`, error);
  }
}
