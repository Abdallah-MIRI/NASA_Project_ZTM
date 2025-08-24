const launches = require("./launches.model");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", () => {
    const launche = launches.abortLaunchById.length;
    expect(launche).toBe(1);
  });
});

describe("Test POST /launche", () => {
  test("It should respond with 200 success", () => {});
  test("It should catch missing required properties", () => {});
  test("It should catch invalid dates", () => {});
});
