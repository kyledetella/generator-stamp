'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');


var StampGenerator = function StampGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);


  //
  // Install npm && bower dependencies
  // 
  this.on('end', function () {

    var _title = this.projectTitle || 'your new app';

    // this.installDependencies({ skipInstall: options['skip-install'] });
    this.installDependencies({
      npm: true,
      bower: false, // Set to `true` when a solution for Bower size issue is found
      skipInstall: options['skip-install'],
      callback: function() {
        var goMessage =
        '\n' +
        '\n  *                                                     *'.green +
        '\n  **                                                   **'.green +
        '\n  ***                                                 ***'.green +
        '\n  ****                                               ****'.green +
        '\n  *****                                             *****'.green +
        '\n  ******                                           ******'.green +
        '\n  *******                                         *******'.green +
        '\n  ********                                       ********'.green + 
        '\n  -------------------------------------------------------'.green +
        '\n  =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='.green.bold +
        '\n' +
        '\n  Have fun building ' + _title .yellow.bold + 
        '\n' +
        '\n  Just type ' + 'grunt go'.yellow.bold + ' to fire it up!' +
        '\n' +
        '\n  =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='.green.bold +
        '\n  -------------------------------------------------------'.green +
        '\n  ********                                       ********'.green +
        '\n  *******                                         *******'.green +
        '\n  ******                                           ******'.green +
        '\n  *****                                             *****'.green +
        '\n  ****                                               ****'.green +
        '\n  ***                                                 ***'.green +
        '\n  **                                                   **'.green +
        '\n  *                                                     *'.green +
        '\n\n';
        console.log(goMessage);
      }
    });
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
      default: 'Stamp App'
    },
    {
      name: 'projectDescription',
      message: 'Enter a brief description of this project:',
      default: 'Crafting an experience!'
    },
    // {
    //   type: 'list',
    //   name: 'domLib',
    //   message: 'Choose your DOM library.',
    //   choices: ['jQuery', 'Zepto']
    // },
    {
      type: 'confirm',
      name: 'useAMD',
      message: 'Would you like to use AMD modules?',
      default: true
    }//,
    // {
    //   type: 'confirm',
    //   name: 'useBackbone',
    //   message: 'Would you like to include Backbone.js?',
    //   default: true
    // }
  ];


  //
  // Run prompt
  // 
  this.prompt(prompts, function (props) {
    this.projectTitle = props.projectTitle;
    this.projectDescription = props.projectDescription;
    // this.useZepto = props.domLib === 'Zepto';
    this.useAMD = props.useAMD;
    // this.useBackbone = props.useBackbone;

    cb();
  }.bind(this));
};

//
// Initial scaffold
// 
StampGenerator.prototype.app = function app() {

  // Map our preset directories to the output
  this.directory('public', 'public');

  // Add js file to instantiate a server
  this.template('server.js', 'server.js');
};


StampGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};

// StampGenerator.prototype.bower = function bower() {
//   this.copy('_bower.json', 'bower.json');
//   this.copy('bowerrc', '.bowerrc');
// };

StampGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

StampGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

StampGenerator.prototype.gruntfile = function gruntfile() {
  this.copy('_Gruntfile.js', 'Gruntfile.js');
};

StampGenerator.prototype.packageJSON = function packageJSON() {
  this.copy('_package.json', 'package.json');
};

StampGenerator.prototype.writeJSFiles = function writeJSFiles() {
  // Add jQuery, Backbone, etc
  if (this.useAMD) {
    this.copy('to_copy/js/lib/require.js', 'public/js/lib/require.js');
    this.copy('to_copy/js/templates/templates-amd.js', 'public/js/templates/templates.js');
  } else {
    this.copy('to_copy/js/templates/templates.js', 'public/js/templates/templates.js');
  }

  this.copy('to_copy/js/lib/jquery-1.10.2.min.js', 'public/js/lib/jquery-1.10.2.min.js');
  this.copy('to_copy/js/lib/backbone.js', 'public/js/lib/backbone.js');
};

//
// Write our main.js file -> IF using AMD
// 
StampGenerator.prototype.writeMainJS = function writeMainJS() {
  var to_copy = this.useAMD ? '_main-amd.js' : '_main.js';
  this.copy('to_copy/js/' + to_copy, 'public/js/main.js');
};

//
// Write our config.js file -> IF using AMD
// 
StampGenerator.prototype.writeConfigJS = function writeConfigJS() {
  if (!this.useAMD) return;
  this.copy('to_copy/js/_config.js', 'public/js/config.js');
};

//
// Write index.html
// 
StampGenerator.prototype.writeIndex = function writeIndex() {
  // Write index.html
  this.copy('to_copy/_index.html', 'public/index.html');
};

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