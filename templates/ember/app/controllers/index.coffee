IndexController = Ember.ArrayController.extend
  actions:
    goToPage: (page)->
      @transitionToRouteAnimated 'page', {main: 'slideLeft'}, page

`export default IndexController;`
