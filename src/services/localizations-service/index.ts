import localizationRepository from "@/repositories/localization-repository";
import activitiesService from "../activities-service";

async function getLocalizations(userId: number) {
  await activitiesService.checkEnrollmentAndTicket(userId);

  const localizations = await localizationRepository.findLocalizations();
  return localizations;
}

const localizationsService = {
  getLocalizations,
};

export default localizationsService;
