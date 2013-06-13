# Generator-Stamp
[![Build Status](https://secure.travis-ci.org/kyledetella/generator-stamp.png?branch=master)](https://travis-ci.org/kyledetella/generator-stamp)

## A customized [Yeoman](http://yeoman.io) generator
  Quick Features:
  + A flyweight node.js server
  + [ZURB's Foundation](http://foundation.zurb.com)
  + Sane & scalable javascript architecture (AMD modules optional)
  + Optional inclusion of Backbone.js
  + Handlebars templates

## Requirements
  + [Node.js](http://nodejs.org)
  + [Compass](http://compass-style.org/)
  + [zurb-foundation gem](http://foundation.zurb.com/docs/sass.html)
  + [grunt-cli](http://gruntjs.com/getting-started)
    `npm install -g grunt-cli`
  + Yeoman [yo](https://github.com/yeoman/yo)
    `npm install -g yo`

## Getting started
  + Install the generator globally: `npm install -g generator-stamp`
  + Run: `yo stamp` (make sure to cd into the directory where you wish to run your app)
  + Finally, run: `grunt go` and start coding!

### Available Grunt Tasks
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

  + `grunt go` - This will fire up a node.js server, setup watch tasks, and open your browser pointed at your app
  + `grunt server` – This will spin up the node.js server (*note*, you may also fire up the node server via `node server`)
  + `grunt templates` – Will compile all `.hbs` files within `public/templates` into `templates.js` and will be accessible via
```js
  // If using AMD
  define(['templates'], function(templates) {
    // templates['template_name'];
  });
  
  // If not using AMD
  window.JST.['template_name'];
```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
