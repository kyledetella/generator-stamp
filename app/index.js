'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var StampGenerator = function StampGenerator(args, options, config) {
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
      name: 'useZepto',
      message: 'Would you like to use Zepto instead of jQuery?',
      default: 'Y/n'
    },
    {
      type: 'confirm',
      name: 'useAMD',
      message: 'Would you like to use AMD modules?',
      default: 'Y/n'
    },
    {
      type: 'confirm',
      name: 'useBackbone',
      message: 'Would you like to include Backbone.js?',
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
    // 
    this.projectTitle = props.projectTitle;
    this.projectDescription = props.projectDescription;
    this.useZepto = this._confirm(props.useZepto);
    this.useAMD = this._confirm(props.useAMD);//props.useAMD.toLowerCase() === 'y';
    this.useBackbone = this._confirm(props.useBackbone);//props.useBackbone.toLowerCase() === 'y';

    cb();
  }.bind(this));
};

//
// Initial scaffold
// 
StampGenerator.prototype.app = function app() {

  // Map our preset directories to the output
  this.directory('public', 'public');
  this.directory('routes', 'routes');

  // Add js file to instantiate a server
  this.template('server.js', 'server.js');

  this.template('config.rb', 'config.rb');
};


StampGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

StampGenerator.prototype.bower = function bower() {
  this.copy('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');
};

StampGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

StampGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

StampGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js', 'Gruntfile.js');
};

StampGenerator.prototype.packageJSON = function packageJSON() {
  this.copy('_package.json', 'package.json');
};

//
// Write our main.js file -> IF using AMD
// 
StampGenerator.prototype.writeMainJS = function writeMainJS() {
  if (!this.useAMD) {
    // Write out utility js file
    this.copy('to_copy/js/_core.js', 'public/js/app/core.js');

    // Write out main.js
    this.copy('to_copy/js/_main.js', 'public/js/main.js');

  } else {
    // Write out utility js file
    this.copy('to_copy/js/_core_amd.js', 'public/js/app/core-amd.js');

    // Write out main.js
    this.copy('to_copy/js/_main-amd.js', 'public/js/main.js');
  }
};

//
// Write index.html
// 
StampGenerator.prototype.writeIndex = function writeIndex() {
  // Write index.html
  this.copy('to_copy/_index.html', 'public/index.html');
};


// StampGenerator.prototype.setupEnv = function setupEnv() {
//   // this.write('public/index.html', this.indexFile);
// };


/**
 * Private Methods
 */
//
// Allow users to enter any of the following to confirm a choice:
// y, yes, Y, Yes, YES, true, True, TRUE
StampGenerator.prototype._confirm = function confirm(val) {
  val = val.toLowerCase();
  return (val === 'y' || val === 'yes' || val === 'true');
};



/**
 * Export Statement
 */
module.exports = StampGenerator;