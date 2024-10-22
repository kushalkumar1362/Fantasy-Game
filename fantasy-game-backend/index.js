const express = require("express");
const cors = require('cors');
const app = express();

// Import Database to connet
const database = require("./config/database.config");

// Import Routes
const playerRoutes = require("./routes/player.route");
const teamRoutes = require("./routes/team.route");

// Setting up port number
const PORT = process.env.PORT || 2003;

// Loading environment variables from .env file
require("dotenv").config();

// Connecting to database
database.connect();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : 'http://localhost:3000',
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use(playerRoutes)
app.use(teamRoutes)

// Welcome Template 
app.get('/', (req, res) => {
  res.send('Welcome to Fantasy Game API!');
});

// Listing the App
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});