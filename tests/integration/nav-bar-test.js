import Ember from 'ember';
import describeApp from '../helpers/describe-app';

describeApp('Integration - Nav Bar', function() {
  describe('Route Mixin', function() {
    describe('Template', function() {
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

      it('values can be a function', function() {
        visit('nav-bar/options-from-model');

        andThen(function() {
          var leftButton  = find('header button:first');
          var title       = find('header h1');
          var rightButton = find('header button:last');

          equal(title.text().trim(), 'modelOption');

          equal(leftButton.text().trim(), 'modelLeft');
          ok(leftButton.find('i').hasClass('leftClass'));

          equal(rightButton.text().trim(), 'modelRight');
          ok(rightButton.find('i').hasClass('rightClass'));
        });
      });
    });

    describe('Actions', function() {
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

        andThen(Ember.run.bind(this, function() {
          ok(this.navIndexStub.calledWith('left'));
          ok(!this.navIndexStub.calledWith('right'));
        }));

        click('header button:last');

        andThen(Ember.run.bind(this, function() {
          ok(this.navIndexStub.calledWith('left'));
          ok(this.navIndexStub.calledWith('right'));
        }));

        visit('nav-bar/page-1');

        click('header button:first');

        andThen(Ember.run.bind(this, function() {
          ok(this.page1Stub.calledWith('left'));
          ok(!this.page1Stub.calledWith('right'));
        }));

        click('header button:last');

        andThen(Ember.run.bind(this, function() {
          ok(this.page1Stub.calledWith('left'));
          ok(this.page1Stub.calledWith('right'));
        }));
      });
    });

    describe('willTransiton reset', function() {
      it('resets nav options on transition', function() {
        visit('nav-bar');

        andThen(function() {
          equal(find('header h1').text().trim(), 'Index');
        });

        visit('nav-bar/should-reset');

        andThen(Ember.run.bind(this, function() {
          var ctrl = this.lookupController('nav-bar');

          equal(find('header h1').text().trim(), '');
          equal(find('header button:first').text().trim(), '');
          equal(find('header button:last').text().trim(), '');
          deepEqual(ctrl.get('nav'), {title: {}, leftButton: {}, rightButton: {}});
        }));
      });
    });
  });
});
