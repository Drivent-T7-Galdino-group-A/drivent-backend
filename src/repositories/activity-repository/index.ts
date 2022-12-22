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

const activityRepository = {
  findActivities,
};

export default activityRepository;
