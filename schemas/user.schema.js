const Joi = require('joi');

// const id = Joi.string().hex();
const first_name = Joi.string().min(3).max(50);
const last_name = Joi.string().min(3).max(50);
const document = Joi.number().max(99999999);
const email = Joi.string().email();
const phone = Joi.string();
const password = Joi.string().strip().description('Password must be at least 8 characters');

const registerUserSchema = Joi.object({
  first_name: first_name.required(),
  last_name: last_name.required(),
  document: document.required(),
  email: email.required(),
  phone: phone.required(),
  password: password.required()
});

const updateUserProfileSchema = Joi.object({
  first_name,
  last_name,
  document,
  phone
});

const updateUserPasswordSchema = Joi.object({
  password: password.required()
})

const name = Joi.string();
const address = Joi.string();
const reference = Joi.string();
const lat = Joi.string();
const lng = Joi.string();

const createUserAddressSchema = Joi.object({
  name: name.required(),
  address: address.required(),
  reference: reference.required(),
  lat: lat.required(),
  lng: lng.required()
});

const updateUserAddressSchema = Joi.object({
  name,
  address,
  reference,
  lat,
  lng
});


module.exports = {
  registerUserSchema,
  updateUserProfileSchema,
  updateUserPasswordSchema,
  createUserAddressSchema,
  updateUserAddressSchema,
};
