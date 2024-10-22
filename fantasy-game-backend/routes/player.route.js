const express = require('express');
const router = express.Router();

const {  getPlayersByTeamName } = require("../controllers/player.controller.js");

router.get('/get-players/:teamName', getPlayersByTeamName);

module.exports = router;
