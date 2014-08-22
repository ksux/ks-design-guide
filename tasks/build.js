var gulp = require('gulp');
// Use run-sequence until syncronous tasks are supported in Gulp 4.
// https://github.com/gulpjs/gulp/issues/96
var runSequence = require('run-sequence');

// First clean the `dist` directory.
// Then run the other tasks in parallel.
gulp.task('build', function(callback) {
  runSequence('clean', ['copy', 'styles', 'assemble'], callback);
});
