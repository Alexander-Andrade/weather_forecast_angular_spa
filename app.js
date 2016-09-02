//MODULE
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource'])

//ROUTES
weatherApp.config(function ($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});


//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);


weatherApp.controller('forecastController', ['$scope', 'cityService','$resource', function($scope, cityService, $resource){
    $scope.city = cityService.city;
    
    $scope.datatimeAPI = $resource("http://date.jsontest.com")
    $scope.datetimeResults = $scope.datatimeAPI.get({});

    $scope.convertToDate = function(date) {
        return new Date(date);
    }
}]);

//SERVICES
weatherApp.service('cityService', function(){
    this.city = "New York, NY";
});