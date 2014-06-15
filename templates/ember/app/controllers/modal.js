import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    close: function() {
      this.send('closeModal');
    }
  }
});
