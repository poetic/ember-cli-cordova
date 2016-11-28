var addon = require('../../index');

function expectWithConfig(config, env, call) {
  if (call) {
    return expect(addon.config(env || 'development', config));
  }
  else {
    return expect(addon.config.bind(addon, env || 'development', config));
  }
}

var errRegex = /ember-cli-cordova: You must specify the locationType as 'hash' in your environment\.js/;

describe('Addon', function () {
  describe('config', function () {
    var savedEnvVar;

    beforeEach(function () {
      savedEnvVar = process.env.EMBER_CLI_CORDOVA;
    });

    afterEach(function () {
      process.env.EMBER_CLI_CORDOVA = savedEnvVar;
    });

    describe('validates location type', function () {
      it('should throw Error when auto', function () {
        expectWithConfig({
          locationType: 'auto'
        }).to.throw(Error, errRegex);
      });

      it('should not throw an error when hash', function () {
        expectWithConfig({
          locationType: 'hash'
        }).to.not.throw(Error, errRegex);
      });

      it('should not throw an error with auto in test environment', function () {
        expectWithConfig({
          locationType: 'auto'
        }, 'test').to.not.throw(Error, errRegex);
      });

      it('should not throw an error when the env var is set to 0', function () {
        process.env.EMBER_CLI_CORDOVA = '0';
        expectWithConfig({
          locationType: 'auto'
        }).to.not.throw(Error, errRegex);
      });
    });

    describe('should replace the locationType', function () {
      it('should use the defaultLocationType when building for test', function () {
        expectWithConfig({
          defaultLocationType: 'auto'
        }, 'test', true).to.have.property('locationType', 'auto');
      });

      it('should use the defaultLocationType when the env var is set to 0', function () {
        process.env.EMBER_CLI_CORDOVA = '0';
        expectWithConfig({
          defaultLocationType: 'auto'
        }, null, true).to.have.property('locationType', 'auto');
      });

      it('should use hash as locationType', function () {
        expectWithConfig({
          defaultLocationType: 'auto'
        }, null, true).to.have.property('locationType', 'hash');
      });
    });

  });
});
