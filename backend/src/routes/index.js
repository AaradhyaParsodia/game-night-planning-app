import { Router } from "express";
import { userRouter } from "./user.js";
import { gameNightRouter } from "./gameNight.js";

export const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/gameNight", gameNightRouter);