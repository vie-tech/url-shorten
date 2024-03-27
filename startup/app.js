const express = require("express");
const app = express();
const {router} = require('../routes/encoder')


//MIDDLEWARE SETUP
app.set("view engine", "ejs"); //View engine to be used for the UI
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router)

module.exports = app