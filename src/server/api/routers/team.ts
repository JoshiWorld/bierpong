import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { v4 as uuidv4 } from "uuid";

export const teamRouter = createTRPCRouter({
  // Creates a new Team
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        tournamentId: z.string().min(4),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const code = uuidv4();

      return ctx.db.team.create({
        data: {
          name: input.name,
          code: code,
          tournament: { connect: { id: input.tournamentId } },
        },
      });
    }),

    // Get a Team by Name
  getByName: publicProcedure
    .input(z.object({ name: z.string().min(2) }))
    .query(({ ctx, input }) => {
      return ctx.db.team.findFirst({
        where: { name: input.name },
      });
    }),

    // Get a Team by Name
  getByCode: publicProcedure
    .input(z.object({ code: z.string().min(2) }))
    .query(({ ctx, input }) => {
      return ctx.db.team.findFirst({
        where: { code: input.code },
      });
    }),

  // Get a Team by ID
  get: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.team.findFirst({
        where: { id: input.id },
      });
    }),

   // Deletes a Team by ID
    delete: publicProcedure
      .input(z.object({ id: z.string().min(1) }))
      .query(({ ctx, input }) => {
        return ctx.db.team.delete({
          where: { id: input.id },
        });
      }),

  // Update a Team by ID
  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(2),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name } = input;

      return ctx.db.team.update({
        where: { id },
        data: {
          name,
        },
      });
    }),
});
