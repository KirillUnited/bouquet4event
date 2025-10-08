/**
 * AmoCRM Field Configuration
 * 
 * This file contains the mapping between internal field names and AmoCRM field IDs.
 * You need to configure these fields in your AmoCRM account and update the field IDs below.
 */

export interface AmoCRMFieldConfig {
  fieldId: number;
  fieldName: string;
  fieldType: 'text' | 'numeric' | 'select' | 'date' | 'textarea' | 'email';
  required: boolean;
  options?: string[]; // For select fields
}

export const AMO_FIELD_CONFIG: Record<string, AmoCRMFieldConfig> = {
  ACCOUNT_SUM: {
    fieldId: 0, // TODO: Replace with actual field ID from AmoCRM
    fieldName: "Account Sum",
    fieldType: "numeric",
    required: true,
  },
  BOUQUET_CATEGORY: {
    fieldId: 0, // TODO: Replace with actual field ID from AmoCRM
    fieldName: "Bouquet Category",
    fieldType: "select",
    required: false,
    options: ["Romantic", "Seasonal", "Luxe", "Classic", "Modern"],
  },
  DELIVERY_ADDRESS: {
    fieldId: 1035511,
    fieldName: "Delivery Address",
    fieldType: "text",
    required: false,
  },
  DELIVERY_DATE: {
    fieldId: 1035503,
    fieldName: "Delivery Date",
    fieldType: "date",
    required: false,
  },
  DELIVERY_INTERVAL: {
    fieldId: 0, // TODO: Replace with actual field ID from AmoCRM
    fieldName: "Delivery Interval",
    fieldType: "select",
    required: false,
    options: ["Weekly", "Bi-weekly", "Monthly", "One-time"],
  },
  BOUQUET_WISHES: {
    fieldId: 1035507,
    fieldName: "Bouquet Wishes",
    fieldType: "textarea",
    required: false,
  },
  EMAIL: {
    fieldId: 0, // TODO: Replace with actual field ID from AmoCRM
    fieldName: "Email",
    fieldType: "email",
    required: true,
  },
  REFERRAL_LINK: {
    fieldId: 1036423,
    fieldName: "Referral Link",
    fieldType: "text",
    required: false,
  },
  ACCOUNT_STATUS: {
    fieldId: 0, // TODO: Replace with actual field ID from AmoCRM
    fieldName: "Account Status",
    fieldType: "select",
    required: true,
    options: ["Active", "Inactive", "Suspended", "Cancelled"],
  },
};

/**
 * Instructions for setting up AmoCRM fields:
 * 
 * 1. Log into your AmoCRM account
 * 2. Go to Settings > Custom Fields
 * 3. Create the following custom fields for Leads:
 *    - Account Sum (numeric field)
 *    - Bouquet Category (select field with options: Romantic, Seasonal, Luxe, Classic, Modern)
 *    - Delivery Address (text field)
 *    - Delivery Date (date field)
 *    - Delivery Interval (select field with options: Weekly, Bi-weekly, Monthly, One-time)
 *    - Bouquet Wishes (textarea field)
 *    - Email (email field)
 *    - Referral Link (text field)
 *    - Account Status (select field with options: Active, Inactive, Suspended, Cancelled)
 * 
 * 4. For each field, copy the field ID and update the fieldId in this configuration
 * 5. Test the integration by creating a test lead
 */

/**
 * Get field configuration by name
 */
export function getFieldConfig(fieldName: string): AmoCRMFieldConfig | undefined {
  return AMO_FIELD_CONFIG[fieldName];
}

/**
 * Get field ID by name
 */
export function getFieldId(fieldName: string): number | undefined {
  return AMO_FIELD_CONFIG[fieldName]?.fieldId;
}

/**
 * Validate field configuration
 */
export function validateFieldConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const [fieldName, config] of Object.entries(AMO_FIELD_CONFIG)) {
    if (config.fieldId === 0) {
      errors.push(`Field ID not configured for ${fieldName} (${config.fieldName})`);
    }
    
    if (config.required && !config.fieldId) {
      errors.push(`Required field ${fieldName} is missing field ID`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get all configured field IDs
 */
export function getAllFieldIds(): Record<string, number> {
  const fieldIds: Record<string, number> = {};
  
  for (const [fieldName, config] of Object.entries(AMO_FIELD_CONFIG)) {
    if (config.fieldId > 0) {
      fieldIds[fieldName] = config.fieldId;
    }
  }
  
  return fieldIds;
}
