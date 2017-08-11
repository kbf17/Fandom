var app = angular.module('myApp', ["ngRoute",]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/characters", {
        templateUrl : "../views/list.html",
        controller: "ListController"
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

app.controller("ListController", ['$rootScope', function(){
    console.log('in my list');
    $http.get($rootScope.api)
    .then(function(response){
        $scope.characterList = response.data;
        console.log(characterList);
    })
}]);