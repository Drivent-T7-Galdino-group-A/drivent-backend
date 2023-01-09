import app, { init } from "@/app";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import {
  createEnrollmentWithAddress,
  createUser,
  createTicket,
  createPayment,
  createTicketTypeWithHotel,
  createTicketTypeRemote,
  createHotel,
  createLocalization,
  createActivity,
  createActivityTicket,
} from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /activities", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 402 when user ticket is remote", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      await createPayment(ticket.id, ticketType.price);

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
    });

    it("should respond with status 404 when user has no enrollment ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const ticketType = await createTicketTypeRemote();

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 402 when user has no payment yet ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      await createHotel();

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
    });

    it("should respond with status 200 and a list of activities with localizations", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const createdHotel = await createHotel();
      const createdLocalization = await createLocalization();
      const createdActivity = await createActivity(createdLocalization.id);

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);

      expect(response.body).toEqual([
        {
          id: createdActivity.id,
          name: createdActivity.name,
          capacity: createdActivity.capacity,
          localizationId: createdActivity.localizationId,
          date: createdActivity.date.toISOString(),
          startTime: createdActivity.startTime.toISOString(),
          endTime: createdActivity.endTime.toISOString(),
          createdAt: createdActivity.createdAt.toISOString(),
          updatedAt: createdActivity.updatedAt.toISOString(),
          Localization: {
            id: createdLocalization.id,
            name: createdLocalization.name,
          },
        },
      ]);
    });

    it("should respond with status 200 and an empty array", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([]);
    });
  });
});

describe("GET /activities/date/:date", () => {
  it("should respond with status 401 if no token is given", async () => {
    const date = faker.date.future().toISOString();

    const response = await server.get(`/activities/date/${date}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const date = faker.date.future().toISOString();

    const response = await server.get(`/activities/date/${date}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const date = faker.date.future().toISOString();
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get(`/activities/date/${date}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when date param is not valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const date = faker.lorem.word();

      const response = await server.get(`/activities/date/${date}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 402 when user ticket is remote", async () => {
      const date = faker.date.future().toISOString();

      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      await createPayment(ticket.id, ticketType.price);

      const response = await server.get(`/activities/date/${date}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
    });

    it("should respond with status 404 when user has no enrollment ", async () => {
      const date = faker.date.future().toISOString();

      const user = await createUser();
      const token = await generateValidToken(user);

      const ticketType = await createTicketTypeRemote();

      const response = await server.get(`/activities/date/${date}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 402 when user has no payment yet ", async () => {
      const date = faker.date.future().toISOString();

      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      await createHotel();

      const response = await server.get(`/activities/date/${date}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
    });

    it("should respond with status 200 and an empty array when there is no activity", async () => {
      const date = faker.date.future().toISOString();

      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const response = await server.get(`/activities/date/${date}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it("should respond with status 200 and an empty array when there is no activity for date param", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const createdHotel = await createHotel();
      const createdLocalization = await createLocalization();
      const createdActivity = await createActivity(createdLocalization.id);

      const inexistentDate = faker.date.future(1, createdActivity.date).toISOString();

      const response = await server.get(`/activities/date/${inexistentDate}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it("should respond with status 200 and a list of activities with localizations when there are activities for date param", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const createdHotel = await createHotel();
      const createdLocalization = await createLocalization();
      const createdActivity = await createActivity(createdLocalization.id);

      const existentDate = createdActivity.date.toISOString();

      const response = await server.get(`/activities/date/${existentDate}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);

      expect(response.body).toEqual([
        {
          id: createdActivity.id,
          name: createdActivity.name,
          capacity: createdActivity.capacity,
          localizationId: createdActivity.localizationId,
          date: createdActivity.date.toISOString(),
          startTime: createdActivity.startTime.toISOString(),
          endTime: createdActivity.endTime.toISOString(),
          createdAt: createdActivity.createdAt.toISOString(),
          updatedAt: createdActivity.updatedAt.toISOString(),
          Localization: {
            id: createdLocalization.id,
            name: createdLocalization.name,
          },
        },
      ]);
    });
  });
});

describe("GET /activities/tickets/:activityId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities/tickets");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities/tickets").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities/tickets/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 402 when user ticket is remote", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      await createPayment(ticket.id, ticketType.price);

      const response = await server.get("/activities/tickets/1").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
    });

    it("should respond with status 404 when user has no enrollment ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const ticketType = await createTicketTypeRemote();

      const response = await server.get("/activities/tickets/1").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 402 when user has no payment yet ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      await createHotel();

      const response = await server.get("/activities/tickets/1").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
    });

    it("should respond with status 200 and activityTicket with given activityId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const createdLocalization = await createLocalization();
      const createdActivity = await createActivity(createdLocalization.id);
      const activityTicket = await createActivityTicket(ticket.id, createdActivity.id);

      const response = await server
        .get(`/activities/tickets/${activityTicket.activityId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);

      expect(response.body).toEqual([
        {
          id: activityTicket.id,
          ticketId: activityTicket.ticketId,
          activityId: activityTicket.activityId,
          createdAt: activityTicket.createdAt.toISOString(),
          updatedAt: activityTicket.updatedAt.toISOString(),
        },
      ]);
    });

    it("should respond with status 200 and an empty array", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);

      const response = await server.get("/activities/tickets/1").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([]);
    });
  });
});

describe("POST /activities", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 402 when user ticket is remote", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeRemote();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      await createPayment(ticket.id, ticketType.price);

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
    });

    it("should respond with status 404 when user has no enrollment ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const ticketType = await createTicketTypeRemote();

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 402 when user has no payment yet ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);
      await createHotel();

      const response = await server.get("/activities").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
    });

    it("should respond with status 403 when there's no more capacity for given activity", async () => {
      const user = await createUser();
      const user2 = await createUser();
      const user3 = await createUser();
      const token = await generateValidToken(user);
      const token2 = await generateValidToken(user2);
      const token3 = await generateValidToken(user3);
      const enrollment = await createEnrollmentWithAddress(user);
      const enrollment2 = await createEnrollmentWithAddress(user2);
      const enrollment3 = await createEnrollmentWithAddress(user3);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const ticket2 = await createTicket(enrollment2.id, ticketType.id, TicketStatus.PAID);
      const ticket3 = await createTicket(enrollment3.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      await createPayment(ticket2.id, ticketType.price);
      await createPayment(ticket3.id, ticketType.price);
      const createdLocalization = await createLocalization();
      const createdActivity = await createActivity(createdLocalization.id);

      await server.post("/activities").set("Authorization", `Bearer ${token}`).send({
        activityId: createdActivity.id,
      });

      await server.post("/activities").set("Authorization", `Bearer ${token2}`).send({
        activityId: createdActivity.id,
      });

      const response = await server.post("/activities").set("Authorization", `Bearer ${token3}`).send({
        activityId: createdActivity.id,
      });

      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 403 when user has another activity booked for given activity time", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      const createdLocalization = await createLocalization();
      const createdActivity = await createActivity(createdLocalization.id);

      await server.post("/activities").set("Authorization", `Bearer ${token}`).send({
        activityId: createdActivity.id,
      });

      const response = await server.post("/activities").set("Authorization", `Bearer ${token}`).send({
        activityId: createdActivity.id,
      });

      expect(response.status).toEqual(httpStatus.FORBIDDEN);
    });

    it("should respond with status 201", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      const createdLocalization = await createLocalization();
      const createdActivity = await createActivity(createdLocalization.id);

      const response = await server.post("/activities").set("Authorization", `Bearer ${token}`).send({
        activityId: createdActivity.id,
      });

      expect(response.status).toEqual(httpStatus.CREATED);
    });
  });
});
