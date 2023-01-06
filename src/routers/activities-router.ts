import { Router } from "express";

import { ActivitiesByDateSchema } from "@/schemas";
import { authenticateToken, validateParams } from "@/middlewares";
import { getActivities, getActivitiesByDate } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getActivities)
  .get("/date/:date", validateParams(ActivitiesByDateSchema), getActivitiesByDate);

export { activitiesRouter };
