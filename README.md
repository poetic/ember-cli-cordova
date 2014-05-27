*this only works currently off of master ember-cli*

# Installation

`npm install -g https://github.com/poetic/ember-cli-cordova`

# Commands
+ `ember-cdv new MyApp com.poetic.myapp` create new app
+ `ember-cdv build --environment production --platform ios` build cordova
  project
+ `ember-cdv help` display help for commands

# Development

## General
In app/ember you can run standard ember-cli commands and develop in the browser

## Simulator
After making a change to the ember app, you must run `ember-cdv build <platform>`
to update the build to contain those changes. You can then relaunch the app by
building inside of xcode/eclipse or running `cordova emulate <platform>`

## Builds

To build for different environments you run the `ember-cdv build` command with
the options you want

# Docs / Guides

This project is mostly a combination of other projects, I plan on writing some
guides on the basic of how to use it and what it contains, until then here is
some info about some dependencies it uses.

+  [ember-cli](http://iamstef.net/ember-cli/)
+  [cordova](http://cordova.apache.org/docs/en/3.4.0/)
+  [ember-animated-outlet](https://github.com/billysbilling/ember-animated-outlet)
+  [moment.js](http://momentjs.com/docs/)

# FAQ

## I'm getting "You have to be inside an ember-cli project in order to use the serve command." when I run `ember server`

You need to cd into the ember/ directory to start up the server

## The slide transition isn't working right, it's fading in over the content

See "New project creation quirks above"


# Potential gotchas

+  locationType must be set to hash
