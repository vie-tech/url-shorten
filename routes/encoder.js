const express = require("express");
const router = express.Router();
const generateShortUrl = require('../helper/idGenerator')

// Store original URLs and their corresponding short URLs
const urlDatabase = {};




// ROUTE TO RENDER THE HOMEPAGE
router.get("/", (req, res) => {
  const shortenedUrls = Object.keys(urlDatabase);

  res.render("index", { shortenedUrls, urlDatabase }); // Pass decodedUrl to the template
});




//ROUTE TO SHORTEN THE URL
// ROUTE TO SHORTEN THE URL
router.post("/encode", (req, res) => {
  try {
    const originalUrl = req.body.url.trim();

    if (!originalUrl) {
      throw new Error("Invalid Url passed");
    }
    const shortUrl = generateShortUrl();
    // Store the short URL and original URL in the database
    urlDatabase[shortUrl] = { originalUrl, hits: 0 };
    res.redirect(`/`);
  } catch (err) {
    res.render("errors", { err: err.message });
    console.log(err.message);
  }
});





//ROUTE TO DECODE URL

router.post("/decode", (req, res) => {
  const shortUrl = req.body.url;
  const originalUrl = urlDatabase[shortUrl]
    ? urlDatabase[shortUrl].originalUrl
    : null;
  res.render("decoded", { decodedUrl: originalUrl }); // Always pass decodedUrl to the template
});




// Route to take you to the original Url destination/*
router.get("/:shortUrl", (req, res) => {
    const shortUrl = req.params.shortUrl;
    const originalUrl = urlDatabase[shortUrl]
      ? urlDatabase[shortUrl].originalUrl
      : null;
    if (originalUrl) {
      urlDatabase[shortUrl].hits++;
      res.redirect(originalUrl);
    } else {
      res.status(404).send("URL not found");
    }
  });




//Route to get the statistics of the clicked URL
  router.get("/statistics/:short_url", (req, res) => {
    const short_url = req.params.short_url;
    const clicks = urlDatabase[short_url].hits;
    const originalUrl = urlDatabase[short_url]
      ? urlDatabase[short_url].originalUrl
      : null;
    const parsedUrl = new URL(originalUrl);
   
    if (originalUrl) {
      res.render("statistics", {
        clicks: clicks,
        originalUrl,
        parsedUrl: parsedUrl.host,
        safety: parsedUrl.protocol
      });
    } else {
      res.send("SOMETHING WENT WRONG WITH THE REQUEST");
    }
  });


module.exports = {router, urlDatabase}