import Ember from 'ember';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(NavBarMixin, {
  nav: {
    controller: 'nav-bar',
    title: {
      text: 'Index'
    },
    leftButton: {
      text: 'iLeft'
    },
    rightButton: {
      text: 'iRight'
    },
  }
});
