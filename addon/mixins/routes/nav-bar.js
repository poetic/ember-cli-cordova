import Ember from 'ember';

export default Ember.Mixin.create({
  _navController: Ember.computed('nav.controller', function() {
    var name = this.get('nav.controller') || 'application';

    return this.controllerFor(name);
  }),

  afterModel: function(model) {
    this._setDefaults();
    this._setNavOptions(model);
    this._setNavActions();

    return this._super.apply(this, arguments);
  },

  // Since we are using so many nested paths this makes sure they are set to
  // null values
  _setDefaults: function() {
    var ctrl = this.get('_navController');

    if(!ctrl.get('nav')) {
      ctrl.send('resetNavBar');

    } else if(!ctrl.get('nav.title')) {
      ctrl.set('nav.title', {});

    } else if(!ctrl.get('nav.leftButton')) {
      ctrl.set('nav.leftButton', {});

    } else if(!ctrl.get('nav.rightButton')) {
      ctrl.set('nav.rightButton', {});
    }
  },

  _setNavOptions: function(model) {
    var ctrl = this.get('_navController');

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

  _setNavActions: function() {
    var ctrl = this.get('_navController');

    Ember.A(['leftButton', 'rightButton']).forEach(function(button) {
      var actionPath = 'nav.' + button + '.action';

      var action = this.get(actionPath);
      if (action) {
        ctrl.set(actionPath, Ember.run.bind(this, action));
      }
    }, this);
  },

  actions: {
    willTransition: function() {
      this.get('_navController').send('resetNavBar');
      return this._super.apply(this, arguments);
    }
  }
});
