import Ember from 'ember';

var loadTries = 0;
export default function startProxyServer(location) {
  location = location.replace(/^file.*\/Documents/, '../../Documents');

  return new Ember.RSVP.Promise(function(resolve, reject) {
    var httpd       = cordova && cordova.plugins && cordova.plugins.CorHttpd;
    var port        = 4300;

    var retry = function () {
      loadTries++;
      if (loadTries > 10) {
        reject(new Error('Giving up on starting the server.'));
      } else {
        console.log('Retrying to to start the server.');
        startProxyServer(location).then(resolve, reject);
      }
    };

    httpd.getURL(function(url) {
      if (url.length > 0) {
        resolve(url);
      } else {
        httpd.startServer({
          'www_root' : location,
          'port' : port,
          'cordovajs_root': cordova.file.applicationDirectory + 'www/'
        }, function(url) {
          console.log('server started..', url);
          resolve(url);
        }, retry);
      }
    }, retry);
  });
};
