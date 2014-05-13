ApplicationRoute = Ember.Route.extend Ember.SimpleAuth.ApplicationRouteMixin,
  actions:
    back: ->
      Ember.AnimatedContainerView.enqueueAnimations({main: 'slideRight'})
      history.go(-1)

    closeModal: ->
      @disconnectOutlet
        outlet: 'modal'
        parentView: 'application'

    openLink: (url)->
      window.open url, '_system'

`export default ApplicationRoute;`
