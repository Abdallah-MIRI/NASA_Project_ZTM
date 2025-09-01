const req = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisConnect } = require("../../services/mongo");
const launches = require("../../models/launches.model");

describe("This Test For All API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisConnect();
  });

  describe("Test GET APP /launches", () => {
    test("This test Endpoint PATH /launches", async () => {
      const res = await req(app).get("/launches").expect(200);
    }, 7000);
  });

  describe("Test GET APP  By Id /launches/:id", () => {
    test("This test Endpoint PATH /launches/:id", async () => {
      const res = await req(app).get("/launches/:id").expect(200);
    }, 7000);
  });

  describe("Test POST APP /launches", () => {
    test("This test Endpoint Create POST /launches", async () => {
      const launchData = {
        mission: "Test Mission",
        rocket: "Test Rocket",
        launchDate: "2025-12-27",
        target: "Kepler-442 b",
      };

      const res = await req(app)
        .post("/launches")
        .send(launchData) // تبعت البيانات هنا
        .expect(201);

      // ممكن تتأكد من الرد
      // expect(res.body).toMatchObject({
      //   mission: "Test Mission",
      //   rocket: "Test Rocket",
      //   target: "Mars",
      // });

      expect(new Date(res.body.launchDate)).toEqual(
        new Date(launchData.launchDate)
      );
    }, 7000);
  });

  describe("Test DELETE APP /launches/:id", () => {
    let launchId;

    beforeAll(async () => {
      // إنشاء launch جديد للحصول على ID للاختبار
      const launchData = {
        mission: "Delete Test Mission",
        rocket: "Delete Test Rocket",
        launchDate: "2025-12-27",
        target: "Kepler-442 b",
      };

      const res = await req(app).post("/launches").send(launchData).expect(201);

      launchId = res.body.flightNumber || res.body._id; // خذ الـ id من الرد حسب التصميم
    });

    test("This test Endpoint DELETE /launches/:id", async () => {
      const res = await req(app)
        .delete(`/launches/${launchId}`) // تمرر ID حقيقي هنا
        .expect(200);

      // تأكد من الرد (اختياري)
      // expect(res.body).toMatchObject({ message: "Launch deleted" });
    }, 7000);
  });
});

// describe("Test POST Launche /launches", () => {
//   const sendDateLaunche = {
//     mission: "Kepler Explorion 01",
//     rocket: "explorer is1",
//     launchDate: "August 27, 2040",
//     target: "Kepler-442 b",
//   };

//   const sendLauncheWithOutDate = {
//     mission: "Kepler Explorion 01",
//     rocket: "explorer is1",
//     target: "Kepler-442 b",
//   };

//   const sendLauncheInvalidDate = {
//     mission: "Kepler Explorion 01",
//     rocket: "explorer is1",
//     target: "Kepler-442 b",
//     launchDate: "room",
//   };

//   test("This test for Request and Response Date", async () => {
//     const res = await req(app)
//       .post("/launches")
//       .send(sendDateLaunche)
//       .expect("Content-Type", /json/)
//       .expect(201);

//     const reqDate = new Date(sendDateLaunche.launchDate).valueOf();
//     const resDate = new Date(res.body.launchDate).valueOf();
//     expect(resDate).toBe(reqDate);

//     expect(res.body).toMatchObject(sendLauncheWithOutDate);
//   });

//   test("POST Missing required launch proprty /launches", async () => {
//     const res = await req(app)
//       .post("/launches")
//       .send(sendLauncheWithOutDate)
//       .expect("Content-Type", /json/)
//       .expect(400);

//     expect(res.body).toStrictEqual({
//       error: "Missing required launch proprty",
//     });
//   });

//   test("POST Invalid Launch date /launches", async () => {
//     const res = await req(app)
//       .post("/launches")
//       .send(sendLauncheInvalidDate)
//       .expect("Content-Type", /json/)
//       .expect(400);

//     expect(res.body).toStrictEqual({
//       error: "Invalid Launch date",
//     });
//   });
// });
