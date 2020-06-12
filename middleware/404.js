'use strict';

// notFoundHandler: 404 : client error
function Middle404Ware(req, res, next) {
  res.status(404);
  res.send({err: 'not found'});
  next();
}

module.exports = Middle404Ware;