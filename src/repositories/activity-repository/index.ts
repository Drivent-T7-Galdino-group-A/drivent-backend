import { prisma } from "@/config";

async function findActivities() {
  return prisma.activity.findMany({
    include: {
      Localization: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
}

async function findActivityById(activityId: number) {
  return prisma.activity.findFirst({ where: { id: activityId } });
}

async function findUserActivities(ticketId: number) {
  return prisma.activityTicket.findMany({ where: { ticketId }, include: { Activity: true } });
}

async function createActivity(ticketId: number, activityId: number) {
  return prisma.activityTicket.create({ data: { ticketId, activityId } });
async function findActivitiesByDate(date: string) {
  return prisma.activity.findMany({
    where: {
      date,
    },
    include: {
      Localization: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

const activityRepository = {
  findActivities,
  findActivityById,
  findUserActivities,
  createActivity,
  findActivitiesByDate,
};

export default activityRepository;
