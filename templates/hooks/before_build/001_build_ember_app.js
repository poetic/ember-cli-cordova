#!/usr/bin/env node

var sys = require('sys');
var path = require('path');
var exec = require('child_process').exec;

var rootdir = process.argv[2];

var target = "development";
if (process.env.TARGET) {
  target = process.env.TARGET;
}

function puts(error, stdout, stderr) {
  sys.puts(stdout)
}

var emberPath = path.join(rootdir, 'ember');

sys.puts('--------------------------------------')
sys.puts("Building ember-app for environment: ", target)
sys.puts('--------------------------------------')
exec('cd ' + emberPath+ '; ember build --environment ' + target, puts);
