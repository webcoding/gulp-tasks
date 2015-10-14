'use strict';

var configUtil = {
  autoprefixerBrowsers : [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 2.3',
    'bb >= 10'
  ]
};

/* 默认项目结构如下:

源文件 app
|- /styles        //样式，可以为 less/sass/stylus
|- /js            //js 文件（commonJS 格式）
|- /img           //样式 icon 图标 等
|- /fonts         //字体文件
|- /venders       //外部依赖 如 normalize.css react等
|- index.html     //html文件

输出文件
|- /css           //css 编译后
|- /js            //js 编译后
|- /img           //icon 图标 等
|- /fonts         //字体文件
|- /venders       //外部依赖
|- index.html     //html
*/

module.exports = function(config) {
  var projectConfig = {
    projectName: config.projectName || 'app',    //项目名称，可用于打 zip 包
    srcRoot: config.srcRoot || './app',       //项目源目录
    distRoot: config.distRoot || './dist',    //编译输出目录
    isProduction: config.isProduction || process.env.NODE_ENV === "production"
  };

  var srcRoot = projectConfig.srcRoot,
      distRoot = projectConfig.distRoot,
      projectName = projectConfig.projectName,
      isProduction = projectConfig.isProduction;

  return {
    isProduction: isProduction,
    projectName: projectName,

    //增加 md5 戳
    quoteSrc: [(distRoot + '/index.html')],

    jshint: {
      src: './tasks/*.js'
    },

    html: {
      src: srcRoot + '/*.html',
      dist: distRoot
    },

    // copy: {
    //   src: [
    //     'app/**/*',
    //     '!app/*.html',
    //     '!app/js/**/*',
    //     // '!app/venders',
    //     // '!app/i',
    //     'bower_components/pure/pure-min.css'
    //   ],
    //   venders: {
    //     src:['bower_components/pure/pure-min.css'],
    //     dist: ['bower_components/pure/pure-min.css']
    //   },
    //
    // },

    styles: {
      type: 'less', //编译类型 less sass 或 stylus，TODO：可优化为自动判断，根据后缀
      src: srcRoot + '/less/test.less',
      autoPrefixer: configUtil.autoprefixerBrowsers,
      dist: distRoot + '/css',
      watches: srcRoot + '/**/*.less',
      banner: false
    },

    // browserify
    browserify: {
      bundleOptions: {
        entries: srcRoot + '/js/app.js',
        debug: !isProduction,
        cache: {},
        packageCache: {}
      },
      filename: 'app.js',
      transforms: [
        ['browserify-shim', {global: true}]
      ],
      plugins: [],
      dist: distRoot + '/js',
      banner: false
    },

    // clean path
    clean: distRoot,

    //预览服务器
    browserSync: {
      // port: 5000, //默认3000
      // ui: {    //更改默认端口weinre 3001
      //     port: 5001,
      //     weinre: {
      //         port: 9090
      //     }
      // },
      // server: {
      //   baseDir: 'dist/docs'
      // },
      open: "local", //external
      notify: true,
      logPrefix: 'happyCoding',
      server: distRoot
    },

    // watch files and reload browserSync
    bsWatches: distRoot + '/**/*',

    // release task
    ghPages: {
      src: distRoot + '/**/*'
    },

    // remote branch
    git: {
      branch: 'master'
    }
  };
};
