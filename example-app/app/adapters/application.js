import DS from 'ember-data';

var ENV = ExampleAppENV;

export default DS.ActiveModelAdapter.extend({
  host: ENV.apiUrl
});
