const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().strip();
const code = Joi.string().guid({ version: [ 'uuidv1' ]});

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

const activeAccountSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  code: code.required()
})

module.exports = { loginSchema, activeAccountSchema };
