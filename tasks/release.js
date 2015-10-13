'use strict';

var gulp = require('gulp');
var git = require('gulp-git');
var ghPages = require('gulp-gh-pages');

// Task: release
// add tag then publish to npm and push to git
module.exports = function(config) {
  var runSequence = require('run-sequence').use(gulp);

  gulp.task('publish:tag', function(done) {
    var pkg = config.pkg;
    var v = 'v' + pkg.version;
    var message = 'Release ' + v;

    git.tag(v, message, function(err) {
      if (err) {
        throw err;
      }

      git.push('origin', v, function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });
  });

  gulp.task('publish:npm', function(done) {
    require('child_process')
      .spawn('npm', ['publish'], {stdio: 'inherit'})
      .on('close', done);
  });

  var releaseTasks = ['publish:tag', 'publish:npm'];

  if (config.ghPages) {
    gulp.task('publish:docs', function() {
      return gulp.src(config.ghPages.src)
        .pipe(ghPages(config.ghPages.options || {}));
    });

    releaseTasks.push('publish:docs');
  }

  gulp.task('release', function(cb) {
    runSequence('build', releaseTasks, cb);
  });
};
