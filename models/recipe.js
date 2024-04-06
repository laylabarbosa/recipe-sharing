const mongoose = require("mongoose");

// const recipeSchema = new mongoose.Schema({
const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  tags: { type: String },
  ratings: [{ user: String, rating: Number }],
});

module.exports = mongoose.model("Recipe", recipeSchema);
