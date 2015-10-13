'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

/*
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gif = require('gulp-if');
var header = require('gulp-header');
*/

// Task: uglify
module.exports = function(config) {
  var runSequence = require('run-sequence').use(gulp);
  var options = config.uglify || {};
  var hasBanner = !!options.banner;

  gulp.task('uglify:process', function() {
    return gulp.src(options.src)
      .pipe($.uglify(config.uglify.options))
      .pipe($.rename({suffix: '.min'}))
      .pipe($.if(hasBanner, $.header(
        hasBanner && options.banner.template ||
        config.DEFAULTS.banner.template,
        hasBanner && options.banner.data ||
        config.DEFAULTS.banner.data
      )))
      .pipe(gulp.dest(options.dist));
  });

  gulp.task('uglify:watch', function() {
    return gulp.watch(options.src, ['uglify:process']);
  });

  gulp.task('uglify', function(cb) {
    runSequence(['uglify:process', 'uglify:watch'], cb);
  });
};
