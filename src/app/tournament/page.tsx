"use client";

import { TournamentState, type TournamentSize } from "@prisma/client";
// components/SubscriptionComponent.tsx
import { useEffect, useState } from "react";

type TournamentData = {
  id: string;
  name: string;
  code: string;
  tournamentSize: TournamentSize;
  tournamentState: TournamentState;
  teams: TeamData[];
  matches: MatchData[];
  groups: GroupData[];
};

type TeamData = {
  id: string;
  name: string;
  players: PlayerData[];
};

type PlayerData = {
  id: string;
  name: string;
};

type GroupData = {
  id: string;
  teams: TeamData[];
};

type MatchData = {
  id: string;
  team1: TeamData;
  team2: TeamData;
  winner: TeamData;
  looser: TeamData;
  team1Score: number;
  team2Score: number;
};

export default function TournamentPage() {
  const [data, setData] = useState<TournamentData | null>(null);
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    fetch("/api/verify")
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setJwt(data);
      })
      .catch(() => setJwt(null));
  }, []);

  useEffect(() => {
    if (jwt) {
      const eventSource = new EventSource(
        // @ts-expect-error || @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        "http://localhost:3000/subscribe/" + jwt.payload.tournamentId,
      );

      eventSource.onmessage = (event) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const data = JSON.parse(event.data) as TournamentData;
        setData(data);
      };

      eventSource.onerror = (error) => {
        console.error("EventSource error:", error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [jwt]);

  if (!data) return <div>Loading...</div>;

  if(data.tournamentState === TournamentState.LOBBY) return <TournamentLobbyView data={data} />;

  return (
    <div>
      <h1>Subscription Component</h1>
      {data.teams.map((team) => (
        <div key={team.id}>
          <h2>{team.name}</h2>
          <ul>
            {team.players.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function TournamentLobbyView({ data }: { data: TournamentData }) {
  return (
    <div className="container justify-center">
      <div className="text-lg font-semibold text-center pb-4">{data.teams.length} Teams</div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.teams.map((team) => (
          <div
            key={team.id}
            className="grid grid-cols-2 grid-rows-3 gap-2 rounded-lg bg-background shadow-xl dark:shadow-sm dark:shadow-white"
          >
            <div className="col-span-2 flex items-center justify-center pt-2">
              <h2 className="scroll-m-20 text-xl font-semibold md:text-2xl">
                {team.name}
              </h2>
            </div>
            <div className="row-span-2 flex items-center justify-center border-r-2 border-t-2">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                {team.players[0]?.name}
              </p>
            </div>
            <div className="row-span-2 flex items-center justify-center border-l-2 border-t-2">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                {team.players[1]?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}