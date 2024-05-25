import { logout } from "@/server/api/jwt";

export async function GET() {
    await logout().then(() => {
        return Response.json({ status: 200 });
    }).catch(() => {
        return Response.json({ status: 500 });
    });

    return Response.json({ status: 200 });
}