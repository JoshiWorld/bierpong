"use client";

import { MatchType, TournamentSize, TournamentState } from "@prisma/client";
// components/SubscriptionComponent.tsx
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  matchtype: MatchType;
};

type TeamPayload = {
  payload: {
    teamId: string;
    teamName: string;
    tournamentId: string;
    code: string;
  };
};

export default function TournamentPage() {
  const [data, setData] = useState<TournamentData | null>(null);
  const [jwt, setJwt] = useState<TeamPayload | null>(null);

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
  if(data.tournamentState === TournamentState.GROUP) return <TournamentIngameView data={data} jwt={jwt} />;

  return <TournamentIngameFinalsView data={data} jwt={jwt} />;
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

function TournamentIngameView({ data, jwt }: { data: TournamentData, jwt: TeamPayload | null }) {
  return (
    <div className="container justify-center">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.groups.map((group, index) => (
          <Table key={group.id} className="border-2">
            <TableCaption>Gruppe {index+1}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Team</TableHead>
                <TableHead>S:N</TableHead>
                <TableHead>Becher</TableHead>
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.teams.map((team) => {
                const firstScore =
                // @ts-expect-error || @ts-ignore
                  (data.teams.find((t) => t.id === team.id)?.team1Matches ? data.teams.find((t) => t.id === team.id).team1Matches.reduce((sum, match) => sum + match.team1Score, 0): 0) +
                  // @ts-expect-error || @ts-ignore
                  (data.teams.find((t) => t.id === team.id)?.team2Matches ? data.teams.find((t) => t.id === team.id).team2Matches.reduce((sum, match) => sum + match.team2Score, 0): 0);
                const secondScore =
                // @ts-expect-error || @ts-ignore
                  (data.teams.find((t) => t.id === team.id)?.team1Matches ? data.teams.find((t) => t.id === team.id).team1Matches.reduce((sum, match) => sum + match.team2Score, 0): 0) +
                  // @ts-expect-error || @ts-ignore
                  (data.teams.find((t) => t.id === team.id)?.team2Matches ? data.teams.find((t) => t.id === team.id).team2Matches.reduce((sum, match) => sum + match.team1Score, 0): 0);
                return (
                  <TableRow
                    key={team.id}
                    className={
                      jwt!.payload.teamName === team.name ? "bg-primary/30" : ""
                    }
                  >
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>
                      {
                        data.teams.find((t) => t.id === team.id)
                          ?.winnerMatches.length
                      }
                      :
                      {
                        data.teams.find((t) => t.id === team.id)
                          ?.looserMatches.length
                      }
                    </TableCell>
                    <TableCell>
                      {firstScore}:{secondScore}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ))}
      </div>

      <MatchesView data={data} jwt={jwt} />
    </div>
  );
}

function MatchesView({
  data,
  jwt,
}: {
  data: TournamentData;
  jwt: TeamPayload | null;
}) {
  return (
    <div>
      {data.groups.map((group, index) => (
        <section key={group.id} className="mt-10 border-t-4 pt-10">
          <h1 className="font-bold">Gruppe {index + 1}</h1>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {group.matches.map((match, index) => (
              <Table key={match.id} className="border-2">
                <TableCaption>Match {index + 1}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Team</TableHead>
                    <TableHead>S:N</TableHead>
                    <TableHead>Becher</TableHead>
                    {/* <TableHead className="text-right">Amount</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={
                        jwt!.payload.teamName === match.team1.name
                          ? "bg-primary/30 font-medium"
                          : "font-medium"
                      }
                    >
                      {match.team1.name}
                    </TableCell>
                    <TableCell>
                      {
                        data.teams.find((team) => team.id === match.team1.id)
                          ?.winnerMatches.length
                      }
                      :
                      {
                        data.teams.find((team) => team.id === match.team1.id)
                          ?.looserMatches.length
                      }
                    </TableCell>
                    <TableCell>{match.team1Score}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={
                        jwt!.payload.teamName === match.team2.name
                          ? "bg-primary/30 font-medium"
                          : "font-medium"
                      }
                    >
                      {match.team2.name}
                    </TableCell>
                    <TableCell>
                      {
                        data.teams.find((team) => team.id === match.team2.id)
                          ?.winnerMatches.length
                      }
                      :
                      {
                        data.teams.find((team) => team.id === match.team2.id)
                          ?.looserMatches.length
                      }
                    </TableCell>
                    <TableCell>{match.team2Score}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function TournamentIngameFinalsView({
  data,
  jwt,
}: {
  data: TournamentData;
  jwt: TeamPayload | null;
}) {
  return (
    <div className="container justify-center">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.groups.map((group, index) => (
          <Table key={group.id} className="border-2">
            <TableCaption>Gruppe {index + 1}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Team</TableHead>
                <TableHead>S:N</TableHead>
                <TableHead>Becher</TableHead>
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.teams.map((team) => {
                const firstScore =
                  (data.teams.find((t) => t.id === team.id)?.team1Matches
                    ? // @ts-expect-error || @ts-ignore
                      data.teams
                        .find((t) => t.id === team.id)
                        .team1Matches.reduce(
                          (sum, match) => sum + match.team1Score,
                          0,
                        )
                    : 0) +
                  (data.teams.find((t) => t.id === team.id)?.team2Matches
                    ? // @ts-expect-error || @ts-ignore
                      data.teams
                        .find((t) => t.id === team.id)
                        .team2Matches.reduce(
                          (sum, match) => sum + match.team2Score,
                          0,
                        )
                    : 0);
                const secondScore =
                  (data.teams.find((t) => t.id === team.id)?.team1Matches
                    ? // @ts-expect-error || @ts-ignore
                      data.teams
                        .find((t) => t.id === team.id)
                        .team1Matches.reduce(
                          (sum, match) => sum + match.team2Score,
                          0,
                        )
                    : 0) +
                  (data.teams.find((t) => t.id === team.id)?.team2Matches
                    ? // @ts-expect-error || @ts-ignore
                      data.teams
                        .find((t) => t.id === team.id)
                        .team2Matches.reduce(
                          (sum, match) => sum + match.team1Score,
                          0,
                        )
                    : 0);
                return (
                  <TableRow
                    key={team.id}
                    className={
                      jwt!.payload.teamName === team.name ? "bg-primary/30" : ""
                    }
                  >
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>
                      {
                        data.teams.find((t) => t.id === team.id)?.winnerMatches
                          .length
                      }
                      :
                      {
                        data.teams.find((t) => t.id === team.id)?.looserMatches
                          .length
                      }
                    </TableCell>
                    <TableCell>
                      {firstScore}:{secondScore}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ))}
      </div>

      <MatchesFinalsView data={data} jwt={jwt} />
    </div>
  );
}

function MatchesFinalsView({
  data,
  jwt,
}: {
  data: TournamentData;
  jwt: TeamPayload | null;
}) {
  type SectionType = {
    type: MatchType;
    title: string;
  };
  const sections: SectionType[] = [];

  if(sections.length === 0) {
    switch (data.tournamentSize) {
      case TournamentSize.BIG:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        sections.push({ type: MatchType.EIGHT, title: "Achtelfinale" });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        sections.push({ type: MatchType.FOURTH, title: "Viertelfinale" });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        sections.push({ type: MatchType.HALF, title: "Halbfinale" });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        sections.push({ type: MatchType.FINAL, title: "Finale" });
        break;
      case TournamentSize.LARGE:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        sections.push({ type: MatchType.FOURTH, title: "Viertelfinale" });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        sections.push({ type: MatchType.HALF, title: "Halbfinale" });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        sections.push({ type: MatchType.FINAL, title: "Finale" });
        break;
      case TournamentSize.MEDIUM:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        sections.push({ type: MatchType.HALF, title: "Halbfinale" });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        sections.push({ type: MatchType.FINAL, title: "Finale" });
        break;
      default:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        sections.push({ type: MatchType.FINAL, title: "Finale" });
        break;
    }
  }


  return (
    <div>
      {sections.map((section, index) => (
        <section key={index} className="mt-10 border-t-4 pt-10">
          <h1 className="font-bold">{section.title}</h1>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {data.matches.map((match, index) => (
              <Table key={match.id} className="border-2">
                <TableCaption>Match {index + 1}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Team</TableHead>
                    <TableHead>S:N</TableHead>
                    <TableHead>Becher</TableHead>
                    {/* <TableHead className="text-right">Amount</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={
                        jwt!.payload.teamName === match.team1.name
                          ? "bg-primary/30 font-medium"
                          : "font-medium"
                      }
                    >
                      {match.team1.name}
                    </TableCell>
                    <TableCell>
                      {
                        data.teams.find((team) => team.id === match.team1.id)
                          ?.winnerMatches.length
                      }
                      :
                      {
                        data.teams.find((team) => team.id === match.team1.id)
                          ?.looserMatches.length
                      }
                    </TableCell>
                    <TableCell>{match.team1Score}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={
                        jwt!.payload.teamName === match.team2.name
                          ? "bg-primary/30 font-medium"
                          : "font-medium"
                      }
                    >
                      {match.team2.name}
                    </TableCell>
                    <TableCell>
                      {
                        data.teams.find((team) => team.id === match.team2.id)
                          ?.winnerMatches.length
                      }
                      :
                      {
                        data.teams.find((team) => team.id === match.team2.id)
                          ?.looserMatches.length
                      }
                    </TableCell>
                    <TableCell>{match.team2Score}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}