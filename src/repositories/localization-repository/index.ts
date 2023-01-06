import { prisma } from "@/config";

async function findLocalizations() {
  return prisma.localization.findMany({});
}

const localizationRepository = {
  findLocalizations,
};

export default localizationRepository;
