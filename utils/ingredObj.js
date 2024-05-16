const Qty =  require('js-quantities');
const { Ingredient, Measure } = require('../models/');

const ingredientConvert = async (ingredientList, recipeId) => {
  const ingredientObs = [];
  for (const ingredient of ingredientList) {
    const newIngredient = {};
    // Converts ingredient string to ingredient object
    const ingredArray = ingredient.split(' ');
    const amountRE = /^\d*\s?\d+(\.|\/)?\d*$/;
    const amountCheck = ingredArray.map((part) => {
      return amountRE.test(part)
    });
    const amountEnd = amountCheck.lastIndexOf(true);
    // Creates amount and adds to ingredient object
    if (amountCheck.indexOf(true) === amountEnd) {
      newIngredient.amount = ingredArray[amountEnd]
    } else {
      newIngredient.amount = [ingredArray[amountEnd - 1], ingredArray[amountEnd]].join(' ')
    }
    // Creates measure from after amount
    const measureArray = [];
    let i = 0;
    while (i < 3 && !newIngredient.measure) {
      i++;
      measureArray.push(ingredArray[amountEnd + i])
      newIngredient.measure = Qty.parse(measureArray.join('-'))?.numerator[0]
    }
    // Sets measure to count or removes <> from the start and end
    if (!newIngredient.measure) {
      i = 0;
      newIngredient.measure = 'count';
    } else {
      newIngredient.measure = newIngredient.measure.substring(1, newIngredient.measure.length - 1).replace("-", ' ');
    }
    // Creates ingredient from everything else
    newIngredient.name = ingredArray.slice(amountEnd + i + 1).join(' ').toLowerCase()

    // Creates ingredient and measure if do not exist.  Adds their id's to the  ingredient object.
    let ingredName = await Ingredient.findOne({ where: { name: newIngredient.name } });
    if (!ingredName) {
      ingredName = await Ingredient.create({ name: newIngredient.name });
    }
    ingredName = ingredName.get({ plain: true });
    newIngredient.ingredient_id = ingredName.id;
    let measureName = await Measure.findOne({ where: { name: newIngredient.measure } });
    if (!measureName) {
      measureName = await Measure.create({ name: newIngredient.measure });
    }
    measureName = measureName.get({ plain: true });
    newIngredient.measure_id = measureName.id
    // Adds recipe id to ingredient object and pushes to array for bulkcreate
    newIngredient.recipe_id = recipeId;
    ingredientObs.push(newIngredient)
  }
  return ingredientObs;
}

module.exports = ingredientConvert;