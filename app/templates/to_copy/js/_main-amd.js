'use strict';

requirejs.config({
  paths: {
    'dom' :         <% if (useZepto) { %>'lib/zepto/zepto.min'<% } else { %>'lib/jquery/jquery.min'<% } %>,
    '_' :           'lib/lodash/lodash',<% if (useBackbone) { %>'backbone' :    'lib/backbone/backbone-min',<% } %>
    'handlebars' :  'lib/handlebars/handlebars',
    'app' :         'app/core-amd'
  },
  shim: {
    'dom' : {
      exports: '$'
    },<% if (useBackbone) { %>'backbone' : {
      deps: ['_', 'dom'],
      exports: 'Backbone'
    },<% } %>
    '_' : {
      exports: '_'
    },
    'handlebars' : {
      exports: 'Handlebars'
    }
  }
});

require([
  'app'
], function (app) {
  console.log('Welcome to <%= projectTitle %>');
});
