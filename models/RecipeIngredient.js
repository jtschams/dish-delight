const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
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
        // Creates ingredient and measure if do not exist.  Adds their id's to each ingredient.
        for (const ingredient of ingredientList) {
          let ingredName = await Ingredient.findOne({ where: { name: ingredient.name } });
          if (!ingredName) {
            ingredName = await Ingredient.create({ name: ingredient.name });
          }
          ingredName = ingredName.get({ plain: true });
          ingredient.ingredient_id = ingredName.id;
          let measureName = await Measure.findOne({ where: { name: ingredient.measure } });
          if (!measureName) {
            measureName = await Measure.create({ name: ingredient.measure });
          }
          measureName = measureName.get({ plain: true });
          ingredient.measure_id = measureName.id
        }
        return ingredientList
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe-ingredient',
  }
);

module.exports = RecipeIngredient;
