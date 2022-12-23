import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createActivity(localizationId: number) {
  return await prisma.activity.create({
    data: {
      name: faker.name.findName(),
      capacity: 3,
      localizationId,
      date: faker.date.future(),
      startTime: new Date(),
      endTime: new Date(),
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
