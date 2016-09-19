var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var pug = require('pug');
var routes = require('./app/routes/routes.js');
var api = require('./app/api/urlHandlers.js');

var dbUrl = process.env.mongoURL || 'mongodb://localhost:27080/url_shortener';
var appUrl = process.env.appURL;

var app = express();

app.use(express.static(path.join('/', 'static')));

MongoClient.connect(dbUrl, function(err, db) {
  'use strict';

  if (err) {
    console.log('error occurred.');
    exit();
  }

  db.createCollection('site-urls', {
    capped: true,
    size: 10485760 // number of bytes database stores before it rewrites over oldest records
  });

  app.set('views', './views');
  app.set('view engine', 'pug');

  routes(app);
  api(app, db);


  var port = process.env.PORT || 3000;

  app.listen(port, function() {
    console.log("Server listening on port " + port);
  });
});
