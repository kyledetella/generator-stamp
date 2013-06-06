(function () {

	'use strict';

	requirejs.config({
		paths: {
			'dom' : 'lib/zeptojs/src/zepto',
			'_' : 'lib/lodash/lodash',
			'backbone' : 'lib/backbone/backbone-min',
			'handlebars' : 'lib/handlebars/handlebars',

			'app' : 'app/core'
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

	require([
		'app'
	], function (app) {
		console.log('this is our app');
		console.log(app);
	});

})();