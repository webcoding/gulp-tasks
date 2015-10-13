'use strict';

//var requireDir = require('require-dir');
//module.exports = requireDir('./tasks', { recurse: true });

var gulp = require('gulp');

function initTasks(config) {
  // TODO: 添加默认配置
  config = config || {};

  var gutil = require('gulp-util');

  config.DEFAULTS = {
    banner: {
      template: [
        '/*! <%= pkg.name %> v<%= pkg.version %>',
        'by webcoding Team',
        '(c) ' + gutil.date(Date.now(), 'UTC:yyyy') + ' happy webcoding.',
        'Licensed under <%= pkg.license %>',
        gutil.date(Date.now(), 'isoDateTime') + ' */ \n'
      ].join(' | '),
      data: {
        pkg: config.pkg
      }
    }
  };

  // task: clean
  config.clean && require('./tasks/clean')(config);

  // task: copy
  config.copy && require('./tasks/copy')(config);

  // task: html
  config.html && require('./tasks/html')(config);

  // task: jshint
  config.jshint && require('./tasks/jshint')(config);

  // task: browserify
  config.browserify && require('./tasks/browserify')(config);

  // task: styles
  config.styles && require('./tasks/styles')(config);

  // dev server: server
  require('./tasks/server')(config);

  // task: uglify
  config.uglify && require('./tasks/uglify')(config);

  // task: markdown
  config.md && require('./tasks/markdown')(config);


  // Release GitHub & npm: ['release']
  require('./tasks/release')(config);
}

module.exports = initTasks;


/*
gulp-tasks: https://github.com/blakelapierre/gulp-tasks

module.exports = function(gulp, require, tasksModule) {
  tasksModule = tasksModule || './tasks';
  try {
    var tasks = require(tasksModule);
    for (var key in tasks) {
      tasks[key](gulp);
    }
    return tasks;
  }
  catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      return 'No external tasks found in ' + tasksModule;
    }
    throw e;
  }
};
*/
