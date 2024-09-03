import express from "express";
import authMiddleware from "../middleware/userMiddleware.js"
import { createGameNight } from "../controller/gameNight/createGameNight.js";

export const gameNightRouter = express.Router();

gameNightRouter.post("/create", authMiddleware, createGameNight);