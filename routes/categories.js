'use strict';

const express = require('express');
const router = express.Router();
const category = require('../lib/models/categories/categories.collection');


router.get('/',getAllCat);
router.get('/:id',getelementById);
router.post('/', addElement);
router.put('/:id',updateElement);
router.delete('/:id',deleteElement);

function getAllCat(req,res,next){
  category.get()
    .then(result =>{
      res.status(200).json(result);
    })
    .catch(next);
}

function getelementById(req,res,next){
  category.get(req.params.id)
    .then(result =>{
      res.status(200).json(result);
    })
    .catch(next);

}

function addElement(req,res,next){
  category.post(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(next);
}

function updateElement(req,res,next){
  category.put(req.body , req.params.id)
    .then(() =>{
      res.status(201).send('UPDATED');
    });
}

function deleteElement(req,res,next){
  category.delete(req.params.id)
    .then(() =>{
      res.status(200).send('DELETED');
    });
}

module.exports = router;