import { SignJWT, jwtVerify } from "jose";

export interface JwtPayload {
  sub: string; // userId
  email: string;
}

export function signJwt(payload: JwtPayload, expiresIn: string = "7d"): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  const key = new TextEncoder().encode(secret);
  const token = new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn);
  // jose SignJWT is async; exposing sync-like API by blocking is not ideal, so return a placeholder and adjust signature to async
  throw new Error("signJwt must be used as an async function");
}

export async function signJwtAsync(payload: JwtPayload, expiresIn: string = "7d"): Promise<string> {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  const key = new TextEncoder().encode(secret);
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key);
}

export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}


