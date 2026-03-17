const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Movie;
