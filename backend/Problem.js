const mongoose = require('mongoose');

// Define the problem schema
const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  example: { type: String }, 
});

// Create the model
const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
