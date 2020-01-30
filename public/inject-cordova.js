// ember-cli-cordova
(function() {
  var platform = navigator.platform;
  if (platform.match(/(ipad|iphone|ipod|android)/i)) {
    var script = document.createElement('script');
    script.setAttribute('src', 'cordova.js');
    document.head.appendChild(script);
  }
})()
