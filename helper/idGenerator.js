const shortid = require("shortid");

// Generate a short ID for URL

function generateShortUrl() {
  return shortid.generate();
}

module.exports = generateShortUrl ;
