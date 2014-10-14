import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('nav-bar', function() {
    this.route('page-1');
    this.route('options-from-model');
    this.route('should-reset');
  });
});

export default Router;
