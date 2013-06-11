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
			' * KDD/WCST Project Generator',
			' * https://github.com/kyledetella/generator-stamp',
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
				interrupt: true
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


  // Run specific release task(s)
	grunt.registerTask('release', 'Ship (dev & production)', function (message) {
		// Run tasks here...
	});


  // Clean Project
	grunt.registerTask('sweep', 'Clean up files', function () {
		grunt.task.run([
			'clean',
			'exec:git_add_u'
		]);
	});

	grunt.registerTask('go', ['compass:dev', 'express', 'open', 'watch', 'express-keepalive']);
	grunt.registerTask('restart', ['compass:dev', 'express', 'watch', 'express-keepalive']);
	grunt.registerTask('default', 'go');
	grunt.registerTask('build', ['requirejs', 'compass:dev']);
	grunt.registerTask('watch', ['compass:dev']);
	grunt.registerTask('server', ['express', 'express-keepalive']);

  //
  // Load NPM Tasks and plugins
  // --------------------------------------------------------
	grunt.loadNpmTasks('grunt-sed');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-express');
};