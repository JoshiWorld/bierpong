import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TournamentSizeSchema } from "prisma/generated/zod";
import { TournamentState } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { encrypt } from "../jwt";

export const tournamentRouter = createTRPCRouter({
  // Creates a new Tournament
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        code: z.string().min(4),
        password: z.string().min(2),
        tournamentSize: TournamentSizeSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tournament.create({
        data: {
          name: input.name,
          code: input.code,
          password: input.password,
          tournamentSize: input.tournamentSize,
        },
      });
    }),

  // Get a Tournament by ID
  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.tournament.findFirst({
        where: { id: input.id },
      });
    }),

  // Get a Tournament by ID
  getFull: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.tournament.findFirst({
        where: { id: input.id },
        include: {
          teams: {
            include: {
              players: true,
              team1Matches: true,
              team2Matches: true,
              winnerMatches: true,
              looserMatches: true,
            },
          },
          matches: {
            include: {
              team1: true,
              team2: true,
              winner: true,
              looser: true,
            },
          },
          groups: {
            include: {
              teams: true,
              matches: {
                include: {
                  team1: true,
                  team2: true,
                  winner: true,
                  looser: true,
                },
              },
            },
          },
        },
      });
    }),

  // Get all Teams of a Tournament
  getTeams: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.team.findMany({
        where: { tournament: { id: input.id } },
      });
    }),

  // Get all Groups of a Tournament
  getGroups: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.group.findMany({
        where: { tournament: { id: input.id } },
        include: {
          teams: {
            include: {
              winnerMatches: true,
              looserMatches: true,
              team1Matches: true,
              team2Matches: true,
            }
          },
        },
      });
    }),

  // Get all Players of a Tournament
  getPlayers: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.team
        .findMany({
          where: { tournament: { id: input.id } },
        })
        .then((teams) => {
          return ctx.db.player.findMany({
            where: { team: { id: { in: teams.map((team) => team.id) } } },
          });
        });
    }),

  // Get a Tournament by Code
  getByCode: publicProcedure
    .input(z.object({ code: z.string().min(4) }))
    .query(({ ctx, input }) => {
      return ctx.db.tournament.findFirst({
        where: { code: input.code },
      });
    }),

  // Deletes a Tournament by ID
  delete: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.tournament.delete({
        where: { id: input.id },
      });
    }),

  // Update a Tournament by ID
  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(2),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name } = input;

      return ctx.db.tournament.update({
        where: { id },
        data: {
          name,
        },
      });
    }),

  start: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, password } = input;

      return ctx.db.tournament.update({
        where: { id, password },
        data: {
          tournamentState: TournamentState.GROUP,
        },
      });
    }),

  startFinals: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, password } = input;

      return ctx.db.tournament.update({
        where: { id, password },
        data: {
          tournamentState: TournamentState.FINALS,
        },
      });
    }),

  login: publicProcedure
    .input(
      z.object({
        code: z.string().min(4),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { code, password } = input;

      const tournament = await ctx.db.tournament.findUnique({
        where: { code, password },
      });

      if (!tournament)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Turnier existiert nicht oder passwort falsch",
        });

      const payload = {
        tournamentId: tournament.id,
        code: tournament.code,
        password: tournament.password,
      };

      const now = new Date();
      const nbf = now;
      const expires = nbf.getTime() + 24 * 60 * 60 * 1000; // ms precision
      const jwt = await encrypt({ payload, expires });

      return jwt;
    }),
});
