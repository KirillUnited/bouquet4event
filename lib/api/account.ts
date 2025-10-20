import { cookies } from "next/headers";

export interface AccountDataProps {
  _id: string;
  userId: string;
  email: string;
  name?: string;
  avatar?: string;
  phone?: string;
  region?: string;
  totalAmount?: number;
  referralLink?: string;
  bouquetCategory?: string;
  deliveryAddress?: string;
  deliveryInterval?: string;
  lastLoginAt?: string;
  amoLeadId?: string;
  amoContactId?: string;
}

export async function fetchAccountData(): Promise<{
  account: AccountDataProps | null;
  error?: string;
}> {
  try {
    const cookieStore = await cookies();
    const host = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = `${host}/api/dashboard/account`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Forward the auth cookie
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("Failed to fetch account data:", error);
      return {
        account: null,
        error: error.message || "Failed to fetch account data",
      };
    }

    const data = await response.json();
    return { account: data.account };
  } catch (error) {
    console.error("Error fetching account data:", error);
    return {
      account: null,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
