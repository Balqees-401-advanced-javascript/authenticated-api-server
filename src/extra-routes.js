'use strict';
const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../src/auth/middleware/bearer');
const authoriz = require('../src/auth/middleware/authorize');

router.get('/secret', bearerMiddleware, (req,res) => {
  console.log(req.user);
  res.status(200).json(req.user);
} );


router.get('/read',bearerMiddleware, authoriz('read'), readPremission);
router.post('/add', bearerMiddleware, authoriz('create'), addPermission);
router.put('/change', bearerMiddleware, authoriz('update'), updatePermission);
router.delete('/remove', bearerMiddleware, authoriz('delete'), deletePermission);


function readPremission(req,res,next){
  res.send('You have the permission to read');
}
function addPermission(req,res,next){
  res.send('You have the permission to add');
}
function updatePermission(req,res,next){
  res.send('You have the permission to update');
}
function deletePermission(req,res,next){
  res.send('You have the permission to delete');
}

module.exports = router;