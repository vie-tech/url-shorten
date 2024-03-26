const mongoose = require('mongoose')
require('dotenv').config()
module.exports = function(){
    mongoose.connect(process.env.dbstring)
    .then(()=>{
        console.log('User connected to test database :)')
    })
}