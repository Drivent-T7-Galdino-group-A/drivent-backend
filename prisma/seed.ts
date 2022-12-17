import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let ticketTypes = await prisma.ticketType.findFirst();
  if (!ticketTypes) {
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

  await prisma.hotel.createMany({
    data: [
      {
        name: "Driven Resort",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
      },
      {
        name: "Driven Palace",
        image: "https://www.ahstatic.com/photos/5451_ho_00_p_1024x768.jpg",
      },
      {
        name: "Driven World",
        image:
          "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_627,q_auto,w_1200/itemimages/96/95/96959_v6.jpeg",
      },
    ],
  });

  //Driven Resort Rooms
  await prisma.room.createMany({
    data: [
      {
        name: "101",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "102",
        capacity: 1,
        hotelId: 1,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "104",
        capacity: 3,
        hotelId: 1,
      },
      {
        name: "201",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "202",
        capacity: 1,
        hotelId: 1,
      },
      {
        name: "203",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "204",
        capacity: 3,
        hotelId: 1,
      },
      {
        name: "301",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "302",
        capacity: 1,
        hotelId: 1,
      },
      {
        name: "303",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "304",
        capacity: 3,
        hotelId: 1,
      },
      {
        name: "401",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "402",
        capacity: 1,
        hotelId: 1,
      },
      {
        name: "403",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "404",
        capacity: 3,
        hotelId: 1,
      },
    ],
  });

  //Driven Palace Rooms
  await prisma.room.createMany({
    data: [
      {
        name: "101",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "102",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "104",
        capacity: 3,
        hotelId: 2,
      },
      {
        name: "201",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "202",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "203",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "204",
        capacity: 3,
        hotelId: 2,
      },
      {
        name: "301",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "302",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "303",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "304",
        capacity: 3,
        hotelId: 2,
      },
      {
        name: "401",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "402",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "403",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "404",
        capacity: 3,
        hotelId: 2,
      },
    ],
  });

  //Driven World Rooms
  await prisma.room.createMany({
    data: [
      {
        name: "101",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "102",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "104",
        capacity: 1,
        hotelId: 3,
      },
      {
        name: "201",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "202",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "203",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "204",
        capacity: 1,
        hotelId: 3,
      },
      {
        name: "301",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "302",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "303",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "304",
        capacity: 1,
        hotelId: 3,
      },
      {
        name: "401",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "402",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "403",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "404",
        capacity: 1,
        hotelId: 3,
      },
    ],
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
