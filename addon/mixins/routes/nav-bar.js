import Ember from 'ember';

export default Ember.Mixin.create({
  afterModel: function() {
    var ctrl = this.controllerFor(this.get('nav.controller') || 'application');

    this._setNavOptions(ctrl);
    this._setNavActions(ctrl);

    return this._super.apply(this, arguments);
  },

  _setNavOptions: function(ctrl) {
    var navOptions = Ember.A([
      'titleText',
      'leftButtonText', 'leftButtonIcon',
      'rightButtonText', 'rightButtonIcon'
    ]);

    if(!ctrl.get('nav')) {
      ctrl.set('nav', {});
    }

    navOptions.forEach(function(key){
      var optionPath = 'nav.' + key;
      var value      = this.get(optionPath);

      if (value) {
        ctrl.set(optionPath, value);
      }
    }, this);
  },

  _setNavActions: function(ctrl) {
    var actions = this.get('nav.actions');
    if (!actions) {
      return;
    }

    var ctrlActions = ctrl.get('nav.actions');
    if (!ctrlActions) {
      ctrl.set('nav.actions', {});
    }

    Ember.A(['leftButton', 'rightButton']).forEach(function(actionKey) {
      var actionPath = 'nav.actions.' + actionKey;

      var action = this.get(actionPath);
      if (action) {
        ctrl.set(actionPath, action.bind(this));
      }
    }, this);
  }
});
