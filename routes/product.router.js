const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();
const service = new ProductService();
const { verificationTokenAuth, verificationAdminRole } = require('../middlewares/auth.handler');
const validatorSchemaHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema } = require('../schemas/product.schema');

router.get(
  '/',
  verificationTokenAuth,
  verificationAdminRole,
  (req, res, next) => service.getListProduct(req, res, next)
);
router.get(
  '/category/:id',
  verificationTokenAuth,
  verificationAdminRole,
  (req, res, next) => service.getListProductByCategory(req, res, next)
);
router.get(
  '/:id',
  verificationTokenAuth,
  verificationAdminRole,
  (req, res, next) => service.getProduct(req, res, next)
);
router.post(
  '/',
  verificationTokenAuth,
  verificationAdminRole,
  validatorSchemaHandler(createProductSchema, 'body'),
  (req, res, next) => service.createProduct(req, res, next)
);
router.put(
  '/:id',
  verificationTokenAuth,
  verificationAdminRole,
  validatorSchemaHandler(updateProductSchema, 'body'),
  (req, res, next) => service.updateProduct(req, res, next)
);

module.exports = router;
