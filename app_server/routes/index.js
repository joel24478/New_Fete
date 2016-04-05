<<<<<<< HEAD
/* 
	Author: Zheondre Angel Calcano
	Created: Monday, March 28, 2016, 5:45:00 PM
	File name: index.js 
=======
/*
  File:  Fete/app_server/routes/index.js
  Joel Cruz, UMass Lowell Computer Science, jcruz@student.uml.edu
  Copyright (c) 2016 by Joel Cruz.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author.
  updated by JC on March 27, 2016
>>>>>>> master
*/
var express = require('express');
var router = express.Router();
//var ctrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');
var ctrlEvents = require('../controllers/event');
//var ctrlLoginSignup = require('../controllers/loginSignup');

/* GET home page. */
//router.get('/', ctrlMain.index);
//signing up 
//router.get('/signup', ctrlLoginSignup.signup)


/* Locations pages*/
router.get('/', ctrlLocations.angularApp);
router.get('/signup', ctrlLocations.signup)
router.get('/login', ctrlLocations.login);
router.get('/search', ctrlLocations.search);
router.get('/profile/:Userid', ctrlLocations.profile);
router.get('/profile/:Userid/event/:Eventid', ctrlLocations.event);
router.get('/followers', ctrlLocations.followers);
router.get('/index', ctrlLocations.index);
//router.delete('/profile/:Userid/event/:Eventid', ctrlLocations.deleteEvent); 
//change userid to the username

//post event
router.post('/profile/:Userid', ctrlEvents.addEvent);


/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;