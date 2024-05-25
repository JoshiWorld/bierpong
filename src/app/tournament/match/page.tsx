import { getSession } from "@/server/api/jwt";
import { api } from "@/trpc/server";
import { MatchEntry } from "./match-entry";

export default async function MatchPage() {
  const session = await getSession();
  if (!session) {
    return <h1>Not logged in</h1>;
  }

  const team = await api.team.get({ id: session.payload.teamId });
  if (!team) {
    return <h1>Team not found</h1>;
  }

  const group = await api.group.get({ id: team.groupId! });
  if (!group) {
    return <h1>Group not found</h1>;
  }
  const matches = await api.match.getAllByGroup({ groupId: group.id });

  const currentMatch = matches.find((match) => !match.winnerId || !match.looserId);
  if (!currentMatch) {
    return <h1>Kein Match gefunden</h1>;
  }
  if(currentMatch?.team1Id !== session.payload.teamId && currentMatch?.team2Id !== session.payload.teamId) {
    return <h1>Ein anderes Team spielt gerade noch.</h1>;
  }

  const enemyId =
    currentMatch.team1Id === session.payload.teamId
      ? currentMatch.team2Id
      : currentMatch.team1Id;
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
