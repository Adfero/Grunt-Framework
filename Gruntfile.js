module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
		    js: {
		    	files: ['build/js/base.js'],
		    	tasks: ['uglify', 'concat']
		    },
		    css: {
		    	files: ['build/sass/**/*.scss'],
		    	tasks: ['buildcss']
		    }
		},

		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['build/css/main.css']
			},
			lax: {
				options: {
					import: false
				},
				src: ['build/css/main.css']
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
					'build/css/main.css': 'build/css/main.css'
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
				browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1', 'ie 9', 'ie 8', 'ie 7']
			},
		    single_file: {
				src: 'build/css/main.css',
				dest: 'build/css/main.css'
			}
		},

		concat: {
			dist: {
				src: ['build/js/libs/jquery-1.10.2.min.js', 'build/js/libs/moment.min.js'],
				dest: 'dist/js/scripts.js'
			}
		},

		cssUrlEmbed: {
			encodeDirectly: {
				files: {
					'build/css/main.css': ['build/css/main.css']
				}
			}
		}
	});

	grunt.registerTask('default', []);
	// Local build only
	grunt.registerTask('buildcss', ['sass','autoprefixer', 'cssUrlEmbed', 'cssc', 'cssmin']);

	// Local build w/ CSSLint
	// grunt.registerTask('buildcss', ['sass','autoprefixer', 'cssUrlEmbed', 'cssc', 'csslint', 'cssmin']);
	
	// Build locally and push to remote
	// grunt.registerTask('buildcss', ['sass', 'autoprefixer', 'cssUrlEmbed', 'cssc', 'cssmin', 'ftp-deploy']);
}