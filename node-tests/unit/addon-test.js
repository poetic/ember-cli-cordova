var addon = require('../../index');

function expectWithConfig(config) {
  addon.project = {
    config: function() {
      return config;
    }
  };

  return expect(addon.cdvConfig.bind(addon));
}

var errRegex = /ember-cli-cordova: You must specify the locationType as 'hash' in your environment\.js/;

describe('Addon', function() {
  describe('config', function() {
    describe('validates location type', function() {
      it('should throw Error when auto', function() {
        expectWithConfig({
          locationType: 'auto'
        }).to.throw(Error, errRegex);
      });

      it('should not throw an error when hash', function() {
        expectWithConfig({
          locationType: 'hash'
        }).to.not.throw(Error, errRegex);
      });

      it('should not throw an error with auto in test environment', function() {
        expectWithConfig({
          environment: 'test',
          locationType: 'auto'
        }).to.not.throw(Error, errRegex);
      });
    });
  });
});
