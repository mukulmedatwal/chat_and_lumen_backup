angular.module('paginator.filter',[])

.filter('paginate', function(paginatorService) {
        return function(input, rowsPerPage) {
            if (!input) {
                return input;
            }

            if (rowsPerPage) {
                paginatorService.rowsPerPage = rowsPerPage;
            }
            
            paginatorService.itemCount = input.length;

            return input.slice(
                    parseInt(paginatorService.page * paginatorService.rowsPerPage), 
                    parseInt((paginatorService.page + 1) * paginatorService.rowsPerPage + 1) - 1
            );
        }
    })
    
    .filter('forLoop', function() {
        return function(input, start, end) {
            input = new Array(end - start);
            for (var i = 0; start < end; start++, i++) {
                input[i] = start;
            }
            return input;
        }
    });
   