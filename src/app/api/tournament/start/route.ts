import { api } from "@/trpc/server";
import { type Team } from "@prisma/client";

type TournamentStartData = {
    tournamentId: string;
    password: string;
};

export async function POST(req: Request) {
    const tournamentData = (await req.json()) as TournamentStartData;
    if (!tournamentData)
      return Response.json({ error: "Data missing" }, { status: 400 });

    const updatedTournament = await api.tournament.start({
        id: tournamentData.tournamentId,
        password: tournamentData.password,
    });
    if(!updatedTournament)
        return Response.json({ error: "Could not start tournament" }, { status: 400 });

    const teams = await api.tournament.getTeams({
        id: tournamentData.tournamentId,
    });
    if(!teams)
        return Response.json({ error: "Could not get teams" }, { status: 400 });

    const groups = await api.tournament.getGroups({
      id: tournamentData.tournamentId,
    });
    if(!groups) {
      const groupSize = 4;
      const teamsLength = teams.length;

      for (let i = 0; i < teamsLength / groupSize; i++) {
        const group: Team[] = [];
        for (let j = 0; j < groupSize; j++) {
          const randomIndex = Math.floor(Math.random() * teams.length);
          // @ts-expect-error || @ts-ignore
          group.push(teams[randomIndex]);
          teams.splice(randomIndex, 1);
        }

        await api.group.create({
          tournamentId: tournamentData.tournamentId,
          teams: group,
        });
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    groups.forEach(async (group) => {
      for (let i = 0; i < group.teams.length; i++) {
        for (let j = i + 1; j < group.teams.length; j++) {
          const team1 = group.teams[i];
          const team2 = group.teams[j];

          // Create a match between team1 and team2
          const match = await api.match.create({
            // @ts-expect-error || @ts-ignore
            team1Id: team1.id,
            // @ts-expect-error || @ts-ignore
            team2Id: team2.id,
            tournamentId: group.tournamentId,
            groupId: group.id,
          });

          if(!match) 
            return Response.json({ error: "Could not create match" }, { status: 400 });
        }
      }
    });

    return Response.json({ updatedTournament });
}