import { TournamentState } from "@prisma/client";
import { getAdminSession } from "@/server/api/jwt";
import { api } from "@/trpc/server";
import { EndTournament, StartFinals, StartTournament } from "./admin-buttons";
import React from "react";

type ClickButton = {
  phase: TournamentState;
  component: JSX.Element;
};

const buttons: ClickButton[] = [
  {
    phase: TournamentState.LOBBY,
    component: <StartTournament />,
  },
  {
    phase: TournamentState.GROUP,
    component: <StartFinals />,
  },
  {
    phase: TournamentState.FINALS,
    component: <EndTournament />,
  },
];

export default async function AdminView() {
    const session = await getAdminSession();
    const tournament = await api.tournament.getFull({id: session!.payload.tournamentId});
    const activeButton = buttons.find(
      (b) => b.phase === tournament!.tournamentState,
    )?.component;

    return (
      <div>
        {/* <pre>{JSON.stringify(tournament, null, 2)}</pre> */}
        {activeButton}
      </div>
    );
}