var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/players').success(function(response) {
    console.log("I got the data I requested");
    $scope.players = response;
    $scope.NBA = "";
  });
};

refresh();

$scope.addNBA = function() {
  console.log($scope.NBA);
  $http.post('/players', $scope.NBA).success(function(response) {
    console.log(response);
    refresh();
  });
};
$scope.NbaPlayers = function ( path ) {
  $location.path( path );
};
$scope.remove = function(id) {
  console.log(id);
  $http.delete('/players/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/players/' + id).success(function(response) {
    $scope.NBA = response;
  });
};  

$scope.update = function() {
  console.log($scope.NBA._id);
  $http.put('/players/' + $scope.NBA._id, $scope.NBA).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.NBA = "";
}

}]);﻿