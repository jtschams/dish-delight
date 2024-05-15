const User = require('./User');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const Measure = require('./Measure');
const RecipeIngredient = require('./RecipeIngredient')

// Created Recipes
User.hasMany(Recipe, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
  as: 'created_recipes'
});

Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

// Saved Recipes
User.belongsToMany(Recipe, {
  through: {
    model: 'user_recipes'
  },
  as: 'my_recipes'
});

Recipe.belongsToMany(User, {
  through: {
    model: 'user_recipes'
  }
});

// Single ingredient line
Ingredient.belongsToMany(Measure, {
  through: {
    model: RecipeIngredient,
    key: 'ingredient_id',
  }
});

Measure.belongsToMany(Ingredient, {
  through: {
    model: RecipeIngredient,
    key: 'measure_id',
  }
});

Ingredient.hasMany(RecipeIngredient);
Measure.hasMany(RecipeIngredient);
RecipeIngredient.hasMany(Ingredient);
RecipeIngredient.hasMany(Measure);

// Full Ingredient list
Recipe.belongsToMany(RecipeIngredient, {
  through: {
    model: 'ingredient_list',
  }
});

RecipeIngredient.belongsToMany(Recipe, {
  through: {
    model: 'ingredient_list'
  }
})

module.exports = { User, Recipe, Ingredient, Measure, RecipeIngredient };
