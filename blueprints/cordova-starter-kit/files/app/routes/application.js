import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    back: function() {
      history.back();
    },

    openLink: function(url) {
      window.open(url, '_system');
    }
  }
});
