ModalController = Ember.ObjectController.extend
  actions:
    close: ->
      @send('closeModal')

`export default ModalController;`
