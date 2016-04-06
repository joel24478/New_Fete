(function () {

  angular
    .module('feteApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'feteData', 'geolocation'];
  function homeCtrl ($scope, feteData, geolocation) {
    // Nasty IE9 redirect hack (not recommended)
    if (window.location.pathname !== '/home') {
      window.location.href = '/#' + window.location.pathname;
    }
    var vm = this;
    vm.formData = {
        Name : "",
        Description : "", 
        Location : "", 
        Date : "", 
        StartTime : "",
        EndTime : "",
        Public : true,
        coords : ""
    };
    console.log(window.location);
    vm.message = "Checking your location";

    vm.onSubmit = function () {
    // ****need to grab true or false from toggle switch ******
      vm.formError = "";
      if (!vm.formData.Name ||  !vm.formData.Description
      || !vm.formData.Location || !vm.formData.Date || !vm.formData.StartTime
      || !vm.formData.EndTime
      ) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        //console.log( vm.formData ); 
        vm.doAddEvent( vm.formData );
      }
    };
    vm.doAddEvent = function ( formData ) {
        vm.coords = [0,0];
        console.log( google.geocode(formData.Location, function ( err, data) {
        //warning this function is asynchronous 
            console.log( Number(data.results[0].geometry.location.lat));
            console.log( data.results[0].geometry.location.lng); 
            cord[0] = Number(data.results[0].geometry.location.lat); 
            cord[1] = Number(data.results[0].geometry.location.lng);
        }));
        //console.log(coords); 
        setTimeout(function(){
          feteData.addEventByUserId({
            Name : formData.Name,
            Description : formData.Description, 
            Location : formData.Location, 
            Date : formData.Date, 
            StartTime : formData.StartTime,
            EndTime : formData.EndTime,
            Public : formData.Public,
            coords : coords, 
            EventPicture:""
            
          })
            .error(function (data) {
              vm.formError = "Your event has not been saved, please try again";
            });
          return false;
      }, 2000);
    };

    vm.getData = function (position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude;
      vm.message = "Searching for nearby places";
      feteData.locationByCoords(lat, lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { locations: data };
          console.log(vm.data);
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function() {
        vm.message = "Geolocation is not supported by this browser.";
      });
    };

    geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);

  }

})();