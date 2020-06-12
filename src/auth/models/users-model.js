'use strict';
// require('dotenv').config();
const mongooose = require('mongoose');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const model = require('../models/user-model.collection');



const users = mongooose.Schema ({
  userName : {type : String , require : true},
  password : {type : String , require : true},
  role : { type: String , default:'user'},
});

users.pre('save', async function(next) {
  this.password  = await bcrypt.hash(this.password, 5);

});




module.exports = mongooose.model('users', users);