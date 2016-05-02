/*
  File:  app_client/profile/profile.controller.js
  91.462 Project Milestone 
  Angel Calcano, UMass Lowell Computer Science, Angel_Calcano@cs.uml.edu
  Copyright (c) 2016 by Angel Calcano.  All rights reserved.  May be freely 
  copied or excerpted for educational purposes with credit to the author.
  created by AC on Wednesday, ‎April ‎06, ‎2016, ‏‎10:30:53 PM .
*/
(function() {

    angular
        .module('feteApp')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', 'feteData', 'geolocation'];

    function profileCtrl($scope, feteData, geolocation) {
        var vm = this;
        // Format the date
        vm.dateFixer = function(Date) {
            date = Date;
            console.log(date);
            $scope.d = (date.split('-')[0]);
            $scope.m = (date.split('-')[1]);
            $scope.y = (date.split('-')[2]);
            $scope.dd = (date.split('-')[3]);
            console.log($scope.m + "-" + $scope.d + "-" + $scope.y);
            return $scope.m + "-" + $scope.y + "-" + $scope.d;
        }
        vm.formData = {
            Name: "",
            Description: "",
            Location: "",
            Date: "",
            StartTime: "",
            EndTime: "",
            Public: true,
            pos: [0, 0]
        };

        //when the postEvent button clicked
        vm.changeButton = function() {
            console.log("changing postEvent button");
            //change text to submitted so user knows post was made
            $("#postEvent").text("submitted");
            //disable the button after clicked
            $("#postEvent").attr('disabled', true);
        };
        // Grabs form data 
        vm.test = function() {
            // ****need to grab true or false from toggle switch ******
            vm.formError = "";
            console.log(vm.formData);
            if (!vm.formData.Name || !vm.formData.Description || !vm.formData.Location || !vm.formData.Date || !vm.formData.StartTime || !vm.formData.EndTime) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                console.log("form is valid");
                vm.doAddEvent(vm.formData);
                vm.changeButton();
            }
        }; //end of vm.test 
        vm.doAddEvent = function(formData) {
            console.log(" doAddEvent");
            feteData.addEventByUserId({
                    Name: formData.Name,
                    Description: formData.Description,
                    Location: formData.Location,
                    Date: formData.Date,
                    StartTime: formData.StartTime,
                    EndTime: formData.EndTime,
                    Public: formData.Public,
                    coords: formData.pos,
                    EventPicture: ""
                })
                .error(function(data) {
                    vm.formError = "Your event has not been saved, please try again";
                });
            return false;
            //}, 2000);
        };

        vm.getData = function() {
            vm.message = "Getting events";
            feteData.GetMyEvents().success(function(data) {
                    vm.locations = data.events;
                    vm.user = data.user;
                    console.log(vm.user);
                    console.log(vm.locations);
                })
                .error(function(e) {
                    vm.message = "Sorry, something's gone wrong, please try again later";
                });
        };

        vm.getData();
    }

})();
