'use strict';
require('dotenv').config();
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../models/user-model.collection');

module.exports = async (req,res ,next) => {
  if (!req.headers.authorization) {
    next('invalid Login');
    return;
  }

  let basic = req.headers.authorization.split(' ').pop();

  let [userName, pass] = base64.decode(basic).split(':'); 
  model.read(userName).then(async result =>{
    let valid = await bcrypt.compare(pass, result[0].password);
    if(valid){
      let token = jwt.sign({id: result[0].id , capability:result[0].role}, process.env.SECRET ,{expiresIn:900000});
      req.token = token;
      req.body =result;
      next();
    }
    // next('Invalid Login!!');
  });
};