'use strict';

const Model = require('./models');
const schema = require('./users-model');
class User extends Model{
  constructor(schema){
    super(schema);
  }
}

module.exports = new User(schema);