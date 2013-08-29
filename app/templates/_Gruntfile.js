// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var path = require('path'),
		semver = require('semver'),
    _ = require('lodash'),
		f = require('util').format,
		PORT = 3000,
		public_dir = 'public',
		app_path = './' + public_dir + '/',
		USE_AMD = <% if (useAMD) { %>true<% } else { %>false<% }%>,
		defaultHandlebarsOptions, defaultCompassOptions;

module.exports = function (grunt) {

	//
	// Utility methods
	// 
	var methods = {
		getHandlebarsFiles: function () {
			return app_path + 'templates/**/*.hbs';
		},
		getHandlebarsFilePaths: function () {
			var _files = {};
	    _files[app_path + 'js/templates/templates.js'] = this.getHandlebarsFiles();
	    return _files;
		}
	};

  /**
   * Base configuration to use for handlebars options
   *
   * These defaults are the same for both the main site and the
   * admin with a few minor exceptions.
   */
  defaultHandlebarsOptions = {
    namespace: 'JST',
    amd: USE_AMD,
    node: true,
    partialsUseNamespace: true,

    // /path/to/partials (within specd folder, so [public|admin]/templates/partials)
    partialsPathRegex: /\/partials\//,

    // File type to check for
    partialRegex: /.*\.hbs$/,

    // Clean up the name this will be stored under
    processName: function (filename) {
      var st = filename.split('.hbs')[0];
      return st.split('./' + public_dir + '/templates/')[1];
    },

    // Cleanup the output of the partial name
    // 
    // from: /path/to/partialName.hbs
    // to: partials/partialName
    // 
    processPartialName: function (filePath) {
      var st = filePath.split('.hbs')[0];
      return st.split('./' + public_dir + '/templates/')[1];
    }
  };
  
  /**
   * Base configuration to use for Compass options
   *
   * These defaults are the same for both the main site and the
   * admin with a few minor exceptions.
   */
  defaultCompassOptions = {
    environment: 'production',
    require: 'zurb-foundation',
    httpPath: '/',
    basePath: 'public',
    cssDir: 'css/app',
    sassDir: 'css/scss',
    imagesDir: 'img',
    javascriptsDir: 'js',
    relativeAssets: true,
    debugInfo: false
  };


	grunt.initConfig({<% if (useAMD) { %>
		requirejs: {
			compile: {
				options: {
					baseUrl: app_path + 'js',
					name: 'main',
					mainConfigFile: app_path + 'js/config.js',
					out: app_path + 'build/js/app.min.js'
				}
			}
		},<% } %>
		exec: {
			git_add: {
				cmd: 'git add .'
			},
			git_add_u: {
				cmd: 'git add -u'
			},
			git_commit: {
				cmd: function (m) { return f('git commit -m "%s"', m); }
			},
			git_push: {
				cmd: 'git push'
			}
		},
	  bgShell: {
      _defaults: {
        bg: true
      },
      runNode: {
        cmd: 'node node_modules/nodemon ./server.js'
      }
    },
		compass: {
			dist: {
				options: _.extend(_.clone(defaultCompassOptions), {
					debugInfo: false,
					outputStyle: 'compressed'
				})
			},
			dev: {
				options: _.extend(_.clone(defaultCompassOptions), {
					environment: 'development',
					debugInfo: true
				})
			}
		},
		watch: {
			css: {
				files: app_path + 'css/scss/**/*.scss',
				tasks: ['compass:dev'],
				options: {
					interrupt: false
				}
			},
			handlebars: {
				files: methods.getHandlebarsFiles(),
				tasks: ['handlebars'],
				options: {
					interrupt: false
				}
			}
		},
		open: {
			server: {
				path: 'http://localhost:' + PORT
			}
		},
		handlebars: {
		  compile: {
        options: _.clone(defaultHandlebarsOptions),
		    files: methods.getHandlebarsFilePaths()
		  }
		},
	  imagemin: {
			dist: {
				options: {
					optimizationLevel: 1
				},
				files: [
					{
						expand: true,
						cwd: app_path + 'img/',
						src: ['**/*.png', '**/*.jpg'],
						dest: app_path + 'build/img/'
					}
				]
			},
	    dev: {
	      options: {
	        optimizationLevel: 1
	      },
	      files: [
	        {
	          expand: true,     // Enable dynamic expansion.
	          cwd: app_path + 'img/',      // Src matches are relative to this path.
	          src: ['**/*.png', '**/*.jpg'], // Actual pattern(s) to match.
	          dest: app_path + 'build/img/'   // Destination path prefix.
	        },
	      ]
	    }
	  },
    
    //
    // Run gzip compression
    // 
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          // Run compression on the main application js file
          {
            expand: true,
            src: [app_path + 'js/app.min.js'],
            dest: app_path + 'dist/',
            ext: '.gz.js', //'.js.jgz'
          },<% if (useAMD) { %>
          // Run compression on the require.js file
          {
            expand: true,
            src: [app_path + 'js/lib/require.js'],
            dest: app_path + '/dist',
            ext: '.gz.js' //'.js.jgz'
          },<% }%>
          // Run compression on the modernizr.js file
          {
            expand: true,
            src: [app_path + 'js/lib/modernizr.min.js'],
            dest: app_path + '/dist',
            ext: '.gz.js' //'.js.jgz'
          },
          // Output the build css file to gzip
          {
            expand: true,
            src: [app_path + 'css/app/app.css'],
            dest: app_path + '/dist',
            ext: '.gz.css'
          }

        ]
      }
    },

    //
    // Clear dirs and clean up files
    // 
    clean: {
      clean: [
        app_path + 'build',
        app_path + 'dist',
        app_path + 'js/app.min.js'
      ]
    }<% if (useAMD) { %>,
    
    //
    // Concat requirejs and built file
    //
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          app_path + 'js/lib/require.js',
          app_path + 'build/js/app.min.js'
        ],
        dest: app_path + 'build/js/app.built.js',
      },
    }<% }%>
	});

	//
	// Fire up the project and the server
	// 
	grunt.registerTask('go', [
		'compass:dev',
		'handlebars',
		'bgShell:runNode',
		'open',
		'watch'
	]);

	//
	// Restart the server and watch tasks, but do not re-open browser
	// 
	grunt.registerTask('restart', [
		'compass:dev',
		'handlebars',
		'bgShell:runNode',
		'watch'
	]);

	//
	// Run build operations
	// TODO: Refine outputs and scheduling of tasks
	// TODO: Allow options to be passed in such as build:staging, build:release
	// 
	// grunt.registerTask('build', ['requirejs', 'compass:dev', 'handlebars', 'imagemin']);
	grunt.registerTask('build', function () {
		var tasks = [
			'clean',
			'compass:dist',
			'handlebars',<% if (useAMD) { %>
      'requirejs',<% } %>
			'imagemin:dist',
			'compress'
		];
		console.log(tasks);
		grunt.task.run(tasks);
	});

  //
  // Run a clean build and push to the repo
  // 
  // After execution, rebuild compass as a `dev` version for
  // seamless dev
  // 
  // ex: grunt commit:"My message"
  // 
  grunt.registerTask('commit', function (commitMessage) {

    var msg = commitMessage || 'Grunt build and commit';

    grunt.task.run([
      'clean',
      'compass:dist',
      'handlebars',
      'imagemin:dist',<% if (useAMD) { %>
      'requirejs',<% } %>
      'compress',
      'exec:git_add',
      'exec:git_commit:' + msg,
      'exec:git_push',
      'compass:dev'
    ]);
  });


  //
  // Dist build task
  // 
  grunt.registerTask('build', [
    'clean',
    'compass:dist',
    'handlebars',
    'imagemin:dist',<% if (useAMD) { %>
    'requirejs',
    'concat',<% } %>
    'compress'
  ]);



	//
	// Call the `watch` task in isolation
	// 
	grunt.registerTask('watch', ['compass:dev', 'handlebars']);

	//
	// Call the `server` task in isolation
	// 
	grunt.registerTask('server', ['bgShell:runNode']);

	//
	// Compile templates
	// 
	grunt.registerTask('compileTemplates', ['handlebars']);

	//
	// Define default task
	// 
	grunt.registerTask('default', 'go');

  //
  // Load NPM Tasks and plugins
  // 
	grunt.loadNpmTasks('grunt-sed');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-contrib-compress');
	<% if (useAMD) { %>grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-concat');<% } %>
};