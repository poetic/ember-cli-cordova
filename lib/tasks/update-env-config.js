var fs     = require('fs');
var chalk  = require('chalk');
var path   = require('path');

module.exports = function(config) {

  return function updateEnvConfig(callback) {
    var emberPath = path.join(config.get('projectPath'), 'ember');
    console.log('')
    process.stdout.write('Update ember app config locationType to hash...');
    var envPath = path.join(emberPath, 'config', 'environment.js');
    var env     = fs.readFileSync(envPath, { encoding: 'utf8' })
    env         = env.replace("locationType: 'auto'", "locationType: 'hash'");
    fs.writeFileSync(envPath, env);
    process.stdout.write(chalk.green('done'));
    callback(null);
  }
}
