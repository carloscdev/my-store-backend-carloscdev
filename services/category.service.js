const {Category} = require('../models/category.model');
const boom = require('@hapi/boom');

class CategoryService {
  constructor() {}

  async createCategory(req, res, next) {
    try {
      const body = req.body;
      const response = await Category.create(body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const _id = req.params.id;
      const body = req.body;
      const response = await Category.findByIdAndUpdate(_id, body, {new: true});
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getListCategory(req, res, next) {
    try {
      const { search } = req.query;
      const regex = new RegExp(search, 'i')
      const response = await Category.find({title: {$regex: regex}, is_active: true}).sort('position');
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryService;
