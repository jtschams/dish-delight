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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'measure',
        key: 'id'
      }
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipe',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe_ingredient',
  }
);

module.exports = RecipeIngredient;
