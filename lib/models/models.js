'use strict';

// Generic mongoo model will be extended in other models 
//we need to creat a class 
// just to add git put delete 
// add it then extend it 

class Model {
  constructor(schema){// schema passed to constructor from product model i will pass product schema 
    this.schema = schema;// what ever i pass it will take it
  }

  // take a params of id and the id optional 
  get(_id){
    let queryObj = _id ? {_id} : {}; // if the query have id return the spacific id else list all
    //find({queryObj})// {_id : _id} // {_id} as ashort cut // this find every thing if we pass empty obj and the spacific one if we pass id 
    return this.schema.find(queryObj); // return inisted of async and await
  }

  // the record is an object and shoul match schema format      
  post(record){
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

     
  put(record,_id){
    //return the old obj so we add {new:true}
    return this.schema.findByIdAndUpdate(_id ,record, {new:true});
  }

  delete(_id){
    return this.schema.findByIdAndDelete(_id);
  }

}
module.exports = Model;