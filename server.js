var http = require("http");

  /* Create an HTTP server to handle responses */

  var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }).listen(8888);

  module.exports = server;