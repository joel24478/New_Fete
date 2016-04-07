/* 
	Author: Zheondre Angel Calcano
	Created: Monday, March 28, 2016, 5:45:00 PM
	File name: signup.js 
*/
var mongoose = require('mongoose');
var Loc = mongoose.model('Profile');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getUser = function (req, res) { 
//get the user
if (req.params && req.params.Userid) {
    Loc
      .findById(req.params.Userid)
      .exec(function(err, Profile) {
        if (!Profile) {
          sendJsonResponse(res, 404, {
            "message": "User id not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }
		console.log( " hello world");
       // console.log(location);
        sendJsonResponse(res, 200, Profile);
      });
  } else {
  //console.log(location); 
    console.log('No locationid specified');
    sendJsonResponse(res, 404, {
      "message": "No User id in request"
    });
  }
};
//module.exports.getUser = function (req, res) { 
//}; 
module.exports.createUser = function (req, res) { 
console.log(req.body);
  Loc.create({
    hash: "",
    salt: "",
    name: req.body.name,
    email: req.body.email,
    //pw: req.body.pw,
    About: req.body.About,
	Followers: 0,
	Following: 0,
    totalAttended: 0,
	profilepic: req.body.profilepic,
	followersID: [], 
    followingID: [],
	//currentPosition: [0,0],
	Events: [] 
  }, function(err, user) {
    if (err) {
      //console.log(err);
      sendJsonResponse(res, 400, err);
    } else {
      console.log(user);
      sendJsonResponse(res, 201, user);
    }
  });
//sendJsonResponse(res, 200, {"status" : "success"});
};