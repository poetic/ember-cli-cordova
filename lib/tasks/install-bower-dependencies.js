'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');
var fs         = require('fs');

var dependencies = [
  {
    name: 'ember-animated-outlet-mobile',
    files: [
      'ember-animated-outlet-mobile/dist/ember-animated-outlet-mobile.css',
      'ember-animated-outlet-mobile/dist/ember-animated-outlet-mobile.js'
    ]
  },
  {
    name: 'moment',
    files: [
      'moment/moment.js'
    ]
  }
];

module.exports = function(config) {
  return function() {
    var dependencyList = '';
    var appExports = 'module.exports = app.toTree();'

    dependencies.forEach(function(dependency){
      dependencyList += (dependency.name + ' ')
    });

    var command = 'bower install --save ' + dependencyList;

    var brocfilePath = path.join(config.get('root'), 'Brocfile.js');
    var brocfile = fs.readFileSync(brocfilePath, { encoding: 'utf8' });

    brocfile = brocfile.replace(appExports, '');

    dependencies.forEach(function(dependency){
      dependency.files.forEach(function(file){
        brocfile += "app.import('vendor/" + file + "');\n";
      })
    });

    brocfile += ('\n' + appExports);

    fs.writeFileSync(brocfilePath, brocfile);

    return runCommand(command, 'Installing bower dependencies and adding to Brocfile.js', {
      cwd: config.get('root')
    })();
  };
};
