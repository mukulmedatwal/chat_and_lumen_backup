angular.module('on-enter-event.directive',[])

.directive('onEnterEvent', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.onEnterEvent);
                });

                event.preventDefault();
            }
        });
    };
});