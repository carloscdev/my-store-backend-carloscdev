const { User, UserAddress } = require('../models/user.model');
const boom = require('@hapi/boom');
const _ = require('underscore');

class UserService {
  constructor() {}

  async registerUser(req, res, next) {
    try {
      const schema = ['first_name', 'last_name', 'document', 'email', 'phone', 'password'];
      const body = _.pick(req.body, schema);
      const response = await User.create(body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateUserProfile(req, res, next) {
    try {
      const _id = req.user._id;
      const schema = ['first_name', 'last_name', 'document', 'phone'];
      const body = _.pick(req.body, schema);
      const response = await User.findByIdAndUpdate(_id, body, {new: true});
      if (!response) throw boom.notFound('User not found');
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateUserPassword(req, res, next) {
    try {
      const _id = req.user._id;
      const schema = ['password'];
      const body = _.pick(req.body, schema);
      await User.findByIdAndUpdate(_id, body);
      res.json({message: 'Password updated successfully'});
    } catch (error) {
      next(error);
    }
  }

  async createUserAddress(req, res, next) {
    try {
      const user = req.user._id;
      const body = req.body;
      body.user = user;
      const response = await UserAddress.create(body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateUserAddress(req, res, next) {
    try {
      const _id = req.params.id;
      const user = req.user._id;
      const schema = ['name', 'address', 'reference', 'lat', 'lng'];
      const body = _.pick(req.body, schema);
      const response = await UserAddress.findOneAndUpdate({_id, user}, body, {new: true});
      if (!response) throw boom.notFound("Address doesn't exist");
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getUserAddress(req, res, next) {
    try {
      const _id = req.params.id;
      const user = req.user._id;
      const response = await UserAddress.findOne({_id, user});
      if (!response) throw boom.notFound("Address doesn't exist");
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getListAddressByUser(req, res, next) {
    try {
      const user = req.user._id;
      const response = await UserAddress.find({user});
      if (!response) throw boom.notFound('There are no registered addresses');
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = UserService;
