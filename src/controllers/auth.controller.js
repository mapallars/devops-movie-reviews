const db = require('../models');
const User = db.User;
const Role = db.Role;

const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Assign 'user' role by default
    const userRole = await Role.findOne({ where: { name: 'user' } });
    if (userRole) {
      await user.addRole(userRole);
      res.status(201).send({ message: 'User registered successfully!' });
    } else {
        // This should not happen if roles are seeded correctly
        await User.destroy({ where: { id: user.id } }); // Rollback user creation
        res.status(500).send({ message: "Failed to assign role. User registration rolled back." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Signin
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = await user.isValidPassword(req.body.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });
    
    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
        authorities.push('ROLE_' + roles[i].name.toUpperCase());
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
