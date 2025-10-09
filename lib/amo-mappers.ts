import { AmoCRMLeadData, AmoCRMContactData } from "./amo-client";

// AmoCRM Field IDs - These need to be configured in your AmoCRM account
// TODO: Replace with actual field IDs from your AmoCRM configuration
// Field IDs from AmoCRM - update these with your actual field IDs
export const AMO_FIELD_IDS = {
  // Contact fields (Поля контакта)
  CONTACT_NAME: "name",                 // "Имя контакта" (standard field, no custom ID needed)
  PHONE: "phone",                       // "Телефон" (standard field, no custom ID needed)
  EMAIL: "email",                       // "Email" (standard field, no custom ID needed)
  POSITION: "position",                 // "Должность" (standard field, no custom ID needed)
  
  // Lead fields (Поля сделки) - these need your actual custom field IDs
  // TODO: Replace these with your actual custom field IDs from AmoCRM
  DELIVERY_ADDRESS: 1035511,          // "Адрес доставки"
  BOUQUET_WISHES: 1035507,            // "Особые пожелания"
  BOUQUET_CATEGORY: 1035509,          // "Выбранная категория букета"
  DELIVERY_DATE: 1035503,             // "Дата первой доставки"
  EVENT_DATE: 1035513,                // "Дата мероприятия"
  REGION: 1035515,                    // "Регион"
  REFERRAL_LINK: 1036423,             // "Реферальная ссылка"
  BUDGET: "budget"                    // Standard AmoCRM budget field
} as const;

// Helper function to get field ID with type safety and better error reporting
function getFieldId(fieldName: keyof typeof AMO_FIELD_IDS): number | undefined {
  const fieldValue = AMO_FIELD_IDS[fieldName];
  
  // For standard fields, we don't need a field_id
  if (typeof fieldValue === 'string' && ['name', 'phone', 'email', 'position'].includes(fieldValue)) {
    return undefined;
  }
  
  // If it's already a number, return it directly
  if (typeof fieldValue === 'number') {
    return fieldValue;
  }
  
  // Try to parse as number if it's a string
  if (typeof fieldValue === 'string') {
    const fieldId = parseInt(fieldValue, 10);
    if (!isNaN(fieldId)) {
      return fieldId;
    }
  }
  
  console.error(`⚠️ Invalid field ID for ${fieldName}: "${fieldValue}". Please update AMO_FIELD_IDS with the correct field ID from AmoCRM.`);
  return undefined;
}

export interface UserRegistrationData {
  email: string;
  name?: string;
  phone?: string;
  position?: string;
  bouquetCategory?: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  eventDate?: string;
  region?: string;
  bouquetWishes?: string;
  accountSum?: number;
  referralLink?: string;
}

export interface UserUpdateData {
  email?: string;
  name?: string;
  phone?: string;
  position?: string;
  bouquetCategory?: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  eventDate?: string;
  region?: string;
  bouquetWishes?: string;
  accountSum?: number;
  referralLink?: string;
}

/**
 * Maps user registration data to AmoCRM lead format
 */
export function mapUserToAmoCRMLead(userData: UserRegistrationData): AmoCRMLeadData {
  const customFields = [];

  // Add lead fields with proper field IDs
  const fields = [
    { key: 'deliveryAddress', fieldId: 'DELIVERY_ADDRESS' },
    { key: 'deliveryDate', fieldId: 'DELIVERY_DATE' },
    { key: 'eventDate', fieldId: 'EVENT_DATE' },
    { key: 'region', fieldId: 'REGION' },
    { key: 'bouquetCategory', fieldId: 'BOUQUET_CATEGORY' },
    { key: 'bouquetWishes', fieldId: 'BOUQUET_WISHES' },
    { key: 'referralLink', fieldId: 'REFERRAL_LINK' },
  ];

  // Process each field
  for (const { key, fieldId } of fields) {
    const value = userData[key as keyof UserRegistrationData];
    if (value !== undefined && value !== '') {
      customFields.push({
        field_id: getFieldId(fieldId as keyof typeof AMO_FIELD_IDS),
        values: [{ value: String(value) }],
      });
    }
  }

  const leadData: AmoCRMLeadData = {
    name: `Flower Account - ${userData.email}`,
    price: 5000, // Default price if not provided
    custom_fields_values: customFields,
  };

  // Set budget if provided (using standard AmoCRM price field)
  if (userData.accountSum !== undefined) {
    leadData.price = userData.accountSum;
  }
  
  return leadData;
}

/**
 * Maps user data to AmoCRM contact format
 */
export function mapUserToAmoCRMContact(userData: UserRegistrationData): AmoCRMContactData {
  const customFields = [];

  // Add contact fields with proper field IDs
  const fields = [
    { key: 'phone', fieldId: 'PHONE' },
    { key: 'email', fieldId: 'EMAIL' },
    { key: 'position', fieldId: 'POSITION' },
  ];

  // Process each field
  for (const { key, fieldId } of fields) {
    const value = userData[key as keyof UserRegistrationData];
    if (value !== undefined && value !== '') {
      customFields.push({
        field_id: getFieldId(fieldId as keyof typeof AMO_FIELD_IDS),
        values: [{ value: String(value) }],
      });
    }
  }

  // Add contact-specific fields
  if (userData.region) {
    customFields.push({
      field_id: getFieldId('REGION'),
      values: [{ value: userData.region }],
    });
  }
  
  if (userData.eventDate) {
    customFields.push({
      field_id: getFieldId('EVENT_DATE'),
      values: [{ value: userData.eventDate }],
    });
  }

  // Referral Link
  if (userData.referralLink) {
    customFields.push({
      field_id: getFieldId('REFERRAL_LINK'),
      values: [{ value: userData.referralLink }],
    });
  }

  return {
    name: userData.name || userData.email,
    first_name: userData.name?.split(" ")[0] || userData.email.split("@")[0],
    last_name: userData.name?.split(" ").slice(1).join(" ") || "",
    custom_fields_values: customFields,
  };
}

/**
 * Maps user update data to AmoCRM lead update format
 */
export function mapUserUpdateToAmoCRMLead(userData: UserUpdateData): Partial<AmoCRMLeadData> {
  const customFields = [];

  // Account Sum
  if (userData.accountSum !== undefined) {
    customFields.push({
      field_name: "Account Sum",
      values: [{ value: userData.accountSum.toString() }],
    });
  }

  // Bouquet Category
  if (userData.bouquetCategory) {
    customFields.push({
      field_name: "Bouquet Category",
      values: [{ value: userData.bouquetCategory }],
    });
  }

  // Delivery Address
  if (userData.deliveryAddress) {
    customFields.push({
      field_name: "Delivery Address",
      values: [{ value: userData.deliveryAddress }],
    });
  }

  // Delivery Date
  if (userData.deliveryDate) {
    customFields.push({
      field_name: "Delivery Date",
      values: [{ value: userData.deliveryDate }],
    });
  }

  // Delivery Interval
  if (userData.deliveryInterval) {
    customFields.push({
      field_name: "Delivery Interval",
      values: [{ value: userData.deliveryInterval }],
    });
  }

  // Bouquet Wishes
  if (userData.bouquetWishes) {
    customFields.push({
      field_name: "Bouquet Wishes",
      values: [{ value: userData.bouquetWishes }],
    });
  }

  // Email
  if (userData.email) {
    customFields.push({
      field_name: "Email",
      values: [{ value: userData.email }],
    });
  }

  // Referral Link
  if (userData.referralLink) {
    customFields.push({
      field_name: "Referral Link",
      values: [{ value: userData.referralLink }],
    });
  }

  return {
    name: userData.email ? `Flower Account - ${userData.email}` : undefined,
    price: userData.accountSum,
    custom_fields_values: customFields,
  };
}

/**
 * Extracts user data from AmoCRM lead response
 */
export function mapAmoCRMLeadToUser(amoLead: any): Partial<UserRegistrationData> {
  const userData: Partial<UserRegistrationData> = {};

  if (amoLead.custom_fields_values) {
    for (const field of amoLead.custom_fields_values) {
      switch (field.field_name) {
        case "Account Sum":
          userData.accountSum = parseFloat(field.values[0]?.value) || 5000;
          break;
        case "Bouquet Category":
          userData.bouquetCategory = field.values[0]?.value;
          break;
        case "Delivery Address":
          userData.deliveryAddress = field.values[0]?.value;
          break;
        case "Delivery Date":
          userData.deliveryDate = field.values[0]?.value;
          break;
        case "Delivery Interval":
          userData.deliveryInterval = field.values[0]?.value;
          break;
        case "Bouquet Wishes":
          userData.bouquetWishes = field.values[0]?.value;
          break;
        case "Email":
          userData.email = field.values[0]?.value;
          break;
        case "Referral Link":
          userData.referralLink = field.values[0]?.value;
          break;
      }
    }
  }

  return userData;
}

/**
 * Extracts user data from AmoCRM contact response
 */
export function mapAmoCRMContactToUser(amoContact: any): Partial<UserRegistrationData> {
  const userData: Partial<UserRegistrationData> = {};

  if (amoContact.custom_fields_values) {
    for (const field of amoContact.custom_fields_values) {
      switch (field.field_name) {
        case "Phone":
          userData.phone = field.values[0]?.value;
          break;
        case "Email":
          userData.email = field.values[0]?.value;
          break;
        case "Bouquet Category":
          userData.bouquetCategory = field.values[0]?.value;
          break;
        case "Delivery Address":
          userData.deliveryAddress = field.values[0]?.value;
          break;
        case "Delivery Date":
          userData.deliveryDate = field.values[0]?.value;
          break;
        case "Delivery Interval":
          userData.deliveryInterval = field.values[0]?.value;
          break;
        case "Bouquet Wishes":
          userData.bouquetWishes = field.values[0]?.value;
          break;
        case "Referral Link":
          userData.referralLink = field.values[0]?.value;
          break;
      }
    }
  }

  // Extract name from contact
  if (amoContact.first_name || amoContact.last_name) {
    userData.name = [amoContact.first_name, amoContact.last_name].filter(Boolean).join(" ");
  }

  return userData;
}
