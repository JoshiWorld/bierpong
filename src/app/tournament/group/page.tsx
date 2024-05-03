"use client";

import { type TournamentSize, type TournamentState } from "@prisma/client";
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

export default function TournamentGroupPage() {
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
