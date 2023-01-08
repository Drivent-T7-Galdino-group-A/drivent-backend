import { Router } from "express";
import { authenticateToken, validateParams } from "@/middlewares";
import { getActivities, postCreateActivity, getActivitiesByDate, getNumberOfEnrollmentsByActivity, getActivityTickets } from "@/controllers";
import { ActivitiesByDateSchema } from "@/schemas";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getActivities)
  .get("/date/:date", validateParams(ActivitiesByDateSchema), getActivitiesByDate)
  .get("/activity-tickets/:activityId", getNumberOfEnrollmentsByActivity)
  .get("/tickets/:activityId", getActivityTickets)
  .post("/", postCreateActivity);

export { activitiesRouter };
