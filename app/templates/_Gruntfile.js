// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var path = require('path'),
		semver = require('semver'),
		f = require('util').format,
		PORT = 3000;

module.exports = function (grunt) {

	grunt.initConfig({

		buildDir: './public/dist',

		requirejs: {
			compile: {
				options: {
					baseUrl: 'public/js',
					name: 'main',
					mainConfigFile: 'public/js/main.js',
					out: 'public/dist/js/app.min.js'
				}
			}
		},
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
		clean: {
			clean: ['./public/dist']
		},
		compass: {
			dist: {
				options: {
					config: 'config.rb',
					environment: 'production'
				}
			},
			dev: {
				options: {
				  // Target our config.rb to unify Foundation scaffolding
					config: 'config.rb',
					environment: 'development'
				}
			},
			require: 'zurb-foundation'
		},
		watch: {
			css: {
				files: './public/css/scss/*.scss',
				tasks: ['compass:dev'],
				options: {
					// livereload: 35729,
					nospawn: true,
					interrupt: false
				}
			},
			scripts: {
				files: './public/templates/**/*.hbs',
				tasks: ['handlebars'],
				options: {
					interrupt: false,
					nospawn: true
				}
			}
		},
		open: {
			server: {
				path: 'http://localhost:' + PORT
			}
		},
		express: {
			custom: {
				options: {
					// port: PORT,
					bases: path.resolve('public'),
					server: path.resolve('./server')
				}
			}
		},
		handlebars: {
		  compile: {
		    options: {
		      namespace: 'JST',<% if (useAMD) { %>
		      amd: true,<% } %>
		      node: true,
		      // Clean up the nave this will be stored under
	        processName: function (filename) {
				    var str = filename.split('.hbs')[0].split('./public/templates/')[1];
						return str.indexOf('/') !== -1 ? str.split('/').join('.') : str;
				  }
		    },
		    files: {
		      './public/js/templates/templates.js': './public/templates/**/*.hbs'
		    }
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
						cwd: './public/img/',
						src: ['**/*.png', '**/*.jpg'],
						dest: './public/build/img/'
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
	          cwd: './public/img/',      // Src matches are relative to this path.
	          src: ['**/*.png', '**/*.jpg'], // Actual pattern(s) to match.
	          dest: './public/build/img/'   // Destination path prefix.
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
		'express',
		'open',
		'watch',
		'express-keepalive'
	]);

	//
	// Restart the server and watch tasks, but do not re-open browser
	// 
	grunt.registerTask('restart', [
		'compass:dev',
		'express',
		'watch',
		'express-keepalive'
	]);

	//
	// Run build operations
	// TODO: Refine outputs and scheduling of tasks
	// TODO: Allow options to be passed in such as build:staging, build:release
	// 
	grunt.registerTask('build', ['requirejs', 'compass:dev', 'handlebars', 'imagemin']);

	//
	// Call the `watch` task in isolation
	// 
	grunt.registerTask('watch', ['compass:dev','handlebars']);

	//
	// Call the `server` task in isolation
	// 
	grunt.registerTask('server', ['express', 'express-keepalive']);

	//
	// Compile templates
	// 
	grunt.registerTask('templates', ['handlebars']);

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
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
};