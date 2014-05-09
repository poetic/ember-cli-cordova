var async  = require('async');
var path   = require('path');
var chalk  = require('chalk');
var Config = require('../utils/config');

module.exports = function(options){
  var name     = options.name      || options.n;
  var id       = options.id        || options.i;
  var dirName  = options.directory || options.d || 'app';

  if(!name || !id) {
    console.log(chalk.red.underline("Error: Missing arguments"));
    console.log('');
    console.log(chalk.white('command: ember-cdv new'));
    console.log('')
    console.log(chalk.white('options: '));
    console.log(chalk.white('\trequired\t --name / -n\t\t NameOfApp'));
    console.log(chalk.white('\trequired\t --id / -i\t\t com.reverse.style.domain'));
    console.log(chalk.white('\toptional\t --directory / -d\t myproject'));
    return;
  }

  var projectPath = path.join(process.cwd(), dirName);
  var configPath = path.join(projectPath, '.ember-cdv');

  var config = new Config(configPath, {
    projectPath:  path.join(process.cwd(), dirName),
    name:         name,
    id:           id
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

      require('./link-production')(projectPath);

      console.log('');
      console.log('');
      console.log(chalk.cyan('-------------------'));
      console.log(chalk.green('All Done. Enjoy :)'));
      console.log(chalk.cyan('-------------------'));
    }
  );
};
