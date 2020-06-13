'use strict';
const jwt = require('jsonwebtoken');

class Model {
  constructor(schema){
    this.schema = schema;
  }

  post(record){
    
    let newRecord = new this.schema(record);
    return newRecord.save();
   
  }
  
  read(userName){
    if(userName){  
    
      return this.schema.find({userName});
        
    }
    else {return this.schema.find({});}
  }

  verifyToken(token){
    let that = this;

    return jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        console.log('err>>> ', err);
        return Promise.reject(err);
      }
     
     
      let id = decoded['id']; // decoded.username
      return that.schema.find({_id:id})
        .then(result =>{
          if (result.length) {
            return Promise.resolve(result[0]);
          } 
          return Promise.reject();
        });
    });
  }

  role(capability,user){
    let permissions = {'user' : ['read'] , 'admin': [ 'read' , 'update' , 'delete', 'create'] , 'writers': ['read' ,  'create'] , 'editors':['read' , 'update' , 'create']};
    //     user = {
    //       username
    //       pswwoord
    //       role
    //     }
    
    //     user.role -->>> wiriters

    //     permission[writers] ----->    ['read' ,  'create'].includes(capability)
    // permissions.weiters
    // let person = user.role;
    // p
    if (permissions[user.role].includes(capability)){
      return true;
    }
    else {return false;}
  
  
  }
}



module.exports = Model;