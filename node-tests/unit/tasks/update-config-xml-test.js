var path = require('path');
var uiMock = { start: noop };

var project;
describe('Tasks - Update config xml', function() {
  beforeEach(function() {
    project = {
      cordovaConfig: {
        id: 'com.poetic.test-app',
        name: 'TestApp'
      },
      root: path.join(__dirname, '..', '..', 'fixtures/project')
    }
  });

  it('updates id and name', function() {
    return proxyUpdate(function(xml) {
      expect(xml).to.match(/\sid=\"com\.poetic\.test\-app"\s/);
      expect(xml).to.match(/<name>TestApp<\/name>/);
    });
  });

  it('adds DisallowOverscroll preference', function() {
    return proxyUpdate(function(xml) {
      expect(xml).to.match(/<preference name="DisallowOverscroll" value="true" \/>/);
    });
  });
});

function proxyUpdate(callback) {
  var update = proxyquire('../../lib/tasks/update-config-xml', {
    './modify-xml': proxyquire('../../lib/tasks/modify-xml', {
      'fs': {
        writeFileSync: function(path, xml) {
          callback(xml);
        }
      },
      '../ui': uiMock
    })
  });

  return update(project)();
}
