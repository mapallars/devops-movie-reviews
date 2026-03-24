import sequelize from '../config/database.js';
import User from './user.model.js';
import Role from './role.model.js';
import Movie from './movie.model.js';
import Review from './review.model.js';

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

export default db;
