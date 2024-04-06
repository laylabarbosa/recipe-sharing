var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Recipe = require("../models/recipe");

/* GET add recipes form. */
router.get("/new", function (req, res, next) {
  res.render("recipes/new", { title: "New recipe" });
});

/* POST recipes creating and editing. */
router.post("/save", async function (req, res, next) {
  const recipeParams = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    tags: req.body.tags,
  };

  const recipe = await Recipe.findOneAndUpdate(
    { _id: req.body._id ?? new mongoose.Types.ObjectId() },
    recipeParams,
    {
      new: true,
      upsert: true, // Make this update into an upsert
    }
  );

  res.redirect("/recipes");
});

/* GET recipes listing. */
router.get("/", async function (req, res, next) {
  const recipes = await Recipe.find();
  // console.log(recipes);

  res.render("recipes/index", { title: "All recipes", recipes: recipes });
});

/* GET edit recipe form. */
router.get("/:id/edit", async function (req, res, next) {
  const recipe = await Recipe.findById(req.params.id);
  // console.log(recipe);

  res.render("recipes/edit", { title: "Edit recipe", recipe: recipe });
});

/* GET recipe deleting. */
router.get("/:id/delete", async function (req, res) {
  await Recipe.deleteOne({ _id: req.params.id });

  res.redirect("/recipes");
});

module.exports = router;
