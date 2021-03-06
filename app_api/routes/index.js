//API INDEX
/* 
  Author: Zheondre Angel Calcano
  File:  app_api/routes/index.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  Copyright (c) 2016 by Angel Calcano.  All rights reserved.  May be freely 
  copied or excerpted for educational purposes with credit to the author.
*/
var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var ctrlSignup = require('../controllers/signup'); 
var ctrlHome = require('../controllers/home'); 
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlDistance = require('../controllers/distance'); 

router.get('/distance', ctrlDistance.locationsListByDistance);

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
router.post('/Home/:Userid', auth, ctrlHome.createEvent); 
router.get('/Home/:Userid',  ctrlHome.getPublicEvents); 
router.put('/Home/:Userid/Event/:Eventid', auth, ctrlHome.updateEvent);
router.delete('/Home/:Userid/Event/:Eventid', auth, ctrlHome.deleteEvent);
router.get('/Home/:Userid/Event/:Eventid/comments/:Commentid',ctrlHome.getComment);
router.post('/Home/:Userid/Event/:Eventid/comments', auth, ctrlHome.createComment);
router.put('/Home/:Userid/Event/:Eventid/comments/:Commentid', auth, ctrlHome.updateComment); 
router.delete('/Home/:Userid/Event/:Eventid/comments/:Commentid', auth, ctrlHome.deleteComment);

//Profile
router.get('/profile/:Userid/Event/:Eventid',ctrlHome.getEvent);
router.get('/profile/:Userid',ctrlProfile.getMyEvents);
router.post('/profile/:Userid', auth, ctrlHome.createEvent); 
router.put('/profile/:Userid/Event/:Eventid', auth, ctrlHome.updateEvent);
router.delete('/profile/:Userid/Event/:Eventid', auth, ctrlHome.deleteEvent);
router.put('/profile/:Userid', auth, ctrlProfile.updateUser);
router.delete('/profile/:Userid', auth, ctrlProfile.deleteUser);
//list all events from signed in user

module.exports = router; 