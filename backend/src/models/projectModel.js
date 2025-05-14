const { Model, DataTypes } = require('sequelize');
const sequalize = require('../config/db');

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    forks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    issues: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequalize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
  },
);

module.exports = Project;
