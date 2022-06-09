const Joi = require('joi');

const title =Joi.string().min(3),
description =Joi.string().min(5),
image = Joi.string().uri(),
purchase_price = Joi.number().positive().precision(2),
sale_price = Joi.number().positive().precision(2),
has_stock = Joi.boolean(),
stock = Joi.number().positive().integer(),
is_active = Joi.boolean(),
category = Joi.array(),
gallery = Joi.array();

const createProductSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  image: image.required(),
  purchase_price: purchase_price.required(),
  sale_price: sale_price.required(),
  has_stock,
  stock,
  is_active,
  category: category.required(),
  gallery
});

const updateProductSchema = Joi.object({
  title,
  description,
  image,
  purchase_price,
  sale_price,
  has_stock,
  stock,
  is_active,
  category,
  gallery
})

module.exports = { createProductSchema, updateProductSchema };
