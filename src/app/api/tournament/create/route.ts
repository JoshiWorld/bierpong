import { api } from "@/trpc/server";
import { type TournamentSize } from "@prisma/client";

type TournamentData = {
  name: string;
  code: string;
  password: string;
  tournamentSize: TournamentSize;
};

export async function POST(req: Request) {
  const tournamentData: TournamentData = (await req.json()) as TournamentData;
  if (!tournamentData)
    return Response.json({ error: "Data missing" }, { status: 400 });

  const createdTournament = await api.tournament.create({
    name: tournamentData.name,
    code: tournamentData.code,
    password: tournamentData.password,
    tournamentSize: tournamentData.tournamentSize,
  });

  return Response.json({ createdTournament });
}
