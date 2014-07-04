var path       = require('path');
var linkEnv    = require('../tasks/link-environment');
var runCommand = require('../utils/run-command');
var Promise    = require('../ext/promise');

module.exports = {
  name: 'cordova:prepare',
  aliases: ['cdv:prepare'],
  description: 'Needed after cloning or copying a project.',
  works: 'insideProject',

  run: function() {
    var installDeps = runCommand('npm install && bower install', 'Installing npm and bower dependencies', {
      cwd: this.project.root
    });

    // Because of this being parallel. It breaks the logging and it looks like
    //
    //   Symlinking ember dir to cordova www...
    //   Installing npm and bower dependencies...donedone
    return Promise.all([linkEnv(this.project)(), installDeps()]);
  }
};
