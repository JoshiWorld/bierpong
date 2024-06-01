import { getAdminSession } from "@/server/api/jwt";
import { api } from "@/trpc/server";
import { type Team } from "@prisma/client";

export async function POST() {
  const tournamentData = await getAdminSession();
  if (!tournamentData)
    return Response.json({ error: "Data missing" }, { status: 400 });

  const updatedTournament = await api.tournament.start({
    id: tournamentData.payload.tournamentId,
    password: tournamentData.payload.password,
  });
  if (!updatedTournament)
    return Response.json(
      { error: "Could not start tournament" },
      { status: 400 },
    );

  const teams = await api.tournament.getTeams({
    id: tournamentData.payload.tournamentId,
  });
  if (!teams)
    return Response.json({ error: "Could not get teams" }, { status: 400 });

  const groups = await api.tournament.getGroups({
    id: tournamentData.payload.tournamentId,
  });

  if (!groups || groups.length === 0) {
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

      const newGroup = await api.group.create({
        tournamentId: tournamentData.payload.tournamentId,
        teams: group,
      });

      // @ts-expect-error || @ts-ignore
      groups.push(newGroup);
    }
  }

  for (const group of groups) {
    const team1 = group.teams[0];
    const team2 = group.teams[1];
    const team3 = group.teams[2];
    const team4 = group.teams[3];

    if (!team1 || !team2 || !team3 || !team4) {
      return Response.json({ error: "Could not get teams" }, { status: 400 });
    }

    try {
      await api.match.create({
        team1Id: team1.id,
        team2Id: team2.id,
        tournamentId: group.tournamentId,
        groupId: group.id,
      });

      await api.match.create({
        team1Id: team3.id,
        team2Id: team4.id,
        tournamentId: group.tournamentId,
        groupId: group.id,
      });

      await api.match.create({
        team1Id: team1.id,
        team2Id: team3.id,
        tournamentId: group.tournamentId,
        groupId: group.id,
      });

      await api.match.create({
        team1Id: team2.id,
        team2Id: team4.id,
        tournamentId: group.tournamentId,
        groupId: group.id,
      });

      await api.match.create({
        team1Id: team4.id,
        team2Id: team1.id,
        tournamentId: group.tournamentId,
        groupId: group.id,
      });

      await api.match.create({
        team1Id: team2.id,
        team2Id: team3.id,
        tournamentId: group.tournamentId,
        groupId: group.id,
      });
    } catch (error) {
      console.error("Error creating match:", error);
      return Response.json(
        { error: "Could not create match" },
        { status: 400 },
      );
    }
  }

  return Response.json({ updatedTournament });
}
