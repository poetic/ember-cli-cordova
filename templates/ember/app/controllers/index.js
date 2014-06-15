import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    goToPage: function(page){
      this.transitionToRouteAnimated('page', {main: 'slideLeft'}, page);
    }
  }
});
