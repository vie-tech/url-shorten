const server = require("../../server");
const request = require("supertest");
const {urlDatabase} = require('../../routes/encoder')

describe("ENCODING ROUTES TESTS", () => {
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
  

  describe("TESTING NEGATIVE OUTCOMES", () => {
    it("POST /encode should not create a short URL for empty inputes", async () => {
      const res = await request(server)
        .post("/encode")
        .send({ url: "" });
      expect(res.status).toBe(400);
      expect(res.text).toContain("Invalid Url passed");
  })}
)});


describe('Decode URL Route', () => {
    beforeEach(() => {
      urlDatabase['shortUrl123'] = { originalUrl: 'https://example.com', hits: 0 };
    });
  
    it('Decoding existing short URL', async () => {
      const response = await request(server)
        .post('/decode')
        .send({ url: 'shortUrl123' })
        .expect(200);
  
      expect(response.text).toContain('https://example.com');
    });
  
    //NEGATIVE OUTCOME
    it('Decoding non-existent short URL', async () => {
      const response = await request(server)
        .post('/decode')
        .send({ url: 'nonExistentShortUrl' })
        .expect(200);
  
      expect(response.text).toContain(' <h3>No decoded URL found</h3');
    });
  });
  
  
  
  