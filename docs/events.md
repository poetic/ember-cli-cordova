# Events

## Description

ember-cli-cordova creates a service at `services/cordova.js`, which listens for
events defined and emitted by Cordova (e.g. `deviceready`, `pause`, `resume`).


## Usage

**Simple Usage:**

Many events require only simple callbacks, e.g. pausing / resuming listener
functions, logging the event, etc.

In these cases, extend your object/class with the provided mixin, which will
look for an `onCordova` object and run the provided functions when an event
matching the key is emitted. For example:

```javascript
import CordovaEventsMixin from 'ember-cli-cordova/mixins/cordova-events';

export default MyEmberObject.extend({
  onCordova: {
    pause: ['pauseListening', 'disconnectPeripheral'],
    resume: 'resumeListening',
    volumeup: function() { console.log('a little bit louder now'); }
  }
});
```

_HEADS UP: if your object overrides `init` and you extend it with this mixin,
make sure to call `this._super();` if you intend to catch Cordova events._

(Yes, `onCordova` supports arrays of named functions, single named functions,
and anonymous functions!)

**Advanced Usage:**

If you have more advanced needs, e.g. turning on/off an event subscription when
an `Ember.Route` is activated/deactivated, or just prefer a more manual
approach, you can inject the provided service and tinker away:

```javascript
export default MyRoute.extend({
  cordova: Ember.inject.service(),

  activate: function() {
    // use named function to unsubscribe later
    this.get('cordova').on('pause', this, '_resumeListening');
  },

  deactivate: function() {
    this.get('cordova').off('pause', this, '_resumeListening');
  },

  _resumeListening: function() {
    console.log('do your thing');
  }
});
```
