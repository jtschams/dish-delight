const sequelize = require('../config/connection');
const userData = require('./User');
const recipeData=require('./Recipe')
const ingredientData = require('./RecipeIngredient');
const ingredientConvert = require('../utils/ingredObj')


const ingredientArray = require('./ingredientData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await userData();

  await recipeData();

  const ingredients = []
  let i = 1
  for await (const ingredient of ingredientArray) {
    const objects = await ingredientConvert(ingredient, i)
    ingredients.push(...objects)
    i++
  }

  await ingredientData(ingredients);

  process.exit(0);
};

seedDatabase();