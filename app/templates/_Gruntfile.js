// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var path = require('path'),
		semver = require('semver'),
		f = require('util').format,
		PORT = 3000;

module.exports = function (grunt) {

	grunt.initConfig({

		buildDir: './public/dist',

		banner: [
			'/*!',
			' * <%= projectTitle %>',
			' * <%= projectDescription %>',
			' */\n\n'
		].join('\n'),

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
			files: './public/css/scss/*.scss',
			tasks: ['compass:dev'],
			options: {
				nospawn: true,
				interrupt: false
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
		}
	});

	//
	// Fire up the project and the server
	// 
	grunt.registerTask('go', [
		'compass:dev',
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
	// 
	grunt.registerTask('build', ['requirejs', 'compass:dev']);

	//
	// Call the `watch` task in isolation
	// 
	grunt.registerTask('watch', ['compass:dev']);

	//
	// Call the `server` task in isolation
	// 
	grunt.registerTask('server', ['express', 'express-keepalive']);

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
};