var uiMock = { write: noop };

describe('Tasks - Post Build', function() {
  var project;
  beforeEach(function() {
    project = newProject();
  });

  var options;
  describe('rebuildOnChange is false', function() {
    beforeEach(function() {
      options = { rebuildOnChange: false };
    });

    it('return noop', function() {
      var postBuild = proxyquire('../../lib/tasks/post-build', {});

      var res = postBuild({}, options);

      expect(res.toString()).to.eql(noop.toString());
    });
  });

  describe('rebuildOnChange is true', function() {
    beforeEach(function() {
      options = { rebuildOnChange: true };
    });

    it('returns resolving promise and executes correct build', function() {
      var postBuild = proxyquire('../../lib/tasks/post-build', {
        '../utils/run-command': function() {
          return resolveFn;
        },
        '../ui': uiMock
      });

      return postBuild(project, options)().then(function() {
        expect(true).to.be.ok;
      });
    });

    describe('emulate is false', function() {
      beforeEach(function() {
        options.emulate = false;
      });

      it('runs correct command', function() {
        var postBuild = proxyquire('../../lib/tasks/post-build', {
          '../utils/run-command': function(command){
            expect(command).to.eql('cordova build ios');
            return resolveFn;
          },
          '../ui': uiMock
        });

        return postBuild(project, options)().then(function() {
          expect(true).to.be.ok;
        });
      });
    });

    describe('emulate is true', function() {
      beforeEach(function() {
        options.emulate = true;
      });

      it('runs correct command', function() {
        var postBuild = proxyquire('../../lib/tasks/post-build', {
          '../utils/run-command': function(command){
            expect(command).to.eql('cordova build ios && cordova emulate ios');
            return resolveFn;
          },
          '../ui': uiMock
        });

        return postBuild(project, options)().then(function() {
          expect(true).to.be.ok;
        });
      });
    });

    describe('platform is android and emulate is true', function() {
      beforeEach(function() {
        options.platform = 'android';
        options.emulate = true;
      });

      it('runs correct command', function() {
        var postBuild = proxyquire('../../lib/tasks/post-build', {
          '../utils/run-command': function(command){
            expect(command).to.eql('cordova build android && cordova emulate android');
            return resolveFn;
          },
          '../ui': uiMock
        });

        return postBuild(project, options)().then(function() {
          expect(true).to.be.ok;
        });
      });
    });
  });
});


