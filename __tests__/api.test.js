'use strict';
require('@code-fellows/supergoose');
// // we will use supergoose
// const supergoose = require('@code-fellows/supergoose');

// const {srever} = require('../lib/server');// get only server key from obj

// const mockRequest = supergoose(srever);
const product = require('../lib/models/products/products.collection');

describe('product API', () =>{

  it('can post() a new product', () => {
    let obj = { name: 'bags' ,category : 'eat' ,display_name:'nike bags',description:'about bags'};
    return product.post(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          return expect(record[key]).toEqual(obj[key]);
        });
      });
  }); 

     

  it('can get() a new product', () => {
    let obj = { name: 'bags' ,category : 'eat' ,display_name:'nike bags',description:'about bags'};
    return product
      .post(obj)
      .then(data => {
        let id = data._id;
        //   console.log(data);
        return product.get(id)
          .then(record =>{
            Object.keys(obj).forEach(key=> {
              expect(record[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
        
  it('can put() a new product', () => {
    let obj = { name: 'bags' ,category : 'eat' ,display_name:'nike bags',description:'about bags'};
    let obj1 ={ name: 'bags' ,category : 'drink' ,display_name:'nike bags',description:'about bags'};
    return product
      .post(obj)
      .then(data => {
        let id = data._id;
        return product.put(obj1,id)
          .then(record =>{
            Object.keys(obj1).forEach(key=> {
              expect(record[key]).toEqual(obj1[key]);
            });
          });
      });
  });
            
                
            
});
