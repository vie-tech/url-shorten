//INITIALIZING A SIMPLE EXPRESS SERVER
const express = require('express')
const app = express()
const PORT = process.env.PORT || 7000


//MIDDLEWARE SETUP
app.set('view engine', 'ejs') //View engine to be used for the UI
app.use(express.json())
app.use(express.urlencoded({extended: false}))





//ROUTES SETUP
app.get('/', (req, res)=>{
    
})







//SERVER LISTENING FUNCTION
app.listen(PORT, ()=>{
    console.log(`Server is connected and listening on port ${PORT}`)
})