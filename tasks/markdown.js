'use strict';

var markJSON = require('markit-json');
var docUtil = require('amazeui-doc-util');
var rename = require('gulp-rename');

// Task: markdown parser
module.exports = function(gulp, config) {
  gulp.task('docs:md', function() {
    return gulp.src(config.md.src)
      .pipe(markJSON(docUtil.markedOptions))
      .pipe(docUtil.applyTemplate(null, config.md.data))
      .pipe(rename(config.md.rename))
      .pipe(gulp.dest(config.md.dist));
  });

  gulp.task('docs:watch', function() {
    return gulp.watch(config.md.src, ['docs:md']);
  });

  gulp.task('docs:assets', function() {
  });

  gulp.task('markdown', ['docs:md', 'docs:assets', 'docs:watch']);
};
