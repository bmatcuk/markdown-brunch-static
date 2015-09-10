var MarkedBrunchStatic, marked;

marked = require('marked');

MarkedBrunchStatic = (function() {
  function MarkedBrunchStatic() {}

  MarkedBrunchStatic.prototype.handles = /\.static\.(?:markdown|mdown|mkdn|md|mkd|mdwn|mdtxt|mdtext|text)$/;

  MarkedBrunchStatic.prototype.transformPath = function(filename) {
    return filename.replace(/\.static\.\w+$/, '.html');
  };

  MarkedBrunchStatic.prototype.compile = function(data, filename, callback) {
    return marked(data, function(err, content) {
      if (err) {
        callback(err);
        return;
      }
      return callback(null, content);
    });
  };

  return MarkedBrunchStatic;

})();

module.exports = function(config) {
  return new MarkedBrunchStatic(config);
};

