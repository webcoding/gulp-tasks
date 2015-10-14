# gulp-tasks

收集开发常用的 tasks 任务列表，汇总成 gulp-tasks-build。

基于 amazeui-gulp-tasks 的结构，综合常用的 tasks 任务列表汇总而成，让 Coding 更 Happy ！！！。

### Task list

```
gulp clean  //洗刷刷，重新来！
gulp copy   //copy 项目依赖文件到编译目录，如字体，外部依赖的 css/js
gulp html   //copy 项目 html 到编译目录

gulp styles //编译样式，根据配置类型，可编译 less sass 或 stylus
gulp browserify //编译 JS，编译 CommonJS 格式的模块
            styles 和 browserify，在开发环境通过 map 调试，生成环境其引用会追加版本号
gulp server //开发预览服务器
            开发环境使用：gulp dev
            生产使用：NODE_ENV=production gulp
```

### TODO list

```
rename.js  //重命名脚本，可集成编译或copy 的任务流中，完成指定重命名
replace.js //自定义替换脚本，可集成编译或copy 的任务流中，完成指定内容的替换
gulp uglify  //压缩/丑化 task，待定（编译处已处理）
gulp webpack //使用 webpack 形式组织及打包文件
gulp jshint //JS 格式校验（暂未使用）
gulp images  //对样式中图片进行处理（暂未使用）
               gulp-imagemin + imagemin-pngquant 或 gulp-tinypng 形式
gulp publish //发布项目
gulp upload  //上传文件到远程 FTP 服务器
gulp zip     //打包 build 后的项目
gulp markdown //编译 markdown 文件，生成文档
gulp help    //输出此 gulp-tasks 的帮助
```

### 本项目测试及效果体验

```
下载安装
git clone https://github.com/webcoding/gulp-tasks.git
npm install
bower install   //引入的外界依赖，如 normalize.css pure.css react 等

运行
gulp dev 或者 NODE_ENV=production gulp
```

## 安装及使用

```
$ npm install gulp-tasks-build --save-dev
```

在 `gulpfile.js` 中调用任务：

```js
// gulpfile.js

'use strict';

var gulp = require('gulp');
var tasks = require('gulp-tasks-build');
var runSequence = require('run-sequence');

// 项目配置
var projectConfig = {
  projectName: 'tests',   //项目名称，可用于打 zip 包
  srcRoot: 'tests',       //项目源目录
  distRoot: 'dist'        //编译输出目录
};

// Task配置
var config = {
  projectName: projectConfig.projectName,
  srcRoot: projectConfig.srcRoot,
  distRoot: projectConfig.distRoot,

  styles: {
    type: 'sass', //编译类型 less sass 或 stylus
    src: projectConfig.srcRoot + '/scss/style.scss',
    autoPrefixer: [],  //autoPrefixer 配置，如果为空，则按项目内部默认值设定
    dist: projectConfig.distRoot + '/css',
    watches: projectConfig.srcRoot + '/**/*.scss',
    banner: false
  },
};

tasks(gulp, config);

gulp.task('build', function(cb) {
  //根据你的需求，选择需要的 tasks 任务，别忘了配置
  runSequence('clean', ['html', 'browserify', 'styles'], cb);
});

// 不要直接使用 gulp.task('dev', ['build', 'server']);
// build 和 server 没有先后执行顺序，可能时序错乱，建议如下使用
gulp.task('dev', function(cb) {
  runSequence('build', 'server', cb);
});
```

### autoPrefixer 默认配置

```
var autoPrefixer = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 2.3',
  'bb >= 10'
];
```

## 任务及配置说明

### `styles`

编译 styles。配置如下：

```js
var config = {
  styles: {
    type: 'less', // 编译类型 less sass 或 stylus（gulp-sass 安装编译超级慢）
    src: './tests/less/test.less', // 源文件
    autoPrefixer: {}, // autoprefixer 设置，
    dist: './dist/css', // 部署目录
    watches: '', // watch 的文件，如果不设置则 watch `src` 里的文件
    banner: false // 是否添加 banner，布尔值或者 {template: '', data: {}}
  }
}
```

### `browserify`

使用 Browserify 打包 JS。

```js
var isProduction = process.env.NODE_ENV === "production";
var config = {
  browserify: {
    bundleOptions: {
      entries: './tests/js/app.js',
      debug: !isProduction
      cache: {},
      packageCache: {}
    },
    filename: 'app.js',
    transforms: [
      ['browserify-shim', {global: true}]
    ],
    plugins: [],
    dist: 'dist/js',
    banner: false
  },
}
```

### `uglify`

```js
var config = {
  uglify: {
    src: './tasks/*.js',
    dist: './dist',
    banner: false
  }
}
```

### `markdown` 还未启用

```js
var config = {
  md: {
    src: ['README.md'],
    data: {
      pluginTitle: 'Gulp Tasks for happyCoding',
      pluginDesc: 'gulp-tasks-build 让 Coding 更 Happy！！！'
    },
    // gulp-rename 设置
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
}
```

### `clean`

清理任务：

```js
var config = {
  clean: '' // 要清理的文件夹
};
```

### `server`

开发预览服务器：编译开发预览、编译生产代码、发布到生产

```
gulp dev
NODE_ENV=production gulp build
gulp publish
```

### `release` 还未启用

发布任务：

- `publish:tag` - 添加 `tag` 并 push 到远程 git 仓库
- `publish:npm` - 发布到 NPM
- `publish:docs` - Push 文档到 GitHub `gh-pages` 分支
