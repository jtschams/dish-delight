const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const RecipeIngredient = require('./RecipeIngredient')

class Recipe extends Model { }

Recipe.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		directions: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		picture: {
			type: DataTypes.STRING,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id'
			},
			validate: {
				notNull: true
			}
		}
	},
	{
		hooks: {
			afterCreate: async (recipeData) => {
				await RecipeIngredient.bulkCreate(recipeData.ingredients)
				return recipeData
			}
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'recipe',
	}
);

module.exports = Recipe;
