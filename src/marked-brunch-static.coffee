marked = require 'marked'
_ =
  merge: require 'lodash.merge'

class MarkedBrunchStatic
  constructor: (@config) ->
    if @config?.fileMatch
      @handles = @config.fileMatch
      delete @config.fileMatch
    if @config?.fileTransform
      @transformPath = @config.fileTransform
      delete @config.fileTransform

  handles: /\.static\.(?:markdown|mdown|mkdn|md|mkd|mdwn|mdtxt|mdtext|text)$/

  transformPath: (filename) ->
    filename.replace /\.static\.\w+$/, '.html'

  compile: (data, filename, options, callback) ->
    opts = _.merge {}, @config, options?.markdown
    marked data, opts, (err, content) ->
      if err
        callback err
        return

      # we need to fix some html-escaping that breaks handlebars
      content = content.replace(/\{\{&gt;/g, '{{>')
      callback null, content

module.exports = (config) -> new MarkedBrunchStatic config

