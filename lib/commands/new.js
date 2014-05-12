var async   = require('async');
var path    = require('path');
var chalk   = require('chalk');
var Config  = require('../utils/config');
var Command = require('../models/command');

var NewCommand = Command.extend({
  name: 'new',
  usage: [
      chalk.white('\toptions: '),
      chalk.white('\t\trequired\t --name / -n\t\t NameOfApp'),
      chalk.white('\t\trequired\t --id / -i\t\t com.reverse.style.domain'),
      chalk.white('\t\toptional\t --directory / -d\t myproject')
  ],
  validateArguments: function() {
    this.args.name    = this.options.name      || this.options.n;
    this.args.id      = this.options.id        || this.options.i;
    this.args.dirName = this.options.directory || this.options.d || 'app';

    if(this.args.name && this.args.id) {
      return true;
    }
  },
  run: function() {
    var projectPath = path.join(process.cwd(), this.args.dirName);
    var configPath  = path.join(projectPath, '.ember-cdv');

    var config = new Config(configPath, {
      projectPath:  path.join(process.cwd(), this.args.dirName),
      name:         this.args.name,
      id:           this.args.id
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

        config.flush(); // write config

        require('./link-production')({projectPath: projectPath});

        console.log('');
        console.log('');
        console.log(chalk.cyan('-------------------'));
        console.log(chalk.green('All Done. Enjoy :)'));
        console.log(chalk.cyan('-------------------'));
      }
    );
  }
})

module.exports = function(options) {
  return new NewCommand(options)
}
