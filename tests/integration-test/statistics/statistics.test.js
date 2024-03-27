const server = require("../../../startup/app");
const request = require("supertest");
const { urlDatabase } = require("../../../routes/encoder");

describe('STATISTICS ROUTES', ()=>{
  

    // Before all tests, start the server
    beforeAll(async () => {
     server.listen(); // This will start the server on a random available port
    });
  
    // After all tests, stop the server
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
    
        test("Fetching statistics for existing short URL", async () => {
          const response = await request(server)
            .get("/statistics/shortUrl123")
            .expect(200);
    
          expect(response.text).toContain("<title>Route statistics</title>");
        });
    
        test("Fetching statistics for non-existent short URL", async () => {
          const response = await request(server)
            .get("/statistics/nonExistentShortUrl")
            .expect(500);
    
          expect(response.text).toContain("<title>Error</title>");
        });
      });
})


