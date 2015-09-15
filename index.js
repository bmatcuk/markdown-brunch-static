var MarkedBrunchStatic, _, marked;

marked = require('marked');

_ = {
  merge: require('lodash.merge')
};

MarkedBrunchStatic = (function() {
  function MarkedBrunchStatic(config1) {
    var ref;
    this.config = config1;
    if ((ref = this.config) != null ? ref.fileMatch : void 0) {
      this.handles = this.config.fileMatch;
      delete this.config.fileMatch;
    }
  }

  MarkedBrunchStatic.prototype.handles = /\.static\.(?:markdown|mdown|mkdn|md|mkd|mdwn|mdtxt|mdtext|text)$/;

  MarkedBrunchStatic.prototype.transformPath = function(filename) {
    return filename.replace(/\.static\.\w+$/, '.html');
  };

  MarkedBrunchStatic.prototype.compile = function(data, filename, options, callback) {
    var opts;
    opts = _.merge({}, this.config, options != null ? options.markdown : void 0);
    return marked(data, opts, function(err, content) {
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

