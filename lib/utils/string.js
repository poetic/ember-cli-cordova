// https://github.com/emberjs/ember.js/blob/v1.5.0/packages/ember-runtime/lib/system/string.js
'use strict';

var STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);
var _s = require('underscore.string');

module.exports = {
  decamelize: function(str) {
    return str ? str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase() : '';
  },
  dasherize: function(str) {
    return str ? _s.dasherize(str).replace(/^\-/, '') : '';
  },
  classify: function(str) {
    // Have to humanize first so that 'MyApp' doesnt turn into 'Myapp'
    return str ? _s.classify(_s.humanize(str)) : '';
  }
};
