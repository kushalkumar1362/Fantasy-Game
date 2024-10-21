const express = require("express");
const cors = require('cors');
const app = express();
const database = require("./config/database.config");

// Setting up port number
const PORT = process.env.PORT || 2003;

// Loading environment variables from .env file
require("dotenv").config();

// Connecting to database
database.connect();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Welcome to Fantasy Game API!');
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});