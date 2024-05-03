import { getSession } from "@/server/api/jwt";
import { api } from "@/trpc/server";

export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const session = await getSession();
  if(!session) return Response.json({ error: "Not logged in" }, { status: 401 });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const tournament = await api.tournament.getFull({ id: session.payload.tournamentId });
  if (!tournament) return Response.json({ error: "Team does not exist" }, { status: 404 });

  return Response.json(tournament);
}
