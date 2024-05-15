const sequelize = require('../config/connection');
const userData = require('./User');
// const recipeData = require('./Recipe');
const ingredientData = require('./RecipeIngredient');

const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await userData();

  // await recipeData();

  // await ingredientData();

  process.exit(0);
};

seedDatabase();
