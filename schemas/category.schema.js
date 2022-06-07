const Joi = require('joi');

const title = Joi.string().min(3);
const description = Joi.string().min(5);
const image = Joi.string().uri();
const position = Joi.number();
const is_active = Joi.boolean();

const createCategorySchema = Joi.object({
  title: title.required(),
  description: description.required(),
  image: image.required(),
  position,
  is_active
});

const updateCategorySchema = Joi.object({
  title,
  description,
  image,
  position,
  is_active
});

module.exports = { createCategorySchema, updateCategorySchema };
