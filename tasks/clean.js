'use strict';

var del = require('del');

// 洗刷刷
module.exports = function(gulp, config) {
  gulp.task('clean', function(cb) {
    //clean path
    var cleanPath = config.clean || 'dist';
    console.log('clean:' + cleanPath);
    return del(cleanPath, cb);
  });
};
