import { env } from "@/env";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(env.JWT_SECRET);

const now = new Date();
const nbf = now;
const exp = nbf.getTime() + 24 * 60 * 60 * 1000; // ms precision

export type Session = {
  payload: {
    teamId: string;
    teamName: string;
    tournamentId: string;
    code: string;
  };
  expires: number;
  iat: number;
  exp: number;
};

export type AdminSession = {
  payload: {
    tournamentId: string;
    code: string;
    password: string;
  };
  expires: number;
  iat: number;
  exp: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function encrypt(payload: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function decrypt(input: string): Promise<Session> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as Session;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function decryptAdmin(input: string): Promise<AdminSession> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as AdminSession;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginTeam(payload: any) {
  // Create the session
  const expires = exp;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const session = await encrypt({ payload, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginAdmin(payload: any) {
  // Create the session
  const expires = exp;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const adminsession = await encrypt({ payload, expires });

  // Save the session in a cookie
  cookies().set("adminsession", adminsession, { expires });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: exp });
}

export async function logoutAdmin() {
  // Destroy the session
  cookies().set("adminsession", "", { expires: exp });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await decrypt(session);
}

export async function getAdminSession() {
  const session = cookies().get("adminsession")?.value;
  if (!session) return null;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await decryptAdmin(session);
}
