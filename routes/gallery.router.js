const express = require('express');
const GalleryService = require('../services/gallery.service');

const router = express.Router();
const service = new GalleryService();
const { verificationTokenAuth, verificationAdminRole } = require('../middlewares/auth.handler');
const validatorSchemaHandler = require('../middlewares/validator.handler');
const { createImageSchema } = require('../schemas/gallery.schema');

router.get(
  '/',
  verificationTokenAuth,
  verificationAdminRole,
  (req, res, next) => service.getListGallery(req, res, next)
);
router.post(
  '/',
  verificationTokenAuth,
  verificationAdminRole,
  validatorSchemaHandler(createImageSchema, 'body'),
  (req, res, next) => service.createImage(req, res, next)
);

module.exports = router;
