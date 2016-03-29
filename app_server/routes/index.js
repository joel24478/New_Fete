/*
  File:  Fete/app_server/routes/index.js
  Joel Cruz, UMass Lowell Computer Science, jcruz@student.uml.edu
  Copyright (c) 2016 by Joel Cruz.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author.
  updated by JC on March 27, 2016
*/
var express = require('express');
var router = express.Router();
//var ctrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

/* GET home page. */
//router.get('/', ctrlMain.index);

/* Locations pages*/
router.get('/', ctrlLocations.home);
router.get('/signup', ctrlLocations.signup)
router.get('/login', ctrlLocations.login);
router.get('/search', ctrlLocations.search);
router.get('/profile', ctrlLocations.profile);
router.get('/event', ctrlLocations.event);
router.get('/followers', ctrlLocations.followers);
router.get('/index', ctrlLocations.index);
//!!

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;