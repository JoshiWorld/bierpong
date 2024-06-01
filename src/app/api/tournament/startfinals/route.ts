import { getAdminSession } from "@/server/api/jwt";
import { api } from "@/trpc/server";
import { type Team, MatchType, TournamentSize } from "@prisma/client";

type TeamData = {
  id: string;
  name: string;
  players: PlayerData[];
  team1Matches: MatchData[];
  team2Matches: MatchData[];
  winnerMatches: MatchData[];
  looserMatches: MatchData[];
  group?: GroupData;
};

type PlayerData = {
  id: string;
  name: string;
};

type GroupData = {
  id: string;
  teams: TeamData[];
  matches: MatchData[];
};

type MatchData = {
  id: string;
  team1: TeamData;
  team2: TeamData;
  winner: TeamData;
  looser: TeamData;
  team1Score: number;
  team2Score: number;
  group?: GroupData;
};

type Tiebreaker = {
  team1Id: string;
  team2Id: string;
  tournamentId: string;
}

export async function POST() {
    const tournamentData = await getAdminSession();
    if (!tournamentData)
      return Response.json({ error: "Data missing" }, { status: 400 });

    const updatedTournament = await api.tournament.startFinals({
        id: tournamentData.payload.tournamentId,
        password: tournamentData.payload.password,
    });
    if(!updatedTournament)
        return Response.json({ error: "Could not start finals" }, { status: 400 });
    
    const id = tournamentData.payload.tournamentId;
    const groups = await api.tournament.getGroups({id});

    const firstTeams: Team[] = [];
    const secondTeams: Team[] = [];
    const tiebreaker: Tiebreaker[] = [];

    groups.forEach((group) => {
      let firstTeam = group.teams[0];
      let secondTeam = group.teams[1];

      group.teams.forEach((team) => {
        const wins = team.winnerMatches.length;
        // const looses = team.winnerMatches.length;
        const goalSelf =
          team.team1Matches.reduce((sum, match) => sum + match.team1Score!, 0) +
          team.team2Matches.reduce((sum, match) => sum + match.team2Score!, 0);
        const goalEnemy =
          team.team1Matches.reduce((sum, match) => sum + match.team2Score!, 0) +
          team.team2Matches.reduce((sum, match) => sum + match.team1Score!, 0);
        const goalRatio = goalSelf - goalEnemy;

        const winsTeam1 = firstTeam!.winnerMatches.length;
        // const loosesTeam1 = firstTeam!.winnerMatches.length;
        const goalSelfTeam1 =
          firstTeam!.team1Matches.reduce(
            (sum, match) => sum + match.team1Score!,
            0,
          ) +
          firstTeam!.team2Matches.reduce(
            (sum, match) => sum + match.team2Score!,
            0,
          );
        const goalEnemyTeam1 =
          firstTeam!.team1Matches.reduce(
            (sum, match) => sum + match.team2Score!,
            0,
          ) +
          firstTeam!.team2Matches.reduce(
            (sum, match) => sum + match.team1Score!,
            0,
          );
        const goalRatioTeam1 = goalSelfTeam1 - goalEnemyTeam1;

        const winsTeam2 = secondTeam!.winnerMatches.length;
        // const loosesTeam2 = secondTeam!.winnerMatches.length;
        const goalSelfTeam2 =
          secondTeam!.team1Matches.reduce(
            (sum, match) => sum + match.team1Score!,
            0,
          ) +
          secondTeam!.team2Matches.reduce(
            (sum, match) => sum + match.team2Score!,
            0,
          );
        const goalEnemyTeam2 =
          secondTeam!.team1Matches.reduce(
            (sum, match) => sum + match.team2Score!,
            0,
          ) +
          secondTeam!.team2Matches.reduce(
            (sum, match) => sum + match.team1Score!,
            0,
          );
        const goalRatioTeam2 = goalSelfTeam2 - goalEnemyTeam2;

        if (team.id !== firstTeam!.id && team.id !== secondTeam!.id) {
          if (wins > winsTeam1) {
            firstTeam = team;
          } else if (wins === winsTeam1 && goalRatio > goalRatioTeam1) {
            firstTeam = team;
          } else if (wins > winsTeam2) {
            secondTeam = team;
          } else if (wins === winsTeam2 && goalRatio > goalRatioTeam2) {
            secondTeam = team;
          }

          if (wins === winsTeam1 && goalRatio === goalRatioTeam1) {
            tiebreaker.push({
              team1Id: team.id,
              team2Id: firstTeam!.id,
              tournamentId: id,
            });
          } else if (wins === winsTeam2 && goalRatio === goalRatioTeam2) {
            tiebreaker.push({
              team1Id: team.id,
              team2Id: secondTeam!.id,
              tournamentId: id,
            });
          }
        }
      });

      // @ts-expect-error || @ts-ignore
      firstTeams.push(firstTeam);
      // @ts-expect-error || @ts-ignore
      secondTeams.push(secondTeam);
    });

    if(tiebreaker.length !== 0) return Response.json({ error: "Could not start finals cause teams not match", tiebreaker: tiebreaker },{ status: 400 });
    if(firstTeams.length !== secondTeams.length) return Response.json({ error: "Could not start finals cause teams not match" }, { status: 400 });
    
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    firstTeams.forEach(async (team: Team) => {
      const randomIndex = Math.floor(Math.random() * secondTeams.length);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      let matchtype: MatchType = MatchType.EIGHT;
      switch (updatedTournament.tournamentSize) {
        case TournamentSize.BIG:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          matchtype = MatchType.EIGHT;
          break;
        case TournamentSize.LARGE:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          matchtype = MatchType.FOURTH;
          break;
        case TournamentSize.MEDIUM:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          matchtype = MatchType.HALF;
          break;
        case TournamentSize.SMALL:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          matchtype = MatchType.FINAL;
          break;
        default:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          matchtype = MatchType.EIGHT;
          break;
      }

      await api.match.create({
        tournamentId: id,
        team1Id: team.id,
        // @ts-expect-error || @ts-ignore
        team2Id: secondTeams[randomIndex],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        matchtype: matchtype,
      }).then(() => secondTeams.splice(randomIndex, 1));
    });

    return Response.json({ updatedTournament });
}