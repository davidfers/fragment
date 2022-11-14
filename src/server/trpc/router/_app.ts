import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { shelfRouter } from './shelf';


export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  shelf: shelfRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
