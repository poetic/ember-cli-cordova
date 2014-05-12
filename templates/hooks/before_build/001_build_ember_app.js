#!/usr/bin/env node

var path = require('path');
var exec = require('child_process').exec;

var rootdir = process.argv[2];

var env = "development";
if (process.env.EMBER_CDV_ENV) {
  env = process.env.EMBER_CDV_ENV;
}

function puts(error, stdout, stderr) {
  console.log(stdout)
}

var emberPath = path.join(rootdir, 'ember');

console.log('--------------------------------------');
console.log("Building ember-app for environment: " + env);
console.log('--------------------------------------');
exec('cd ' + emberPath+ '; ember build --environment ' + env, puts);
