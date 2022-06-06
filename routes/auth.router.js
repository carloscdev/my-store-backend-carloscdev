const express = require('express');
const AuthService = require('../services/auth.service');

const router = express.Router();
const service = new AuthService();
const { loginSchema } = require('../schemas/auth.schema');
const validatorSchemaHandler = require('../middlewares/validator.handler');

router.post(
  '/login',
  validatorSchemaHandler(loginSchema, 'body'),
  (req, res, next) => service.login(req, res, next)
);

module.exports = router;
