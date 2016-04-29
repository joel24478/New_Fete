/*
  File:  app_client/home/home.controller.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  Copyright (c) 2016 by Angel Calcano.  All rights reserved.  May be freely 
  copied or excerpted for educational purposes with credit to the author.
  created by AC on ‎Tuesday, ‎April ‎05, ‎2016, ‏‎11:43:59 AM.
*/

//var google = require('geocoder');
//http://stackoverflow.com/questions/33166268/retrieve-current-location-in-javascript-using-ng-map-angularjs-google-maps

// using the google map plugin with angular
// http://stackoverflow.com/questions/25838452/angular-google-maps-center-zoom-multiple-markers

(function() {

    angular
        .module('feteApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'feteData', 'geolocation', '$window'];

    function homeCtrl($scope, feteData, geolocation, $window) {

        // Nasty IE9 redirect hack (not recommended)
        if (window.location.pathname !== '/home') {
            window.location.href = '/#' + window.location.pathname;
        }
        var vm = this;
        vm.googleMap = null;
        vm.mapMarkers = [];
        vm.currentpos;

        vm.dateFixer = function(Date) {


            date = Date;
            console.log(date);
            $scope.d = (date.split('-')[0]);
            $scope.m = (date.split('-')[1]);
            $scope.y = (date.split('-')[2]);
            $scope.dd = (date.split('-')[3]);
            console.log($scope.m + "-" + $scope.d + "-" + $scope.y);
            return $scope.m + "-" + $scope.y + "-" + $scope.d;

        }

        vm.formData = {
            Name: "",
            Description: "",
            Location: "",
            Date: "",
            StartTime: "",
            EndTime: "",
            Public: true,
            pos: [0, 0]
        };

        //when the postEvent button clicked
        vm.changeButton = function() {
            console.log("changing postEvent button");
            //change text to submitted so user knows post was made
            $("#postEvent").text("submitted");
            //disable the button after clicked
            $("#postEvent").attr('disabled', true);
        };

        vm.test = function() {
            // ****need to grab true or false from toggle switch ******
            vm.formError = "";
            console.log(vm.formData);
            if (!vm.formData.Name || !vm.formData.Description || !vm.formData.Location || !vm.formData.Date || !vm.formData.StartTime || !vm.formData.EndTime) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                console.log("form is valid");
                vm.doAddEvent(vm.formData);
                vm.changeButton();
            }
        }; //end of vm.test 
        vm.doAddEvent = function(formData) {
            console.log(" doAddEvent");
            feteData.addEventByUserId({
                    Name: formData.Name,
                    Description: formData.Description,
                    Location: formData.Location,
                    Date: formData.Date,
                    StartTime: formData.StartTime,
                    EndTime: formData.EndTime,
                    Public: formData.Public,
                    coords: formData.pos,
                    EventPicture: ""
                })
                .error(function(data) {
                    vm.formError = "Your event has not been saved, please try again";
                });
            return false;
            //}, 2000);
        };
        vm.getData = function() {
            vm.message = "Getting events";
            var options = {
                enableHighAccuracy: true
            };
            navigator.geolocation.getCurrentPosition(function(pos) {
                    feteData.locationByCoords(pos.coords.latitude, pos.coords.longitude, 10).success(function(data) {
                            vm.locations = data;
                            addMarkers(data);
                            //console.log(vm.locations);
                        })
                        .error(function(e) {
                            vm.message = "Sorry, something's gone wrong, please try again later";
                        });
                },
                function(error) {
                    alert('Unable to get location: ' + error.message);
                }, options);
        };

        vm.deleteEvent = function() {
            vm.message = " Event Deleted";
            feteDate.deleteEvent();
        }
        vm.getData();

        var onSuccess = function(position) {
            vm.userLocation.coords.latitude = position.coords.latitude;
            vm.userLocation.coords.longitude = position.coords.longitude;

            initializeMap();
        };

        var onError = function(error) {
            alert('code: ' + error.code + '\n' + 'message: ' + error.message);
        };

        vm.userLocation = {
            id: "home",
            title: "home",
            coords: {
                latitude: 33.636727,
                longitude: -83.920702
            },
            options: {
                animation: google.maps.Animation.BOUNCE
            }
        };

        var addMarkers = function(events) {
            //add a custom  for user's position
            var userLocation = new google.maps.Marker({
                map: vm.googleMap,
                icon: 'https://cdn0.iconfinder.com/data/icons/project-management-1-1/24/46-48.png',
                position: new google.maps.LatLng(vm.userLocation.coords.latitude, vm.userLocation.coords.longitude),
                //animation: vm.userLocation.options.animation,
                title: vm.userLocation.title
            });

            vm.mapMarkers.push(userLocation);

            angular.forEach(events, function(location, index) {
                console.log(events);
                var marker = new google.maps.Marker({
                    map: vm.googleMap,
                    position: new google.maps.LatLng(location.coords[1], location.coords[0]),
                    title: location.Name
                });

                google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                    return function() {
                        //show name and address ? 
                        infowindow.setContent(location.Name);
                        infowindow.open(map, marker);
                    }
                })(marker, i));

                vm.mapMarkers.push(marker);
            });

            var bounds = new google.maps.LatLngBounds();

            for (var i = 0; i < vm.mapMarkers.length; i++) {

                bounds.extend(vm.mapMarkers[i].getPosition());
            }
            vm.googleMap.setCenter(bounds.getCenter());
            vm.googleMap.fitBounds(bounds);
            //remove one zoom level to ensure no marker is on the edge.
            vm.googleMap.setZoom(vm.googleMap.getZoom() - 1);

            // set a minimum zoom
            // if you got only 1 marker or all markers are on the same address map will be zoomed too much.
            if (vm.googleMap.getZoom() > 15) {
                vm.googleMap.setZoom(15);
            }
        };

        var initializeMap = function() {
            var mapOptions = {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 12,
                center: new google.maps.LatLng(vm.userLocation.coords.latitude, vm.userLocation.coords.longitude)
            };
            var div = document.getElementById("map");
            //var map = plugin.google.maps.Map.getMap(div, mapOptions);
            vm.googleMap = new google.maps.Map(div, mapOptions);
            addMarkers([]);

            var width = screen.width;
            var height = screen.height;
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
})();