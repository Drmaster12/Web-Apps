var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/teams').success(function(response) {
    console.log("I got the data I requested");
    $scope.teams = response;
    $scope.NBA = "";
  });
};

refresh();


$scope.NbaTeams = function ( path ) {
  $location.path( path );
};
$scope.remove = function(id) {
  console.log(id);
  $http.delete('/teams/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/teams/' + id).success(function(response) {
    $scope.NBA = response;
  });
};  

$scope.update = function() {
  console.log($scope.NBA._id);
  $http.put('/teams/' + $scope.NBA._id, $scope.NBA).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.NBA = "";
}

}]);﻿