const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class UserProject extends Model {}

UserProject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
      field: 'user_id',
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserProject',
    tableName: 'user_projects',
    timestamps: false,
  },
);

module.exports = UserProject;
