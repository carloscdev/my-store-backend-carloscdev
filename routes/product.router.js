const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();
const service = new ProductService();
const { verificationTokenAuth, verificationAdminRole } = require('../middlewares/auth.handler');
const validatorSchemaHandler = require('../middlewares/validator.handler');
const { createProductSchema } = require('../schemas/product.schema');

router.get(
  '/',
  (req, res, next) => service.getListProduct(req, res, next)
);
router.get(
  '/category/:id',
  (req, res, next) => service.getListProductByCategory(req, res, next)
);
router.get(
  '/:id',
  (req, res, next) => service.getProduct(req, res, next)
);
router.post(
  '/',
  verificationTokenAuth,
  verificationAdminRole,
  validatorSchemaHandler(createProductSchema, 'body'),
  (req, res, next) => service.createProduct(req, res, next)
);

module.exports = router;
