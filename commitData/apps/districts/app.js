var districtApp = angular.module('districtsApp', ['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider
        .when('/line', {
            controller: 'LineCtrl',
            templateUrl: '../../dashboardTemplates/line.html'
        })
        .when('/bar', {
            controller: 'BarCtrl',
            templateUrl: '../../dashboardTemplates/bar.html'
        })
        .when('/bar-two', {
            controller: 'BarTwoCtrl',
            templateUrl: '../../dashboardTemplates/bartwo.html'
        })
        .when('/stacked', {
            controller: 'StackedCtrl',
            templateUrl: '../../dashboardTemplates/stacked.html'
        })
        .when('/pie', {
            controller: 'PieCtrl',
            templateUrl: '../../dashboardTemplates/pie.html'
        })
        .when('/hope', {
            controller: 'HopeCtrl',
            templateUrl: '../../dashboardTemplates/hope.html'
        })
        .when('/teacher-exp', {
            controller: 'TeacherExpCtrl',
            templateUrl: '../../dashboardTemplates/teacherexp.html'
        })
        .otherwise({
            redirectTo: '/stacked'
        });
})
.factory('dataFactory', ['$http', function($http) {
    var someStringValue = '@(ViewBag.district)';
    console.log("somestring");
    console.log(someStringValue);
    //var someNumericValue = @(ViewBag.someNumericValue);
    console.log($("#text").html());

    var urlBase = "/api/dashData?district=";
    var dataFactory = {};

    var di = $("#text").html();

    dataFactory.getCustomers = function () {
        return $http.get(urlBase+di);
    };
    return dataFactory;
}])
//.factory('userInfo', function ($http) {
//    var promise = $http.get("/api/dashData?district=MESQUITE ISD").
//    success(function (data) {
//        //var userInfo = data.user[0];
//        //return userInfo;
//        return data;
//    });
//    return promise;
//})
.controller('LineCtrl', function () {
    //var model = new LineModel(settings);
    //model.initPage();
})
.controller('BarCtrl', function ($scope) {
    console.log("work?");
    //var model = new BarModel(settings);
    //model.initPage();
})
.controller('BarTwoCtrl', function () {
    //var model = new BarTwoModel(settings);
    //model.initPage();
})
.controller('StackedCtrl', function ($scope, dataFactory) {
    //console.log("from controller");
    //console.log(origData);
    //var model = new StackedModel(settings);
    //model.initPage();

    //userInfo.then(function (data) {
    //    //$scope.user = data;
    //    console.log("data from userInfo");
    //    console.log(data);
    //    var model = new StackedModel(data);
    //    model.initPage();
    //});

   // var di = $("#text").html();

    dataFactory.getCustomers()
        .success(function (data) {
            console.log("got here");
            console.log(data);
                var model = new StackedModel(data);
                model.initPage();
            //$scope.status = 'Updated Customer! Refreshing customer list.';
        })
        .error(function (error) {
            console.log("great");
           // $scope.status = 'Unable to update customer: ' + error.message;
        });

})
.controller('PieCtrl', function () {
    //var model = new PieModel(settings);
    //model.initPage();
})
.controller('HopeCtrl', function () {
    //var model = new HopeModel(settings);
    //model.initPage();
})
.controller('TeacherExpCtrl', function () {
    //var model = new TeacherExpModel(settings);
    //model.initPage();
});















//$scope.init = function () {

//    userInfo.then(function(data){
//        //$scope.user = data;
//        console.log("data from userInfo");
//        console.log(data);
//    });


//    //console.log("people service");
//    //console.log(peopleService.message);

//    //$.ajax({
//    //    url: '/api/dashData',
//    //    //        async: false,
//    //    data: { district: "Dallas ISD" },
//    //    success: function (data) {
//    //        //origData = data;
//    //        //settings.staarData = data;
//    //        console.log(data);
//    //    },
//    //    error: function (err) {
//    //        alert("error: " + err.responseText);
//    //    }
//    //});
//}

//$scope.init();




//.factory('peopleService', function () {
//    var peopleResponse = {};
//    //var myData;

//    //$.ajax({
//    //    url: '/api/dashData',
//    //    //        async: false,
//    //    data: { district: "Dallas ISD" },
//    //    success: function (data) {
//    //        myData = data;
//    //        //origData = data;
//    //        //settings.staarData = data;
//    //        //console.log(data);
//    //    },
//    //    error: function (err) {
//    //        alert("error: " + err.responseText);
//    //    }
//    //});



//    return {
//        message:"I'm data from a service",


//        savePeopleResponse:function (data) {
//            peopleResponse = data;
//            //console.log(data);
//        },
//        getPeopleResponse: function () {
//            var myData;
//            $.ajax({
//                url: '/api/dashData',
//                //        async: false,
//                data: { district: "Dallas ISD" },
//                success: function (data) {
//                    myData = data;
//                    //origData = data;
//                    //settings.staarData = data;
//                    //console.log(data);
//                },
//                error: function (err) {
//                    alert("error: " + err.responseText);
//                }
//            });
//            return myData;
//        }
//    };
//})