const {User} = require('../models/user.model');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const GenerateToken = require('../utils/jwt');
const {sendMail} = require('../utils/mailer');

class AuthService {
  constructor() {}

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({email});
      if (!user) {
        throw boom.notFound("Email doesn't registered");
      }
      if (!bcrypt.compareSync(password, user.password)) {
        throw boom.badRequest("Credentials invalid");
      }
      if (user.is_active === false) throw boom.badRequest('Your account is not active');
      const token = GenerateToken(user);
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }

  async activeAccount(req, res, next) {
    try {
      const { email, code, password } = req.body;
      const user = await User.findOneAndUpdate({email, code}, {is_active: true}, {new: true});
      if (!user) throw boom.badRequest('Your access code is invalid');
      if (!bcrypt.compareSync(password, user.password)) throw boom.badRequest("Credentials invalid");
      const token = GenerateToken(user);
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }

  async resendAccessCode(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({email});
      if (!user) {
        throw boom.notFound("Email doesn't registered");
      }
      if (!bcrypt.compareSync(password, user.password)) {
        throw boom.badRequest("Credentials invalid");
      }
      await sendMail({
        to: user.email,
        subject: "Welcome to my store - fake store",
        template: "user",
        context: {
          name: user.first_name,
          code: user.code
        }
      });
      res.json({statusCode: 200, message: "Message successfully sent. Check your email"});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthService;
