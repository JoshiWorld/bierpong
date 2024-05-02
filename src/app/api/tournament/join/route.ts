import { api } from "@/trpc/server";
import { TournamentState } from "@prisma/client";

type TeamData = {
  teamname: string;
  player1: string;
  player2: string;
  tournamentCode: string;
}

const teamSize = {
  BIG: 32,
  LARGE: 16,
  MEDIUM: 8,
  SMALL: 4,
};

export async function POST(req: Request) {
  // Get Teamdata from Request
  const teamData: TeamData = await req.json() as TeamData;
  if(!teamData) return Response.json({ error: "Data missing" }, { status: 400 });

  // Gets the tournament by the code
  const tournament = await api.tournament.getByCode({ code: teamData.tournamentCode });
  if(!tournament) return Response.json({ error: "Tournament does not exist" }, { status: 400 });
  if(tournament.tournamentState !== TournamentState.LOBBY) return Response.json({ error: "Tournament has already started" }, { status: 400 });

  // Gets the teams of the tournament
  const teams = await api.tournament.getTeams({ id: tournament.id });
  if(teams.length >= teamSize[tournament.tournamentSize]) return Response.json({ error: "Tournament is full" }, { status: 400 });

  // Create the team
  const createdTeam = await api.team.create({
    name: teamData.teamname,
    tournamentId: tournament.id,
  });
  if(!createdTeam) return Response.json({ error: "Failed to create team" }, { status: 400 });

  // Create the players
  const player1 = await api.player.create({
    name: teamData.player1,
    teamId: createdTeam.id,
  });
  if(!player1) return Response.json({ error: "Failed to create player 1" }, { status: 400 });

  const player2 = await api.player.create({
    name: teamData.player2,
    teamId: createdTeam.id,
  });
  if(!player2) return Response.json({ error: "Failed to create player 2" }, { status: 400 });

  // Return the created team and players
  return Response.json({ createdTeam, player1, player2 });
}