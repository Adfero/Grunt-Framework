# Grunt Framework

Provides a minimal starting point for [grunt](https://github.com/gruntjs/grunt) projects. Nothing fancy here, just an improved developer workflow.

## Bower

This framework uses [Bower](http://bower.io/), a package manager for the web, to keep all libraries up to date.

Bower depends on [Node](https://nodejs.org) and [npm](https://npmjs.org/). It is installed globally using npm:

```
npm install -g bower
```

Depending on your setup you may need to run this command as `sudo`

### Usage
To use Bower add the libraries you will be using to **bower.json** and run

```
bower install
```

## Build Directory

The **build** directory is where **CSS** and **JavaScript** development takes place.

This framework uses [SASS](http://sass-lang.com/) to compile CSS and can be configured to run [CSS Lint](http://csslint.net/) each time a CSS file is compiled. To enable uncomment the following line in **Gruntfile.js**

```
// grunt.registerTask('buildcss', ['sass','autoprefixer', 'cssUrlEmbed', 'cssc', 'csslint', 'cssmin']);
```

By default **all** images, 32768 bytes or less, specified within stylesheets using the `background` property are encoded using base64. To exclude an image from being encoded add `/*ImageEmbed:skip*/` directly **after** the declaration.

```
background: url(image.gif); /*ImageEmbed:skip*/
```

Once a CSS file has been compiled it is minified in the **dist/css** directory.

Likewise, this framework uses [JSLint](http://www.jslint.com/) each time **base.js** is saved prior to minifying all JavaScript in the **dist/js** directory.

## Remote Workflow

This workflow allows developers to upload compiled files via FTP on save. To enable uncomment the following line in **Gruntfile.js**:

```
// grunt.registerTask('buildcss', ['sass', 'autoprefixer', 'imageEmbed', 'cssc', 'cssmin', 'ftp-deploy']);
```

If the remote workflow is enabled files in the **dist** directory are uploaded to the host identified in the following section of **Gruntfile.js**

```
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
```

FTP usernames and passwords are stored in **.ftppass**

## Image Optimization

Images can be optimized using [OptiPNG](http://optipng.sourceforge.net/), [pngquant](http://pngquant.org/), [jpegtran](http://jpegclub.org/jpegtran/) and [gifsicle](http://www.lcdf.org/gifsicle).

This task watches images located in the **build/img** directory and optimizes them and saves a copy in the **dist/img** directory.

During optimization images in **build/img/sprite** are optimized and output as a single sprite in the **build/img** directory.

To use this task, execute the following command:

```
grunt optimize
```