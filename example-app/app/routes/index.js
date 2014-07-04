import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return [
      Ember.Object.create({
        id: 0,
        title: "Page 0",
        body: "Pellentesque augue risus, elementum luctus nulla sed, fringilla accumsan libero. Fusce venenatis aliquet lectus gravida rutrum. Aenean sagittis, ante ut varius elementum, libero nisl pulvinar nunc, quis aliquam neque massa bibendum massa. Fusce non mollis massa. Nunc dignissim, magna non facilisis consectetur, massa dolor scelerisque elit, nec euismod diam ipsum vel nunc. Curabitur suscipit id elit id bibendum. Sed non urna condimentum, condimentum est vel, iaculis lectus."
      }),
      Ember.Object.create({
        id: 1,
        title: "Page 1",
        body: "Aliquam tortor ligula, adipiscing vel eros nec, facilisis faucibus eros. In sapien odio, ornare sit amet arcu at, imperdiet consectetur ligula. Etiam eget odio ullamcorper, posuere ante sed, porta orci. Sed diam sapien, molestie eu tempus quis, rhoncus quis sapien. Integer vitae diam lectus. Praesent lacus nisi, varius ut metus vel, laoreet ultricies felis. Mauris sit amet ipsum fermentum, feugiat quam id, tincidunt risus. Pellentesque non porttitor nunc. Duis dapibus augue porta lorem consectetur, eget sollicitudin libero eleifend. Sed id lobortis lectus. Aenean semper auctor varius. Proin tempor arcu a orci tincidunt, placerat fermentum risus dictum. Ut eu vestibulum orci."
      }),
      Ember.Object.create({
        id: 2,
        title: "Page 2",
        body: "Curabitur non risus purus. Maecenas non massa dolor. Donec gravida posuere congue. Donec pulvinar lorem quis orci molestie suscipit. Vestibulum consequat nisl aliquam ante rutrum malesuada. Vestibulum lacus nulla, bibendum molestie sollicitudin ut, tristique eu turpis. Vivamus volutpat sollicitudin risus elementum lacinia."
      }),
      Ember.Object.create({
        id: 3,
        title: "Page 3",
        body: "Aenean suscipit neque quis mauris pellentesque, a blandit eros pharetra. Nulla eget orci nec sem ornare tincidunt a vel elit. Vestibulum at lorem faucibus, tincidunt leo vitae, consequat urna. Nam non ultricies risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam sed gravida justo. Ut tempus sapien a est ultricies luctus. Sed euismod arcu eu fermentum pulvinar."
      })
    ];
  }
});
