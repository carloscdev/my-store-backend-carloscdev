const express = require('express');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/user', userRouter);
  router.use('/user', authRouter);
}

module.exports = routerApi;
