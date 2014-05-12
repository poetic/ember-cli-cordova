var async   = require('async');
var path    = require('path');
var chalk   = require('chalk');
var Config  = require('../utils/config');
var Command = require('../models/command');
var Project = require('../models/project');
var linkEnv = require('../tasks/link-environment');

module.exports = Command.extend({
  name: 'new',
  description: 'Creates a cordova project with an ember-cli project inside with preinstalled dependencies and files for easy app development ',
  commandSuffix: '--name|-n <app-name>(required) --id |-i <reverse.style.domain>(required) <options...>',
  optionsHelp: [
    '--directory|-d  (Default: app/)'
  ],
  parseOptions: function() {
    this.options.name    = this.options.name      || this.options.n;
    this.options.id      = this.options.id        || this.options.i;
    this.options.dirName = this.options.directory || this.options.d || 'app';
  },
  validateOptions: function() {
    if(this.options.name && this.options.id) {
      return true;
    }
  },
  run: function() {
    var projectPath = path.join(process.cwd(), this.options.dirName);
    var configPath  = path.join(projectPath, '.ember-cdv');

    var config = new Config(configPath, {
      projectPath:  path.join(process.cwd(), this.options.dirName),
      name:         this.options.name,
      id:           this.options.id
    });

    var tasks = [
      require('../tasks/create-cordova-project')(config),
      require('../tasks/copy-hooks')(config),
      require('../tasks/add-platforms')(config),

      require('../tasks/create-ember-project')(config),
      require('../tasks/install-bower-dependencies')(config),
      require('../tasks/install-npm-dependencies')(config),
      require('../tasks/copy-ember-cli-modules')('initializers', config)
    ];

    async.series(tasks,
      function(err) {
        if(err) throw err;

        // only needed for setup. for all later commands we initialize a project
        // which already has the project root
        config.delete('projectPath');
        config.flush(); // write config

        // TODO: this is duplication of the path listed in
        // commands/link-development. I'd like to remove it
        linkEnv(Project.closest(projectPath), 'ember/tmp/output');

        console.log('');
        console.log('');
        console.log(chalk.cyan('-------------------'));
        console.log(chalk.green('All Done. Enjoy :)'));
        console.log(chalk.cyan('-------------------'));
      }
    );
  }
});
