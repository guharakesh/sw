module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		project: { 
			app: ['website'],
			assets: ['<%= project.app %>/assets'],
			css: ['<%= project.assets %>/sass/style.scss']
		},
		
		sass: {
			dev: {
				options: {
					style: 'expanded',
					compass: false
				},
				files: {
					'<%= project.assets %>/css/style.css':'<%= project.css %>',
					'<%= project.assets %>/css/custom.css':'<%= project.assets %>/sass/custom.scss'
				}
			}
		},

		watch: {
			options: {
				livereload: true,
			},

			sass: {
				files: '<%= project.assets %>/sass/{,*/}*.{scss,sass}',
				tasks: ['sass:dev']
			},
			livereload: {
				options: { livereload: true},
				files: ['website/index.html'],
			}
		},

		connect: {
			server: {
				options: {
					base: 'website',
					keepalive: true,
					port: 3000
				}
			}
		},

		parallel: {
			assets: {
				options: {
					grunt: true
				},
				tasks: ['watch','connect']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-parallel');

	grunt.registerTask('default', [
		'parallel'
	]);
};
