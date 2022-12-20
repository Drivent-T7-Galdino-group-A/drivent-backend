import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

async function findAllHotelsWithRooms() {
  return prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      Rooms: {
        select: {
          id: true,
          name: true,
          capacity: true,
          hotelId: true,
          _count: {
            select: { Booking: true },
          },
        },
        orderBy: {
          id: "asc",
        },
      },
    },
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  findAllHotelsWithRooms,
};

export default hotelRepository;
