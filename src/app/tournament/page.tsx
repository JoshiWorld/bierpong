"use client";

import { Player, type Match } from "@prisma/client";
import { useEffect, useState } from "react";

type Tournament = {
  id: string;
  name: string;
  code: string;
  tournamentSize: number;
  teams: Team[];
  matches: Match[];
};

type Team = {
  id: string;
  name: string;
  players: Player[];
};

export default function TournamentPage() {
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("/api/tournament")
        .then((res) => res.json())
        .then((data) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          setTournament(data);
        })
        .catch(() => setTournament(null));
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if(!tournament) return <div>Loading...</div>;

  return (
    <div>
      <h1>{tournament?.name}</h1>
    </div>
  );
}
