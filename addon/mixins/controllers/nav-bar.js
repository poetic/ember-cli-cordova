import Ember from 'ember';

export default Ember.Mixin.create({
  nav: {
    title: { },
    leftButton: { },
    rightButton: { }
  },

  actions: {
    leftButton: function() {
      var leftAction = this.get('nav.leftButton.action');

      if(leftAction) {
        leftAction();
      }
    },

    rightButton: function() {
      var rightAction = this.get('nav.rightButton.action');

      if(rightAction) {
        rightAction();
      }
    },

    resetNavBar: function() {
      this.set('nav', {
        title: { },
        leftButton: { },
        rightButton: { }
      });
    }
  }
});
