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
(function () {

  angular
    .module('feteApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'feteData', 'geolocation', '$window' ];
  function homeCtrl ($scope, feteData, geolocation, $window ) {

    // Nasty IE9 redirect hack (not recommended)
    if (window.location.pathname !== '/home') {
      window.location.href = '/#' + window.location.pathname;
    }
    var vm = this;

    vm.formData = {
        Name : "",
        Description : "", 
        Location : "", 
        Date : "", 
        StartTime : "",
        EndTime : "",
        Public : true,
        pos : [0,0]
    };
    vm.test = function() { 
     // ****need to grab true or false from toggle switch ******
      vm.formError = "";
      console.log(vm.formData); 
      if (!vm.formData.Name ||  !vm.formData.Description
      || !vm.formData.Location || !vm.formData.Date || !vm.formData.StartTime
      || !vm.formData.EndTime
      ) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        console.log("form is valid"); 
        vm.doAddEvent( vm.formData );
      }
    }; //end of vm.test 
    vm.doAddEvent = function( formData ) {
       console.log(" doAddEvent"); 
          feteData.addEventByUserId({
            Name : formData.Name,
            Description : formData.Description, 
            Location : formData.Location, 
            Date : formData.Date, 
            StartTime : formData.StartTime,
            EndTime : formData.EndTime,
            Public : formData.Public,
            coords : formData.pos, 
            EventPicture:""
          })
          .error(function (data) {
              vm.formError = "Your event has not been saved, please try again";
            });
          return false;
      //}, 2000);
    };
    vm.getData = function () {
      vm.message = "Getting events";
      var options = {
          enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(function(pos) {
        feteData.locationByCoords( pos.coords.latitude, pos.coords.longitude,  10 ).success(function(data) {
          vm.locations = data;
          //console.log(vm.locations);
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });                 
      }, 
      function(error) {                    
          alert('Unable to get location: ' + error.message);
      }, options);
    };
    
   vm.deleteEvent = function(){ 
       vm.message = " Event Deleted"; 
       feteDate.deleteEvent();   
   }
   vm.getData();
  }
})();