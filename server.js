var http = require('http');
var app = require('./app');
var server = http.createServer(app)

// Server config: server running at localhost:3000
server.listen(3000, function(){
    console.log('server running');;
    
});