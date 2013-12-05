module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Watch Task
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

		// CSS related Tasks
		sass: {
			build: {
				files: {
					'build/css/main.css': 'build/sass/main.scss'
				}
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

		imageEmbed: {
			dist: {
				src: [ "build/css/main.css" ],
				dest: "build/css/main.css",
				options: {
					deleteAfterEncoding : false
				}
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

		cssmin: {
			build: {
				src: 'build/css/main.css',
				dest: 'dist/css/main.css'
			}
		},

		// JavaScript related tasks
		uglify: {
			build: {
				files: {
					'dist/js/base.min.js': ['build/js/base.js']
				}
			}
		},

		concat: {
			dist: {
				src: ['build/js/libs/jquery/jquery.min.js', 'build/js/libs/momentjs/min/moment.min.js'],
				dest: 'dist/js/scripts.js'
			}
		},

		// Image tasks
		imagemin: {
			content: {   
				files: [{
					expand: true,
					cwd: 'assets/images',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'public/assets/images'
				}]
			},
			stylesheets: {   
				files: [{
					expand: true,
					cwd: 'build/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/img'
				}]
			}
		},

		sprite: {
			core: {
				src: ['build/img/sprite/core/**.png'],
				destImg: 'build/img/sprite.png',
				destCSS: 'build/sass/partials/_sprite.scss',
				imgPath: '../img/sprite.png',
				cssTemplate: 'template.mustache',
				algorithm: 'binary-tree',
				padding: 1,
				engine: 'phantomjs',
				cssFormat: 'scss'
			},
			core_2x: {
				src: ['build/img/sprite/core-2x/**.png'],
				destImg: 'build/img/sprite@2x.png',
				destCSS: 'build/sass/partials/_sprite@2x.scss',
				imgPath: '../img/sprite@2x.png',
				cssTemplate: 'template2x.mustache',
				algorithm: 'binary-tree',
				padding: 2,
				engine: 'phantomjs',
				cssFormat: 'scss'
			}
		},

		// Deployment tasks
		'ftp-deploy': {
			build: {
				auth: {
					host: '{{HOST}}',
					port: 2,
					authKey: 'key1'
				},
				src: 'local/path/to/files/to/upload/',
				dest: '/remote/path/to/desired/file/location/',
				exclusions: ['dist/img/sprite/*', 'desired/files/to/exclude/within/local/path']
			}
		}
	});

	grunt.registerTask('default', []);
	
	/**************************
	 * CSS Queued Tasks
	 **************************/

	// Local CSS build only
	grunt.registerTask('buildcss', ['sass','autoprefixer', 'imageEmbed', 'cssc', 'cssmin']);

	// Local CSS build w/ CSSLint
	// grunt.registerTask('buildcss', ['sass','autoprefixer', 'imageEmbed', 'cssc', 'csslint', 'cssmin']);
	
	// Build CSS locally and push to remote w/out CSSLint
	// grunt.registerTask('buildcss', ['sass', 'autoprefixer', 'imageEmbed', 'cssc', 'cssmin', 'ftp-deploy']);

	/**************************
	 * JavaScript Queued Tasks
	 **************************/
	 
	// Local JS build only
	grunt.registerTask('buildjs', ['uglify', 'concat']);

	// Local JS build w/ JSLint
	// grunt.registerTask('buildjs', ['uglify', 'concat']);
	
	// Build JS locally and push to remote w/out JSLint
	// grunt.registerTask('buildjs', ['uglify', 'concat', 'ftp-deploy']);

	/**************************
	 * Image Queued Tasks
	 **************************/

	// Local image optimization
	grunt.registerTask('optimize', ['sprite', 'imagemin']);
}