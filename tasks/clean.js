'use strict';

var gulp = require('gulp');
var del = require('del');

// 洗刷刷
module.exports = function(config) {
  gulp.task('clean', function(cb) {
    //clean path
    var cleanPath = config.clean || 'dist';
    console.log('clean:' + cleanPath);
    del(cleanPath, cb);
  });
};
