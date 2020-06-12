'use strict';

const Model = require('../models');
const schema = require('./products.schema');//to requer product schema

class Product extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = new Product(); // export an instant // the use of it : use the method dirictry + Singlton (to have one instance across my whole app) 


// if we wont to use it any where we need to :
// require it and make an instance