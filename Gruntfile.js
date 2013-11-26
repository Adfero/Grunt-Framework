module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
		    js: {
		    	files: ['build/js/base.js'],
		    	tasks: ['uglify']
		    },
		    js: {
		    	files: ['build/js/libs/**/*.js'],
		    	tasks: ['concat']
		    },
		    css: {
		    	files: ['build/sass/**/*.scss'],
		    	tasks: ['buildcss']
		    }
		},

		cssc: {
			build: {
				options: {
					consolidateViaDeclarations: true,
					consolidateViaSelectors: true,
					consolidateMediaQueries: true
				},
				files: {
					'dist/css/main.css': 'dist/css/main.css'
				}
			}
		},

		cssmin: {
			build: {
				src: 'build/css/main.css',
				dest: 'dist/css/main.css'
			}
		},

		sass: {
			build: {
				files: {
					'build/css/main.css': 'build/sass/main.scss'
				}
			}
		},

		uglify: {
			build: {
				files: {
					'dist/js/base.min.js': ['build/js/base.js']
				}
			}
		},

		'ftp-deploy': {
			build: {
				auth: {
					host: '{{HOST}}',
					port: 21,
					authKey: 'key1'
				},
				src: 'local/path/to/files/to/upload/',
				dest: '/remote/path/to/desired/file/location/',
				exclusions: ['desired/files/to/exclude/within/local/path']
			}
		},

		autoprefixer: {
		    options: {
		      // browsers: ['last 2 version', 'ie 8', 'ie 7']
		    },
			single_file: {
				src: 'build/css/main.css',
				dest: 'build/css/main.css'
			}
		},

		concat: {
			dist: {
				src: ['build/js/libs/**/*.js'],
				dest: 'dist/js/scripts.js'
			}
		}
	});

	grunt.registerTask('default', []);
	// Local build only
	grunt.registerTask('buildcss', ['sass','autoprefixer', 'cssc', 'cssmin']);
	// Build locally and push to remote
	// grunt.registerTask('buildcss', ['sass', 'autoprefixer', 'cssc', 'cssmin', 'ftp-deploy']);
}