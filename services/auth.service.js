const {User} = require('../models/user.model');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor() {}

  async login(req, res, next) {
    try {
      const body = req.body;
      const user = await User.findOne({email: body.email});
      if (!user) {
        throw boom.notFound("Email doesn't registered");
      }
      if (!bcrypt.compareSync(body.password, user.password)) {
        throw boom.notFound("Credentials invalid");
      }

      const token = jwt.sign({
        data: user
      }, process.env.SECRET_JWT, { expiresIn: 60 * 60 * 24 * 15});

      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthService;
