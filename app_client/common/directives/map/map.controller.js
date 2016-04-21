(function () {

  angular
    .module('feteApp')
    .controller('mapCtrl', mapCtrl);

  mapCtrl.$inject = [ '$location', '$scope', 'authentication'];
  function mapCtrl( $location, $scope, authentication) {
    
    
    
    //var ll = new google.maps.LatLng(13.0810, 80.2740);
    $scope.mapOptions = {
        center: ll,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    $scope.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });    
    $scope.loadScript = function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.google.com/maps/api/js?sensor=false&callback=initialize';
        document.body.appendChild(script);
        setTimeout(function() {
            $scope.initialize();
        }, 500);
    }    
    
    var vm = this;
    vm.currentPath = $location.path();
  }
})();