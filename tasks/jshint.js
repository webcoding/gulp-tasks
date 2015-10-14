'use strict';

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
/*
var eslint = require('gulp-eslint');
*/

module.exports = function(gulp, config) {
  // JavaScript 格式校验
  gulp.task('jshint', function() {
    var path = config.jshint;
    return gulp.src(path.src)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failOnError());
  });
};
