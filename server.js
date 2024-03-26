//INITIALIZING A SIMPLE EXPRESS SERVER
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const shortid = require('shortid');


//MIDDLEWARE SETUP
app.set("view engine", "ejs"); //View engine to be used for the UI
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


 
// Store original URLs and their corresponding short URLs
const urlDatabase = {};



//ROUTES SETUP

//Homepage route
app.get('/', (req, res)=>{
  const shortenedUrls = Object.keys(urlDatabase);
  res.render('index', { shortenedUrls });
})


// Route to decode a shortened URL to its original URL
app.get('/decode/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const originalUrl = urlDatabase[shortUrl] ? urlDatabase[shortUrl].originalUrl : null;
  if (originalUrl) {
    urlDatabase[shortUrl].hits++;
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});


//ROUTE TO SHORTEN THE URL
app.post('/encode', (req, res) => {
  const originalUrl = req.body.url;
  const shortUrl = generateShortUrl();
  urlDatabase[shortUrl] = { originalUrl, hits: 0 };
  res.send(`Shortened URL: ${req.hostname}/${shortUrl}`);
});



// Generate a short ID for URL
function generateShortUrl() {
  return shortid.generate();
}

//SERVER LISTENING FUNCTION
app.listen(PORT, () => {
  console.log(`Server is connected and listening on port ${PORT}`);
});
