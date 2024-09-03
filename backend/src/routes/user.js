import express from "express";
import { signinController, signupController } from "../controller/user/index.js";

export const userRouter = express.Router();

userRouter.get('/signup', signupController.signup);
userRouter.get('/signin', signinController.signin);