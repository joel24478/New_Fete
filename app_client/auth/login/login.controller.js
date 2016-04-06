(function () {

  angular
    .module('feteApp')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location','authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in to Fete'
    };

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/home'; // after login go to home page

    vm.onSubmit = function () {
      vm.formError = "";
      console.log( "credentials");
      console.log( vm.credentials); 
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
            console.log("logging in"); 
          $location.path(vm.returnPage);
        });
    };

  }

})();