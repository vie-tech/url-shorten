//INITIALIZING A SIMPLE EXPRESS SERVER
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const shortid = require("shortid");
const url = require("url");

//MIDDLEWARE SETUP
app.set("view engine", "ejs"); //View engine to be used for the UI
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Store original URLs and their corresponding short URLs
const urlDatabase = {};

//ROUTES SETUP

// ROUTE TO RENDER THE HOMEPAGE
app.get("/", (req, res) => {
  const shortenedUrls = Object.keys(urlDatabase);

  res.render("index", { shortenedUrls, urlDatabase }); // Pass decodedUrl to the template
});




//ROUTE TO SHORTEN THE URL
app.post("/encode", (req, res) => {
  try {
    const originalUrl = req.body.url.trim();

    console.log(originalUrl);
    if (!originalUrl) {
      throw new Error("Invalid Url passed");
    }
    const shortUrl = generateShortUrl();
    urlDatabase[shortUrl] = { originalUrl, hits: 0 };
    res.redirect(`/`);
  } catch (err) {
    res.render("errors", { err: err.message });
    console.log(err.message);
  }
});





//ROUTE TO DECODE URL

app.post("/decode", (req, res) => {
  const shortUrl = req.body.url;
  const originalUrl = urlDatabase[shortUrl]
    ? urlDatabase[shortUrl].originalUrl
    : null;
  res.render("decoded", { decodedUrl: originalUrl }); // Always pass decodedUrl to the template
});





// Route to take you to the original Url destination/*
app.get("/:shortUrl", (req, res) => {
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
app.get("/statistics/:short_url", (req, res) => {
  const short_url = req.params.short_url;
  const clicks = urlDatabase[short_url].hits++;
  const originalUrl = urlDatabase[short_url]
    ? urlDatabase[short_url].originalUrl
    : null;
  const parsedUrl = new URL(originalUrl);
  if (originalUrl) {
    res.render("statistics", {
      clicks: clicks,
      originalUrl,
      parsedUrl: parsedUrl.host,
    });
  } else {
    res.send("SOMETHING WENT WRONG WITH THE REQUEST");
  }
});





// Generate a short ID for URL
function generateShortUrl() {
  return shortid.generate();
}

//SERVER LISTENING FUNCTION
app.listen(PORT, () => {
  console.log(`Server is connected and listening on port ${PORT}`);
});
