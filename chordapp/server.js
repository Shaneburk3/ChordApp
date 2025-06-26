//server.js
const app = require('./app');  // Import the Express app from app.js
const PORT = process.env.PORT || 3000;  // Set the port to use (default is 3000)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

