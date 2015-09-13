marked = require 'marked'

class MarkedBrunchStatic
  constructor: (@config) ->

  handles: /\.static\.(?:markdown|mdown|mkdn|md|mkd|mdwn|mdtxt|mdtext|text)$/

  transformPath: (filename) ->
    filename.replace /\.static\.\w+$/, '.html'

  compile: (data, filename, callback) ->
    marked data, @config, (err, content) ->
      if err
        callback err
        return
      callback null, content

module.exports = (config) -> new MarkedBrunchStatic config

