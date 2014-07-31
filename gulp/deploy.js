var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var exit = require('gulp-exit');

var options = {
  cacheDir: 'dist-cache'
};

gulp.task('deploy', function() {
  gulp.src('./dist/**/*')
    .pipe(deploy(options))
    .pipe(exit());
});
