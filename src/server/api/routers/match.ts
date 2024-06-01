import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const matchRouter = createTRPCRouter({
  // Creates a new Match
  create: publicProcedure
    .input(
      z.object({
        tournamentId: z.string().min(1),
        team1Id: z.string().min(1).optional(),
        team2Id: z.string().min(1).optional(),
        groupId: z.string().optional(),
        matchtype: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const data = {
        tournament: { connect: { id: input.tournamentId } },
      };

      if (input.team1Id) {
        // @ts-expect-error || @ts-ignore
        data.team1 = { connect: { id: input.team1Id } };
      }

      if (input.team2Id) {
        // @ts-expect-error || @ts-ignore
        data.team2 = { connect: { id: input.team2Id } };
      }

      if (input.groupId) {
        // @ts-expect-error || @ts-ignore
        data.group = { connect: { id: input.groupId } };
      }

      if(input.matchtype) {
        // @ts-expect-error || @ts-ignore
        data.matchtype = input.matchtype;
      }

      return ctx.db.match.create({ data });
    }),

  // Get a Match by ID
  get: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.match.findFirst({
        where: { id: input.id },
      });
    }),

  // Gets matches without group id
  getWithoutGroup: publicProcedure.query(({ ctx }) => {
    return ctx.db.match.findMany({
      where: { groupId: null },
    });
  }),

  // Get all Matches by Tournamen ID
  getAllByTournament: publicProcedure
    .input(z.object({ tournamentId: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.match.findMany({
        where: { tournamentId: input.tournamentId },
      });
    }),

  // Get all Matches by Groupo ID
  getAllByGroup: publicProcedure
    .input(z.object({ groupId: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.match.findMany({
        where: { groupId: input.groupId },
      });
    }),

  // Deletes a Match by ID
  delete: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.match.delete({
        where: { id: input.id },
      });
    }),

  // Update a Match by ID
  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        winnerId: z.string().optional(),
        looserId: z.string().optional(),
        team1Score: z.number().optional(),
        team2Score: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {
        team1Score: input.team1Score,
        team2Score: input.team2Score,
      };

      if (input.winnerId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        data.winner = { connect: { id: input.winnerId } };
      }

      if (input.looserId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        data.looser = { connect: { id: input.looserId } };
      }

      return ctx.db.match.update({
        where: { id: input.id },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data,
      });
    }),
});
