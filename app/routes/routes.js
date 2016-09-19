module.exports = function(app) {
  'use strict';

  app.route('/')
    .get(function(req, res) {
      res.render('index', { message: "welcome to the URL Shortener. Instructions blah blah. Make sure u use http or https" });
    });
  app.route('/new')
    .get(function(req, res) {
      res.render('error', { message: "this is the /new page. Make sure you're correctly using the url shortener. Instructions can be found on the main page." });
    });
};
