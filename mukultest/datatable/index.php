<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Data table testing</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>
            
            (function($){
                
                var $defaultOptions;
                
                $defaultOptions = {
                    data : {},
                };
                
                mergeSettings = function(options) {
                   return $.extend(true, {}, $defaultOptions, options);
                }
                
            })(jQuery);
            
            var mdatatable = function(options){
                console.log(options);
                
                this.data = options.data;
            }
            
            mdatatable.prototype.addHeader = function (){
                
                
            };
            var dataoptions = {
                data : [
                        {
                          "name": "Fred",
                          "hobby": "Roller Skating",
                          "favoriteMusic": "Disco"
                        },
                        {
                          "name": "Helen",
                          "hobby": "Rock Climbing",
                          "favoriteMusic": "Alternative"
                        },
                        {
                          "name": "Glen",
                          "hobby": "Traveling",
                          "favoriteMusic": "Classical"
                        }
                      ]
            }; 
            mdatatable(dataoptions)
            
            psf
        </script>
        
        <div>TODO write content</div>
        
        
        
        
        
        
    </body>
</html>
