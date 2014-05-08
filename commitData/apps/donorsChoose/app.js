var dcApp = angular.module('dcApp', []);

dcApp.controller('myC', function ($scope) {
    $scope.myVar = "hello";
    $scope.numberOfProjects=27;

    var districtNumbers = {
        'Dallas County':'331:1',
        'mesquite isd': '1440:2',
        'dallas isd':'105:9'
    };

    $scope.init = function () {
        console.log("init");

        $.ajax({
            url: "http://api.donorschoose.org/common/json_feed.html?state=TX&Community=331:1&APIKey=vmspm5ygamje&concise=true&description=true",
            dataType: 'jsonp',
            success: function (results) {

                $scope.$apply(function () {
                    $scope.numberOfProjects = results.proposals.length;
                });
                
                console.log(results.proposals.length);
                console.log(results);
                //			console.log(results['proposals'][0]['percentFunded']);
                //			console.log(results['proposals'][0]['costToComplete']);
            }
        });

    }


    //get load district projects into different stuff
    $scope.clickDistrict = function (districtNumber) {

        console.log(districtNumber);

        $.ajax({
            url: "http://api.donorschoose.org/common/json_feed.html?state=TX&Community="+districtNumber+"&APIKey=vmspm5ygamje&concise=true&description=true",
            dataType: 'jsonp',
            success: function (results) {
                console.log(results);
                //			console.log(results['proposals'][0]['percentFunded']);
                //			console.log(results['proposals'][0]['costToComplete']);
            }
        });

    }


});