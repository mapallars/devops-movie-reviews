const sequelize = require('../config/database');
const User = require('./user.model');
const Role = require('./role.model');
const Movie = require('./movie.model');
const Review = require('./review.model');

// User-Role Association (Many-to-Many)
const UserRoles = sequelize.define('User_Roles', {
    // We don't need any extra columns in the join table for this MVP
});
User.belongsToMany(Role, { through: UserRoles });
Role.belongsToMany(User, { through: UserRoles });


// User-Review Association (One-to-Many)
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Movie-Review Association (One-to-Many)
Movie.hasMany(Review, { foreignKey: 'movieId' });
Review.belongsTo(Movie, { foreignKey: 'movieId' });

const db = {
  sequelize,
  User,
  Role,
  Movie,
  Review,
  UserRoles
};

module.exports = db;
