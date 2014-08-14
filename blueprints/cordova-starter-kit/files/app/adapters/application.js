import DS from 'ember-data';

var ENV = <%= namespace %>ENV;

export default DS.ActiveModelAdapter.extend({
  host: ENV.apiUrl
});
