# Nav Bar

## Description

The nav-bar component, partial, and mixins provide an easy to use way of having
a global nav bar that gets updated between routes automatically by defining
options on the route.

The component itself is very barebones but there is also a partial you can
include within it along with a few mixins to get a full featured nav bar without
much work.

# Usage

Add this in your application template

```hbs
{{#cdv-nav-bar}}
  {{partial 'cdv-generic-nav-bar'}}
{{/cdv-nav-bar }}
```

In your application controller, mixin the controller NavBarMixin. If you don't
do this, the actions within the nav-bar won't work

```js
import NavBarMixin from 'ember-cli-cordova/mixins/controllers/nav-bar';

export default Ember.Controller.extend(NavBarMixin);
```

Then in any route you can mixin the route NavBarMixin and set options for the
nav bar. All options are optional.

```js
import NavBarMixin from 'ember-cli-cordova/mixins/route/nav-bar';

export default Ember.Route.extend(NavBarMixin, {
  nav: {
    // Default: application
    // If the cdv-nav-bar is included in something other than the application
    // template this needs to be set to that
    controller: 'application',

    title: {
      text: 'Title'
    },

    leftButton: {
      // Text to show
      text: 'iLeft',
      // Class of an icon to display
      icon: 'save',

      // Action to trigger when it is clicked. It will trigger in the context of
      // the route so you have access to the correct `this`.
      action: function() {
        
      }
    },

    // Same options as leftButton
    rightButton: {
      // ...
    },
  }
});
```



