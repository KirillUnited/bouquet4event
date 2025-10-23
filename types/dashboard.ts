export interface UserData {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export interface Notification {
  id: number;
  type: "delivery" | "promotion" | "reminder" | "update" | string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

export interface UserPreferences {
  colorPalette: string;
  favoriteFlowers: string[];
  deliveryTime: string;
  specialInstructions: string;
  smsNotifications: boolean;
  includeCareInstructions: boolean;
  seasonalSurprises: boolean;
  allergies: string;
  bouquetCategory: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryInterval: string;
  bouquetWishes: string;
  email: string;
  referralLink: string;
  accountStatus: string;
  [key: string]: any; // For dynamic access
}

export interface SubscriptionData {
  id: string;
  name: string;
  status: "active" | "paused" | "cancelled";
  nextDelivery: string;
  price: number;
  planName: string;
  frequency: string;
  startDate: string;
  deliveriesCount: number;
  canUpgrade: boolean;
  // Add other subscription properties as needed
}

export interface DeliveryData {
  id: string;
  date: string;
  status: "scheduled" | "delivered" | "cancelled";
  bouquetName: string;
  // Add other delivery properties as needed
}

export interface UserStats {
  totalDeliveries: number;
  memberSince: string;
  // Add other stats properties as needed
}

// For PreferenceManager component
export interface PreferenceManagerProps {
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export interface PreferenceBlockProps {
  title?: string;
}

// For AccountDashboard component
export interface AccountDashboardProps {
  userData: UserData;
}

export interface TabItem {
  id: string;
  name: string;
  icon: string;
}
