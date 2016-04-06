(function () {

  angular
    .module('feteApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['authentication'];
  function profileCtrl( authentication) {
    var vm = this;
/*
    vm.NewEventInfo = { 
        Name: '',
        detail: '',
        username: '',
        user_ID: '',
        profilePicture: '',
        Pictures: [],
        eventTime: '',
        eventEndTime: '',
        eventDate: '',
        PostDate: '',
        Going: 0,
        GoingID: [],
        Invited: [],
        Attend: 0,
        flyer: '',
        Public: true,
        Location: [0,0]    
    
    }
 
    vm.returnPage = '/profile'; // after login go to home page

    vm.getData = function () {
      vm.formError = "";
      console.log( "credentials");
      console.log( vm.credentials); 
      
      vm.data = { 
      user: data.user;
      events: data.events; 
      } 
      
      if (!vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
       console.log( "credentials");
        console.log( vm.credentials); 
        vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){
          $location.search('page', null); 
          $location.path(vm.returnPage);
        });
    };
*/
  }

})();