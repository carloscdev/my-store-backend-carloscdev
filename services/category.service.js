const {Category} = require('../models/category.model');
const boom = require('@hapi/boom');
const { UploadImage } = require('../utils/cloudinary');
const fs = require('fs-extra');

class CategoryService {
  constructor() {}

  async createCategory(req, res, next) {
    try {
      const body = req.body;
      if (req.files?.image) {
        const result = await UploadImage(req.files.image.tempFilePath);
        body.image = {
          secure_url: result.secure_url,
          public_id: result.public_id
        };
        await fs.unlink(req.files.image.tempFilePath)
      } else {
        throw boom.badRequest('Image is required');
      }
      const response = await Category.create(body);
      res.json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CategoryService;
