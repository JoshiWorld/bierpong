import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TournamentSizeSchema } from "prisma/generated/zod";

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
  getTeams: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.team.findMany({
        where: { tournament: { id: input.id } },
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
});
