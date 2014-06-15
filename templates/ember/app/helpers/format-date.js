/* global moment */

import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, format) {
  return moment(value).format(format);
});
