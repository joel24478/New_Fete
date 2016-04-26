/*
  File:  app_client/common/services/geolocation.service.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  created by Simon Homles
  https://github.com/simonholmes/getting-MEAN/tree/chapter-11
*/

(function () {

  angular
    .module('feteApp')
    .service('geolocation', geolocation);
function hello(){ 
return 'hello';
} 
  function geolocation() {
    var getPosition = function (cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
      }
      else {
        cbNoGeo();
      }
    };
    return {
      getPosition : getPosition
    };
  }


})();