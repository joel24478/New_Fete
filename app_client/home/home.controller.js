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
        pos : [0,0]
    };
    vm.test = function() { 
     //console.log( "testing toggle switch" ); 
     // ****need to grab true or false from toggle switch ******
      vm.formError = "";
      console.log(vm.formData); 
      if (!vm.formData.Name ||  !vm.formData.Description
      || !vm.formData.Location || !vm.formData.Date || !vm.formData.StartTime
      || !vm.formData.EndTime
      ) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        //console.log( vm.formData );
        console.log("form is valid"); 
        vm.doAddEvent( vm.formData );
      }
    }; //end of vm.test 
    vm.doAddEvent = function( formData ) {
    
       console.log(" doAddEvent"); 
          feteData.addEventByUserId({
            Name : formData.Name,
            Description : formData.Description, 
            Location : formData.Location, 
            Date : formData.Date, 
            StartTime : formData.StartTime,
            EndTime : formData.EndTime,
            Public : formData.Public,
            coords : formData.pos, 
            EventPicture:""
            
          })
          .error(function (data) {
              vm.formError = "Your event has not been saved, please try again";
            });
            
            
          return false;
      //}, 2000);
    };
  
  }
})();