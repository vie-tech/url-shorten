const server = require("../../../startup/app");
const request = require("supertest");
const { urlDatabase } = require("../../../routes/encoder");

describe("STATISTICS ROUTES", () => {
  beforeAll(async () => {
    server.listen();
  });

  afterAll(async () => {
    await server.close;
  });

  describe("Statistics Route Tests", () => {
    beforeEach(() => {
      urlDatabase["shortUrl123"] = {
        originalUrl: "https://example.com",
        hits: 5,
      };
    });

    it("Fetching statistics for existing short URL", async () => {
      const response = await request(server)
        .get("/statistics/shortUrl123")
        .expect(200);

      expect(response.text).toContain("<title>Route statistics</title>");
    });

    it("Fetching statistics for non-existent short URL", async () => {
      const response = await request(server)
        .get("/statistics/nonExistentShortUrl")
        .expect(500);

      expect(response.text).toContain("<title>Error</title>");
    });
  });
});
