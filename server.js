//INITIALIZING A SIMPLE EXPRESS SERVER
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const {router} = require('./routes/encoder')


//MIDDLEWARE SETUP
app.set("view engine", "ejs"); //View engine to be used for the UI
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router)




//SERVER LISTENING FUNCTION
const server = app.listen(PORT, () => {
  console.log(`Server is connected and listening on port ${PORT}`);
});

module.exports = server
