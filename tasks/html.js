'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
/*
var eslint = require('gulp-eslint');
*/

module.exports = function(config) {
  var isProduction = config.isProduction;
  // 压缩 HTML
  gulp.task('html', function () {
    var options = config.html;
    return gulp.src(options.src)
      // .pipe($.minifyHtml({
      //   empty: true,
      //   spare: true,
      //   quotes: true,
      //   loose: true
      // }))
      .pipe($.replace(/\{\{__VERSION__\}\}/g, isProduction ? '.min' : ''))
      .pipe(gulp.dest(options.dist))
      .pipe($.size({title: 'html'}));
  });
};
