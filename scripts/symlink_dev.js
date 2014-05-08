#!/usr/bin/env node

var exec     = require('child_process').exec;
var path     = require('path')

var cdvAppPath    = path.join(process.cwd(), 'app');
var emberDistPath = path.join(cdvAppPath, 'ember', 'dist');
var emberDevPath  = path.join(cdvAppPath, 'ember', 'tmp', 'output');
var wwwPath       = path.join(cdvAppPath, 'www');

var symlinkCommand = 'rm -r ' + wwwPath + '; ln -s ' + emberDevPath + ' ' + wwwPath;

exec(symlinkCommand, function(err, stdout, stdin){
  console.log('linked..');
})
