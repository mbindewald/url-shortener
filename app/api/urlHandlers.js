module.exports = function(app, db) {
  'use strict';

  // User enters shortened URL to be redirected to long URL
  app.get('/:url', function(req, res) {
    // Find original URL in database
    // Redirect to original URL
    findUrl(db, req.params.url, res);
  });

  // User enters a new url to create a shortened one
  app.get('/new/:newUrl(*)', function(req, res) {
      var newUrl = req.params.newUrl;
      var urlObj = {};
      urlObj.original = newUrl;

      if (validateUrl(newUrl)) {
        var shortUrl = process.env.appURL + randomGenerator();
        urlObj.short = shortUrl;

        saveObj(db, urlObj);
        res.render('url', { originalUrl: urlObj.original, newUrl: urlObj.short.toString() });
      }
      else {
        res.render('error', { message: "Couldn't create a url based on " + urlObj.original + ". Make sure you're including http or https:// in your url." });
      }
    });
};

function findUrl(db, url, res) {
  db.collection('site-urls').findOne({ "short": url }, function(err, result) {
    if (err) {
      throw err;
    }

    if (result) {
      res.redirect(result.original);
    }
    else {
      res.render('error', { message: "Couldn't find a url in the database that corresponds with " + url });
    }
  });
}

function saveObj(db, obj) {
  db.collection('site-urls').save(obj);
}

// Returns true if url is valid
function validateUrl(url) {
  // regex from http://stackoverflow.com/a/3809435
  var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return regex.test(url);
}

// Returns 5 digit random number
function randomGenerator() {
  var number = Math.floor((Math.random() * 100000));
  return number.toString().substring(0, 5);
}
