'use strict';

const fs 				= require('fs')
const path 				= require('path');
const del 				= require('del');
const gulp 				= require('gulp');
const sourcemaps 		= require('gulp-sourcemaps');
const browserSync 		= require('browser-sync').create();
const postcss 			= require('gulp-postcss');
const svgSprite 		= require('gulp-svg-sprite');
const gulpIf 			= require('gulp-if');
const cssnano 			= require('gulp-cssnano');
const plumber 			= require('gulp-plumber');
const notify 			= require('gulp-notify');
const uglify 			= require('gulp-uglifyjs');
const concat 			= require('gulp-concat');
const cssnext 			= require('cssnext');
const postcssOpacity 	= require("postcss-opacity");
const postcssNested 	= require("postcss-nested");
const postcssClearfix 	= require("postcss-clearfix");
const cssMqpacker 		= require("css-mqpacker");
const csscomb 			= require('gulp-csscomb');
const rucksack 			= require('rucksack-css');
const newer 			= require('gulp-newer');
const debug 			= require('gulp-debug');
const remember 			= require('gulp-remember');
const cached 			= require('gulp-cached');
const imagemin 			= require('gulp-imagemin');
const pngquant 			= require('imagemin-pngquant');
const tinypng 			= require('gulp-tinypng');
const svg2png 			= require('gulp-svg2png');
const realFavicon 		= require('gulp-real-favicon');
const mjml 				= require('gulp-mjml');

var paths = {
	root: "./", 
	src: "_dev", 
	dst: "", 
	js: {
		src: '/js/', 
		dst: 'js/'
	}, 
	css: {
		src: '/css/', 
		dst: 'css/'
	}
};

gulp.task('scripts', function(callback) {
	gulp.src([paths.src+paths.js.src+'jquery-1.11.2.js', paths.src+paths.js.src+'*.js', paths.src+paths.js.src+'myscripts.js'])
		.pipe(plumber({
				errorHandler: notify.onError(err => ({
				title: 'Scripts',
				message: err.message
			}))
		}))
		.pipe(cached('scripts'))
		.pipe(remember('scripts'))
		.pipe(uglify({
			mangle: false, 
			output: {
				beautify: true
			}
		}))
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest(paths.dst+paths.js.dst));

	gulp.src([paths.src+paths.js.src+'vendor/**/*.*'])
		.pipe(gulp.dest(paths.dst+paths.js.dst));

	callback();
});

gulp.task('styles', function(callback) {
	var processors = [
		postcssOpacity(), 
		postcssClearfix(), 
		postcssNested(), 
		cssMqpacker(), 
		rucksack(), 
		cssnext({
			"browsers": "last 5 versions"
		})
	];

	return gulp.src([paths.src+paths.css.src+'normalize.css', paths.src+paths.css.src+'common.css', paths.src+paths.css.src+'**/*.css'])
		.pipe(plumber({
				errorHandler: notify.onError(err => ({
				title: 'Styles',
				message: err.message
			}))
		}))
		.pipe(cached('styles'))
		.pipe(remember('styles'))
		.pipe(concat('style.min.css'))
		.pipe(postcss(processors))
		.pipe(cssnano({
			core: false, 
			autoprefixer: false, 
			discardComments: {removeAll: true}
		}))
		.pipe(csscomb())
		.pipe(gulp.dest(paths.dst+paths.css.dst));
});

gulp.task('watch', function() {
	gulp.watch(paths.src+paths.css.src, gulp.series('styles')).on('unlink', function(filepath) {
		remember.forget('styles', path.resolve(filepath));
		delete cached.caches.styles[path.resolve(filepath)];
	});
	gulp.watch(paths.src+paths.js.src, gulp.series('scripts')).on('unlink', function(filepath) {
		remember.forget('scripts', path.resolve(filepath));
		delete cached.caches.scripts[path.resolve(filepath)];
	});
});

gulp.task('default', gulp.series(gulp.parallel('scripts', 'styles'), gulp.parallel('watch')));