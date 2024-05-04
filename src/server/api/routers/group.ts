import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TeamSchema } from "prisma/generated/zod";

export const groupRouter = createTRPCRouter({
  // Creates a new Group
  create: publicProcedure
    .input(
      z.object({
        tournamentId: z.string().min(2),
        teams: z.array(TeamSchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.group.create({
        data: {
          tournament: { connect: { id: input.tournamentId } },
          teams: { connect: input.teams.map((team) => ({ id: team.id })) },
        },
      });
    }),

  // Get a Group by ID
  get: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.group.findFirst({
        where: { id: input.id },
      });
    }),

  // Deletes a Group by ID
  delete: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.group.delete({
        where: { id: input.id },
      });
    }),
});
