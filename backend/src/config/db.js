const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const DB_URL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
});

const createDataBaseConection = async () => {
  console.log('db url', DB_URL);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { createDataBaseConection, sequelize };
