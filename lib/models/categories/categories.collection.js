'use strict';

const Model = require('../models');
const schema = require('./categories.schema');
class Categories extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = new Categories();