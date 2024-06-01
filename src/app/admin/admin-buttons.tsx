"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type Tiebreaker = {
  team1Id: string;
  team2Id: string;
  tournamentId: string;
};

type ErrorResponseTie = {
    error: string;
    tiebreaker: Tiebreaker[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorResponseTie(data: any): data is ErrorResponseTie {
    return typeof data === 'object' && 'tiebreaker' in data; // Adjust the condition based on actual properties
}

export function StartTournament() {
  const [started, setStarted] = useState<boolean>(false);

  const start = async () => {
    await fetch("/api/tournament/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setStarted(true);
      })
      .catch((err) => {
        setStarted(false);
        console.log(err);
      });
  };

  return (
    <Button onClick={start} disabled={started}>
      {started ? "Wurde gestartet" : "Turnier starten"}
    </Button>
  );
}

export function StartFinals() {
  const [started, setStarted] = useState<boolean>(false);
  const [ties, setTies] = useState<Tiebreaker[]>([]);

  const start = async () => {
    await fetch("/api/tournament/startfinals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        setStarted(true);

        if(!res.ok) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const data = await res.json();
            if(isErrorResponseTie(data)) {
                setTies(data.tiebreaker);
            }
            setStarted(false);
        }
      })
      .catch((err) => {
        setStarted(false);
        console.error(err);
      });
  };

  const createTiebreaker = async () => {
    await fetch("/api/tournament/create/tiebreaker", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ties),
    }).then(async (res) => {
        console.log(res);
    }).catch((err) => {
        console.error(err);
    })
  }

  return (
    <div>
      <Button onClick={start} disabled={started}>
        {started ? "Finals gestartet" : "Finals starten"}
      </Button>
      {ties.length !== 0 && (
        <Button onClick={createTiebreaker}>
          Tiebreaker Matches erstellen
        </Button>
      )}
      <pre>{JSON.stringify(ties, null, 2)}</pre>
    </div>
  );
}

export function EndTournament() {
  return <Button onClick={() => console.log("NIG")}>Turnier beenden</Button>;
}
