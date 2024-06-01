/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "@/trpc/server";
import { MatchType } from "@prisma/client";

type Tiebreaker = {
  team1Id: string;
  team2Id: string;
  tournamentId: string;
};

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const tiebreaker: Tiebreaker[] = await req.json();
  if (!tiebreaker)
    return Response.json({ error: "Data missing" }, { status: 400 });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  tiebreaker.forEach(async (tie) => {
    await api.match.create({
        tournamentId: tie.tournamentId,
        team1Id: tie.team1Id,
        team2Id: tie.team2Id,
        matchtype: MatchType.TIEBREAKER
    })
  })

  return Response.json({ message: "Created matches" });
}