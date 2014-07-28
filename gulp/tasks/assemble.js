var gulp = require('gulp');
var browserSync = require('browser-sync');

// Add Assemble Gruntfile task.
// Using Assemble via Grunt until gulp-assemble is stable.
// https://github.com/assemble/gulp-assemble
require('gulp-grunt')(gulp);

gulp.task('assemble', ['grunt-assemble'], function() {
  browserSync.reload();
});
