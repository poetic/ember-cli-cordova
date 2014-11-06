var addon = require('../../index');

function expectWithConfig(baseConfig, env) {
  return expect(addon.config.bind(addon, env || 'development', baseConfig));
}

describe('Addon', function() {
  describe('config', function() {
    describe('validates location type', function() {
      it('should throw Error', function() {
        expectWithConfig({locationType: 'auto'}).to.throw(Error);
      });
      it('should not throw an error', function() {
        var baseConfig = {locationType: 'hash'};
        expectWithConfig({locationType: 'hash'}).to.not.throw(Error);
      });
      it('should not throw an error on test', function() {
        expectWithConfig({locationType: 'auto'}, 'test').to.not.throw(Error);
      });
    });
  });
});
