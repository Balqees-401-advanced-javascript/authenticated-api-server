'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routeApi = require('../routes/api');
const errorHandler = require('../middleware/500');
const notFound = require('../middleware/404');
// const time = require('../middleware/timestamp');
// const logger = require('../middleware/logger');
const rout = require('../src/auth/router');

const app = express();

// Global MiddleWare-----------------------------
// Express middleware
app.use(express.json());//parsing the post request 
app.use(express.static('./public'));
// 3rd party middleware
app.use(cors()); // allow to access every thing
app.use(morgan('dev'));//which inviromint i'm in
// console.log('huuuuuuuuuu');
// app.use(logger);
// app.use(time);
app.use(rout);
app.use('/api/v1',routeApi);
app.use('*',errorHandler);
app.use(notFound);
module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
  },
};
