'use strict';

var browserSync = require('browser-sync');

// Task: dev server
// 启动预览服务，并监视 Dist 目录变化自动刷新浏览器
module.exports = function(gulp, config) {
  gulp.task('server', function() {
    var bs = browserSync(config.browserSync);

    if (config.bsWatches) {
      gulp.watch(config.bsWatches, bs.reload);
    }
  });
};
