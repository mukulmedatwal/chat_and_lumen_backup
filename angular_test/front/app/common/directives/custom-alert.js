angular.module('custom-alert.directive',[])

.directive('customAlert', [
  function(){
//      console.log('sdfds');
    return {
      priority: 1,
      terminal: true,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
           
            var clickAction = attrs.ngClick;
          var message = attrs.customAlert;
          if(message && confirm(message)){
            scope.$apply(scope.$eval(clickAction));
          }
        });
      }
    }
  }
]);