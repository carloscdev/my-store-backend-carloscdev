const Joi = require('joi');

const title = Joi.string();
const image = {
  secure_url: Joi.string().uri(),
  public_id: Joi.string()
}

const createImageSchema = Joi.object({
  title: title.required(),
  image
});

module.exports = { createImageSchema };
