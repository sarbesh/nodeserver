const express = require("express"),
app = express(),
router = require('./api/route'),
invest = require('./api/investment'),
comments = require('./api/comments'),
bodyParser = require('body-parser');
global.logger = require('./utilities/winston');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())

// routes
app.use((req, res, next) => {
  console.log(" request: ",req.url);
  res.header("content-type","application/json");
  next();
});

app.use('/api',router);
app.use('/api/invest',invest);
app.use('/api/comments',comments);

module.exports = app,mongoose;
