'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var StampGenerator = module.exports = function StampGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	//
	// Install npm && bower dependencies
	// 
	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	//
	// Linked access to package.json
	// 
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(StampGenerator, yeoman.generators.Base);

StampGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// welcome message
	var welcome =
	'\n     _-----_' +
	'\n    |       |' +
	'\n    |' + '--(o)--'.red + '|   .--------------------------.' +
	'\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
	'\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
	'\n    /___A___\\   \'__________________________\'' +
	'\n     |  ~  |'.yellow +
	'\n   __' + '\'.___.\''.yellow + '__' +
	'\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

	//
	// Render welcome message!
	// 
	console.log(welcome);

	//
	// Initialize prompts
	// 
	var prompts = [
		{
			name: 'projectTitle',
			message: 'What is the name of this project?',
			default: 'Think hard...'
		},
		{
			name: 'projectDescription',
			message: 'Enter a brief description of this project:',
			default: 'Make it sexy!'
		},
		{
			type: 'confirm',
			name: 'includeRequireJS',
			message: 'Would you like to include RequireJS (for AMD support)?',
			default: 'Y/n'
		}
	];

	//
	// Run prompt
	// 
	this.prompt(prompts, function (err, props) {

		if (err) { return this.emit('error', err); }

		//
		// `props` – Object containing response values
		// ###
		// Attach response values to this instance
		// ###
		// 
		this.projectTitle = props.projectTitle;
		this.projectDescription = props.projectDescription;
		this.includeRequireJS = props.includeRequireJS;

		cb();
	}.bind(this));
};

//
// Initial scaffold
// 
StampGenerator.prototype.app = function app() {

	// This will be preset in /public
	// this.template('index.html', 'index.html');

	this.directory('public', 'public');
	this.directory('routes', 'routes');

	// this.mkdir('public');
	// this.mkdir('public/js');
	// this.mkdir('public/js/modules');
	// this.mkdir('public/js/lib');


	this.template('Gruntfile.js', 'Gruntfile.js');

	// Add js file to instantiate a server
	this.template('server.js', 'server.js');

	this.template('config.rb', 'config.rb');

	this.copy('_package.json', 'package.json');
	this.copy('_config.json', 'config.json');
	this.copy('_bower.json', 'bower.json');
};

StampGenerator.prototype.runtime = function runtime() {
	this.copy('bowerrc', '.bowerrc');
	this.copy('gitignore', '.gitignore');
};

StampGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');
};
