var fs     = require('fs');
var chalk  = require('chalk');
var path   = require('path');

// Match the outer tags so we can match and reinsert them with a String#replace
var idRegex   = /(id=\")[\w\.]+(\")/;
var nameRegex = /(<name>)\w+(<\/name>)/;

module.exports = function(config) {

  return function updateEnvConfig(callback) {
    console.log();

    var configPath = path.join(config.get('projectPath'), 'config.xml');

    process.stdout.write('Update config.xml with your project settings...');

    var xml = fs.readFileSync(configPath, { encoding: 'utf8' });

    xml = xmlReplace(idRegex, config.get('id'), xml);
    xml = xmlReplace(nameRegex, config.get('name'), xml);

    fs.writeFileSync(configPath, xml);
    process.stdout.write(chalk.green('done'));

    callback(null, xml);

  }
};

function xmlReplace(regex, value, xml) {
  return xml.replace(regex, '$1' + value + '$2')
}

