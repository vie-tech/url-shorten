const server = require("../../startup/app");
const request = require("supertest");

describe("ENCODING ROUTES TESTS", () => {

  // Before all tests, start the server
  beforeAll(async () => {
   server.listen(); // This will start the server on a random available port
  });

  // After all tests, stop the server
  afterAll(async () => {
    await server.close;
  });

  describe("TESTING POSITIVE OUTCOMES", () => {
    it("GET / should return homepage", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
      expect(res.text).toContain("<!DOCTYPE html>");
    });
  });
});
