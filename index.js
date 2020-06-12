'use strict';
require('dotenv').config();

// 3rd party lib
const mongoose = require('mongoose');

// internal modules
const server = require('./lib/server');

let port = process.env.PORT;
const dbUrl = process.env.DB_URI; 

//start then connect to db
server.start(port);

const mongooseOption = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
// start our server and connect it to mangoo
mongoose.connect(dbUrl,mongooseOption);
