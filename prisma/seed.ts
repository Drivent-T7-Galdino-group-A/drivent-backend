import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { DrivenResortRooms, DrivenPalaceRooms, DrivenWorldRooms } from "./seedHelper";
import { day22JanuaryActivity, day23JanuaryActivity, day24JanuaryActivity } from "./seedHelper";
const prisma = new PrismaClient();

async function main() {
  await cleanDb();
  await seedEvent();
  await seedTicketTypes();
  await seedHotels();
  await seedRooms();
  await seedLocalizations();
  await seedActivities();
}

async function cleanDb() {
  await prisma.event.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});
  await prisma.activityTicket.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.ticketType.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.activity.deleteMany({});
  await prisma.localization.deleteMany({});
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

async function seedLocalizations() {
  await prisma.localization.createMany({
    data: [
      {
        id: 1,
        name: "Auditório Principal",
      },
      {
        id: 2,
        name: "Auditório Lateral",
      },
      {
        id: 3,
        name: "Sala de Workshop",
      },
    ],
  });
}

async function seedActivities() {
  await prisma.activity.createMany({
    data: day22JanuaryActivity,
  });
  await prisma.activity.createMany({
    data: day23JanuaryActivity,
  });
  await prisma.activity.createMany({
    data: day24JanuaryActivity,
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
