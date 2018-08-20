'use strict';

angular.module('myApp.datePicker', [])

    .directive('dateRangePicker', [function () {

        return {

            scope: {
                availableDates: '='
            },
            controller: function ($scope, $element) {

                var model = $element.controller('ngModel');

                var getStartDate = function () {
                    return model.$viewValue && model.$viewValue[0];
                };


                var update = function () {

                    var availableDates = $scope.availableDates;
                    var dates = [];
                    var selectedDates = [];
                    var range;
                    var date;


                    for (var i = 0; i < availableDates.length; i++) {
                        range = availableDates[i];
                        date = range[0];
                        date.setHours(0, 0, 0, 0);
                        var selected = getStartDate() >= range[0] && getStartDate() <= range[1];

                        while (date < range[1]) {
                            date.setHours(0, 0, 0, 0);
                            if (selected) {
                                selectedDates.push('[data-timestamp="' + date.getTime() + '"]:not(.md-calendar-month-label)');
                            }
                            else {
                                dates.push('[data-timestamp="' + date.getTime() + '"]:not(.md-calendar-month-label)');
                            }

                            var nextDate = new Date(date.getTime());
                            nextDate.setDate(nextDate.getDate() + 1);
                            date = nextDate;
                        }
                    }

                    $scope.redraw(dates, selectedDates);

                }

                $scope.$watch(getStartDate, function (date) {
                    $scope.startDate =  date;
                });

                $scope.$watch('startDate', function (date) {

                    var selected = $scope.availableDates.find(function (range) {
                        return date >= range[0] && date <= range[1];
                    });

                    model.$setViewValue(selected);

                });


                $scope.dateFilter = function (date) {
                    var range;
                    var availableDates = $scope.availableDates;

                    for (var i = 0; i < availableDates.length; i++) {
                        range = availableDates[i];


                        if (date >= range[0] && date <= range[1])
                            return true;

                    }

                    update();

                    return false;

                };

                $scope.$watch(function () {

                    return $scope.availableDates && $scope.availableDates.toString() + getStartDate().getTime();

                }, update)


            },
            controllerAs: 'dateRangePickerCtrl',
            require: ['ngModel', 'dateRangePicker'],
            template: ' <md-calendar ' +
            'ng-model="startDate"' +
            'md-date-filter="dateFilter"' +
            'md-mode="day"' +
            '></md-calendar>',
            link: function (scope, element, attrs, controller) {

                var init = true;

                scope.redraw = function (dates, selectedDates) {

                    setTimeout(function () {

                        var selectors = document.querySelectorAll(dates.join(','));
                        var elements = angular.element(selectors);

                        elements.addClass('available-date');

                        selectors = document.querySelectorAll('.selected-available-date');
                        elements = angular.element(selectors);
                        elements.removeClass('selected-available-date');

                        selectors = document.querySelectorAll(selectedDates.join(','));
                        elements = angular.element(selectors);
                        elements.addClass('selected-available-date');
                        init = false;
                    }, init ? 300 : 0)
                }


            }
        }
    }]);
