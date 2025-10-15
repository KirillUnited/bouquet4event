import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Удаляем cookie 'token'
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Set-Cookie":
        "auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
    },
  });
}

export async function GET(req: NextRequest) {
  // Альтернативно, можно поддерживать удаление через GET
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Set-Cookie":
        "auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
    },
  });
}
