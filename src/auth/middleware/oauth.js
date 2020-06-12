'use strict';

const superagent = require('superagent');
const model = require('../models/user-model.collection');
const jwt = require('jsonwebtoken');
// function middle man 
let url= 'https://github.com/login/oauth/access_token';
// we will use super agent 

module.exports = async (req,res,next) => {
  try {
    let code = req.query.code;
   
    let remoteToken = await getTheToken(code);
    
    let remoteUser = await getUserInfo(remoteToken);
    
    let [user , token] = await getUser(remoteUser);
   
    req.user = user; 
    req.token = token;

    

    next();

  } catch (e) {
    console.log(`ERROR: ${e}`);
    next('error');
  }
};

async function getTheToken(code){
 
  let token = await superagent
    .post(url)
    .send({client_id : process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET , code:code , redirect_uri: 'http://localhost:3000/oauth'});
  
  return token.body.access_token;
} 

async function getUserInfo(token){
  let url = 'https://api.github.com/user';
  let userData = await superagent.get(url)
    .set('Authorization', `Bearer ${token}`)
    .set('user-agent', 'express-app');
  let user = userData.body; // will return user obj + repos
  return user;
}

async function getUser(remoteUser) {
  
  let userRecord = {
    userName: remoteUser.login, // this will be my email
    password: 'oauthpassword',
  };
  let data = await model.read(userRecord.username);
  //   if data exist get it from DB
  //   if not save it
   
  if(data[0]){
    let token = jwt.sign({username: userRecord.username}, process.env.SECRET );
    return [data, token];
  }
  else {
    let savedUser = await model.post(userRecord);      
    let token = jwt.sign({username: userRecord.username}, process.env.SECRET );
    return [savedUser, token];
  }
}