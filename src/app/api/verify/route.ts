import { decrypt } from "@/server/api/jwt";
import { cookies } from "next/headers";

export async function GET() {
    const jwt = cookies().get("session");
    if (!jwt) return Response.json(null);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = await decrypt(jwt.value);

    return Response.json(payload);
}