var gulp = require('gulp');

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('src/**/*.{css,less}', ['styles']);
  gulp.watch('src/**/*.{hbs,yml}', ['assemble']);
});
