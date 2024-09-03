import express from "express";
import authMiddleware from "../middleware/userMiddleware.js";
import {
    createGameNightCtrl,
    deleteGameNightCtrl,
    getGameNightCtrl,
    updateGameNightCtrl,
} from "../controller/gameNight/index.js";

export const gameNightRouter = express.Router();

gameNightRouter.use(authMiddleware);
gameNightRouter.post("/create", createGameNightCtrl.createGameNight);
gameNightRouter.get("/:gameCode", getGameNightCtrl.getGameNight);
gameNightRouter.put("/:gameCode", updateGameNightCtrl.updateGameNight);
gameNightRouter.put("/:gameCode", deleteGameNightCtrl.updateGameNight);