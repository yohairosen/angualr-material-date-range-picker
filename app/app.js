'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'myApp.datePicker',
    'ngMaterial',
    'ngMessages'
])
    .controller('Ctrl', ['$scope', function ($scope) {


        var s = new Date();
        var e = new Date();
        s.setDate(s.getDate() + 2);
        e.setDate(e.getDate() + 5);

        var s2 = new Date();
        var e2 = new Date();
        s2.setDate(s2.getDate() + 10);
        e2.setDate(e2.getDate() + 15);

        $scope.dates = [[s, e], [s2, e2]];
        $scope.selectedRange = $scope.dates[0];


        $scope.$watch('selectedRange', function (value) {
            console.log(value)
        });


    }]);

