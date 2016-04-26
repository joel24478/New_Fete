/*
  File:  app_client/profile/profile.controller.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  Copyright (c) 2016 by Angel Calcano.  All rights reserved.  May be freely 
  copied or excerpted for educational purposes with credit to the author.
  created by AC on Wednesday, ‎April ‎06, ‎2016, ‏‎10:30:53 PM .
*/
(function () {

  angular
    .module('feteApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$scope' ,'feteData', 'geolocation'];
  function profileCtrl($scope, feteData, geolocation) {
    var vm = this;
    
    
    vm.getData = function () {
      vm.message = "Getting events";
      feteData.GetMyEvents().success(function(data) {
          vm.locations = data.events;
          vm.user = data.user;
          console.log(vm.user);
          console.log(vm.locations);
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
    };
    
   vm.getData();
  }

})();