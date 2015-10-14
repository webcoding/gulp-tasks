'use strict';

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

var projectConfig = {
  projectName: 'tests',   //项目名称，可用于打 zip 包
  srcRoot: 'tests',       //项目源目录
  distRoot: 'dist'        //编译输出目录
};

module.exports = {
  projectName: projectConfig.projectName,
  srcRoot: projectConfig.srcRoot,
  distRoot: projectConfig.distRoot,

  // styles: {
  //   type: 'sass', //编译类型 less sass 或 stylus，TODO：可优化为自动判断，根据后缀
  //   src: projectConfig.srcRoot + '/scss/style.scss',
  //   autoPrefixer: [],
  //   dist: projectConfig.distRoot + '/css',
  //   watches: projectConfig.srcRoot + '/**/*.scss',
  //   banner: false
  // },
};
