import describeApp from '../helpers/describe-app';

describeApp('Integration - Nav Bar', function() {
  describe('Route Mixin', function() {
    describe('template', function() {
      it('updates between routes', function() {
        visit('nav-bar');

        andThen(function() {
          equal(find('header h1').text().trim(), 'Index');
          equal(find('header button:first').text().trim(), 'iLeft');
          equal(find('header button:last').text().trim(), 'iRight');
        });

        visit('nav-bar/page-1');

        andThen(function() {
          equal(find('header h1').text().trim(), 'Page 1');
          equal(find('header button:first').text().trim(), 'pLeft');
          equal(find('header button:last').text().trim(), 'pRight');
        });
      });
    });

    describe('actions', function() {
      before(function() {
        var navIndex = this.app.__container__.lookup('route:nav-bar/index');
        var page1    = this.app.__container__.lookup('route:nav-bar/page-1');
        var spec     = this;

        spec.navIndexStub = sinon.stub();
        navIndex.setProperties({
          'nav.leftButton.action': function() {
            spec.navIndexStub('left');
          },
          'nav.rightButton.action': function() {
            spec.navIndexStub('right');
          }
        });

        spec.page1Stub = sinon.stub();
        page1.setProperties({
          'nav.leftButton.action': function() {
            spec.page1Stub('left');
          },
          'nav.rightButton.action': function() {
            spec.page1Stub('right');
          }
        });
      });

      it('updates between routes', function() {
        visit('nav-bar');

        click('header button:first');

        andThen(function() {
          ok(this.navIndexStub.calledWith('left'));
          ok(!this.navIndexStub.calledWith('right'));
        }.bind(this));

        click('header button:last');

        andThen(function() {
          ok(this.navIndexStub.calledWith('left'));
          ok(this.navIndexStub.calledWith('right'));
        }.bind(this));

        visit('nav-bar/page-1');

        click('header button:first');

        andThen(function() {
          ok(this.page1Stub.calledWith('left'));
          ok(!this.page1Stub.calledWith('right'));
        }.bind(this));

        click('header button:last');

        andThen(function() {
          ok(this.page1Stub.calledWith('left'));
          ok(this.page1Stub.calledWith('right'));
        }.bind(this));
      });
    });
  });
});
