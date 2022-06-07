const express = require('express');
const CategoryService = require('../services/category.service');

const router = express.Router();
const service = new CategoryService();
const { verificationTokenAuth, verificationAdminRole } = require('../middlewares/auth.handler');
const validatorSchemaHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema } = require('../schemas/category.schema');

router.get(
  '/',
  (req, res, next) => service.getListCategory(req, res, next)
);
router.post(
  '/',
  verificationTokenAuth,
  verificationAdminRole,
  validatorSchemaHandler(createCategorySchema, 'body'),
  (req, res, next) => service.createCategory(req, res, next)
);
router.put(
  '/:id',
  verificationTokenAuth,
  verificationAdminRole,
  validatorSchemaHandler(updateCategorySchema, 'body'),
  (req, res, next) => service.updateCategory(req, res, next)
);

module.exports = router;
