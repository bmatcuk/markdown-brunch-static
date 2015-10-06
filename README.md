![Release](https://img.shields.io/npm/v/marked-brunch-static.svg)

# marked-brunch-static
Compile static markdown files with brunch.

marked-brunch-static is a processor for [html-brunch-static](https://github.com/bmatcuk/html-brunch-static), a [brunch](http://brunch.io/) plugin designed to handle static html files. marked-brunch-static can convert markdown files into static html files with html-brunch-static's support for layouts and partial views.

## Installation
marked-brunch-static depends on [html-brunch-static](https://github.com/bmatcuk/html-brunch-static), which also depends on [brunch-static](https://github.com/bmatcuk/brunch-static), so, you will need to install all three. The recommended method is via npm:

```bash
npm install --save-dev brunch-static html-brunch-static marked-brunch-static
```

Or manually:

* Add `"brunch-static": "x.y.z"` to package.json
* Add `"html-brunch-static": "x.y.z"` to package.json
* Add `"marked-brunch-static": "x.y.z"` to package.json
* Run `npm install`
* Alternatively, you may use the latest git version with:
  * `"brunch-static": "git+ssh://git@github.com:bmatcuk/brunch-static"`
  * `"html-brunch-static": "git+ssh://git@github.com:bmatcuk/html-brunch-static"`
  * `"marked-brunch-static": "git+ssh://git@github.com:bmatcuk/marked-brunch-static"`

## Configuration
Add marked-brunch-static to your list of html-brunch-static processors:

```coffee
exports.config =
  ...
  plugins:
    static:
      processors: [
        require('html-brunch-static') {
          processors: [
            require('marked-brunch-static') {
              fileMatch: ...
              fileTransform: ((filename) -> ...)
              ...
            }
          ]
        }
      ]
```

Most options passed to marked-brunch-static are passed, verbatim, to [marked](https://github.com/chjj/marked), with the exception of:

* **fileMatch** _(default: `/\.static\.(?:markdown|mdown|mkdn|md|mkd|mdwn|mdtxt|mdtext|text)$/`)_

  > _fileMatch_ is an [anymatch](https://github.com/es128/anymatch) that is used to determine which files will be handled by this processor. As an anymatch, it may be a string with globs, a regex, or a function that takes a filename and returns true if it should be handled, or false otherwise. The default will match files that end in `.static.markdown`, `.static.md`, etc.

* **fileTransform** _(default: `(filename) -> filename.replace(/\.static\.\w+$/, '.html')`)_

  > _fileTransform_ converts the input filename into an html filename. It takes a filename as input and returns the new filename with the html extension. If you set the _fileMatch_ property above, you'll probably need to set this option as well to ensure that your output files end with the html extension.

