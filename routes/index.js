const express = require('express');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const categoryRouter = require('./category.router');
const galleryRouter = require('./gallery.router');
const productRouter = require('./product.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/user', userRouter);
  router.use('/user', authRouter);
  router.use('/category', categoryRouter);
  router.use('/gallery', galleryRouter);
  router.use('/product', productRouter);
}

module.exports = routerApi;
