/*
  File:  app_client/common/filters/formatDistance.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  created by Simon Homles
  https://github.com/simonholmes/getting-MEAN/tree/chapter-11
*/
(function () {

  angular
    .module('feteApp')
    .filter('formatDistance', formatDistance);

  var _isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  function formatDistance () {
    return function (distance) {
      var numDistance, unit;
      if (distance && _isNumeric(distance)) {
        if (distance > 1) {
          numDistance = parseFloat(distance).toFixed(1);
          unit = 'km';
        } else {
          numDistance = parseInt(distance * 1000,10);
          unit = 'm';
        }
        return numDistance + unit;
      } else {
        return "?";
      }
    };
  }


})();