import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import datesService from "@/services/dates-service";
import httpStatus from "http-status";

export async function getDates(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const dates = await datesService.getDates(userId);
    return res.status(httpStatus.OK).send(dates);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "cannotListActivitiesError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
