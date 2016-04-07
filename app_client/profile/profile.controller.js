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