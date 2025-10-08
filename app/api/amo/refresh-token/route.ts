import { NextResponse } from "next/server";
import { z } from "zod";

const RefreshTokenSchema = z.object({
  refresh_token: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = RefreshTokenSchema.safeParse(body);
    
    // If no refresh token provided, try to get from stored tokens
    const refreshToken = parsed.success ? parsed.data?.refresh_token : process.env.AMO_REFRESH_TOKEN;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token available" },
        { status: 400 }
      );
    }

    // Refresh the access token
    const tokenResponse = await fetch(
      `https://${process.env.AMO_DOMAIN}/oauth2/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.AMO_CLIENT_ID,
          client_secret: process.env.AMO_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/amo/oauth-callback`,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("AmoCRM token refresh failed:", error);
      return NextResponse.json(
        { error: "Failed to refresh access token" },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();
    
    // Update stored tokens (in production, encrypt and store in database)
    // TODO: Implement secure token storage update
    
    return NextResponse.json(
      {
        success: true,
        message: "Token refreshed successfully",
        // Don't return tokens in response for security
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: "Token refresh failed", message: error?.message },
      { status: 500 }
    );
  }
}
