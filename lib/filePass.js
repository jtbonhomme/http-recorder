var stream = require('stream');
var util = require('util');

function FileStream () { // step 2: call the constructor of Transform 
  stream.Transform.call(this);
};

util.inherits(FileStream, stream.Transform); // step 1: extend the Transform class
FileStream.prototype._transform = function (chunk, encoding, done) { // step 3: define _transform prototype
  this.push(chunk);
  console.log(chunk.toString());
  done();
}
module.exports = FileStream;
