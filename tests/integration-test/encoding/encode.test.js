const server = require("../../../startup/app");
const request = require("supertest");
const { urlDatabase } = require("../../../routes/encoder");

describe("ENCODIG ROUTES", () => {
  beforeAll(async () => {
    server.listen();
  });

  afterAll(async () => {
    await server.close;
  });
  describe("TESTING POSITIVE OUTCOMES", () => {
    it("POST /encode should create a short URL", async () => {
      const res = await request(server)
        .post("/encode")
        .send({ url: "http://example.com" });
      expect(res.status).toBe(302);
      expect(res.header["location"]).toMatch("/");
    });
  });

  describe("TESTING NEGATIVE OUTCOMES", () => {
    it("POST /encode should not create a short URL for empty input", async () => {
      const res = await request(server).post("/encode").send({ url: "" });
      expect(res.status).toBe(400);
      expect(res.text).toContain("Invalid Url passed");
    });
  });
});
