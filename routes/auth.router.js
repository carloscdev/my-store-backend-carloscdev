const express = require('express');
const AuthService = require('../services/auth.service');

const router = express.Router();
const service = new AuthService();
const { loginSchema, activeAccountSchema } = require('../schemas/auth.schema');
const validatorSchemaHandler = require('../middlewares/validator.handler');

router.post(
  '/login',
  validatorSchemaHandler(loginSchema, 'body'),
  (req, res, next) => service.login(req, res, next)
);
router.put(
  '/active-account',
  validatorSchemaHandler(activeAccountSchema, 'body'),
  (req, res, next) => service.activeAccount(req, res, next)
);
router.post(
  '/resend-code',
  validatorSchemaHandler(loginSchema, 'body'),
  (req, res, next) => service.resendAccessCode(req, res, next)
);

module.exports = router;
