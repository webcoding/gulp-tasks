'use strict';

//var requireDir = require('require-dir');
//module.exports = requireDir('./tasks', { recurse: true });

var gulp = require('gulp');
var _ = require('lodash');
var getConfigDefault = require('./config.default.js');

function initTasks(gulp, config) {
  // TODO: 添加默认配置
  config = config || {};

  var _configDefault = getConfigDefault(config);
  config = _.assign({}, _configDefault, config);

  if (config.styles) {
    if (!config.styles.autoPrefixer || _.isEmpty(config.styles.autoPrefixer) ) {
      config.styles.autoPrefixer = _configDefault.styles.autoPrefixer;
    }
  }
  //config = _.defaultsDeep({}, config, __configDefault); //深度设置默认值

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

  // 错误处理 防止任务中断
  var errorHandle = {
    errorHandler: function (err) {
      console.log(err);
      this.emit('end');
    }
  };

  // task: clean
  require('./tasks/clean')(gulp, config);

  // task: copy
  config.copy && require('./tasks/copy')(gulp, config);

  // task: html
  require('./tasks/html')(gulp, config);

  // task: jshint
  config.jshint && require('./tasks/jshint')(gulp, config);

  // task: browserify
  config.browserify && require('./tasks/browserify')(gulp, config);

  // task: styles
  config.styles && require('./tasks/styles')(gulp, config);

  // dev server: server
  require('./tasks/server')(gulp, config);

  // task: uglify
  config.uglify && require('./tasks/uglify')(gulp, config);

  // task: markdown
  config.md && require('./tasks/markdown')(gulp, config);


  // Release GitHub & npm: ['release']
  require('./tasks/release')(gulp, config);
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
