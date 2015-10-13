'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
/*
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');
*/

module.exports = function(config) {
  var runSequence = require('run-sequence').use(gulp);
  var isProduction = config.isProduction || process.env.NODE_ENV === "production";

  var options = config.copy || {},
      venders = options.venders || {};

  //TDK

  // 拷贝外部依赖以及 html 等相关文件
  gulp.task('copy:all', ['copy:venders'], function() {
    return gulp.src(options.src, {
      dot: true //TODO：这个参数干嘛的
    }).pipe(gulp.dest(function(file) {
      //关于 js 以及 styles 已经在对应的 tasks 中输出，这里不用 copy；
      //这里要 copy 的是 html 以及字体文件（图片可以使用 images 处理）
      var filePath = file.path.toLowerCase();

      if (filePath.indexOf('.css') > -1) {
        return paths.dist.css;
      } else if (filePath.indexOf('fontawesome') > -1) {
        return paths.dist.base;
      }
      return paths.dist.base;
    }))
    .pipe($.size({title: 'copy'}));
  });

  gulp.task('copy:venders', function() {
    return gulp.src(venders.src, {
      dot: true
    }).pipe($.rename(function(path){
      //一个对应关系，什么名字迁移后改为什么名字

      // // console.log(path)
      // if (path.basename === 'react.min' || path.basename === 'react-dom.min') {
      //   path.basename = path.basename.replace('.min',('-' + reactVersion) );
      // }
    }))
    // lodash 太大了，uglify 之后还 51k,所以不全部引用了，按需引用
    // .pipe($.uglify())
    .pipe(gulp.dest(function(file) {
      // var filePath = file.path.toLowerCase();
      // // console.log(filePath)
      // // if (filePath.indexOf('lodash/index.js') > -1) {
      // //   filePath = filePath.replace('index','lodash')
      // // }
      return venders.dist;
    }))
    .pipe($.size({title: 'copy:venders'}));
  });

  gulp.task('copy', function(cb) {
    runSequence(['copy:all'], cb);
  });

};
module.exports = function(config) {

  gulp.task('copy', function () {
    var options = config.copy;
    return gulp.src(path.src || '') // 输入 '' 或 []
      .pipe($.rename(function(pathName) {
        return path.renameFunction ? path.distFunction(pathName) : path.rename;
      }))
      .pipe(gulp.dest(function(file) {
        var filePath = file.path.toLowerCase();
        return path.distFunction ? path.distFunction(filePath) : path.dist;
      })
      .pipe($.size({title: 'copy'}));
  });
};
