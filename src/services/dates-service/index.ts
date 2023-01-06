import dateRepository from "@/repositories/date-repository";
import activitiesService from "../activities-service";

async function getDates(userId: number) {
  await activitiesService.checkEnrollmentAndTicket(userId);

  const dates = await dateRepository.findDates();
  return dates;
}

const datesService = {
  getDates,
};

export default datesService;
