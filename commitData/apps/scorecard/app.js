var scApp = angular.module('scApp', ['ngRoute']);

scApp.config(function ($routeProvider) {
    $routeProvider
        .when('/:Id', {
            controller: 'myC',
            //templateUrl: "app.html"
        });
        //.otherwise({ redirectTo: '/' });
});

scApp.controller('myC', function ($scope, $routeParams) {
    $scope.currentSlide = $routeParams.Id;
    console.log($routeParams.Id);
    console.log("fuck me");

    $scope.keyDown = function () {

    }
});










//.config(['$routeProvider', function ($routeProvider) {
//    $routeProvider
//      .when('/:productId', {
//          controller: 'myC'
//      });
//}])
//.controller('myC', ['$scope', '$http', "$routeParams",
//       function($scope,$http,$routeParams) {
//           $scope.currentSlide = $routeParams.productId;
//}]);



//.controller('myC', function ($scope, $routeParams) {
//    $scope.currentSlide = $routeParams.productId;


//    $scope.keyDown = function () {

//    }
//});