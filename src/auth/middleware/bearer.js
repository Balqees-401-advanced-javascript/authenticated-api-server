'use strict';

const model = require('../models/user-model.collection');

module.exports = (req, res, next) => {
//   console.log('hiiiiiiiiiiiiiiiiiiiiiiiii');
  if (!req.headers.authorization) {
    next('User is not loggedin');
    return;
  }

  // Bearer tokenvalue
  //   console.log('req.headers.authorization >>>> ',req.headers.authorization);
  let bearerToken = req.headers.authorization.split(' ').pop();
  // console.log('byyyyyyyyyyyyyy',bearerToken);
  return model.verifyToken(bearerToken)
    .then(decodedUserObject => {
      req.user = decodedUserObject;
      next();
    }).catch(err=> next('Protected: Invalid User Token'));
    
};