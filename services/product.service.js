const {Product} = require('../models/product.model');
const boom = require('@hapi/boom');

class ProductService {
  constructor() {}

  async createProduct(req, res, next) {
    try {
      const body = req.body;
      const response = await Product.create(body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getListProduct(req, res, next) {
    try {
      const { search, min_price, max_price, sort, sortAsc } = req.query;
      const regex = new RegExp(search, 'i')
      const sortObject = {};
      sortObject[sort ?? 'title'] = sortAsc == 'true' ? 1 : -1;
      const response = await Product.find({
        title: { $regex: regex },
        is_active: true,
        sale_price: { $gte: min_price ?? 0,  $lte: max_price ?? 9999 }
      })
        .sort(sortObject)
        .populate('category');
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getListProductByCategory(req, res, next) {
    try {
      const category = req.params.id;
      const response = await Product.find({category});
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      const _id = req.params.id;
      const response = await Product.findOne({_id, is_active: true});
      if (!response) throw boom.notFound('Product is not found');
      res.json(response)
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const _id = req.params.id;
      const body = req.body;
      const response = await Product.findByIdAndUpdate(_id, body, {new: true});
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductService;
