import Joi from "joi";

export const ActivitiesByDateSchema = Joi.object<ActivitiesByDateParams>({
  date: Joi.date().iso().required(),
});

type ActivitiesByDateParams = {
  date: Date;
};
