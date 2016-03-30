angular.module('save-button.directive',[])

.directive('customSubmit', [
  function(){
//      console.log('sdfds');
    return {
      //priority: -1,
      //terminal: true,
      restrict: 'A',
      link: function( scope , element , attributes )
        {
            element.bind('submit', function(e) {
                e.preventDefault();
                var savingText = 'Saving...';
                var submitButton = element.find('button');
                
                if(submitButton.html() !== savingText) {
                    
                    ['input', 'textarea', 'select'].forEach(function(e){
                    element.find(e).removeClass('ng-pristine');
                });
                
                // Get the form object.
                var form = scope[ attributes.name ];
//                console.log(element.find('button').html('Saving...'));
                // Set all the fields to dirty and apply the changes on the scope so that
                // validation errors are shown on submit only.
                angular.forEach( form , function ( formElement , fieldName ) {
                     //console.log(formElement);
// If the fieldname starts with a '$' sign, it means it's an Angular
                    // property or function. Skip those items.
                    if ( fieldName[0] === '$' ) return;
                    
                    
                    formElement.$pristine = false;
                    formElement.$dirty = true;
                });
                scope.$apply();
                
                // Do not continue if the form is invalid.
                if ( form.$invalid ) {
                    // Focus on the first field that is invalid.
                    element.find('.ng-invalid').first().focus();
                    
                    return false;
                }
                submitButton.html(savingText);
                
//                setTimeout(function(){ scope.$eval( attributes.customSubmit );
//                scope.$apply(); }, 3000);

                    scope.$eval( attributes.customSubmit );
                    scope.$apply();
            
                }
                
                
                // From this point and below, we can assume that the form is valid.
                
            });
        }
    
    
     
    }
  }
]);