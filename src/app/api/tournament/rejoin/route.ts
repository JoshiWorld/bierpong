import { loginTeam } from "@/server/api/jwt";
import { api } from "@/trpc/server";

type ReJoinData = {
  code: string;
};

export async function POST(req: Request) {
  const reJoinData = (await req.json()) as ReJoinData;
  const team = await api.team.getByCode(reJoinData);
  if (!team)
    return Response.json({ error: "Team does not exist" }, { status: 404 });

  // JWT Cookie erstellen
  await loginTeam({
    teamId: team.id,
    teamName: team.name,
    tournamentId: team.tournamentId,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    code: team.code,
  });

  return Response.json(team);
}
