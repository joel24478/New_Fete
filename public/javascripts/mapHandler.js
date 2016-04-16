/*
  File:  Fete/public/javascripts/mapHandler.js
  Joel Cruz, UMass Lowell Computer Science, jcruz@student.uml.edu
  Copyright (c) 2016 by Joel Cruz.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author.
  updated by JC on March 27, 2016
*/

// getting map to show your current position
// https://developers.google.com/maps/documentation/javascript/examples/map-geolocation

//Places information about maps

// Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.

 //need a function to set more locations to map
 
var map;

function setevents(map) { 
    //http://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
//console.log( map ); 
    var locations = [
      //['276 BROADWAY STREET, LOWELL, MA', -71.320167, 42.64389, 3],
      ['30 University Ave Lowell Ma', -71.143692, 42.698564, 1]
      //['15 Hurd st Lowell MA', -71.307279, 42.642733, 1]
    ];

     var infowindow = new google.maps.InfoWindow();
     var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      infowindow.setContent(locations[i][0]);
      infowindow.open(map, marker);

    }
} 
function initMap() {
     map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 12
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('My location');
        map.setCenter(pos);
        setevents(map); 
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
}
