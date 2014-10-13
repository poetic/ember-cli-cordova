import Ember from 'ember';

export default Ember.Mixin.create({
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
    }
  }
});
