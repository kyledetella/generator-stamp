'use strict';

requirejs.config({
  paths: {
    'dom' :         <% if (useZepto) { %>'lib/zepto/zepto.min'<% } else { %>'lib/jquery/jquery.min'<% } %>,
    '_' :           'lib/lodash/lodash',<% if (useBackbone) { %>'backbone' :    'lib/backbone/backbone-min',<% } %>
    'handlebars' :  'lib/handlebars/handlebars'
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

//
// Initialize your app!
// 
require([], function () {
  console.log('You\'ve just Stamped out <%= projectTitle %>!');
});
