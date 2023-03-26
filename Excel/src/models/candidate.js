const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
