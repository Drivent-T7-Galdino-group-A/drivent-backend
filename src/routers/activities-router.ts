import { Router } from "express";
import { authenticateToken, validateParams } from "@/middlewares";
import { getActivities, postCreateActivity, getActivitiesByDate, getActivityTickets } from "@/controllers";
import { ActivitiesByDateSchema } from "@/schemas";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getActivities)
  .get("/date/:date", validateParams(ActivitiesByDateSchema), getActivitiesByDate)
  .get("/tickets/:activityId", getActivityTickets)
  .post("/", postCreateActivity);

export { activitiesRouter };
