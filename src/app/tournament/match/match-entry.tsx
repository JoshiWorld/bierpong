"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { type Match } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MatchEntry({match, teamId}: {match: Match, teamId: string}) {
    const router = useRouter();

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value < 0) {
      value = 0;
    } else if (value > 10) {
      value = 10;
    }
    setScore(value);
  };
  const [score, setScore] = useState<number>(0);

  const updateMatch = api.match.update.useMutation({
    onSuccess: () => {
      router.push("/tournament");
      toast({
        title: "Dein Ergebnis wurde eingetragen.",
        description: "Du hast erfolgreich deine Becher eingetragen.",
        variant: "default",
      });
    },
  });

  const handleSubmit = () => {
    if(score === 0) {
        if (match.team1Id === teamId) {
          updateMatch.mutate({
            id: match.id,
            team1Score: score,
            looserId: teamId,
          });
          return;
        }

        if (match.team2Id === teamId) {
          updateMatch.mutate({
            id: match.id,
            team2Score: score,
            looserId: teamId,
          });
          return;
        }
        return;
    }

    if (match.team1Id === teamId) {
      updateMatch.mutate({
        id: match.id,
        team1Score: score,
        winnerId: teamId,
      });
      return;
    }

    if (match.team2Id === teamId) {
      updateMatch.mutate({
        id: match.id,
        team2Score: score,
        winnerId: teamId,
      });
      return;
    }
  }

  return (
    <div className="mt-10 flex flex-col items-center">
      <Label>Trage hier deine Becher ein:</Label>
      <Input
        type="number"
        className="size-30 mt-1"
        min={0}
        max={10}
        value={score}
        onChange={handleScoreChange}
      />
      <Button className="mt-2" onClick={handleSubmit} disabled={updateMatch.isPending}>
        {updateMatch.isPending ? "Wird eingetragen..." : "Eintragen"}
      </Button>
    </div>
  );
}
