angular.module('delete-selected.directive',[])

.directive('deleteSelected', [
  function(){
//      console.log('sdfds');
    return {
      priority: 1,
      terminal: true,
      restrict: 'A',
      link: function(scope, element, attrs){
          var deletingText = 'Deleting...';
          var mainText = 'Delete Selected';
        element.bind('click', function(e){
            if(element.html() !== deletingText) {
                var clickAction = attrs.ngClick;
                var message = attrs.deleteSelected;
                if(message && confirm(message)){
                    e.preventDefault();
                    e.stopPropagation();
                    element.html(deletingText);
//                    setTimeout(function(){
                        scope.$apply( scope.$eval(clickAction) );
                        element.html(mainText);
//                    }, 3000);
                }
            }
        });
      }
    }
  }
]);