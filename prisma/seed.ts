import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { DrivenResortRooms, DrivenPalaceRooms, DrivenWorldRooms } from "./seedHelper";
const prisma = new PrismaClient();

async function main() {
  await cleanDb();
  await seedEvent();
  await seedTicketTypes();
  await seedHotels();
  await seedRooms();
}

async function cleanDb() {
  await prisma.event.deleteMany({});
  await prisma.ticketType.deleteMany({});
  await prisma.hotel.deleteMany({});
  await prisma.room.deleteMany({});
}

async function seedEvent() {
  await prisma.event.create({
    data: {
      title: "Driven.t",
      logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
      backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(21, "days").toDate(),
    },
  });
}

async function seedTicketTypes() {
  await prisma.ticketType.createMany({
    data: [
      {
        name: "Presencial",
        price: 60000,
        isRemote: false,
        includesHotel: true,
        updatedAt: dayjs().add(1, "second").toDate(),
      },
      {
        name: "Presencial",
        price: 25000,
        isRemote: false,
        includesHotel: false,
        updatedAt: dayjs().add(1, "second").toDate(),
      },
      {
        name: "Online",
        price: 10000,
        isRemote: true,
        includesHotel: false,
        updatedAt: dayjs().add(1, "second").toDate(),
      },
    ],
  });
}

async function seedHotels() {
  await prisma.hotel.createMany({
    data: [
      {
        id: 1,
        name: "Driven Resort",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
      },
      {
        id: 2,
        name: "Driven Palace",
        image: "https://www.ahstatic.com/photos/5451_ho_00_p_1024x768.jpg",
      },
      {
        id: 3,
        name: "Driven World",
        image:
          "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_627,q_auto,w_1200/itemimages/96/95/96959_v6.jpeg",
      },
    ],
  });
}

async function seedRooms() {
  await prisma.room.createMany({
    data: DrivenResortRooms,
  });
  await prisma.room.createMany({
    data: DrivenPalaceRooms,
  });
  await prisma.room.createMany({
    data: DrivenWorldRooms,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
