const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Qty = require('js-quantities');
const Ingredient = require('./Ingredient');
const Measure = require('./Measure');

class RecipeIngredient extends Model {
  fractionToFloat() {
    // Converts a String of a fraction, mixed number, or float to a Float
    const mixedNum = this.amount.split(' ');
    const splitFrac = mixedNum[mixedNum.length - 1].split('/')
    if (mixedNum.length > 1) {
      const fractFloat = parseInt(mixedNum[0]) + (parseInt(splitFrac[0]) / parseInt(splitFrac[1]));
      return fractFloat;
    } else if (splitFrac.length > 1) {
      const fractFloat = parseInt(splitFrac[0]) / parseInt(splitFrac[1]);
      return fractFloat;
    } else {
      return parseFloat(this.amount);
    }
  }
}

RecipeIngredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ingredient',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    measure_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'measure',
        key: 'id'
      }
    }
  },
  {
    hooks: {
      beforeBulkCreate: async (ingredientList) => {
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
          // Creates amount
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
            newIngredient.measure = Qty(measureArray.join(' '))
          }
          if (!newIngredient.measure) {
            i = 0;
            newIngredient.measure = 'count';
          }
          // Creates ingredient from everything else
          newIngredient.name = ingredArray.slice(amountEnd + i + 1).join(' ').toLowerCase

          // Creates ingredient and measure if do not exist.  Adds their id's to each ingredient.
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
          ingredientObs.push(newIngredient)
        }
        return ingredientObs;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe_ingredient',
  }
);

module.exports = RecipeIngredient;
