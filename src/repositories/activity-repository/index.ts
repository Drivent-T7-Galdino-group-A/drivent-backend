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
  findActivitiesByDate,
};

export default activityRepository;
