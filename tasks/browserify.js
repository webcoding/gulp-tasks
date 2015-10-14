'use strict';

var $ = require('gulp-load-plugins')();
var md5 = require('gulp-md5-plus');

var browserify = require('browserify');
var watchify = require('watchify');
var assign = require('object-assign');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var derequire = require('derequire/plugin');

/* config.browserify example

// browserify
quoteSrc: './app/index.html',  //引用页面
browserify: {
  bundleOptions: {
    cache: {},
    packageCache: {}
    entries: './tests/app.js',
    debug: !isProduction
  },
  filename: 'app.js',
  transforms: [
    ['browserify-shim', {global: true}]
  ],
  plugins: [],
  dist: 'dist',
  banner: false
},

*/

module.exports = function(gulp, config) {
  var options = config.browserify || {};
  var isProduction = config.isProduction || process.env.NODE_ENV === "production";

  var hasBanner = !!options.banner;
  var bannerTpl = hasBanner && options.banner.template ||
    config.DEFAULTS.banner.template;
  var bannerData = hasBanner && options.banner.data ||
    config.DEFAULTS.banner.data;

  var bundleInit = function() {
    var b = browserify(assign({}, watchify.args, options.bundleOptions));

    // 使用 watchify，不再需要使用 gulp 监视 JS 变化
    // gulp.watch('app/js/**/*', ['browserify']);
    if (!isProduction) {
      b = watchify(b);
      b.on('update', function() {
        bundle(b);
      });
    }

    // 将 transforms 的设定列表不打包进去
    if (options.transforms) {
      options.transforms.forEach(function(t) {
        b.transform(t);
      });
    }

    if (options.plugins) {
      b.plugin(derequire);
      options.plugins.forEach(function(p) {
        b.plugin(p);
      });
    }

    b.on('log', $.util.log);
    return bundle(b);
  };

  var bundle = function(b) {
    console.log('编译JS：生产环境-' + isProduction);
    var s = (
      b.bundle()
        .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source(options.filename))
        .pipe(buffer())
        // .pipe($.sourcemaps.init())
        // .pipe($.sourcemaps.write("."))
        .pipe($.if(hasBanner, $.header(bannerTpl, bannerData)))
        .pipe(gulp.dest(options.dist))
        .pipe($.size({title: 'script'}))
    );

    return !isProduction ? s : s.pipe($.uglify())
      .pipe($.rename({suffix: '.min'}))
      //.pipe($.if(hasBanner, $.header(bannerTpl, bannerData)))
      .pipe(md5(10, config.quoteSrc))
      .pipe(gulp.dest(options.dist))
      .pipe($.size({title: 'script minify'}));
  };

  gulp.task('browserify', bundleInit);
};

/*
browserify . -d -o bundle.js

venders: [
  './node_modules/losash/index.js',
  // './node_modules/react/dist/react-with-addons.min.js',
  './node_modules/react/dist/react.min.js'
],

debug: true是告知Browserify在运行同时生成内联sourcemap用于调试。
引入gulp-sourcemaps并设置loadMaps: true是为了读取上一步得到的内联sourcemap，并将其转写为一个单独的sourcemap文件。
vinyl-source-stream用于将Browserify的bundle()的输出转换为Gulp可用的vinyl（一种虚拟文件格式）流。
vinyl-buffer用于将vinyl流转化为buffered vinyl文件（gulp-sourcemaps及大部分Gulp插件都需要这种格式）。
 */
