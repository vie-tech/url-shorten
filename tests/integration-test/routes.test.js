const server = require("../../server");
const request = require("supertest");
const { urlDatabase } = require("../../routes/encoder");

describe("Encoding and decoding routes", () => {
  describe("TESTING POSITIVE OUTCOMES", () => {
    it("GET / should return homepage", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
      expect(res.text).toContain("<!DOCTYPE html>");
    });

    it("POST /encode should create a short URL", async () => {
      const res = await request(server)
        .post("/encode")
        .send({ url: "http://example.com" });
      expect(res.status).toBe(302);
      expect(res.header["location"]).toMatch("/");
    });

  });
  

});
