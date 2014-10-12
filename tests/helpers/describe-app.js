import Ember from 'ember';
import startApp from './start-app';

export default function(name, callback) {
  return describe(name, function() {
    before(function() {
      this.app = startApp();
    });

    after(function() {
      Ember.run(this.app, 'destroy');
    });

    lazy('store', function() {
      return this.app.__container__.lookup('store:main');
    });

    callback.call(this);
  });
}
