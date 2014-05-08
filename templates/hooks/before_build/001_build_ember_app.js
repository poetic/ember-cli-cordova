#!/usr/bin/env node

var path = require('path');
var exec = require('child_process').exec;

var rootdir = process.argv[2];

var target = "development";
if (process.env.TARGET) {
  target = process.env.TARGET;
}

function puts(error, stdout, stderr) {
  console.log(stdout)
}

var emberPath = path.join(rootdir, 'ember');

console.log('--------------------------------------');
console.log("Building ember-app for environment: " + target);
console.log('--------------------------------------');
exec('cd ' + emberPath+ '; ember build --environment ' + target, puts);
