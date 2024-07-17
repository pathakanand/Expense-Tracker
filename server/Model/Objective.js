const mongoose = require('mongoose');

const objectiveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  savingsObjective: {
    type: Number,
    default: 0
  },
  expensesObjective: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Objective = mongoose.model('Objective', objectiveSchema);

module.exports = Objective;
