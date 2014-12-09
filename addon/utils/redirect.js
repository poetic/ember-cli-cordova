import Ember from 'ember';

export default function(url) {
  if(window.location.href.indexOf('file://') > -1) {
    Ember.run.later(function() {
      window.location.replace(url);
    }, 50);
  }
}
