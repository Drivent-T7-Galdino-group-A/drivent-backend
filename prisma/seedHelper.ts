import { Room } from "@prisma/client";

type CreateRoom = Omit<Room, "id" | "createdAt" | "updatedAt">;
type CreateManyRooms = CreateRoom[];

const DrivenResortRooms: CreateManyRooms = [
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
];

const DrivenPalaceRooms: CreateManyRooms = [
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
];

const DrivenWorldRooms: CreateManyRooms = [
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
];

export {
  DrivenResortRooms,
  DrivenPalaceRooms,
  DrivenWorldRooms
};
