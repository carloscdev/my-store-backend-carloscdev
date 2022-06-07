const {Gallery} = require('../models/gallery.model');
const boom = require('@hapi/boom');
const { UploadImage } = require('../utils/cloudinary');
const fs = require('fs-extra');

class GalleryService {
  constructor() {}

  async createImage(req, res, next) {
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
      const response = await Gallery.create(body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getListGallery(req, res, next) {
    try {
      const { is_active } = req.query;
      const response = await Gallery.find({is_active: is_active ?? true});
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GalleryService;
