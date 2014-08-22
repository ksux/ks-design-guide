var gulp = require('gulp');

gulp.task('copy', function() {
  return gulp.src('./src/{.htaccess,*.txt}')
    .pipe(gulp.dest('./dist'));
});
