var mongoose = require('mongoose');
var Loc = mongoose.model('Profile');
//https://www.geodatasource.com/developers/javascript
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at http://www.geodatasource.com                          :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: http://www.geodatasource.com                        :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2015            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//https://github.com/simonholmes/getting-MEAN/blob/chapter-11/app_api/controllers/locations.js
function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET list of locations */
module.exports.locationsListByDistance = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var maxDistance = parseFloat(req.query.maxDistance);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };

  if ((!lng && lng!==0) || (!lat && lat!==0) || ! maxDistance) {
    console.log('locationsListByDistance missing params');
    sendJSONresponse(res, 404, {
      "message": "lng, lat and maxDistance query parameters are all required"
    });
    return;
  }
  range = 0; 
  
    var stream = Loc.find().stream();
    var locations = [];
    
    stream.on('data', function (doc) {
     
        for (var i = 0; i < doc.Events.length; i++) {
          
          var Event = doc.Events[i];
          range = distance(lat, lng, Event.coords[1], Event.coords[0], 'M');
          //console.log(range); 
          if( range <= maxDistance && Event.Public == true ) { 
              locations.push(Event); 
          }
        }
        //console.log(locations);
    }).on('error', function (err) {
        sendJSONresponse(res, 400, err);
        return;
          // handle the error
    }).on('close', function () {
     // organize array to show the newest post
     // http://stackoverflow.com/questions/7555025/jquery-fastest-way-to-sort-an-array-by-timestamp
    locations.sort(function(x, y){
        return y.PostDate - x.PostDate;
    })
      console.log( locations ); 
    
    sendJSONresponse(res, 200, locations);
      // the stream is closed
    });
  
};