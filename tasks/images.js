'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
/*
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');
*/

module.exports = function(config) {
  // 图片优化
  gulp.task('images', function () {
    var path = config.images;
    return gulp.src(path.src)
      .pipe($.cache($.imagemin({
        progressive: true,
        interlaced: true
      })))
      .pipe(gulp.dest(path.dist))
      .pipe($.size({title: 'images'}));
  });
};
