//API INDEX

var express = require('express');
var router = express.Router();
/*
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
*/

var ctrlSignup = require('../controllers/signup'); 
var ctrlHome = require('../controllers/home'); 
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
console.log( "routes"); 
//authentication 
router.post('/signup', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/test', ctrlAuth.test);
//Home
//get all events in range distance and time..
//figure out how to include user's name into the path name
// need to add home to all the path names for the home related routes
router.get('/Home',ctrlHome.home); //this will be changed to get world's events
router.get('/Home/:Userid/Event/:Eventid',ctrlHome.getEvent);
router.post('/Home/:Userid',ctrlHome.createEvent); 
router.put('/Home/:Userid/Event/:Eventid',ctrlHome.updateEvent);
router.delete('/Home/:Userid/Event/:Eventid',ctrlHome.deleteEvent);
router.get('/Home/:Userid/Event/:Eventid/comments/:Commentid',ctrlHome.getComment);
router.post('/Home/:Userid/Event/:Eventid/comments', ctrlHome.createComment);
router.put('/Home/:Userid/Event/:Eventid/comments/:Commentid',ctrlHome.updateComment); 
router.delete('/Home/:Userid/Event/:Eventid/comments/:Commentid',ctrlHome.deleteComment);

//Profile
router.get('/profile/:Userid/Event/:Eventid',ctrlHome.getEvent);
router.get('/profile/:Userid',ctrlProfile.getMyEvents);
router.post('/profile/:Userid',ctrlHome.createEvent); 
router.put('/profile/:Userid/Event/:Eventid',ctrlHome.updateEvent);
router.delete('/profile/:Userid/Event/:Eventid',ctrlHome.deleteEvent);
router.put('/profile/:Userid',ctrlProfile.updateUser);
router.delete('/profile/:Userid',ctrlProfile.deleteUser);
//list all events from signed in user

//authentication 
//router.post('/signup', ctrlAuth.register);
//router.post('/login', ctrlAuth.login);

module.exports = router; 