/*
  File:  app_client/common/directives/navigation/navigation.controller.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  Copyright (c) 2016 by Angel Calcano.  All rights reserved.  May be freely 
  copied or excerpted for educational purposes with credit to the author.
  created by AC on ‎Tuesday, ‎April ‎05, ‎2016, ‏‎11:43:59 AM.
*/
(function () {

  angular
    .module('feteApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authentication'];
  function navigationCtrl($location, authentication) {
    var vm = this;

    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
      authentication.logout();
      $location.path('/login');
    };

  }
})();