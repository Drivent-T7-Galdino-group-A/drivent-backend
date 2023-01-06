import { prisma } from "@/config";

async function findDates() {
  return prisma.activity.findMany({
    distinct: ["date"],
    select: {
      date: true,
    },
  });
}

const dateRepository = {
  findDates,
};

export default dateRepository;
