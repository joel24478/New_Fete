(function () {

  angular
    .module('feteApp')
    .directive('map', map);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/map/map.template.html',
      controller: 'mapCtrl as navvm'
    };
  }

})();