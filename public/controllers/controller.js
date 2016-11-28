var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/aboutme').success(function(response) {
    console.log("I got the data I requested");
    $scope.aboutme = response;
    $scope.contact = "";
  });
};

refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/aboutme', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};


}]);﻿