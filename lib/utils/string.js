// Thanks Ember
// https://github.com/emberjs/ember.js/blob/v1.5.0/packages/ember-runtime/lib/system/string.js
'use strict';

var STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);
var STRING_DASHERIZE_REGEXP  = (/[ _]/g);

module.exports = {
  decamelize: function(str) {
    return str ? str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase() : '';
  },
  dasherize: function(str) {
    return this.decamelize(str).replace(STRING_DASHERIZE_REGEXP, '-');
  }
};
