/*
  File:  app_client/auth/login/login.controller.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  created by Simon Homles
  https://github.com/simonholmes/getting-MEAN/tree/chapter-11
*/

var request = require("request"); 
var apiOptions = {
server : "http://localhost:3000"
};

var DoesUserAlreadyExist = function( req, res, callback ) { 
  //check if the email is in the database if not create the user
  var requestOptions, path;
  //path = '/api/sign-up'; 
  postdata  = { name: req.body.name	};
  requestOptions = {
	url : apiOptions.server + path,
	method : "GET",
	json : postdata
	};
  //console.log( requestOptions ); 
  request(
    requestOptions,
    function(err, response, body) { callback(req, res, body);}
  );
} 
var MakeNewAccount = function(req, res, callback) {
var requestOptions, path;
  //path = '/api/Signup'; 
  postdata  = {
    name:  req.body.name,
	email: req.body.email,
	pw:    req.body.pw
  };
  requestOptions = {
	url : apiOptions.server + path,
	method : "POST",
	json : postdata
	};
  //console.log( requestOptions ); 
  request(
    requestOptions,
    function(err, response, body) {
      callback(req, res, body);
    }
  );
}; 
 // Sign up the user, if successful bring user to login.
module.exports.signup = function(req, res) {
	DoesUserAlreadyExist( req, res, function( req, res,responseData) { 
		if( responseData.User == false ) { 
			//create new user
			MakeNewAccount(req, res, responseData);
			//redirect to login page
            res.render('login', {email: responseData.email});
			res.redirect('/login');
		} else { //say sorry a user has registered an account with that email. 
			res.render('sign-up', {
				title: 'Sign-Up', //Tab title
				pageTitle: 'Get Up-to-Date info on upcomming Parties!',
				background: '/images/signup_backgroundV2.jpg',
				legend: 'Join Fete Today', 
				message: 'An account exists with that email, try again' 
			});
		}	 
	//renderProfilepage( req, res, responseData);
	});
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
var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};