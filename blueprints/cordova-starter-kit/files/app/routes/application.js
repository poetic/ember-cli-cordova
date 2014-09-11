import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    back: function() {
      history.back();
    },

    closeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },

    openModal: function(name) {
      this.render(name, {
        into: 'application',
        outlet: 'modal'
      });
    },

    openLink: function(url) {
      window.open(url, '_system');
    }
  }
});
