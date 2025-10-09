import { z } from "zod";

// AmoCRM API Response schemas
const AmoCRMLeadSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().optional(),
  responsible_user_id: z.number().optional(),
  group_id: z.number().optional(),
  status_id: z.number().optional(),
  pipeline_id: z.number().optional(),
  loss_reason_id: z.number().optional(),
  created_by: z.number().optional(),
  updated_by: z.number().optional(),
  created_at: z.number(),
  updated_at: z.number(),
  closed_at: z.number().optional(),
  closest_task_at: z.number().optional(),
  is_deleted: z.boolean().optional(),
  custom_fields_values: z.array(z.object({
    field_id: z.number(),
    field_name: z.string(),
    field_code: z.string().optional(),
    field_type: z.string(),
    values: z.array(z.object({
      value: z.union([z.string(), z.number(), z.boolean()]),
      enum_id: z.number().optional(),
      enum_code: z.string().optional(),
    })),
  })).optional(),
  _embedded: z.object({
    contacts: z.array(z.object({
      id: z.number(),
      is_main: z.boolean(),
    })).optional(),
  }).optional(),
});

const AmoCRMContactSchema = z.object({
  id: z.number(),
  name: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  responsible_user_id: z.number().optional(),
  group_id: z.number().optional(),
  created_by: z.number().optional(),
  updated_by: z.number().optional(),
  created_at: z.number(),
  updated_at: z.number(),
  is_deleted: z.boolean().optional(),
  custom_fields_values: z.array(z.object({
    field_id: z.number(),
    field_name: z.string(),
    field_code: z.string().optional(),
    field_type: z.string(),
    values: z.array(z.object({
      value: z.union([z.string(), z.number(), z.boolean()]),
      enum_id: z.number().optional(),
      enum_code: z.string().optional(),
    })),
  })).optional(),
});

export type AmoCRMLead = z.infer<typeof AmoCRMLeadSchema>;
export type AmoCRMContact = z.infer<typeof AmoCRMContactSchema>;

export interface AmoCRMConfig {
  domain: string;
  accessToken: string;
  refreshToken?: string;
  clientId: string;
  clientSecret: string;
}

export interface AmoCustomFieldValue {
  field_id?: number;
  field_code?: string;
  field_name?: string;
  field_type?: string;
  values: Array<{ 
    value: string | number | boolean;
    enum_id?: number;
    enum_code?: string;
  }>;
}

export interface AmoCRMLeadData {
  name: string;
  price?: number;
  responsible_user_id?: number;
  custom_fields_values?: AmoCustomFieldValue[];
}

export interface AmoCRMContactData {
  name: string;
  first_name?: string;
  last_name?: string;
  custom_fields_values?: AmoCustomFieldValue[];
}

export class AmoCRMClient {
  private config: AmoCRMConfig;
  private baseUrl: string;

  constructor(config: AmoCRMConfig) {
    this.config = config;
    this.baseUrl = `https://${config.domain}`;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api/v4${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Bearer ${this.config.accessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AmoCRM API error (${response.status}):`, errorText);
      
      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the request with new token
          return this.makeRequest<T>(endpoint, options);
        }
      }
      
      throw new Error(`AmoCRM API request failed: ${response.status} ${errorText}`);
    }

    return response.json();
  }

  private async refreshToken(): Promise<boolean> {
    try {
      if (!this.config.refreshToken) {
        console.error("No refresh token available");
        return false;
      }

      const response = await fetch(`${this.baseUrl}/oauth2/access_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          grant_type: "refresh_token",
          refresh_token: this.config.refreshToken,
          redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/amo/oauth-callback`,
        }),
      });

      if (!response.ok) {
        console.error("Token refresh failed:", await response.text());
        return false;
      }

      const tokenData = await response.json();
      this.config.accessToken = tokenData.access_token;
      if (tokenData.refresh_token) {
        this.config.refreshToken = tokenData.refresh_token;
      }

      // TODO: Update stored tokens in database
      return true;
    } catch (error) {
      console.error("Token refresh error:", error);
      return false;
    }
  }

  async createLead(leadData: AmoCRMLeadData): Promise<AmoCRMLead> {
    const response = await this.makeRequest<{ _embedded: { leads: AmoCRMLead[] } }>(
      "/leads",
      {
        method: "POST",
        body: JSON.stringify([leadData]),
      }
    );

    if (!response._embedded?.leads?.[0]) {
      throw new Error("Failed to create lead in AmoCRM");
    }

    return response._embedded.leads[0];
  }

  async getLead(leadId: number): Promise<AmoCRMLead> {
    const response = await this.makeRequest<AmoCRMLead>(`/leads/${leadId}`);
    return AmoCRMLeadSchema.parse(response);
  }

  async updateLead(leadId: number, leadData: Partial<AmoCRMLeadData>): Promise<AmoCRMLead> {
    const response = await this.makeRequest<{ _embedded: { leads: AmoCRMLead[] } }>(
      `/leads/${leadId}`,
      {
        method: "PATCH",
        body: JSON.stringify([leadData]),
      }
    );

    if (!response._embedded?.leads?.[0]) {
      throw new Error("Failed to update lead in AmoCRM");
    }

    return response._embedded.leads[0];
  }

  async createContact(contactData: AmoCRMContactData): Promise<AmoCRMContact> {
    const response = await this.makeRequest<{ _embedded: { contacts: AmoCRMContact[] } }>(
      "/contacts",
      {
        method: "POST",
        body: JSON.stringify([contactData]),
      }
    );

    if (!response._embedded?.contacts?.[0]) {
      throw new Error("Failed to create contact in AmoCRM");
    }

    return response._embedded.contacts[0];
  }

  async getContact(contactId: number): Promise<AmoCRMContact> {
    const response = await this.makeRequest<AmoCRMContact>(`/contacts/${contactId}`);
    return AmoCRMContactSchema.parse(response);
  }

  async findLeadByEmail(email: string): Promise<AmoCRMLead | null> {
    try {
      const response = await this.makeRequest<{ _embedded: { leads: AmoCRMLead[] } }>(
        `/leads?query=${encodeURIComponent(email)}`
      );

      return response._embedded?.leads?.[0] || null;
    } catch (error) {
      console.error("Error finding lead by email:", error);
      return null;
    }
  }

  async findContactByEmail(email: string): Promise<AmoCRMContact | null> {
    try {
      const response = await this.makeRequest<{ _embedded: { contacts: AmoCRMContact[] } }>(
        `/contacts?query=${encodeURIComponent(email)}`
      );

      return response._embedded?.contacts?.[0] || null;
    } catch (error) {
      console.error("Error finding contact by email:", error);
      return null;
    }
  }
}

// Factory function to create AmoCRM client with environment configuration
export function createAmoCRMClient(): AmoCRMClient {
  const config: AmoCRMConfig = {
    domain: process.env.AMO_DOMAIN!,
    accessToken: process.env.AMO_ACCESS_TOKEN!,
    refreshToken: process.env.AMO_REFRESH_TOKEN,
    clientId: process.env.AMO_CLIENT_ID!,
    clientSecret: process.env.AMO_CLIENT_SECRET!,
  };

  if (!config.domain || !config.accessToken || !config.clientId || !config.clientSecret) {
    throw new Error("Missing required AmoCRM configuration. Please check environment variables.");
  }

  return new AmoCRMClient(config);
}
