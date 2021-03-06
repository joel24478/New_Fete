/* 
  Created: Monday, March 28, 2016, 5:45:00 PM
  File name: app_api/controllers/authentication.js 
  Author: Simon Homles
  https://github.com/simonholmes/getting-MEAN/blob/chapter-11/app_api/controllers/authentication.js
*/

// https://www.npmjs.com/package/geocoder
var google = require('geocoder');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Profile');
//var signin = require('../controllers/signup'); 
var sendJsonResponse = function(res, status, content) {
    console.log(" checking");
    res.status(status);
    res.json(content);
};

module.exports.test = function(req, res) {
    // geolocation works
    google.geocode("52 marshland st, haverhill ma", function(err, data) {
        console.log(Number(data.results[0].geometry.location.lat));
        console.log(data.results[0].geometry.location.lng);
        // do something with data 
    });
    sendJsonResponse(res, 200, {
        "message": "ok"
    });
};

module.exports.register = function(req, res) {

    console.log("Registering user");
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJsonResponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    var user = new User({
        name: req.body.name,
        email: req.body.email,
        About: "",
        Followers: 0,
        Following: 0,
        totalAttended: 0,
        profilepic: "/images/default.png",
        followersID: [],
        followingID: []
            //currentPosition : [0,0]
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
                "token": token
            });
        }
    });

};

module.exports.login = function(req, res) {
    console.log("Login function");
    console.log(req.body.email);
    if (!req.body.email || !req.body.password) {
        sendJsonResponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    passport.authenticate('local', function(err, user, info) {
        var token;

        if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
                "token": token
            });
        } else {
            sendJsonResponse(res, 401, info);
        }
    })(req, res);
};