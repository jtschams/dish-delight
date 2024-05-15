const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Measure extends Model { }

Measure.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: 'count',
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'measure',
  }
);

module.exports = Measure;
