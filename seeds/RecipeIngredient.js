const { RecipeIngredient } =  require('../models');

const seedIngredient = (ingredientData) => RecipeIngredient.bulkCreate(ingredientData);

module.exports = seedIngredient;