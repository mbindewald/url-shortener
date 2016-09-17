var express = require('express');
var path = require('path');
var pug = require('pug');
var routes = require('./app/routes/routes.js');

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

routes(app);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server listening on port " + port);
});
