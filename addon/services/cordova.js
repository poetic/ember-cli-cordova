/* jshint esnext:true */

import Ember from 'ember';

// from https://cordova.apache.org/docs/en/4.0.0/cordova_events_events.md.html
// use var because cordova/android was throwing errors re: const && strict mode
var CORDOVA_EVENTS = Ember.A([
  'deviceready',
  'pause',
  'resume',
  'backbutton',
  'menubutton',
  'searchbutton',
  'startcallbutton',
  'endcallbutton',
  'volumedownbutton',
  'volumeupbutton',
  'batterycritical',
  'batterylow',
  'batterystatus',
  'online',
  'offline'
]);

// the cordova service listens for cordova events emitted to the document,
// and triggers the same events in emberland.
//
// subscribe to cordova events as such:
//
// ```javascript
// export default MyEmberObject.extend({
//   cordova: Ember.inject.service()
//
//   init: function() {
//     cordova.on('resume', function() { console.log('i am resumed'); });
//   }
// });
// ```
export default Ember.Service.extend(
  Ember.Evented, {

  setEventTriggers: Ember.on('init', function() {
    var _this = this;

    CORDOVA_EVENTS.forEach(function(eventName) {
      Ember.$(document).on(eventName, function() {
        _this.trigger(eventName);
      });
    });
  })
});
