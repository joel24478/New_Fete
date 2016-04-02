/* 
	Author: Zheondre Angel Calcano
	Created: Monday, March 28, 2016, 5:45:00 PM
	File name: Authentication.js 
*/

/* 
  Author: https://github.com/simonholmes/getting-MEAN/blob/chapter-11/app_api/controllers/authentication.js
*/

// https://www.npmjs.com/package/geocoder
var google = require('geocoder');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Profile');
//var signin = require('../controllers/signup'); 
var sendJsonResponse = function(res, status, content) {
 console.log( " checking" ); 
 res.status(status);
  res.json(content);
};
//navigator doesn't work with postmon.. 
/*
function getLocation() {
	console.log("getlocation"); 
	
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(showPosition);
	} else {
    	console.log("Geolocation is not supported by this browser."); 
		//user.currentPosition = [0,0];
	}
}
function showPosition(position) {
	  //user.currentPosition = [ position.coords.latitude , position.coords.longitude];
      console.log(  position.coords.latitude); 	  
}
*/
module.exports.test = function(req, res) {
	// geolocation works
	google.geocode("52 marshland st, haverhill ma", function ( err, data ) {
		console.log( Number(data.results[0].geometry.location.lat));
		console.log( data.results[0].geometry.location.lng);   
	// do something with data 
	});
	sendJsonResponse(res, 200, { 
		"message" : "ok"
	});
};

module.exports.register = function(req, res) {

  console.log( "Registering user" ); 
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User({ 
	name: req.body.name,
	email: req.body.email,
	currentPosition : [0,0]
  });
 
  //getLocation(); 
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
  console.log( ctrlAuth.login ) ;
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