/**
 * Module dependencies.
 */
'use strict';
var express = require('express'),
		http = require('http'),
		path = require('path'),
		settings = {
		liveReload: {
			port: 35279
		},
		webserver: {
			port: 3000
		}
	};

var app = module.exports = express();

app.configure(function () {

	app.set('port', process.env.PORT || 3000);
	app.set('views', './public');
	app.set('view engine', 'html');

	// Use index.html instead of layout.html
	app.set('view options', { layout: 'index.html' });
	app.engine('html', require('hbs').__express);
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function () {
	app.use(express.errorHandler());
});

// Route Responses
app.get('/', function (req, res) {
	res.render('', { title: 'KDD', dev: true });
});

//
// Manually instantiate server via `node server` command if not being called
// via Grunt.js
// 
if (!module.parent) {
	http.createServer(app).listen(app.get('port'), function () {
		console.log('Express server listening on port ' + app.get('port'));
	});
}
