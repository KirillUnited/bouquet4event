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
  // Contact fields
  CONTACT_NAME: {
    fieldId: 0, // Will be set from AMO_FIELD_IDS
    fieldName: "Имя контакта",
    fieldType: "text",
    required: true,
  },
  PHONE: {
    fieldId: 0, // Will be set from AMO_FIELD_IDS
    fieldName: "Телефон",
    fieldType: "text",
    required: true,
  },
  EMAIL: {
    fieldId: 0, // Will be set from AMO_FIELD_IDS
    fieldName: "Email",
    fieldType: "email",
    required: true,
  },
  POSITION: {
    fieldId: 0, // Will be set from AMO_FIELD_IDS
    fieldName: "Должность",
    fieldType: "text",
    required: false,
  },
  
  // Lead fields
  DELIVERY_ADDRESS: {
    fieldId: 1035511, // Will be set from AMO_FIELD_IDS
    fieldName: "Адрес доставки",
    fieldType: "text",
    required: false,
  },
  DELIVERY_DATE: {
    fieldId: 0, // Will be set from AMO_FIELD_IDS
    fieldName: "Дата первой доставки",
    fieldType: "date",
    required: false,
  },
  BOUQUET_WISHES: {
    fieldId: 0, // Will be set from AMO_FIELD_IDS
    fieldName: "Особые пожелания",
    fieldType: "textarea",
    required: false,
  },
  BOUQUET_CATEGORY: {
    fieldId: 0, // Will be set from AMO_FIELD_IDS
    fieldName: "Выбранная категория букета",
    fieldType: "select",
    required: false,
  },
  EVENT_DATE: {
    fieldId: 0, // Will be set from AMO_FIELD_IDS
    fieldName: "Дата мероприятия",
    fieldType: "date",
    required: false,
  },
  REGION: {
    fieldId: 0, // Will be set from AMO_FIELD_IDS
    fieldName: "Регион",
    fieldType: "select",
    required: false,
  },
  REFERRAL_LINK: {
    fieldId: 0, // Will be set from AMO_FIELD_IDS
    fieldName: "Реферальная ссылка",
    fieldType: "text",
    required: false,
  }
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
