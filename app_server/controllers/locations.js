/*
  File:  Fete/app_server/controllers/locations.js
  Joel Cruz, UMass Lowell Computer Science, jcruz@student.uml.edu
  Copyright (c) 2016 by Joel Cruz.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author.
  updated by JC on March 27, 2016
*/
//renders homes page
var renderHome = function(req, res) {
    res.render('home', {
        title: 'Fete',
        subTitle: 'for the Party YOU want',
        profilePicture: 'https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg',
        username: 'Jessica',
        sharing: 'Public',
        eventDescription: 'The Party is going to be wild!',
        eventDate: 'Jun 27, 2016'
    });
};
/* Get home page */
module.exports.home = function(req, res) {
    renderHome(req, res);
};
//renders the signup page
var renderSignUP = function(req, res) {
    res.render('sign-up', {
        title: 'Sign-Up', //Tab title
        pageTitle: 'Get Up-to-Date info on upcomming Parties!',
        background: '/images/signup_backgroundV2.jpg',
        legend: 'Join Fete Today'
    });
};
/* Get sign-up page */
module.exports.signup = function(req, res) {
    renderSignUP(req, res);
};
/* Get login page */
module.exports.login = function(req, res) {
    res.render('login', {
        title: 'Login', //Tab title
        pageTitle: 'Whats New?',
        background: '/images/signup_backgroundV2.jpg',
        panelTitle: 'Login'
    });
};

/* GET search page */
module.exports.search = function(req, res) {
    res.render('search', {
        title: 'Search',
        subTitle: 'for the Party YOU want'
    });
};

/* GET profile page */
module.exports.profile = function(req, res) {
    res.render('profile', {
        title: 'Profile',
        username: 'Jessica',
        profilePicture: 'https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg',
        location: 'SAN ANTONIO, TX',
        twitter: '@' + 'COOLESOCOOL',
        followerCount: '2,784',
        followingCount: '456',
        attendedCount: '400,901'
    });
};
/* GET event page */
module.exports.event = function(req, res) {
    res.render('event', {
        title: 'Event Details',
        username: 'Jessica',
        profilePicture: 'https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg',
        location: 'SAN ANTONIO, TX',
        eventTime: '11:00 PM',
        eventDate: '4/20/2016',
        details: 'Come if you want, but bring a bottle',
        flyer: '/images/august20lawrence.jpg'
    });
};

var renderFollowers = function(req, res) {
    res.render('followers', {
        title: 'Followers'
    });
}

/* GET Followers page */
module.exports.followers = function(req, res) {
    renderFollowers(req, res);
};

/* GET Followers page */
module.exports.index = function(req, res) {
    res.render('index', {
        username: 'Jessica',
        profilePicture: 'https://farm7.staticflickr.com/6163/6195546981_200e87ddaf_b.jpg',
        eventTime: '11:00'
    });
};