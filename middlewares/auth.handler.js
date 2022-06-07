const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { UserAddress } = require('../models/user.model');

function verificationTokenAuth(req, res, next) {
  try {
    const token = req.get('authorization');
    if (!token) {
      throw boom.unauthorized("You don't have permissions");
    }
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
      if(err) throw boom.unauthorized("You don't have permissions");
      req.user = decoded.data;
      next();
    });
  } catch (error) {
    next(error);
  }
}

async function verificationAddressByUser(req, res, next) {
  try {
    const user = req.user._id;
    const address = await UserAddress.findOne({user});
    if (!address) throw boom.unauthorized("You don't have permissions to edit this address");
    next()
  } catch (error) {
    next(error);
  }
}

async function verificationAdminRole(req, res, next) {
  try {
    const role = req.user.role
    if (role === 'ADMIN') return next();
    throw boom.unauthorized("You don't have permissions to perform this action");
  } catch (error) {
    next(error);
  }
}

module.exports = { verificationTokenAuth, verificationAddressByUser, verificationAdminRole };
