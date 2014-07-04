#!/usr/bin/env node

var pluginlist = [
  "org.apache.cordova.dialogs",
  "org.apache.cordova.inappbrowser",
  "org.apache.cordova.splashscreen",
  "org.apache.cordova.statusbar"
];

var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
  console.log(stdout)
}

pluginlist.forEach(function(plug) {
  exec("cordova plugins add " + plug, puts);
});
