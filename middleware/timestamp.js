'use strict';
module.exports = (req, res, next) => {
  let time = new Date();
  req.time =time;
  next();
};