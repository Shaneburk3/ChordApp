require('dotenv').config();
// Import the Express app from app.js
const app = require('./app');
// Set the port to use (default is 3000)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

