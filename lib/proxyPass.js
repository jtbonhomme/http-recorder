var Readable = require('stream').Readable;
var rs = Readable();

module.exports.createPass = function createPass(client_response){
  rs.pipe(client_response)
  return rs;
}
