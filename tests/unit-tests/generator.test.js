const generateShortUrl = require("../../helper/idGenerator");
const shortid = require("shortid");
describe("TESTING THE GENERATOR FUCNTION", () => {
  it("should return a short ID for URL", () => {
    jest.spyOn(shortid, "generate").mockReturnValueOnce("abc123");

    const shortUrl = generateShortUrl();
    expect(shortUrl).toBe("abc123");
    jest.restoreAllMocks();
  });
});
