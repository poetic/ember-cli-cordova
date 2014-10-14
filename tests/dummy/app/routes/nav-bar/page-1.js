import Ember from 'ember';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(NavBarMixin, {
  nav: {
    controller: 'nav-bar',
    title: {
      text: 'Page 1'
    },
    leftButton: {
      text: 'pLeft'
    },
    rightButton: {
      text: 'pRight'
    },
  }
});
