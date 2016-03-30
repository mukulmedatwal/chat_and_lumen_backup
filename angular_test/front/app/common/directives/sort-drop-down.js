angular.module('sort-drop-down.directive',[])

    .directive('sortDropDown', function () {
        return {
            restrict: 'E',
            scope: false,
            template: function (element, attr) {
                return '<div class="selectBox selector">'+
                        '<select name="' + attr.name + '" ng-model="' + attr.ngModel + '" ng-options="' + attr.optexp + '"  ></select>'+
                '</div>';
            },
        }
    });