import { getSession, type Session } from "@/server/api/jwt";
import { api } from "@/trpc/server";
import { MatchEntry } from "./match-entry";
import { type Team, TournamentState } from "@prisma/client";
import { MatchEntryFinals } from "./match-entry-finals";

export default async function MatchPage() {
  const session = await getSession();
  if (!session) {
    return <h1>Not logged in</h1>;
  }

  const team = await api.team.get({ id: session.payload.teamId });
  if (!team) {
    return <h1>Team not found</h1>;
  }

  const tournament = await api.tournament.getById({id: session.payload.tournamentId});
  if(!tournament) return <h1>Tournament not found</h1>;
  if(tournament.tournamentState === TournamentState.LOBBY) {
    return <h1>Lobby</h1>;
  } else if(tournament.tournamentState === TournamentState.GROUP) {
    return <GroupPhase team={team} session={session} />;
  } else {
    return <FinalsPhase team={team} session={session} />;
  }
}

async function GroupPhase({team, session}: {team: Team, session: Session}) {
  const group = await api.group.get({ id: team.groupId! });
  if (!group) {
    return <h1>Group not found</h1>;
  }
  const matches = await api.match.getAllByGroup({ groupId: group.id });

  const currentMatch = matches.find(
    (match) => !match.winnerId || !match.looserId,
  );
  if (!currentMatch) {
    return <h1>Kein Match gefunden</h1>;
  }
  if (
    currentMatch?.team1Id !== session.payload.teamId &&
    currentMatch?.team2Id !== session.payload.teamId
  ) {
    return <h1>Ein anderes Team spielt gerade noch.</h1>;
  }

  const enemyId =
    currentMatch.team1Id === session.payload.teamId
      ? currentMatch.team2Id
      : currentMatch.team1Id;
  // @ts-expect-error || @ts-ignore
  const enemy = await api.team.get({ id: enemyId });

  return (
    <div className="container">
      <div className="flex flex-col items-center">
        <h1 className="font-bold">Aktueller Gegner:</h1>
        <p>{enemy?.name}</p>
      </div>

      <MatchEntry match={currentMatch} teamId={team.id} />
    </div>
  );
}

async function FinalsPhase({ team, session }: { team: Team; session: Session }) {
  const matches = await api.match.getWithoutGroup();
  if (!matches) return <h1>Kein Match gefunden</h1>;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const currentMatch = matches.find(
    (match) =>
      ((!match.winnerId || !match.looserId) && match.team1Id === team.id) ||
      match.team2Id === team.id,
  );
  if (!currentMatch) {
    return <h1>Kein Match gefunden</h1>;
  }
  if (
    currentMatch?.team1Id !== session.payload.teamId &&
    currentMatch?.team2Id !== session.payload.teamId
  ) {
    return <h1>Ein anderes Team spielt gerade noch.</h1>;
  }

  const enemyId =
    currentMatch.team1Id === session.payload.teamId
      ? currentMatch.team2Id
      : currentMatch.team1Id;
  // @ts-expect-error || @ts-ignore
  const enemy = await api.team.get({ id: enemyId });

  return (
    <div className="container">
      <div className="flex flex-col items-center">
        <h1 className="font-bold">Aktueller Gegner (Finals):</h1>
        <p>{enemy?.name}</p>
      </div>

      <MatchEntryFinals match={currentMatch} teamId={team.id} />
    </div>
  );
}