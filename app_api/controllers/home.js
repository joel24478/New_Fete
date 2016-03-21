var mongoose = require('mongoose');
var Loc = mongoose.model('Profile');

var sendJsonResponse = function(res, status, content) {
res.status(status);
res.json(content);
};
module.exports.home = function (req, res) { 
//get all events in radius and in time frame
sendJsonResponse(res, 200, {"status" : "Welcome Home"});
};
// Create an event
module.exports.createEvent = function (req, res) { 
 if (req.params.Userid) {
    Loc
      .findById(req.params.Userid)
      .select('Events')
      .exec(
        function(err, user) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
		    console.log(" got the userid")
            doAddEvent(req, res, user);
          }
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, Userid required"
    });
  }
};
// Sub function for adding an event
var doAddEvent = function(req, res, user) {
  if (!user) {
    sendJsonResponse(res, 404, "Userid not found");
  } else {
    user.Events.push({
	  Name: req.body.name,
	  Description: req.body.description,
	  Location: req.body.location,
	  EventPicture:  req.body.picture, 
	  Pictures: req.body.pictures,
	  Going: 0, 
	  Attended: 0,
	  PostDate: new Date(),
	  Date: req.body.date, 
	  StartTime: String, 
	  EndTime: String, 
	  Public: req.body.public, 
	  coords: req.body.coords 
    });
    user.save(function(err, user) {
      var thisEvent;
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        //updateAverageRating(user._id);
        thisEvent = user.Events[user.Events.length - 1];
        sendJsonResponse(res, 201, thisEvent);
      }
    });
  }
};

//Get a specific event
module.exports.getEvent = function (req, res) { 
// get user, then find the event
if (req.params && req.params.Userid && req.params.Eventid) {
    var OneUser = Loc.findById(req.params.Userid)
	//consoler.log( OnerUser.name); 
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
		    //console.log( user.Events); 
            event = user.Events.id(req.params.Eventid);
            if (!event) {
              sendJsonResponse(res, 404, {
                "message": "Event id not found"
              });
            } else {
              response = {//json object that will be returned
                event: {
				  name: event.Name,
				  description: event.Description,
                  location: event.Location,
				  eventPicture: event.Picture,
                  pictures: event.Pictures,				  
                  going: event.Going, 
                  attended: event.Attended,
				  postDate: event.PostDate,
                  date: event.Date,
				  startTime: event.startTime,
				  EndTIme: event.EndTIme,
                  public: event.Public, 
                  coords: event.coords,
                  id: req.params.Eventid
                },
                //review: review
              };
              sendJsonResponse(res, 200, response);
            }
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

module.exports.updateEvent = function (req, res) { 
	if (!req.params.Userid || !req.params.Eventid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, Userid and Eventid are both required"
    });
    return;
  }
  Loc
    .findById(req.params.Userid)
    .select('Events')
    .exec(
      function(err, user) {
	  //function(err, location) {
        //var thisReview;
		var thisEvent;
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "User id not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (user.Events && user.Events.length > 0) {
          thisEvent = user.Events.id(req.params.Eventid);
          if (!thisEvent) {
            sendJsonResponse(res, 404, {
              "message": "Event id not found"
            });
          } else {
		    //console.log(thisEvent); 
			console.log( req.body.Description)
            thisEvent.Description = req.body.Description;
            thisEvent.Location = req.body.Location;
            thisEvent.Pictures = req.body.Pictures;
            thisEvent.Date = req.body.Date;
			thisEvent.Public = req.body.Public;
			thisEvent.coords =  req.body.coords;
			
			user.save(function(err, user) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                //updateAverageRating(location._id);
                sendJsonResponse(res, 200, thisEvent);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No event to update"
          });
        }
      }
  );
//sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.deleteEvent = function (req, res) { 
if (!req.params.Userid || !req.params.Eventid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, Userid and Eventid are both required"
    });
    return;
  }
  Loc
    .findById(req.params.Userid)
    .select('Events')
    .exec(
      function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "Userid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (user.Events && user.Events.length > 0) {
          if (!user.Events.id(req.params.Eventid)) {
            sendJsonResponse(res, 404, {
              "message": "Eventid not found"
            });
          } else {
            user.Events.id(req.params.Eventid).remove();
            user.save(function(err) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 204, null);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No Event to delete"
          });
        }
      }
  );
//sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.createComment = function (req, res) { 
sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.getComment = function (req, res) { 
sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.updateComment = function (req, res) { 
sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.deleteComment = function (req, res) { 
sendJsonResponse(res, 200, {"status" : "success"});
};