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

// Route to render the homepage
app.get('/', (req, res) => {
  const shortenedUrls = Object.keys(urlDatabase);
  res.render('index', { shortenedUrls, urlDatabase }); // Pass urlDatabase to the template
});



// Route to decode a shortened URL to its original URL
app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const originalUrl = urlDatabase[shortUrl] ? urlDatabase[shortUrl].originalUrl : null;
  if (originalUrl) {
    urlDatabase[shortUrl].hits++;
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.get('/statistics/:short_url', (req, res)=>{
  const short_url = req.params.short_url;
  const originalUrl = urlDatabase[short_url] ? urlDatabase[short_url].originalUrl : null;
  if (originalUrl) {
   const clicks =  urlDatabase[short_url].hits++;
   res.render('statistics', {clicks:clicks, originalUrl})
  }else{
    res.send('SOMETHING WENT WRONG WITH THE REQUEST')
  }
 
})


//ROUTE TO SHORTEN THE URL
app.post('/encode', (req, res) => {
  const originalUrl = req.body.url;
  const shortUrl = generateShortUrl();
  urlDatabase[shortUrl] = { originalUrl, hits: 0 };
  res.redirect(`/`);
});



// Generate a short ID for URL
function generateShortUrl() {
  return shortid.generate();
}

//SERVER LISTENING FUNCTION
app.listen(PORT, () => {
  console.log(`Server is connected and listening on port ${PORT}`);
});
