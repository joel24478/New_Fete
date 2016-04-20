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