const express = require('express');
const UserService = require('../services/user.service');
const router = express.Router();
const service = new UserService();
const {
  registerUserSchema,
  updateUserProfileSchema,
  updateUserPasswordSchema,
  createUserAddressSchema,
  updateUserAddressSchema,
} = require('../schemas/user.schema');
const { verificationTokenAuth } = require('../middlewares/auth.handler');
const validatorSchemaHandler = require('../middlewares/validator.handler');

router.get('/', (req, res) => {
  res.json({message: 'Get all users Admin'})
});
router.post(
  '/',
  validatorSchemaHandler(registerUserSchema, 'body'),
  (req, res, next) => service.registerUser(req, res, next)
);
router.put(
  '/profile',
  verificationTokenAuth,
  validatorSchemaHandler(updateUserProfileSchema, 'body'),
  (req, res, next) => service.updateUserProfile(req, res, next)
);
router.put(
  '/password',
  verificationTokenAuth,
  validatorSchemaHandler(updateUserPasswordSchema, 'body'),
  (req, res, next) => service.updateUserPassword(req, res, next)
);
router.get(
  '/address/:id',
  verificationTokenAuth,
  (req, res, next) => service.getUserAddress(req, res, next)
);
router.get(
  '/address',
  verificationTokenAuth,
  (req, res, next) => service.getListAddressByUser(req, res, next)
);
router.post(
  '/address',
  verificationTokenAuth,
  validatorSchemaHandler(createUserAddressSchema, 'body'),
  (req, res, next) => service.createUserAddress(req, res, next)
);
router.put(
  '/address/:id',
  verificationTokenAuth,
  validatorSchemaHandler(updateUserAddressSchema, 'body'),
  (req, res, next) => service.updateUserAddress(req, res, next)
);

module.exports = router;
