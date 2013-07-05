// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var path = require('path'),
		semver = require('semver'),
		f = require('util').format,
		PORT = 3000,
		public_dir = 'public',
		app_path = './' + public_dir + '/',
		USE_AMD = <% if (useAMD) { %>true<% } else { %>false<% }%>;

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


	grunt.initConfig({<% if (useAMD) { %>
		requirejs: {
			compile: {
				options: {
					baseUrl: app_path + 'js',
					name: 'main',
					mainConfigFile: app_path + 'js/main.js',
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
				cmd: 'git push origin deploys'
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
		clean: {
			clean: [app_path + 'build']
		},
		compass: {
			dist: {
				options: {
					environment: 'production',
					require: 'zurb-foundation',
					httpPath: '/',
					basePath: 'public',
					cssDir: 'css/app',
					sassDir: 'css/scss',
					imagesDir: 'img',
					javascriptsDir: 'js',
					debugInfo: false
				}
			},
			dev: {
				options: {
				  environment: 'development',
					require: 'zurb-foundation',
					httpPath: '/',
					basePath: 'public',
					cssDir: 'css/app',
					sassDir: 'css/scss',
					imagesDir: 'img',
					javascriptsDir: 'js',
					debugInfo: true
				}
			}
		},
		watch: {
			css: {
				files: app_path + 'css/scss/*.scss',
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
		    options: {
		      namespace: 'JST',
		      amd: USE_AMD,
		      node: true,
		      // Clean up the name this will be stored under
	        processName: function (filename) {
						var st = filename.split('.hbs')[0].split('./public/templates/')[1];
						return st.indexOf('/') !== -1 ? st.split('/').join('.') : st;
				  }
		    },
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
	  }
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
			'compass:dev',
			'handlebars',
			'imagemin'
		];
		if (USE_AMD) tasks.splice(0, 0, 'requirejs');
		console.log(tasks);
		grunt.task.run(tasks);
	});

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
	<% if (useAMD) { %>grunt.loadNpmTasks('grunt-contrib-requirejs');<% } %>
};