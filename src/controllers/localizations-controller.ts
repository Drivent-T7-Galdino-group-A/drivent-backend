import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import localizationsService from "@/services/localizations-service";
import httpStatus from "http-status";

export async function getLocalizations(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const localizations = await localizationsService.getLocalizations(userId);
    return res.status(httpStatus.OK).send(localizations);
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
