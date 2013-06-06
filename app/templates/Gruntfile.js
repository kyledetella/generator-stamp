// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var semver = require('semver'),
		f = require('util').format,
		PORT = 3322;

// var LIVERELOAD_PORT = 35729;
// var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
// var mountFolder = function (connect, dir) {
// 	return connect.static(require('path').resolve(dir));
// };


module.exports = function (grunt) {

	grunt.initConfig({

		buildDir: './public/dist',

		banner: [
			'/*!',
			' * kdd boilerplate',
			' * https://github.com/kyledetella/kdd-boilerplate',
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

		//
		// Build & Compile SASS Files
		//
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
			require: 'foundation'
		},

		//
		// Watch task to live update files & builds
		//
		watch: {
			files: './public/css/sass/*.scss',
			tasks: ['compass:dev']
		},

		open: {
			server: {
				path: 'http://localhost:<%%= PORT %>'
			}
		}
	});


  //
  // Register Grunt Tasks
  // --------------------------------------------------------


  //
  // To pass in a commit message: grunt:release:"Message"
  // This will re-write and update package.json
  //
	grunt.registerTask('release', 'Ship (dev & production)', function (message) {

		var _ = grunt.util._,
				commitMessage = message || 'Update';

		//
		// Run our ordered tasks
		//
		grunt.task.run([
			'clean',
			'requirejs',
			'less:production',
			'exec:git_add',
			'exec:git_commit:' + commitMessage,
			'exec:git_push'
		]);
	});


  //
  // Clean Project
  //
	grunt.registerTask('sweep', 'Clean up files', function () {
		grunt.task.run([
			'clean',
			'exec:git_add_u'
		]);
	});


  //
  // Register Grunt Tasks
  //
	grunt.registerTask('default', 'build');
	grunt.registerTask('build', ['requirejs', 'compass:dev']);//, 'sed:version']);
	grunt.registerTask('watch', ['compass:dev']);



  //
  // Load NPM Tasks and plugins
  // --------------------------------------------------------

	grunt.loadNpmTasks('grunt-sed');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-compass');
};