const Team = require('../models/team.model');
const Player = require('../models/player.model')
// Controller to create a new team
exports.createTeam = async (req, res) => {
  try {
    const { team, players } = req.body;

    // Check if playerIds array exists and has players
    if (!players || players.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'A team must have at least one player.'
      });
    }

    // Ensure team does not exceed 11 players
    if (players.length > 11) {
      return res.status(400).json({
        success: false,
        message: 'A team cannot have more than 11 players.'
      });
    }

    // Find players by their IDs
    const playerIds = players.map(player => player);
    const Players = await Player.find({ _id: { $in: playerIds } });

    // Check if all players were found
    if (Players.length !== players.length) {
      return res.status(404).json({
        success: false,
        message: 'One or more players not found.'
      });
    }

    // Calculate total points for the team using the fetched players
    const totalPoints = Players.reduce((sum, player) => sum + player.points, 0);

    // Create a new team
    const newTeam = new Team({
      name: team,
      players: playerIds,
      totalPoint: totalPoints 
    });
    await newTeam.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      team: newTeam
    });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Controller to GET a specific team by ID
exports.getTeam = async (req, res) => {
  try {
    const teamId = req.params.id;

    // Find the team by ID and populate the players
    const team = await Team.findById(teamId).populate('players');

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    // Return the team details
    res.status(200).json({
      success: true,
      message: 'Team found successfully',
      team: team.players
    });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Controller to get all teams
exports.getAllTeams = async (req, res) => {
  try {
    // Find all teams and populate the players
    const teams = await Team.find().populate('players');

    // Return the list of teams
    res.status(200).json({
      success: true,
      message: 'Teams retrieved successfully',
      teams: teams
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};