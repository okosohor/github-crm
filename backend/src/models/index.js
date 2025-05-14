const { sequelize } = require('../config/db');
const User = require('./user');
const Project = require('./project');
const UserProject = require('./userProject');

User.belongsToMany(Project, {
  through: UserProject,
  foreignKey: 'user_id',
  otherKey: 'project_id',
});

Project.belongsToMany(User, {
  through: UserProject,
  foreignKey: 'project_id',
  otherKey: 'user_id',
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Sync');
  })
  .catch((error) => {
    console.error('Error sync', error);
  });
