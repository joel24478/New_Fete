/* 
	Author: Zheondre Angel Calcano
	Created: Monday, March 28, 2016, 5:45:00 PM
	File name: event.js 
*/

// https://www.npmjs.com/package/geocoder
var google = require('geocoder');
var request = require("request"); 
var apiOptions = {
server : "http://localhost:3000"
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
//Update event 
/*module.exports.UpdateEvent = function(req, res){
	// get info from page
	// figure out how to change data on page
	// submit it to db

}
*/ 
//Delete an Event             
module.exports.DeleteEvent = function(req, res){

var requestOptions, path;
  path = "/api/profile/" + req.params.Useriid + "/Event/" + req.params.Eventid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "Delete",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      //var data = body;
      if (response.statusCode === 200) {
        //callback(req, res, data);
		console.log(" Event deleted" ); 
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
}
 
/* POST 'Add event' */
// who is the author of the event ????
module.exports.addEvent = function(req, res){
// CALL FUNCTION TO GET ADDRESS AND CONVER TO CORDINATES
// CHECK IF location is NULL IF SOO ADD [0,0]
// if profile pic is null set a default one
  var requestOptions, path, locationid, postdata;
  var cord = [0,0]
	console.log( google.geocode(req.body.Location, function ( err, data) {
	//warning this function is asynchronous 
		console.log( Number(data.results[0].geometry.location.lat));
		console.log( data.results[0].geometry.location.lng); 
		cord[0] = Number(data.results[0].geometry.location.lat); 
		cord[1] = Number(data.results[0].geometry.location.lng);
	}));
	setTimeout(function(){
	  console.log( cord);
	  locationid = req.params.Userid;
	  path = "/api/profile/" + locationid;
	  postdata = {
		Name: req.body.Name,
		Description:  req.body.Description,
		Location:  req.body.Location,
		EventPicture: req.body.EventPicture,
		StartTime: req.body.StartTime, 
		EndTime: req.body.EndTime,
		Date: req.body.Date,
		Public: req.body.Public,
		coords: cord
	  };
	//}, 2000);
	console.log(postdata); 
  //console.log( req.body); 
  console.log(" Add Event" ); 
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.Name || !postdata.Location || !postdata.Date || !postdata.Public) {
    res.redirect('/profile/' + locationid + '/new?err=val');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/profile/' + locationid);
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/profile/' + locationid + '/new?err=val');
        } else {
          //console.log(body);
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
  }, 2000);
};