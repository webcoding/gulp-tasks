'use strict';

var $ = require('gulp-load-plugins')();

// 打 zip 包
module.exports = function(gulp, config) {
  gulp.task('zip', function(cb) {
    var options = config.zip;

    //format 年月日及版本号
    var formatVersion = '';

    return gulp.src(options.src)
        .pipe($.zip( config.projectName + '-' + formatVersion + '.zip'))
        .pipe(gulp.dest(options.dist));
  });
};
