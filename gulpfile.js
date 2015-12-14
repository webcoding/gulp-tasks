'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
// var docUtil = require('amazeui-doc-util');
var runSequence = require('run-sequence');

// NODE_ENV=production gulp
// var isProduction = process.env.NODE_ENV === "production";

var packageInfo = require('./package.json');

var projectConfig = {
  // isProduction: isProduction  //可以不传入，内部默认已做处理
  projectName: 'tests',   //项目名称，可用于打 zip 包
  srcRoot: 'tests',       //项目源目录
  distRoot: 'dist'        //编译输出目录
};

var config = {
  projectName: projectConfig.projectName,
  srcRoot: projectConfig.srcRoot,
  distRoot: projectConfig.distRoot,

  pkg: packageInfo,

  // styles: {
  //   type: 'less',
  //   src: projectConfig.srcRoot + '/less/test.less',
  //   dist: projectConfig.distRoot + '/css',
  //   watches: projectConfig.srcRoot + '/**/*.less',
  //   banner: false
  // },

  styles: {
    type: 'scss',
    src: projectConfig.srcRoot + '/scss/test.scss',
    dist: projectConfig.distRoot + '/css',
    watches: projectConfig.srcRoot + '/**/*.scss',
    banner: false
  },

  // docs:md
  md: {
    src: ['README.md'],
    data: {
      pluginTitle: 'Gulp Tasks for happyCoding',
      pluginDesc: 'happyCoding 开发 gulp 任务'
    },
    rename: function(file) {
      file.basename = file.basename.toLowerCase();
      if (file.basename === 'readme') {
        file.basename = 'index';
      }
      file.extname = '.html';
    },
    dist: function(file) {
      if (file.relative === 'index.html') {
        return 'dist'
      }
      return 'dist/docs';
    }
  },
/* TODO：
  uglify: {
    src: './tasks/*.js',
    dist: './dist',
    banner: false
  }
*/
};

require('./index')(gulp, config);

gulp.task('build', function(cb) {
  runSequence('clean', ['html', 'browserify', 'styles'], cb);
  // runSequence('clean', ['uglify', 'browserify', 'styles', 'markdown'], cb);
});

gulp.task('default', ['build']);

// 不要直接使用 gulp.task('dev', ['build', 'server']);
// 这样的 build 和 server 没有先后执行顺序
gulp.task('dev', function(cb) {
  runSequence('build', 'server', cb);
});

gulp.task('test', function(cb) {
  runSequence('build', 'server', cb);
});







// 使用 webpack 打包合并静态文件
//gulp-webpack 即 shama：webpack-stream
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
// var webpackConfig = require('webpack-config.js');







/*
在node中使用gulp，自动刷新browserSync，应该要怎么引入 入口文件app.js ? -> nodemon !

// 程序入口
gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
                script: 'app.js',
                ext: 'js',
                ignore: ['public/**'],
                env: {'NODE_ENV': 'development'}
    })
    .on('start', function onStart() {
        if(!called){cb();}
            called = true;
        })
    .on('restart', function() {
        setTimeout(function() {
            console.log('-------- restart --------');
          reload({stream: false});
        }, 1000);
    });
});
// 监听变化
gulp.task('browser-sync', ['nodemon'], function(){
    browserSync.init({
        files: ['public/**','views/**'],
        proxy: 'http://localhost:3000',
        port: 4000,
        browser: ['/Applications/Google\ Chrome\ Canary.app/'],
        notify: true,
    });
});

前人的基础上修改了一下，能做到：
1. 监听 项目 静态资源模块以外 js文件变化（如：修改route文件），重启服务 & 自动刷新页面。
2. 监听 模板文件，静态资源文件变化，自动刷新页面。

其他 task 可以根据项目情况，自主选择加入。

watch 的时候路径不要用 './xxx'，直接使用 'xxx' 即可，不然某个被 watch 的路径中新建文件是不能激活 watch 的。

"gulp": "*",                  // 基础
  "gulp-if": "*",               // 根据不同的环境，切换方法

  "gulp-util": "*",             // 如果有自定义方法，可能会用到
  "gulp-clean": "*",            // 清理路径下文件
  "gulp-rename": "*",           // 重命名文件，比如上节提到 _ 需要还原回去
  "gulp-concat": "*",           // 文件合并

  "gulp-jshint": "*",           // jshint 检查一些格式，这个是为了统一团队的代码风格的
  "gulp-browserify": "*",       // 利用 CommonJS 的格式，直接让浏览器也能用类似的方式
  "gulp-uglify": "*",           // 替换压缩

  "gulp-jade": "*",             // jade
  "gulp-stylus": "*",           // stylus

  "gulp-mocha": "*",            // 测试框架
  "chai": "*",
  "jscov": "*",

  "gulp-changed": "*"           // 有变化的才操作，没变化的就跳过，可进一步优化效率
}

亦可参考 [JGulp](https://github.com/Jeff2Ma/JGulp)

*/
