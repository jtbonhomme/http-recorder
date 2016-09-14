var http      = require('http'),
    FileStream = require('./filePass');

module.exports.createProxyServer = function createProxyServer(options) {

  /**
   * The proxy intercept all request sent by the client to the target and all response
   * sent back by the target to the client.
   *
   * client_request  : request sent by the client of the proxy
   * client_response : response sent to the client by the proxy
   * proxy_request   : request sent by the proxy to the target
   * proxy_response  : response sent by the target to the proxy
   */

  // todo: create a module to check options validity and documente options

// TBR
console.log('Start proxying request to ' + options.hostname + ' on port ' + options.port + ' (' + options.protocol + ')');

  // start proxy server
  http.createServer(function(client_request, client_response) {
    var proxy_request = http.request({
      method: client_request.method,
      path: client_request.url,
      headers: client_request.headers,
      hostname: options.hostname,
      protocol: options.protocol,
      port: options.port
    });

// TBR
console.log('Client request : ' + client_request.method + ' ' + client_request.url + ' ' + JSON.stringify(client_request.headers));

    var myStream = new FileStream();

  // set up a listener to intercept response sent back by the target
    proxy_request.addListener('response', function (target_response) {
      // second pipe does not work
      //target_response.pipe(client_response).pipe(process.stdout);
      target_response.pipe(myStream).pipe(client_response);
    });

     // set up a listener to intercept response sent back by the target
     // OK
/*    proxy_request.addListener('response', function (target_response) {
      target_response.addListener('data', function(chunk) {
        client_response.write(chunk, 'binary');
      });
      target_response.addListener('end', function() {
        client_response.end();
      });
      client_response.writeHead(target_response.statusCode, target_response.headers);
    });
*/

    
    // set up a listener to receive data from the client and pass them through the proxy_request
    // todo (needed ?): handle data according to content-type header
    client_request.addListener('data', function(chunk) {
// TBD
console.log('data from client');
      proxy_request.write(chunk, 'binary');
    });
    client_request.addListener('end', function() {
// TBD
console.log('client request ends');
      proxy_request.end();
    });
  }).listen(8080);
}
