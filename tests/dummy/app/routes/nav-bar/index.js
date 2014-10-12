import Ember from 'ember';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(NavBarMixin, {
  nav: {
    controller: 'nav-bar',
    titleText: 'Index',
    leftButtonText: 'iLeft',
    rightButtonText: 'iRight'
  }
});
