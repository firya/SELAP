var gulp 				= require('gulp');
var postcss 			= require('gulp-postcss');
var browserSync 		= require('browser-sync');
var uglify 				= require('gulp-uglifyjs');
var concat 				= require('gulp-concat');
var tinypng 			= require('gulp-tinypng');
var changed 			= require('gulp-changed');
var watch 				= require('gulp-watch');
var cssnext 			= require('cssnext');
var postcssOpacity 		= require("postcss-opacity");
var postcssNested 		= require("postcss-nested");
var postcssClearfix 	= require("postcss-clearfix");
var cssMqpacker 		= require("css-mqpacker");
var postcssCenter 		= require("postcss-center");
var rucksack 			= require('rucksack-css');
var csscomb 			= require('gulp-csscomb');
var comments 			= require('postcss-discard-comments');

var path = {
	root: "./", 
	images: {
		src: '_dev/images/',
		dst: 'images/',
		jpg: './images/**/*.jpg',
		png: './images/**/*.png',
	},
	js: {
		src: '_dev/js/', 
		dst: 'js/', 
		filter: '*.js'
	}, 
	css: {
		src: '_dev/css/', 
		dst: 'css/', 
		filter: '**/*.css'
	}, 
};

function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

// Scripts
gulp.task('scripts', function() {
	gulp.src([path.js.src+'jquery-1.11.2.js', path.js.src+'*.js', path.js.src+'myscripts.js', path.js.src+'filemanager.js'])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify({
			compress: false, 
			mangle: false, 
			output: {
				beautify: true
			}
		}))
		.on('error', errorLog)
		.pipe(gulp.dest(path.js.dst));
});

// Styles
var row = function (css, opts) {
	css.walkDecls(function(decl) {
		if (decl.prop === 'row') {
			var gutter = 20;
			gutter = decl.value;

			var origRule = decl.parent;
			origRule.insertBefore(decl, {
				prop: 'position',
				value: 'relative'
			}).insertBefore(decl, {
				prop: 'display',
				value: 'block'
			}).insertBefore(decl, {
				prop: 'margin-left',
				value: -(gutter/2)+"px"
			}).insertBefore(decl, {
				prop: 'margin-right',
				value: -(gutter/2)+"px"
			}).insertBefore(decl, {
				prop: 'clear',
				value: 'fix'
			});

			decl.remove();
		}
	});
};
var column = function (css, opts) {
	css.walkDecls(function(decl) {
		if (decl.prop === 'column') {
			var params = decl.value.split(" ");
			var column = params[0].split("/");
			var width = 1;
			if (params[0].indexOf("/") > 0) {
				width = (100*column[0]/column[1])+"%";
			} else {
				width = (100*column[0])+"%";
			}
			var gutter = 20;
			if (params.length == 2) {
				gutter = params[1];
			}
			

			var origRule = decl.parent;

			origRule.insertBefore(decl, {
				prop: 'width',
				value: width
			}).insertBefore(decl, {
				prop: 'max-width',
				value: width
			}).insertBefore(decl, {
				prop: 'float',
				value: 'left'
			}).insertBefore(decl, {
				prop: 'padding-left',
				value: (gutter/2)+"px"
			}).insertBefore(decl, {
				prop: 'padding-right',
				value: (gutter/2)+"px"
			}).insertBefore(decl, {
				prop: 'box-sizing',
				value: 'border-box'
			});

			decl.remove();
		}
	});
};

gulp.task('styles', function() {
	var processors = [
		postcssOpacity(), 
		row, 
		column, 
		postcssClearfix(), 
		postcssNested(), 
		cssMqpacker(), 
		postcssCenter(), 
		rucksack(), 
		comments({removeAll: true}), 
		cssnext({
			"browsers": "last 5 versions"
		})
	];

	gulp.src([path.css.src+'normalize.css', path.css.src+'common.css', path.css.src+path.css.filter])
		.pipe(concat('style.min.css'))
		.pipe(postcss(processors))
		.on('error', errorLog)
		.pipe(csscomb())
		.on('error', errorLog)
		.pipe(gulp.dest(path.css.dst));
});

gulp.task('images', function() {
	gulp.src([path.images.jpg, path.images.png], {base: '_dev/'})
		.pipe(tinypng('4ZqKPaFVLzm22rdBdxXLt67utMzi7Zqu'))
		.on('error', errorLog)
		.pipe(gulp.dest(path.images.dst));
});

//Watcher
gulp.task('watch', function () {
	gulp.watch(path.js.src+'**/*.js', ['scripts']);
	gulp.watch(path.css.src+'**/*.css', ['styles']);
	gulp.watch(['**/*.php', '**/*.html']);
})

gulp.task('default', ['scripts', 'styles', 'watch']);