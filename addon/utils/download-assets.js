import Ember from 'ember';

var randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function downloadAssets(zipDownloadURL) {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
      var rootURL = fs.root.toURL();

      fs.root.getFile('app.zip', { create: true }, function(newFileEntry) {
        var ft = new FileTransfer();

        ft.download(zipDownloadURL, newFileEntry.toURL(), function(file) {
          return newFileEntry.getParent(function(directoryEntry){
            var destination = directoryEntry.toURL();

            return zip.unzip(file.toURL(), destination, function(err) {
              if(err !== 0) { reject(err); }
              resolve(destination + 'bundle')
            });
          }, reject);
        }, reject);
      }, reject);
    }, reject);
  });
}
