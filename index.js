var querystring = require('querystring');
var fs = require('fs');
var path = require('path');

module.exports = function (source) {
  if (!this.query) throw new Error('Require query parameters o and r (ex. replacer-loader?o=src&r=src.electron)');

  var query = querystring.parse(this.query.substr(1));
  var file = path.normalize(this.resourcePath);
  var replace = file.replace(query.o, query.r);

  if (fs.existsSync(replace)) {
    console.log('* replacer-loader: ' + file + ' → ' + replace);
    this.resourcePath = replace;

    source = fs.readFileSync(replace, 'utf8');
  }
  return source;
}