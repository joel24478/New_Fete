/*
  File:  Fete/public/javascripts/mapHandler.js
  Joel Cruz, UMass Lowell Computer Science, jcruz@student.uml.edu
  Copyright (c) 2016 by Joel Cruz.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author.
  updated by JC on March 27, 2016
*/

//Places information about maps
function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {
            lat: 44.540,
            lng: -78.546
        },
        zoom: 8
    });
}