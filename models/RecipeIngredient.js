const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class RecipeIngredient extends Model {}

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
        type: DataTypes.FLOAT,
        allowNull:false
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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe-ingredient',
  }
);

module.exports = RecipeIngredient;
