import Ember from 'ember';

var ENV = <%= namespace %>ENV;

var CustomAuth = Ember.SimpleAuth.Authenticators.OAuth2.extend({
  serverTokenEndpoint: ENV['apiUrl'] + '/sessions'
});

export default {
  name: 'simple-auth',
  initialize: function(container, application){
    container.register('authenticator:custom', CustomAuth);

    Ember.SimpleAuth.setup(container, application, {
      authenticationRoute:       'signin',
      routeAfterAuthentication:  'appointments',
      routeAfterInvalidation:    'appointments',
      crossOriginWhitelist:      [ENV['apiUrl'], ENV['nodeApiUrl']]
    });
  }
};

