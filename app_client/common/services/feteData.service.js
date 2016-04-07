(function() {

  angular
    .module('feteApp')
    .service('feteData', feteData);

  feteData.$inject = ['$http', 'authentication'];
  function feteData ($http, authentication) {
    var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
    };
    // userbyid
    var locationById = function (locationid) {
      return $http.get('/api/locations/' + locationid);
    };

    var addReviewById = function (locationid, data) {
      return $http.post('/api/locations/' + locationid + '/reviews', data, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    var GetMyEvents = function () {
      return $http.get('/api/profile/'+ authentication.currentUser()._id);
    };
    var addEventByUserId = function (data) {
    //console.log(  authentication.currentUser()._id ); 
      return $http.post('/api/Home/'+ authentication.currentUser()._id, data, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      locationByCoords : locationByCoords,
      locationById : locationById,
      addReviewById : addReviewById,
      GetMyEvents : GetMyEvents, 
       addEventByUserId :  addEventByUserId
    };
  }

})();