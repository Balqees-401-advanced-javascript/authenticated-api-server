'use strict';

const model = require('../models/user-model.collection');

module.exports = (req, res, next) => {

  if (!req.headers.authorization) {
    next('User is not loggedin');
    return;
  }

  // Bearer tokenvalue
 
  let bearerToken = req.headers.authorization.split(' ').pop();
 
  return model.verifyToken(bearerToken)
    .then(decodedUserObject => {
      req.user = decodedUserObject;
      next();
    }).catch(err=> next('Protected: Invalid User Token'));
    
};