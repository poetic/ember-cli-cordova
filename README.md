# Installation

`npm install -g https://github.com/poetic/ember-cli-cordova`

# Commands
+ `ember-cdv new --name MyApp --id com.poetic.myapp` create new app
+ `ember-cdv build --environment production --platform ios` build cordova
  project
+ `ember-cdv link-production` symlink ember's dist directory to cordova's www
+ `ember-cdv link-development` symlink ember's tmp/output directory to cordova's www
+ `ember-cdv help` display help for commands

# Development

## General
In app/ember you can run standard ember-cli commands and develop in the browser

## Simulator
After making a change to the ember app, you must run `ember-cdv build <platform>`
to update the build to contain those changes. You can then relaunch the app by
building inside of xcode/eclipse or running `cordova simulate <platform>`

# Builds

To build for different environments you run the `ember-cdv build` command with
the options you want

## Potential gotchas

+  locationType must be set to hash
