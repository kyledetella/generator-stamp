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

    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
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
    this.useZepto = props.useZepto.toLowerCase() === 'y';
    this.useAMD = props.useAMD.toLowerCase() === 'y';

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
  
  var mainJsFile = [];

  if (!this.useAMD) {

    // Write a standard js entry file
    mainJsFile = [
      '(function() {',
      ' ',
      ' console.log(\'' + this.projectTitle + '\');',
      ' console.log(app);',
      ' ',
      '})();'
    ];

    // Add in the core.js file (amd version)
    this.copy('to_copy/js/core.js', 'public/js/app/core.js');

  } else {
    // Write a requireJS entry file
    mainJsFile = [
      '\'use strict\';',

      'requirejs.config({',
      ' paths: {'
    ];


    if (this.useZepto) {
      mainJsFile.push('   \'dom\': \'lib/zepto/zepto.min\',');
    } else {
      mainJsFile.push('   \'dom\': \'lib/jquery/jquery.min\',');
    }

    mainJsFile.push(
      '   \'_\': \'lib/lodash/lodash\',',
      '   \'backbone\': \'lib/backbone/backbone-min\',',
      '   \'handlebars\': \'lib/handlebars/handlebars\',',
      '   \'app\': \'app/core-amd\'',
      ' },',
      ' shim: {',
      '   \'dom\' : {',
      '     exports: \'$\'',
      '   },',
      '   \'backbone\' : {',
      '     deps: [\'_\', \'dom\'],',
      '     exports: \'Backbone\'',
      '   },',
      '   \'_\' : {',
      '     exports: \'_\'',
      '   },',
      '   \'handlebars\' : {',
      '     exports: \'Handlebars\'',
      '   }',
      ' }',
      '});',
      ' ',
      'require([',
      ' \'app\'',
      '], function (app) {',
      ' console.log(\'' + this.projectTitle + '\');',
      ' console.log(app);',
      '});'
    );

    // Add in the core.js file (amd version)
    this.copy('to_copy/js/core_amd.js', 'public/js/app/core-amd.js');

  } // end else

  this.write('public/js/main.js', mainJsFile.join('\n'));
};

StampGenerator.prototype.writeIndex = function writeIndex() {

  var contentText = [
    '    <div class="row">',
    '      <div class="large-10 columns large-centered">',
    '        <h1>' + this.projectTitle + '</h1>',
    '        <div class="panel">' + this.projectDescription + '</div>',
    '      </div>',
    '    </div>'
  ];

  if(this.useAMD) {
    contentText = contentText.concat([
      ' ',
      ' ',
      '   <script data-main="js/main" src="js/lib/requirejs/require.js"></script>'
    ]);
  } else {

    var domJS = this.useZepto ? 'js/lib/zepto/zepto.min.js' : 'js/lib/jquery/jquery.min.js';
    
    contentText = contentText.concat([
      ' ',
      '   <script src="' + domJS + '"></script>',
      '   <script src="js/lib/lodash/lodash.js"></script>',
      '   <script src="js/lib/backbone/backbone-min.js"></script>',
      '   <script src="js/lib/handlebars/handlebars.js"></script>',
      '   <script src="js/app/core.js"></script>',
      '   <script src="js/main.js"></script>'
    ]);   
  }

  // append the default content
  this.indexFile = this.indexFile.replace('<body>', '<body>\n' + contentText.join('\n'));  
};


StampGenerator.prototype.setupEnv = function setupEnv() {
  this.write('public/index.html', this.indexFile);
};

/**
 * Export Statement
 */
module.exports = StampGenerator;