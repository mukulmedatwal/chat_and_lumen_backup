angular.module('paginator.directive',[])

       
.directive('paginator', function factory() {
        return {
            restrict:'E',
            controller: function ($scope, paginatorService) {
                $scope.paginator = paginatorService;
            },
            templateUrl: 'app/common/modules/paginator/view/paginator.html'
        };
    });
    

