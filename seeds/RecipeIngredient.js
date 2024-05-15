const { RecipeIngredient } =  require('../models');

const ingredientData = [];

const seedIngredient = () => RecipeIngredient.bulkCreate(ingredientData);

module.exports = seedIngredient;