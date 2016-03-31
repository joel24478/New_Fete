var mongoose = require('mongoose');
var Loc = mongoose.model('Profile');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
/*
module.exports.DoesUserExist = function (req, res) { 
	Loc.find( { email: req.body.email } ).exec( 
	 function(err, user) {
	  console.log(user+"does user exist");
	  var response;
	  if (!user) {
		sendJsonResponse(res, 200, {
		  "User": false,
		  "Email": req.body.email
		});
		return;
	  } else if (err) {
		sendJsonResponse(res, 400, err);
		return;
	  }
	   var response = { User: true }
	   sendJsonResponse(res, 200, response);
	}
)};*/
/*
// get user by email
module.exports.GetUserByEmail = function (req, res) { 
	Loc.find( { email: req.body.email } ).exec(function(err, Profile) {
        if (!Profile) {
          sendJsonResponse(res, 404, {
            "message": "User Email not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, Profile);
      });
  } else {
  //console.log(location); 
    console.log('No email specified');
    sendJsonResponse(res, 404, {
      "message": "No User id in request"
    });
  }
)};
 */
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
	//DateofCreation: new Date(),
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