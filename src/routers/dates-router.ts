import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getDates } from "@/controllers";

const datesRouter = Router();

datesRouter
  .all("/*", authenticateToken)
  .get("/", getDates);

export { datesRouter };
