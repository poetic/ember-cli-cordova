import Ember from 'ember';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(NavBarMixin, {
  nav: {
    controller: 'nav-bar',
    title: {
      text: function(model) {
        return model.get('title');
      }
    },

    leftButton: {
      text: function(model) {
        return model.get('leftButton');
      },
      icon: function(model) {
        return model.get('leftClass');
      }
    },

    rightButton: {
      text: function(model) {
        return model.get('rightButton');
      },
      icon: function(model) {
        return model.get('rightClass');
      }
    }
  },

  model: function() {
    return Ember.Object.create({
      title:        'modelOption',
      leftButton:   'modelLeft',
      leftClass:    'leftClass',
      rightButton:  'modelRight',
      rightClass:   'rightClass'
    });
  }
});
