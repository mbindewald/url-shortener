module.exports = function(app) {
  'use strict';

  app.route('/')
    .get(function(req, res) {
      res.render('index');
    });
  app.route('/new')
    .get(function(req, res) {
      res.render('error', { message: "this is the /new page, you should create a shortened url by adding it after /new/ in the address bar. Instructions can be found on the main page." });
    });
};
