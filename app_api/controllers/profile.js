var mongoose = require('mongoose');
var Loc = mongoose.model('Profile');

var sendJsonResponse = function(res, status, content) {
res.status(status);
res.json(content);
};

//Get all user's events 
module.exports.getMyEvents = function (req, res) { 
// get user, then find the event
if (req.params && req.params.Userid) {
    Loc
      .findById(req.params.Userid)
      .select('Events')
      .exec(
        function(err, user) {
          //console.log(user);
          var response, event;
          if (!user) {
            sendJsonResponse(res, 404, {
              "message": " User id not found"
            });
            return;
          } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }
          if (user.Events && user.Events.length > 0) {
		  var response = []; 
			  user.Events.forEach( function(doc){
			  response.push({//json array object will be returned
				  description: doc.Description,
                  location: doc.Location,
                  pictures: doc.Pictures, 
                  going: doc.Going, 
                  attended: doc.Attended, 
                  date: doc.Date, 
                  public: doc.Public, 
                  coords: doc.coords,
                  id: req.params.Eventid
				});
              });
              sendJsonResponse(res, 200, response);
          } else {
            sendJsonResponse(res, 404, {
              "message": "No Events found"
            });
          }
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, Userid and Eventid are both required"
    });
  }
};

//Delete account
module.exports.deleteUser = function(req, res) {
  var userid = req.params.Userid;
  if (userid) {
    Loc
      .findByIdAndRemove(userid)
      .exec(
        function(err, user) {
          if (err) {
            console.log(err);
            sendJsonResponse(res, 404, err);
            return;
          }
          console.log("Location id " + userid + " deleted");
          sendJsonResponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No Userid"
    });
  }
};
//edit user
module.exports.updateUser = function(req, res) {
  if (!req.params.Userid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, Userid is required"
    });
    return;
  }
  Loc
    .findById(req.params.Userid)
    //.select('-reviews -rating')
    .exec(
      function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
		console.log( req.body.name);
        user.name = req.body.name;
        user.email = req.body.email;
        user.pw = req.body.pw;
        user.About = req.body.About;
  
        user.save(function(err, location) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, location);
          }
        });
      }
  );
};