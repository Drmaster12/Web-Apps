var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/banklist').success(function(response) {
    console.log("I got the data I requested");
    $scope.banklist = response;
    $scope.bankerdb = "";
  });
};

refresh();

$scope.addbankerdb = function() {
  console.log($scope.bankerdb);
  $http.post('/banklist', $scope.bankerdb).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/banklist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/banklist/' + id).success(function(response) {
    $scope.bankerdb = response;
  });
};  

$scope.update = function() {
  console.log($scope.bankerdb._id);
  $http.put('/banklist/' + $scope.bankerdb._id, $scope.bankerdb).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.bankerdb = "";
}

}]);﻿