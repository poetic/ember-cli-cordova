import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    leftButton: function() {
      var leftAction = this.get('nav.actions.leftButton');

      if(leftAction) {
        leftAction();
      }
    },
    rightButton: function() {
      var rightAction = this.get('nav.actions.rightButton');

      if(rightAction) {
        rightAction();
      }
    }
  }
});
