import { AmoCRMLeadData, AmoCRMContactData } from "./amo-client";

// AmoCRM Field IDs - These need to be configured in your AmoCRM account
// TODO: Replace with actual field IDs from your AmoCRM configuration
export const AMO_FIELD_IDS = {
  ACCOUNT_SUM: "account_sum_field_id", // Replace with actual field ID
  BOUQUET_CATEGORY: "bouquet_category_field_id", // Replace with actual field ID
  DELIVERY_ADDRESS: "delivery_address_field_id", // Replace with actual field ID
  DELIVERY_DATE: "delivery_date_field_id", // Replace with actual field ID
  DELIVERY_INTERVAL: "delivery_interval_field_id", // Replace with actual field ID
  BOUQUET_WISHES: "bouquet_wishes_field_id", // Replace with actual field ID
  EMAIL: "email_field_id", // Replace with actual field ID
  REFERRAL_LINK: "referral_link_field_id", // Replace with actual field ID
  ACCOUNT_STATUS: "account_status_field_id", // Replace with actual field ID
} as const;

export interface UserRegistrationData {
  email: string;
  name?: string;
  phone?: string;
  bouquetCategory?: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  deliveryInterval?: string;
  bouquetWishes?: string;
  accountSum?: number;
  referralLink?: string;
}

export interface UserUpdateData {
  email?: string;
  name?: string;
  phone?: string;
  bouquetCategory?: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  deliveryInterval?: string;
  bouquetWishes?: string;
  accountSum?: number;
  referralLink?: string;
}

/**
 * Maps user registration data to AmoCRM lead format
 */
export function mapUserToAmoCRMLead(userData: UserRegistrationData): AmoCRMLeadData {
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
  customFields.push({
    field_name: "Email",
    values: [{ value: userData.email }],
  });

  // Referral Link
  if (userData.referralLink) {
    customFields.push({
      field_name: "Referral Link",
      values: [{ value: userData.referralLink }],
    });
  }

  // Account Status (default to "Active")
  customFields.push({
    field_name: "Account Status",
    values: [{ value: "Active" }],
  });

  return {
    name: `Flower Account - ${userData.email}`,
    price: userData.accountSum || 5000, // Default account sum
    custom_fields_values: customFields,
  };
}

/**
 * Maps user data to AmoCRM contact format
 */
export function mapUserToAmoCRMContact(userData: UserRegistrationData): AmoCRMContactData {
  const customFields = [];

  // Phone
  if (userData.phone) {
    customFields.push({
      field_name: "Phone",
      values: [{ value: userData.phone }],
    });
  }

  // Email
  customFields.push({
    field_name: "Email",
    values: [{ value: userData.email }],
  });

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

  // Referral Link
  if (userData.referralLink) {
    customFields.push({
      field_name: "Referral Link",
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
