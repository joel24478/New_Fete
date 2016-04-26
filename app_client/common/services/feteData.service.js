/*
  File:  app_client/common/services/feteData.service.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  created by Simon Homles
  https://github.com/simonholmes/getting-MEAN/tree/chapter-11
*/
(function() {

  angular
    .module('feteApp')
    .service('feteData', feteData);

  feteData.$inject = ['$http', 'authentication'];
  function feteData ($http, authentication) {
  
    var events = [] ;
  
    var locationByCoords = function (lat, lng, Distance) { //pass public in the html param
      return $http.get('/api/distance?lng=' + lng + '&lat=' + lat + '&maxDistance='+ Distance);
    };//add userid to check if the user was invited to a public event
    
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
     events =  $http.get('/api/profile/'+ authentication.currentUser()._id);
     return events; 
    };
    
    var getPublicEvents = function () {
    //console.log(  authentication.currentUser()._id ); 
    return $http.get('/api/Home/'+ authentication.currentUser()._id);
    };
    
    var addEventByUserId = function (data) {
    //console.log(  authentication.currentUser()._id ); 
      return $http.post('/api/Home/'+ authentication.currentUser()._id, data, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
    
    var deleteEvent = function( eventID ) { 
        return $http.delete('/api/profile/'+ authentication.currentUser()._id +'/Event/' + eventID);
    headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
   } 

    return {
      locationByCoords : locationByCoords,
      locationById : locationById,
      addReviewById : addReviewById,
      GetMyEvents : GetMyEvents,
      getPublicEvents : getPublicEvents,
      addEventByUserId :  addEventByUserId, 
      deleteEvent : deleteEvent
    };
  }

})();