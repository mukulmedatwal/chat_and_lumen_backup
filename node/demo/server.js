var http = require("http");
// if our user.js file is at app/models/user.js
//var User = require('./app/models/user');

// getting-started.js
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/mymongo');
//
//
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {
//  // we're connected!
//  console.log('connected');
//});




var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
 
  // Send the response body as "Hello World"
   response.end('Hello World\n');
  
  response.end();
});


server.listen(3000);
console.log("Server is listening");