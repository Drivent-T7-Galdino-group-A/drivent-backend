import activityRepository from "@/repositories/activity-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { cannotListActivitiesError, notFoundError, conflictError } from "@/errors";

async function checkEnrollmentAndTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote) {
    throw cannotListActivitiesError();
  }

  return ticket?.id;
}

async function getActivities(userId: number) {
  await checkEnrollmentAndTicket(userId);

  const activities = await activityRepository.findActivities();
  return activities;
}

async function createActivity(userId: number, activityId: number) {
  const ticketId: number = await checkEnrollmentAndTicket(userId);

  const userActivities = await activityRepository.findUserActivities(ticketId);

  if (userActivities.length > 0) {
    const currentActivity = await activityRepository.findActivityById(activityId);

    for (let i = 0; i < userActivities.length; i++) {
      if (
        currentActivity.date.getDate() === userActivities[i].Activity.date.getDate() &&
        currentActivity.startTime.getTime() < userActivities[i].Activity.endTime.getTime() &&
        currentActivity.endTime.getTime() > userActivities[i].Activity.startTime.getTime()
      ) {
        throw conflictError("User has conflicting activities!");
      }
    }
  }

  await activityRepository.createActivity(ticketId, activityId);
}

async function getActivitiesByDate(userId: number, date: string) {
  await checkEnrollmentAndTicket(userId);

  const activitiesOnDate = await activityRepository.findActivitiesByDate(date);

  return activitiesOnDate;
}

const activitiesService = {
  checkEnrollmentAndTicket,
  getActivities,
  createActivity,
  getActivitiesByDate,
};

export default activitiesService;
