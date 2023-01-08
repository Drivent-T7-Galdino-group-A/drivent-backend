import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createActivity(localizationId: number) {
  return await prisma.activity.create({
    data: {
      name: faker.name.findName(),
      capacity: 2,
      localizationId,
      date: faker.date.future(),
      startTime: "1970-01-01T10:00:00.174Z",
      endTime: "1970-01-01T11:00:00.174Z",
    },
  });
}

export async function createLocalization() {
  return await prisma.localization.create({
    data: {
      name: faker.name.findName(),
    },
  });
}

export async function createActivityTicket(ticketId: number, activityId: number) {
  return await prisma.activityTicket.create({
    data: {
      ticketId,
      activityId,
    },
  });
}
