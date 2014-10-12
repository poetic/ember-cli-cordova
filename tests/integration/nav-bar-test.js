import describeApp from '../helpers/describe-app';

describeApp('Integration - Nav Bar', function() {
  describe('Route Mixin', function() {
    it('updates template', function() {
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
});
