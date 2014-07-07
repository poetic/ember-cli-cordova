import Ember from 'ember';

var ENV = <%= namespace %>ENV;

var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
});

export default Router;
