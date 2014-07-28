var gulp = require('gulp');
var gutil = require('gulp-util');
var assemble = require('gulp-assemble');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
//var normalize = require('normalize.css');

// Add Assemble Gruntfile task.
require('gulp-grunt')(gulp);

//var htmlmin = require('gulp-htmlmin');

var config = {
  src:              'src',
  dist:             'dist',
  appFolder:        'app',
  componentsFolder: 'app/bower_components',
  jsFolder:         'app/scripts',
  cssFolder:        'app/styles',
  imgFolder:        'app/img',
  dataFolder:       'app/data',
  fontsFolder:      'app/fonts',
  cssMainFile:      'main',
  jsMainFile:       'scripts'
};

var options = {
  data: 'src/app/data/*.json',
  partials: 'src/assemble/partials/{,*/}*.hbs',
  //layoutdir: 'src/assemble/layouts/',
  layoutdir: 'src2/layouts/',
  helpers: 'src/assemble/helpers/{,*/}*.js',
};

var _options = {
  //data: 'src/app/data/*.json',
  partials: 'src/assemble/partials/{,*/}*.hbs',
  layoutdir: 'src2/layouts/'
};

gulp.task('assemblex', function () {
  gulp.src('src/assemble/pages/{,*/}*.hbs')
    .pipe(assemble(options))
    //.pipe(htmlmin())
    .pipe(gulp.dest('_gh_pages/'));
});

var optionsPatterns = {
  //partials: 'src/assemble/patterns/*{.less,.pattern.hbs}',
  layoutdir: 'src2/layouts/',
  layout: 'default.hbs',
//helpers: 'src/assemble/helpers/{,*/}*.js',
};

gulp.task('assemble-patterns', function () {
  gulp.src('src2/patterns/{,*/}*.hbs')
    .pipe(assemble(optionsPatterns))
    //.pipe(htmlmin())
    .pipe(gulp.dest('_gh_pages/patterns'));
});

gulp.task('build', ['styles', 'assemble']);

gulp.task('browser-sync', ['build'], function() {
	browserSync({
		server: {
			baseDir: './dist'
		},
    notify: false
	});
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('src/**/*.{css,less}', ['styles']);
	gulp.watch('src/**/*.hbs', ['assemble']);
});

gulp.task('styles', function() {
  gulp.src([
      './node_modules/normalize.css/normalize.css',
      './src/app/bower_components/highlight/src/styles/github.css',
      './src/app/styles/main.less',
      './src/assemble/patterns/patterns.less'
    ])
    .pipe(less({
      compress: true
    }))
    .pipe(prefix())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/assets'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('assemble', ['grunt-assemble']);

gulp.task('default', ['watch']);
