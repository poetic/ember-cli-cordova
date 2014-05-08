#!/usr/bin/env node

var exec     = require('child_process').exec;
var fs       = require('fs');
var async    = require('async');
var sys      = require('sys')
var path     = require('path')
var userArgs = process.argv.slice(2);

if(userArgs.length < 2) {
  console.error("## Error: Missing arguments ##");
  console.error('Usage: ./install NameOfApp com.reverse.style.domain');
  return;
}

var nameOfApp     = userArgs[0];
var reverseDomain = userArgs[1];

function runCommand(command) {
  return function(callback) {
    console.info('executing: ' + command);
    return exec(command, function(err, stdout, stdin){
      sys.puts(stdout);
      callback(err, stdout);
    });
  }
}

var emberCommand = 'mkdir ember; cd ember; ember init ' + nameOfApp
                      + '; ember build';

var cordovaCommand = 'cordova create app ' + reverseDomain + ' ' + nameOfApp
                        + '; cd app; ' + 'cordova platforms add ios';


var cdvAppPath = path.join(process.cwd(), 'app');

var emberPath = path.join(cdvAppPath, 'ember');
var emberDistPath = path.join(emberPath, 'dist');
var wwwPath       = path.join(cdvAppPath, 'www');

var symlinkCommand = 'rm -r ' + wwwPath + '; ln -s ' + emberDistPath + ' ' + wwwPath;

var commands = [
  runCommand(cordovaCommand),
  runCommand('cd app; ' + emberCommand),
  runCommand(symlinkCommand)
];

function copyTemplates() {
  var beforeBuildPath =path.join(cdvAppPath, 'hooks', 'before_build');
  var fileName = '001_build_ember_app.js';

  fs.mkdirSync(beforeBuildPath);
  fs.writeFileSync(
    path.join(beforeBuildPath, fileName),
    fs.readFileSync(path.join(process.cwd(), 'templates', fileName)),
    {
      mode: "755"
    }
  );
  console.log('done creating templates');
}

function updateEnvConfig() {
  var envPath = path.join(emberPath, 'config', 'environment.js');
  var env = fs.readFileSync(envPath, { encoding: 'utf8' })
  env = env.replace("locationType: 'auto'", "locationType: 'hash'");
  fs.writeFileSync(envPath, env);
  console.log('changed config locationType to hash');
}

async.series(commands,
  function(err) {
    if(err) throw err;

    console.log('Created basic structure..');
    copyTemplates();

    updateEnvConfig();

  }
);
