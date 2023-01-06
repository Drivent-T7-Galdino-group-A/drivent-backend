import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getLocalizations } from "@/controllers";

const localizationsRouter = Router();

localizationsRouter
  .all("/*", authenticateToken)
  .get("/", getLocalizations);

export { localizationsRouter };
