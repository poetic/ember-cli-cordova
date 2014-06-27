var path       = require('path');

var linkEnv    = require('../tasks/link-environment');
var Command    = require('../models/command');
var Project    = require('../models/project');
var runCommand = require('../utils/run-command');
var Promise    = require('../ext/promise');

module.exports = Command.extend({
  name: 'prepare',
  description: 'Needed after cloning or copying a project.',
  run: function() {
    var project     = Project.closest();
    var link        = linkEnv(project, 'ember/dist');
    var installDeps = runCommand('npm install && bower install', 'Installing npm and bower dependencies', {
      cwd: path.join(project.get('root'), 'ember')
    });

    // Because of this being parallel. It breaks the logging and it looks like
    //
    //   Symlinking ember dir to cordova www...
    //   Installing npm and bower dependencies...donedone
    return Promise.all([link(), installDeps()]);
  }
});
