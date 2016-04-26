/*
  File:  Fete/public/javascripts/mapHandler.js
  Joel Cruz, UMass Lowell Computer Science, jcruz@student.uml.edu
  Copyright (c) 2016 by Joel Cruz.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author.
  updated by JC on March 27, 2016
*/
// getting map to show your current position
// https://developers.google.com/maps/documentation/javascript/examples/map-geolocation

 var map;
//eventual split functions up to delete and add locations,
//but for now just reload them as a brute force method. 
function setevents( locations ) { 
    //http://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
  console.log( locations + " locations " ); 
  /*  locations = [
   ['50 pawtucket st Lowell Ma', 42.6527101, -71.3188351, 2],
   ['30 University Ave Lowell Ma', 42.6527466, -71.3255797, 2],
   ['15 Hurd st Lowell MA', 42.6428657, -71.3080922, 1]
    ];*/ 
    if (navigator.geolocation) {
 
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: 'https://help.blackberry.com/en/blackberry-z3/current/help/cag1383250505752_hiresdevice_en-us.png',
          zIndex: 10, 
          title: 'Hello World!'
        });
        console.log( ' set pos '); 
        map.setCenter(pos);
      
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    var infowindow = new google.maps.InfoWindow();
       var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
} 
function initMap() {
//need to add an infowindow for my position

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });    
    //setevents(locations);
    setevents([]);  
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
}