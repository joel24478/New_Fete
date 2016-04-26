/*
  File:  app_client/common/directives/footerGeneric/footerGeneric.directive.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  Copyright (c) 2016 by Angel Calcano.  All rights reserved.  May be freely 
  copied or excerpted for educational purposes with credit to the author.
  created by AC on ‎Wednesday, ‎April ‎06, ‎2016, ‏‎10:30:53 PM.
*/

(function () {

  angular
    .module('feteApp')
    .directive('footerGeneric', footerGeneric);

  function footerGeneric () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/footerGeneric/footerGeneric.template.html'
    };
  }

})();