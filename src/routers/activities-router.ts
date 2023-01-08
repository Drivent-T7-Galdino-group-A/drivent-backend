import { Router } from "express";
import { authenticateToken, validateParams } from "@/middlewares";
import { getActivities, postCreateActivity, getActivitiesByDate, getNumberOfEnrollmentsByActivity } from "@/controllers";
import { ActivitiesByDateSchema } from "@/schemas";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getActivities)
  .get("/date/:date", validateParams(ActivitiesByDateSchema), getActivitiesByDate)
  .get("/activity-tickets/:activityId", getNumberOfEnrollmentsByActivity)
  .post("/", postCreateActivity);

export { activitiesRouter };
