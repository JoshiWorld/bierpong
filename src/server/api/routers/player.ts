import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const playerRouter = createTRPCRouter({
  // Creates a new Player
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        teamId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.player.create({
        data: {
          name: input.name,
          team: { connect: { id: input.teamId } },
        },
      });
    }),

  // Get a Player by ID
  get: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.player.findFirst({
        where: { id: input.id },
      });
    }),

  // Deletes a Player by ID
  delete: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.player.delete({
        where: { id: input.id },
      });
    }),

  // Update a Player by ID
  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(2),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name } = input;

      return ctx.db.player.update({
        where: { id },
        data: {
          name,
        },
      });
    }),
});
