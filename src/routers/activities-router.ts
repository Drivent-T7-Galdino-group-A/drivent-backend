import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities, postCreateActivity } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getActivities)
  .post("/", postCreateActivity);

export { activitiesRouter };
