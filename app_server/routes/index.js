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
router.get('/', ctrlLocations.home);
router.get('/signup', ctrlLocations.signup)
router.get('/login', ctrlLocations.login);
router.get('/search', ctrlLocations.search);
router.get('/profile/:Userid', ctrlLocations.profile);
router.get('/profile/:Userid/event/:Eventid', ctrlLocations.event);
router.get('/followers', ctrlLocations.followers);
router.get('/index', ctrlLocations.index);
//change userid to the username

//post event
router.post('/profile/:Userid', ctrlEvents.addEvent);


/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;