/*
	File:  app_client/app.js
	COMP 4620 Project: Fete
	Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
	Copyright (c) 2016 by Angel Calcano.  All rights reserved.  May be freely 
	copied or excerpted for educational purposes with credit to the author.
	created by AC on 4/2/2016.
*/
//https://github.com/simonholmes/getting-MEAN/blob/chapter-09/app_client/app.js
(function () {

  angular.module('feteApp', ['ngRoute',  'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .when('/location/:locationid', {
        templateUrl: 'locationDetail/locationDetail.view.html',
        controller: 'locationDetailCtrl',
        controllerAs: 'vm'
      })
      .when('/signup', {
        templateUrl: 'auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: 'profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
     
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  angular
    .module('feteApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();