'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var md5 = require('gulp-md5-plus');
var autoPrefixer = require('gulp-autoprefixer');

/*
var less = require('gulp-less');
var sass = require('gulp-sass');

var csso = require('gulp-csso');
var rename = require('gulp-rename');
var gif = require('gulp-if');
var header = require('gulp-header');
*/

function makeArray() {
  var arr = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if ('string' === argType || 'number' === argType) {
      arr.push(arg);
    } else if (Array.isArray(arg)) {
      arr = arr.concat(arg);
    } else if ('object' === argType) {
      for (var key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          arr.push(key);
        }
      }
    }
  }

  return arr;
}

module.exports = function(config) {
  var runSequence = require('run-sequence').use(gulp);
  var isProduction = config.isProduction || process.env.NODE_ENV === "production";

  var options = config.styles || {};
  var hasBanner = !!options.banner;
  var bannerTpl = hasBanner && options.banner.template ||
    config.DEFAULTS.banner.template;
  var bannerData = hasBanner && options.banner.data ||
    config.DEFAULTS.banner.data;

  // 编译样式，添加浏览器前缀
  gulp.task('styles:compile', function() {
    console.log('编译'+ options.type.toLocaleUpperCase() +'：生产环境-' + isProduction);
    var s = (gulp.src(options.src)
      .pipe($.sourcemaps.init())
      .pipe($.plumber())  //自动处理全部错误信息防止因为错误而导致 watch 不正常工作
      .pipe((options.type === 'less') ? $.less() : (options.type === 'sass' ? $.sass() : $.stylus()))  //最好自动验证输入格式
      .pipe($.autoprefixer({browsers: options.autoPrefixer}))
      .pipe($.if(hasBanner, $.header(bannerTpl, bannerData)))
      //.pipe($.rename(function(path){
        //{ dirname: '.', basename: 'application.css', extname: '.css' }
        //path.basename = path.basename.replace('.css','').replace('application','app');
      //}))
      //.pipe($.if(options.replaceReg, $.replace(options.replaceReg[0], options.replaceReg[0])))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(options.dist))
    );

    return !isProduction ? s : s.pipe($.csso())
      .pipe($.rename({suffix: '.min'}))
      //.pipe($.if(hasBanner, $.header(bannerTpl, bannerData)))
      .pipe(md5(10, config.quoteSrc))
      .pipe(gulp.dest(options.dist))
      .pipe($.size({title: 'styles'}));
  });

  gulp.task('styles:watch', function() {
    return gulp.watch(makeArray(options.src, options.watches), ['styles:compile']);
  });

  gulp.task('styles', function(cb) {
    runSequence(['styles:compile', 'styles:watch'], cb);
  });

};