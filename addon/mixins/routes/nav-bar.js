import Ember from 'ember';

export default Ember.Mixin.create({
  afterModel: function(model) {
    var ctrl = this.controllerFor(this.get('nav.controller') || 'application');

    this._setDefaults(ctrl);
    this._setNavOptions(ctrl, model);
    this._setNavActions(ctrl);

    return this._super.apply(this, arguments);
  },

  // Since we are using so many nested paths this makes sure they are set to
  // null values
  _setDefaults: function(ctrl) {
    if(!ctrl.get('nav')) {
      ctrl.set('nav', {
        title: {},
        leftButton: {},
        rightButton: {}
      });

    } else if(!ctrl.get('nav.title')) {
      ctrl.set('nav.title', {});

    } else if(!ctrl.get('nav.leftButton')) {
      ctrl.set('nav.leftButton', {});

    } else if(!ctrl.get('nav.rightButton')) {
      ctrl.set('nav.rightButton', {});
    }
  },

  _setNavOptions: function(ctrl, model) {
    var navOptions = Ember.A([
      'title.text',
      'leftButton.text', 'leftButton.icon',
      'rightButton.text', 'rightButton.icon'
    ]);

    navOptions.forEach(function(key){
      var optionPath = 'nav.' + key;
      var value      = this.get(optionPath);

      if (value) {
        if(Ember.typeOf(value) === 'function') {
          value = value.call(this, model);
        }

        ctrl.set(optionPath, value);
      }
    }, this);
  },

  _setNavActions: function(ctrl) {
    Ember.A(['leftButton', 'rightButton']).forEach(function(button) {
      var actionPath = 'nav.' + button + '.action';

      var action = this.get(actionPath);
      if (action) {
        ctrl.set(actionPath, action.bind(this));
      }
    }, this);
  }
});
