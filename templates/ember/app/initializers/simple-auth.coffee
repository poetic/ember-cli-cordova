CustomAuth = Ember.SimpleAuth.Authenticators.OAuth2.extend
  serverTokenEndpoint: ENV['apiUrl'] + '/sessions'

Initializer =
  name: 'simple-auth'
  initialize: (container, application)->

    container.register 'authenticator:custom', CustomAuth

    Ember.SimpleAuth.setup container, application,
      authenticationRoute:       'signin'
      routeAfterAuthentication:  'appointments'
      routeAfterInvalidation:    'appointments'
      crossOriginWhitelist:      [ENV['apiUrl'], ENV['nodeApiUrl']]

`export default Initializer;`
