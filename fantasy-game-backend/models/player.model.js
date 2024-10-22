const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  position: {
    type: String,
    enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'],
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
  matchesPlayed: {
    type: Number,
    default: 0
  },
  runsScored: {
    type: Number,
    default: 0
  },
  wicketsTaken: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Player', playerSchema);
