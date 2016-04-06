(function () {

  angular
    .module('feteApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$scope' ,'feteData', 'geolocation'];
  function profileCtrl($scope, feteData, geolocation) {
    var vm = this;
    feteData.GetMyEvents();
  }

})();