'use strict';

requirejs.config({
  paths: {
    'dom' :         <% if (useZepto) { %>'lib/zepto.min'<% } else { %>'lib/jquery-1.10.1.min'<% } %>,
    '_' :           'lib/lodash.compat.min',<% if (useBackbone) { %>'backbone' :    'lib/backbone-min',<% } %>
    'handlebars' :  'lib/handlebars'
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
