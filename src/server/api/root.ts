import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { teamRouter } from "./routers/team";
import { tournamentRouter } from "./routers/tournament";
import { playerRouter } from "./routers/player";
import { groupRouter } from "./routers/group";
import { matchRouter } from "./routers/match";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // post: postRouter,
  team: teamRouter,
  tournament: tournamentRouter,
  player: playerRouter,
  group: groupRouter,
  match: matchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
