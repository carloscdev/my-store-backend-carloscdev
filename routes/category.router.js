const express = require('express');
const CategoryService = require('../services/category.service');

const router = express.Router();
const service = new CategoryService();
const { verificationTokenAuth } = require('../middlewares/auth.handler');

router.post(
  '/',
  verificationTokenAuth,
  (req, res, next) => service.createCategory(req, res, next)
);

module.exports = router;
