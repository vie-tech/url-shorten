const server = require("../../../startup/app");
const request = require("supertest");
const { urlDatabase } = require("../../../routes/encoder");

describe("DECODE ROUTES TEST", () => {
  beforeAll(async () => {
    server.listen();
  });

  afterAll(async () => {
    await server.close;
  });
  describe("Decode URL Route", () => {
    beforeEach(() => {
      urlDatabase["shortUrl123"] = {
        originalUrl: "https://example.com",
        hits: 0,
      };
    });

    it("Decoding existing short URL", async () => {
      const response = await request(server)
        .post("/decode")
        .send({ url: "shortUrl123" })
        .expect(200);

      expect(response.text).toContain("https://example.com");
    });

    it("Decoding non-existent short URL", async () => {
      const response = await request(server)
        .post("/decode")
        .send({ url: "nonExistentShortUrl" })
        .expect(200);

      expect(response.text).toContain("<h3>No decoded URL found</h3");
    });
  });
});
