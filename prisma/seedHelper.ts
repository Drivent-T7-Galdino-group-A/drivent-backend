import { Room, Activity } from "@prisma/client";

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

type CreateActivity = Omit<Activity, "id" | "createdAt" | "updatedAt">;
type CreateManyActivitys = CreateActivity[];

const day22JanuaryActivity: CreateManyActivitys = [
  {
    name: "Minecraft: montando o PC ideal",
    capacity: 50,
    localizationId: 1,
    date: new Date("2023-01-22T09:00:00Z"),
    startTime: new Date("2023-01-22T09:00:00Z"),
    endTime: new Date("2023-01-22T10:00:00Z"),
  },
  {
    name: "LoL: montando o PC ideal",
    capacity: 50,
    localizationId: 1,
    date: new Date("2023-01-22T10:00:00Z"),
    startTime: new Date("2023-01-22T10:00:00Z"),
    endTime: new Date("2023-01-22T11:00:00Z"),
  },
  {
    name: "Palestra: A revolução do Big Data para a saúde",
    capacity: 40,
    localizationId: 2,
    date: new Date("2023-01-22T09:00:00Z"),
    startTime: new Date("2023-01-22T09:00:00Z"),
    endTime: new Date("2023-01-22T11:00:00Z"),
  },
  {
    name: "Palestra: Como o Pivot pode mudar sua navegação na web",
    capacity: 30,
    localizationId: 3,
    date: new Date("2023-01-22T09:00:00Z"),
    startTime: new Date("2023-01-22T09:00:00Z"),
    endTime: new Date("2023-01-22T10:00:00Z"),
  },
  {
    name: "Palestra: Suas curtidas te definem",
    capacity: 30,
    localizationId: 3,
    date: new Date("2023-01-22T10:00:00Z"),
    startTime: new Date("2023-01-22T10:00:00Z"),
    endTime: new Date("2023-01-22T11:00:00Z"),
  },
];

const day23JanuaryActivity: CreateManyActivitys = [
  {
    name: "CSS: montando o PC ideal",
    capacity: 50,
    localizationId: 1,
    date: new Date("2023-01-23T09:00:00Z"),
    startTime: new Date("2023-01-23T09:00:00Z"),
    endTime: new Date("2023-01-23T10:00:00Z"),
  },
  {
    name: "The Wizard: montando o PC ideal",
    capacity: 50,
    localizationId: 1,
    date: new Date("2023-01-23T10:00:00Z"),
    startTime: new Date("2023-01-23T10:00:00Z"),
    endTime: new Date("2023-01-23T11:00:00Z"),
  },
  {
    name: "Palestra: Manuseie pixels dentro de um computador",
    capacity: 40,
    localizationId: 2,
    date: new Date("2023-01-23T09:00:00Z"),
    startTime: new Date("2023-01-23T09:00:00Z"),
    endTime: new Date("2023-01-23T10:00:00Z"),
  },
  {
    name: "Palestra: Um novo mercado de trabalho",
    capacity: 30,
    localizationId: 3,
    date: new Date("2023-01-23T09:00:00Z"),
    startTime: new Date("2023-01-23T09:00:00Z"),
    endTime: new Date("2023-01-23T11:00:00Z"),
  },
];

const day24JanuaryActivity: CreateManyActivitys = [
  {
    name: "Control Game: montando o PC ideal",
    capacity: 50,
    localizationId: 1,
    date: new Date("2023-01-24T09:00:00Z"),
    startTime: new Date("2023-01-24T09:00:00Z"),
    endTime: new Date("2023-01-24T10:00:00Z"),
  },
  {
    name: "Red Dead Redemption: montando o PC ideal",
    capacity: 50,
    localizationId: 1,
    date: new Date("2023-01-24T10:00:00Z"),
    startTime: new Date("2023-01-24T10:00:00Z"),
    endTime: new Date("2023-01-24T11:00:00Z"),
  },
  {
    name: "Palestra: O ano em que os dados foram abertos ao mundo",
    capacity: 40,
    localizationId: 2,
    date: new Date("2023-01-24T09:00:00Z"),
    startTime: new Date("2023-01-24T09:00:00Z"),
    endTime: new Date("2023-01-24T10:00:00Z"),
  },
  {
    name: "Palestra: Tecnologia em prol da humanidade",
    capacity: 40,
    localizationId: 2,
    date: new Date("2023-01-24T10:00:00Z"),
    startTime: new Date("2023-01-24T10:00:00Z"),
    endTime: new Date("2023-01-24T11:00:00Z"),
  },
  {
    name: "Palestra: O que há de errado com sua senha?",
    capacity: 30,
    localizationId: 3,
    date: new Date("2023-01-24T09:00:00Z"),
    startTime: new Date("2023-01-24T09:00:00Z"),
    endTime: new Date("2023-01-24T11:00:00Z"),
  },
];

export {
  DrivenResortRooms,
  DrivenPalaceRooms,
  DrivenWorldRooms,
  day22JanuaryActivity,
  day23JanuaryActivity,
  day24JanuaryActivity,
};
