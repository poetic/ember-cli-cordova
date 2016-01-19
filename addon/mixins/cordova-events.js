/* jshint esnext:true */

import Ember from 'ember';

// include this mixin to define cordova event listeners with an onCordova object
//
// onCordova supports arrays, strings, and anonymous functions, e.g.:
//
// ```
// export default MyEmberObject.extend({
//   onCordova: {
//     pause: ['pauseListening', 'disconnectPeripheral'],
//     resume: 'resumeListening',
//     volumeup: function() { console.log('a little bit louder now'); }
//   }
// });
// ```
export default Ember.Mixin.create({
  cordova: Ember.inject.service(),

  subscribeToCordovaEvents: Ember.on('init', function() {
    var cordova = this.get('cordova'),
        onCordova = this.get('onCordova');

    Ember.keys(onCordova).forEach(function(key) {
      var func = Ember.get(onCordova, key);

      // subscribe to events
      if (func instanceof Array) {
        func.forEach(function(fn) {
          if (this._validateIsFunction(fn)) {
            cordova.on(key, this, fn);
          }
        }, this);
      } else {
        if (this._validateIsFunction(func)) {
          cordova.on(key, this, func);
        }
      }
    }, this);
  }),

  _validateIsFunction: function(func) {
    var isFunction = false;

    if (func instanceof Function) {
      isFunction = true;
    } else if (typeof func === 'string') {
      var fn = this.get(func);

      isFunction = fn instanceof Function;
    }

    return isFunction;
  }
});
