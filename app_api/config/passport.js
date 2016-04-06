/* 
	filename: validation.js
	Author: Zheondre Calcano 
	Created on:  March 26, ?2016 at 7:58 pm
	Project: Fete
	https://github.com/simonholmes/getting-MEAN/blob/chapter-11/app_api/config/passport.js
*/
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('Profile');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
  console.log( "pass port function") ;
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));