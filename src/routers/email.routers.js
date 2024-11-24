import { Router } from "express";
import { sendEmailController, testApi } from "../controllers/email.controller.js";
export const appRoutes = new Router();

appRoutes.post("/send-email",sendEmailController);
appRoutes.post("/test",testApi)
