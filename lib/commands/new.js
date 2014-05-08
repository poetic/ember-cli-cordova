var exec     = require('child_process').exec;
var fs       = require('fs-extra');
var async    = require('async');
var path     = require('path');
var chalk    = require('chalk');

module.exports = function(options){
  var nameOfApp     = options.name;
  var reverseDomain = options['reverse-domain'];

  if(!nameOfApp || !reverseDomain) {
    console.log(chalk.red.underline("Error: Missing arguments"));
    console.log('');
    console.log(chalk.white('ember-cli-cordova new'));
    console.log(chalk.white('\t --name NameOfApp'));
    console.log(chalk.white('\t --reverse-domain com.reverse.style.domain'));
    return;
  }


  function runCommand(command, startedMsg, endedMsg) {
    if(endedMsg == null) {
      endedMsg = 'done';
    }
    return function(callback) {
      console.log('');
      process.stdout.write(startedMsg);
      return exec(command, function(err, stdout, stdin){
        if(err) {
          console.log(chalk.red(stdout));
          throw err;
        }
        process.stdout.write(chalk.green(endedMsg));
        callback(err, stdout);
      });
    }
  }

  var emberCommand = 'mkdir ember; cd ember; ember init ' + nameOfApp
                        + '; ember build';

  var cordovaCommand = 'cordova create app ' + reverseDomain + ' ' + nameOfApp;

  var cdvAppPath    = path.join(process.cwd(), 'app');
  var emberPath     = path.join(cdvAppPath, 'ember');
  var emberDistPath = path.join(emberPath, 'dist');
  var wwwPath       = path.join(cdvAppPath, 'www');
  var templatesPath = path.join(__dirname, '../..', 'templates');

  var symlinkCommand = 'rm -r ' + wwwPath + '; ln -s ' + emberDistPath + ' ' + wwwPath;

  function copyHooks(callback) {
    var cdvHooksPath         = path.join(cdvAppPath, 'hooks');
    var templateHooksPath = path.join(templatesPath, 'hooks');

    console.log('');
    process.stdout.write('Copying default cordova hooks to cordova project...');

    fs.copy(templateHooksPath, cdvHooksPath, function(err) {
      if(err) callback(err);
      process.stdout.write(chalk.green('done'));
      callback(null);
    });

  }

  function updateEnvConfig(callback) {
    console.log('')
    process.stdout.write('Update ember app config locationType to hash...');
    var envPath = path.join(emberPath, 'config', 'environment.js');
    var env     = fs.readFileSync(envPath, { encoding: 'utf8' })
    env         = env.replace("locationType: 'auto'", "locationType: 'hash'");
    fs.writeFileSync(envPath, env);
    process.stdout.write(chalk.green('done'));
    callback(null);
  }

  var commands = [
    runCommand(cordovaCommand, "Creating Cordova project..."),
    runCommand('cd app; ' + emberCommand, "Creating Ember project..."),
    runCommand(symlinkCommand, "Symlinking Cordova www folder to Ember's dist..."),
    updateEnvConfig,
    copyHooks,
    runCommand('cd app; cordova platforms add ios', 'Adding ios platform to cordova...')
  ];

  async.series(commands,
    function(err) {
      if(err) throw err;

      console.log('');
      console.log('');
      console.log(chalk.cyan('-------------------'));
      console.log(chalk.green('All Done. Enjoy :)'));
      console.log(chalk.cyan('-------------------'));
    }
  );
};
