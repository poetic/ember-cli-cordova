Router = Ember.Router.extend
  location: ENV.locationType

Router.map ->
  @resource 'page', path: '/page/:id'

`export default Router;`
