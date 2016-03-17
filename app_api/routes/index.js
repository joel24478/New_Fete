//API INDEX

var express = require('express');
var router = express.Router();

var ctrlSignup = require('../controllers/signup'); 
var ctrlHome = require('../controllers/home'); 
var ctrlProfile = require('../controllers/profile');

//Home
//get all events in range distance and time..
//figure out how to include user's name into the path name
router.get('/',ctrlHome.home); //this will be changed to get world's events
router.get('/:Userid/Event/:Eventid',ctrlHome.getEvent);
router.post('/:Userid',ctrlHome.createEvent); 
router.put('/:Userid/Event/:Eventid',ctrlHome.updateEvent);
router.delete('/:Userid/Event/:Eventid',ctrlHome.deleteEvent);
router.get('/:Userid/Event/:Eventid/comments/:Commentid',ctrlHome.getComment);
router.post('/:Userid/Event/:Eventid/comments', ctrlHome.createComment);
router.put('/:Userid/Event/:Eventid/comments/:Commentid',ctrlHome.updateComment); 
router.delete('/:Userid/Event/:Eventid/comments/:Commentid',ctrlHome.deleteComment);

//Sign_up 
//router.get('/login/:Userid', ctrlSignup.getUser); 
router.post('/Signup', ctrlSignup.createUser);

//Login
router.get('/login', ctrlSignup.getUser);

//Event Detail 

//Profile
router.get('/profile/:Userid/Event/:Eventid',ctrlProfile.getMyEvent);
router.get('/profile/:Userid',ctrlProfile.getMyEvents);
router.post('/profile/:Userid',ctrlHome.createEvent); 
router.put('/profile/:Userid/Event/:Eventid',ctrlHome.updateEvent);
router.delete('/profile/:Userid/Event/:Eventid',ctrlHome.deleteEvent);
router.put('/profile/:Userid',ctrlProfile.updateUser);
router.delete('/profile/:Userid',ctrlProfile.deleteUser);
//list all events from signed in user
module.exports = router; 