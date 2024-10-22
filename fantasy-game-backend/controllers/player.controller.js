const Player = require('../models/player.model');

// GET all players
exports.getPlayersByTeamName = async (req, res) => {
  try {
    const { teamName } = req.params;

    // Check if team name is provided
    if (!teamName) {
      return res.status(400).json({
        success: false,
        message: "Please provide team name"
      });
    }

    const players = await Player.find({ team: teamName });

    // Check if any players were found
    if (players.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No players found for the given team name"
      });
    }

    // Return the list of players
    res.status(200).json({
      success: true,
      message: "Players retrieved successfully",
      players : players
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
