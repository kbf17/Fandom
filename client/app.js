var app = angular.module('myApp', ["ngRoute",]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "../views/list.html",
    })
    .when("/single/:id", {
        templateUrl: '../views/single.html',
    })
    .when("/house/:house", {
        templateUrl: '../views/house.html'
    });
})
    .run(function($rootScope){
        $rootScope.api = 'http://localhost:3000/api/characters';
});

app.controller("ListController", ['$rootScope', '$http', '$scope', '$location', function($rootScope, $http, $scope, $location){
    console.log('in my list');
    $http.get($rootScope.api)
    .then(function(response){
        console.log(response.data);
        $scope.listAll = response.data;
    })
    $scope.oneChar = function(id){
        $location.path('/single/' + id)
    };
    $scope.oneHouse = function(house){
        $location.path('/house/' + house)
    };
}]);

app.controller('SingleController', ['$rootScope', '$scope', '$routeParams', '$http', function($rootScope, $scope, $routeParams, $http){
    id = $routeParams.id;    
    $http.get($rootScope.api +'/one/' +id)
    .then(function(response){
        $scope.character = response.data;
        console.log('single loaded');
    })
}])

app.controller('HouseController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', function($scope, $routeParams, $http, $rootScope, $location){
    $rootScope.hideIt = false;
    house = $routeParams.house;
    $http.get($rootScope.api + '/house/' + house)
    .then(function(response){
        console.log(response);
        console.log(response.data);
        $scope.allHouse = response.data;
    })
}])