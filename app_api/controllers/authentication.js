/* 
  Author: https://github.com/simonholmes/getting-MEAN/blob/chapter-11/app_api/controllers/authentication.js
*/
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Profile');
//var signin = require('../controllers/signup'); 
var sendJsonResponse = function(res, status, content) {
 console.log( " checking" ); 
 res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
console.log( " check" ); 
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.DateofCreation = new Date();
  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJsonResponse(res, 200, {
        "token" : token
      });
    }
  });

};

module.exports.login = function(req, res) {
  if(!req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  passport.authenticate('local', function(err, user, info){
    var token;

    if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }

    if(user){
      token = user.generateJwt();
      sendJsonResponse(res, 200, {
        "token" : token
      });
    } else {
      sendJsonResponse(res, 401, info);
    }
  })(req, res);
};