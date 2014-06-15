import Ember from 'ember';

export default Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    back: function() {
      Ember.AnimatedContainerView.enqueueAnimations({main: 'slideRight'});
      history.go(-1);
    },

    closeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },

    openLink: function(url) {
      window.open(url, '_system');
    }
  }
});
