import { NextResponse } from "next/server";
import { z } from "zod";

const OAuthCallbackSchema = z.object({
  code: z.string(),
  state: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const parsed = OAuthCallbackSchema.safeParse({ code, state });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid OAuth callback parameters", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { code: authCode, state: stateParam } = parsed.data;

    // Exchange authorization code for access token
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
          grant_type: "authorization_code",
          code: authCode,
          redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/amo/oauth-callback`,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("AmoCRM token exchange failed:", error);
      return NextResponse.json(
        { error: "Failed to exchange authorization code for token" },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();
    
    // Store tokens securely (in production, encrypt and store in database)
    // For now, we'll store them in environment variables for development
    // TODO: Implement secure token storage in database
    
    return NextResponse.json(
      {
        success: true,
        message: "OAuth callback successful",
        // Don't return tokens in response for security
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("OAuth callback error:", error);
    return NextResponse.json(
      { error: "OAuth callback failed", message: error?.message },
      { status: 500 }
    );
  }
}
