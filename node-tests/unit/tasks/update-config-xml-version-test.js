var path = require('path');

describe('Tasks - Update config xml version', function() {
  var project;
  beforeEach(function() {
    project = {
      root: path.join(__dirname, '..', '..', 'fixtures/project')
    }
  });

  it('updates version and writes it', function() {
    var update = proxyquire('../../lib/tasks/update-config-xml-version', {
      './modify-xml': proxyquire('../../lib/tasks/modify-xml', {
        'fs': {
          writeFileSync: function(path, xml) {
            expect(path).to.eql(project.root + '/cordova/config.xml');
            expect(xml).to.match(/\sversion=\"0.1.0"\s/);
          }
        }
      })
    });

    return update('0.1.0', project)();
  });
});
