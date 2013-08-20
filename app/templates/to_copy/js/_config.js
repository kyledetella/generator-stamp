'use strict';

require.config({
  
  // Init the app with `main.js`
  deps: ['main'],
  
  paths: {
    'dom':        'lib/jquery-1.10.2.min',
    '_':          'lib/lodash.compat.min',
    'backbone':   'lib/backbone',
    'handlebars': 'lib/handlebars',
    'jst':        'templates/templates'
  },
  shim: {
    'dom' : {
      exports: '$'
    },
    'backbone' : {
      deps: ['_', 'dom'],
      exports: 'Backbone'
    },
    '_' : {
      exports: '_'
    },
    'handlebars' : {
      exports: 'Handlebars'
    }
  }
});