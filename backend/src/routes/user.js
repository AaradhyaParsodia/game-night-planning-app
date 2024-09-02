import express from "express";
import * as controller from "../controller/user/user.js";

export const userRouter = express.Router();

userRouter.get('/signup', controller.signup);