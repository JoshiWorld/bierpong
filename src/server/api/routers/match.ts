import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const matchRouter = createTRPCRouter({
  // Creates a new Match
  create: publicProcedure
    .input(
      z.object({
        tournamentId: z.string().min(1),
        team1Id: z.string().min(1),
        team2Id: z.string().min(1),
        groupId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.match.create({
        data: {
          tournament: { connect: { id: input.tournamentId } },
          team1: { connect: { id: input.team1Id } },
          team2: { connect: { id: input.team2Id } },
          group: { connect: { id: input.groupId } }
        },
      });
    }),

  // Get a Match by ID
  get: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.match.findFirst({
        where: { id: input.id },
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
      return ctx.db.match.update({
        where: { id: input.id },
        data: {
          winner: { connect: { id: input.winnerId } },
          looser: { connect: { id: input.looserId } },
          team1Score: input.team1Score,
          team2Score: input.team2Score,
        },
      });
    }),
});
