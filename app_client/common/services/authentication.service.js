/*
  File:  app_client/common/services/.controller.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  created by Simon Homles
  https://github.com/simonholmes/getting-MEAN/tree/chapter-11
*/
(function () {

  angular
    .module('feteApp')
    .service('authentication', authentication);
    console.log("reg"); 
  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {
console.log( "authentication"); 
    var saveToken = function (token) {
      $window.localStorage['fete-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['fete-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        console.log("user id " + payload._id); 
        //var id = payload._id;
        return {
          email : payload.email,
          name : payload.name,
          _id : payload._id
        };// grab id
      }
    };

    register = function(user) {
      return $http.post('/api/signup', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {
        console.log("calling login api"); 
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('fete-token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  }


})();