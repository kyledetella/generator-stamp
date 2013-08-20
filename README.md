# Generator-Stamp
[![Build Status](https://secure.travis-ci.org/kyledetella/generator-stamp.png?branch=master)](https://travis-ci.org/kyledetella/generator-stamp)

## Stamp Generator
  A [Yeoman](http://yeoman.io) generator for scaffolding out scalable web apps. Featuring:
  + A flyweight node.js server
  + [Foundation](http://foundation.zurb.com) CSS framework
  + Sane & scalable javascript architecture (AMD modules optional)
  + Backbone.js
  + Handlebars templates
  + Image optimization

## Requirements
  + [Node.js](http://nodejs.org)
  + [Compass](http://compass-style.org/)
  + [zurb-foundation gem](http://foundation.zurb.com/docs/sass.html)
  + [grunt-cli](http://gruntjs.com/getting-started) `npm install -g grunt-cli`
  + [yo](https://github.com/yeoman/yo) `npm install -g yo`

## Getting started
  + Install the generator globally: `npm install -g generator-stamp`
  + Run: `yo stamp` (make sure to cd into the directory where you wish to run your app)
  + Finally, run: `grunt go` and start coding!

## Grunt Tasks
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

  + `grunt go` - This will fire up a node.js server, setup watch tasks, and open your browser pointed at your app. 
  + `grunt server` – This will spin up the node.js server ( *note* , you may also fire up the node server via `node server`)  
  + `grunt compileTemplates` – Will compile all `.hbs` files within `public/templates` into `templates.js` and will be accessible via
``` js
  // If using AMD
  define(['templates'], function(templates) {
      // templates['template_name'];
  });
  
  /* OR */
  
  // If not using AMD
  window.JST['template_name'];
```
  + `grunt restart` – Restart all tasks intiated via `grunt go` except browser will not auto-open
  + `grunt imagemin` – Optimize all images in `/public/img`.
      - This task is autorun in the `build` sequence.  
      - Optimized images will be saved to `build/img`  
      - Optional output for `:dev` & `:dist`
  + `grunt build` – This will concatinate `require.js` and your build application (if using AMD)
  
## Your App
### Stamp will scaffold out you project with the following structure:

``` unicode
.
├── Gruntfile.js
├── config.rb
├── package.json
├── node_modules
│   ├── ...
├── public
│   ├── css
│   │   ├── app
│   │   │   └── app.css
│   │   └── scss
│   │       ├── _settings.scss
│   │       └── app.scss
│   ├── img
│   ├── index.html
│   ├── js
│   │   ├── lib
│   │   │   ├── backbone-min.js
│   │   │   ├── handlebars.js
│   │   │   ├── lodash.compat.min.js
│   │   │   ├── modernizr.min.js
│   │   │   ├── require.js
│   │   │   └── zepto.min.js
│   │   ├── main.js
│   │   └── templates
│   │       └── templates.js
│   └── templates
└── server.js

```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
