import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/auth";

const PROTECTED_PATHS = ["/app/(dashboard)", "/app/(main)/payment", "/app/(main)/products"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // verifyJwt is async with jose
  // Note: Next middleware cannot be async-per-path without returning a Promise
  // We convert to a Response by awaiting verification
  const verification = verifyJwt(token);
  // @ts-expect-error - top-level await allowed in middleware context
  const payload = await verification;
  if (!payload) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)"],
};


