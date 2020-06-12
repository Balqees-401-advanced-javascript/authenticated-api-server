'use strict';

const express = require('express');//because i have to call router from express
const router = express.Router();
const product = require('../lib/models/products/products.collection');
const category = require('../lib/models/categories/categories.collection');
//require product model and use it in my router function 
router.param('model' , getModel);

function getModel(req,res,next){
  const model = req.params.model;// gives the string passed prouduct or category 
  switch(model){
  case 'products' :
    req.model = product;
    next();
    break;
  case 'category' :
    req.model = category;
    next();
    break;
  default:
    next('invalid Model');
    break;   
  }
}

router.post('/:model',postHandler);
router.get('/:model',getAllHandler);
router.get('/:model/:id',getOne);
router.put('/:model/:id',updatHandler);
router.delete('/:model/:id',deleteHandler);



function getAllHandler(req,res,next){ // adiing next look like amiddle ware 
//crud operation 
  req.model.get()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(next);
}
    
function getOne(req,res,next){
  req.model.get(req.params.id)
    .then(result =>{
      res.status(200).json(result);
    })
    .catch(next);
}   

function postHandler(req , res, next){
  req.model.post(req.body)
    .then (result =>{
      // console.log(result);
      res.status(201).json(result);
    })
    .catch(next);
}


function updatHandler(req,res,next){
  req.model.put(req.body , req.params.id)
    .then(() =>{
      res.status(201).send('UPDATED');
    })
    .catch(next);
}

function deleteHandler(req,res,next){
  req.model.delete(req.params.id)
    .then(() =>{
      res.status(200).send('DELETED!');
    })
    .catch(next);
}

module.exports = router;