const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  totalPoint: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);

