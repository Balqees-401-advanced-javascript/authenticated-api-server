'use strict';
const user = require('../models/user-model.collection');

//HOF

module.exports = (capability)=>{ //pass what user can do
  return (req,res,next)=> {
    if(user.role(capability,req.user) === true){
      next();
    }
    else{
      next('YOU CAN NOT ACCESS');
    }
    
  };
};
