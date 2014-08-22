var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', ['build'], function() {
  browserSync({
    server: {
      baseDir: './dist'
    },
    notify: false
  });
});
