'use strict';

module.exports = (req, res, next) => {
  console.log('__REQUEST__', req.method, req.path, req.time);
  next();
};