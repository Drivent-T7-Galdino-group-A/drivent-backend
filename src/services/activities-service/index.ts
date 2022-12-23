import activityRepository from "@/repositories/activity-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { cannotListActivitiesError, notFoundError } from "@/errors";

async function checkEnrollmentAndTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote) {
    throw cannotListActivitiesError();
  }
}

async function getActivities(userId: number) {
  await checkEnrollmentAndTicket(userId);

  const activities = await activityRepository.findActivities();
  return activities;
}

const activitiesService = {
  getActivities,
};

export default activitiesService;