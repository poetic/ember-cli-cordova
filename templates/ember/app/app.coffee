`import Resolver from 'ember/resolver'`
`import loadInitializers from 'ember/load-initializers'`

Ember.MODEL_FACTORY_INJECTIONS = true

App = Ember.Application.extend
  modulePrefix: 'ember-cli-cordova', # TODO: loaded via config
  Resolver: Resolver

loadInitializers(App, 'ember-cli-cordova')

`export default App`
