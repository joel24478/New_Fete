/*
  File:  Fete/app_server/controllers/locations.js
  Joel Cruz, UMass Lowell Computer Science, jcruz@student.uml.edu
  Copyright (c) 2016 by Joel Cruz.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author.
  updated by JC on March 27, 2016
*/

angular
    .module("feteModule", []);

//Handles placing the followers of a user on a page
var followerCtrl = function($scope) {
    $scope.data = {
        followers: [{
            username: 'Mojo-Jojo',
            profilePicture: '/images/user-image-4.jpg'
        }, {
            username: 'Samantha',
            profilePicture: '/images/user-image-3.jpeg'
        }, {
            username: 'Joel',
            profilePicture: '/images/male_model.jpeg'
        }, {
            username: 'Z\'heondre',
            profilePicture: '/images/backend_donkey.jpg'
        }, {
            username: 'Donna',
            profilePicture: '/images/user-image-1.jpeg'
        }, {
            username: 'Christina',
            profilePicture: '/images/user-image-2.jpg'
        }]
    }
}

angular
    .module("feteModule")
    .controller('followerCtrl', followerCtrl);

var signupCtrl = function() {
        // function to submit the form after all validation has occurred            
        // $scope.submitForm = function() {

        // };
    }
    /*
		A function to compares to strings to see if they both match.
		Mainly used for password confirmation
    Will invoke function when the model value changes
    */
var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
            //Adds a method to the ngModel controller’s $validators object. 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

angular
    .module("feteModule", ['ngMessages'])
    .controller('signupCtrl', signupCtrl)
    .directive("compareTo", compareTo);