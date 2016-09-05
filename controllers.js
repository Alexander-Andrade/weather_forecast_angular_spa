//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);


weatherApp.controller('forecastController', ['$scope', 'cityService','$resource','$routeParams', function($scope, cityService, $resource, $routeParams){
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || 1;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{ callback: "JSON_CALLBACK" },
    { get: { method: "JSONP" }});                             
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days, APPID: '37b5e7453f611efeb863eb2a05883622'});
    
    console.log($scope.weatherResult)
    
    $scope.convertToDate = function(date) {
        return new Date(date * 1000);
    }
    
    $scope.convertToCelsius = function(degK){
        return Math.round(degK - 273.15);
    }
    $scope.isEqToParamsDays = function(days){
        return days == $scope.days
    }
}]);
