const express = require('express');
const router = express.Router();

const { createTeam, getTeam, getAllTeams } = require('../controllers/team.controller')

// POST create a new team
router.post('/create-teams', createTeam);

// GET specific team by ID
router.get('/get-team/:id', getTeam);

// GET all teams
router.get('/get-all-teams', getAllTeams);

module.exports = router;
