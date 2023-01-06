import { Router } from "express";
import { authenticateToken, validateParams } from "@/middlewares";
import { getActivities, postCreateActivity, getActivitiesByDate } from "@/controllers";
import { ActivitiesByDateSchema } from "@/schemas";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getActivities)
  .get("/date/:date", validateParams(ActivitiesByDateSchema), getActivitiesByDate)
  .post("/", postCreateActivity);

export { activitiesRouter };
