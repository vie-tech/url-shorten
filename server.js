//INITIALIZING A SIMPLE EXPRESS SERVER
const app = require('./startup/app');
const PORT = process.env.PORT || 7000;





//SERVER LISTENING FUNCTION
app.listen(PORT, () => {
  console.log(`Server is connected and listening on port ${PORT}`);
});


