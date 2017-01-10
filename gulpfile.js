'use strict';

const path 					= require('path');
const del 					= require('del');
const gulp 					= require('gulp');
const sourcemaps 			= require('gulp-sourcemaps');
const browserSync 			= require('browser-sync').create();
const postcss 				= require('gulp-postcss');
const svgSprite 			= require('gulp-svg-sprite');
const gulpif 				= require('gulp-if');
const plumber 				= require('gulp-plumber');
const notify 				= require('gulp-notify');
const uglifyjs 				= require('gulp-uglifyjs');
const concat 				= require('gulp-concat');
const browserify 			= require('browserify');
const babelify 				= require('babelify');
const watchify 				= require('watchify');
const source 				= require('vinyl-source-stream');
const buffer 				= require('vinyl-buffer');
const cssnext 				= require('postcss-cssnext');
const cssnano				= require("gulp-cssnano");
const postcssOpacity 		= require("postcss-opacity");
const postcssNested 		= require("postcss-nested");
const postcssClearfix 		= require("postcss-clearfix");
const postcssImport 		= require("postcss-import")
const cssMqpacker 			= require("css-mqpacker");
const csscomb 				= require('gulp-csscomb');
const newer 				= require('gulp-newer');
const remember 				= require('gulp-remember');
const cached 				= require('gulp-cached');
const imagemin 				= require('gulp-imagemin');
const pngquant 				= require('imagemin-pngquant');
const tinypng 				= require('gulp-tinypng');
const imageminSvgo 			= require('imagemin-svgo');

var config = {
	env: 'dev',
	url: "selap.dev", 
	root: "./", 
	src: "src", 
	dst: "dist", 
	admin: "/admin", 
	images: {
		src: '/images/**/*.{jpg,png,svg,gif}',
		dst: '/images/'
	}, 
	files: {
		src: '/files/**/*.*',
		dst: '/files/'
	}, 
	templates: {
		src: '/**/*.{php,html,tpl,json}',
		dst: ''
	},
	js: {
		src: '/js/index.jsx', 
		dst: '/js/'
	}, 
	css: {
		src: '/css/app.css', 
		watch: '/css/**/*.css', 
		dst: '/css/'
	}, 
	sprites: {
		src: '/sprites/**/*.svg', 
		dst: '/images/'
	}
};

gulp.task('serve', function() {
	browserSync.init({
		open: false, 
		proxy: config.url, 
		notify: false
	});

	browserSync.watch([config.dst+'/**/*.*', '!'+config.dst+'/**/*.map']).on('change', browserSync.reload);
});

function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: "Compile Error",
		message: "<%= error.message %>"
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('scripts', function() {
	var plugins = [];
	if (config.env === 'dev') {
		plugins = [watchify];
	}

	var bundler = browserify({
		entries: [config.src+config.admin+config.js.src], 
		debug: (config.env == 'dev') ? true : false, 
		cache: {},
		packageCache: {},
		extensions: ['js', 'jsx'],
		plugin: plugins
	}).transform(babelify.configure({
		presets: ["es2015", "react", "stage-0"], 
		plugins: ["transform-decorators-legacy"]
	}));
	function rebundle() {
		var stream = bundler.bundle();
		return stream.on('error', handleErrors)
		.pipe(source('scripts.js'))
		.pipe(buffer())
		.pipe(gulpif(config.env === 'prod', uglifyjs({
			mangle: true, 
			output: {
				beautify: false
			}
		})))
		.pipe(gulp.dest(config.dst+config.admin+config.js.dst));
	}
	bundler.on('update', function() {
		rebundle();
	});
	return rebundle();
});

gulp.task('styles', function(callback) {
	var processors = [
		postcssImport(), 
		postcssNested(), 
		postcssOpacity(), 
		postcssClearfix(), 
		cssMqpacker(), 
		cssnext({
			"browsers": "last 5 versions"
		})
	];

	return gulp.src([config.src+config.admin+config.css.src])
		.pipe(gulpif(config.env === 'dev', sourcemaps.init()))
		.pipe(plumber({
				errorHandler: notify.onError(err => ({
				title: 'Styles',
				message: err.message
			}))
		}))
		.pipe(cached('styles'))
		.pipe(remember('styles'))
		.pipe(concat('style.css'))
		.pipe(postcss(processors))
		.pipe(gulpif(config.env === 'prod', cssnano({
			core: true, 
			discardComments: {removeAllButFirst: true}
		})))
		.pipe(gulpif(config.env === 'dev', sourcemaps.write('')))
		.pipe(gulp.dest(config.dst+config.admin+config.css.dst));
});

gulp.task('templates', function(callback) {
	return gulp.src([config.src+config.templates.src, config.src+"/**/.htaccess"], {base: config.src+'/'})
		.pipe(plumber({
				errorHandler: notify.onError(err => ({
				title: 'Templates',
				message: err.message
			}))
		}))
		.pipe(newer(config.dst))
		.pipe(gulp.dest(config.dst));
});

gulp.task('images', function() {
	return gulp.src(config.src+config.admin+config.images.src)
		.pipe(plumber({
				errorHandler: notify.onError(err => ({
				title: 'Images',
				message: err.message
			}))
		}))
		.pipe(newer(config.dst+config.images.dst))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [
				{removeViewBox: false},
				{cleanupIDs: false}
			],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(config.dst+config.admin+config.images.dst));
});

gulp.task('sprites', function(callback) {
	gulp.src(config.src+config.admin+config.sprites.src)
		.pipe(plumber({
				errorHandler: notify.onError(err => ({
				title: 'Sprites',
				message: err.message
			}))
		}))
		.pipe(cached('sprites'))
		.pipe(remember('sprites'))
		.pipe(imagemin([
			imageminSvgo({
				plugins: [
					{removeViewBox: false},
					{cleanupIDs: false},
					{removeTitle : true}, 
					{removeUselessStrokeAndFill : true}, 
					{removeAttrs: {attrs: ['fill', 'stroke']}}
				]
			})
		]))
		.pipe(svgSprite({
			mode: {
				symbol: {
					render: {
						css: false,
						scss: false
					},
					dest: '',
					prefix: '',
					sprite: 'icons.svg'
				}
			}
		}))
		.pipe(gulp.dest(config.dst+config.admin+config.images.dst));

	callback();
});

gulp.task('clean', function() {
	return del(config.dst);
});

gulp.task('watch', function() {
	gulp.watch(config.src+config.admin+config.css.watch, gulp.series('styles')).on('unlink', function(filepath) {
		remember.forget('styles', path.resolve(filepath));
		delete cached.caches.styles[path.resolve(filepath)];
	});
	gulp.watch(config.src+config.admin+config.sprites.src, gulp.series('sprites')).on('unlink', function(filepath) {
		remember.forget('sprites', path.resolve(filepath));
		delete cached.caches.sprites[path.resolve(filepath)];
	});
	gulp.watch(config.src+config.admin+config.images.src, gulp.series('images'));
	gulp.watch(config.src+config.templates.src, gulp.series('templates'));
});

gulp.task('default', gulp.series(gulp.parallel(
	'templates', 
	'scripts', 
	'styles', 
	'images', 
	'sprites'
), gulp.parallel('watch', 'serve')));

gulp.task('setProd', function(callback) {
	config.env = "prod";
	callback();
})
gulp.task('build', gulp.series(
	'clean', 
	'setProd', 
	gulp.parallel(
		'templates', 
		'scripts', 
		'styles', 
		'images', 
		'sprites'
	))
);