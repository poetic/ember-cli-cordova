# Installation

`npm install -g https://github.com/poetic/ember-cli-cordova`

# Commands
+ `ember-cdv new --name MyApp --id com.poetic.myapp` create new app
+ `ember-cdv link-production` symlink ember's dist directory to cordova's www
+ `ember-cdv link-development` symlink ember's tmp/output directory to cordova's www
+ `ember-cdv help` display help for commands

# Development

## General
In app/ember you can run standard ember-cli commands and develop in the browser

## Simulator
After making a change to the ember app, you must run `cordova build <platform>`
to update the build to contain those changes. You can then relaunch the app by
building inside of xcode/eclipse or running `cordova simulate <platform>`

# Builds

## Environment

The environment is passed into the ember build command and is pulled from the
TARGET environment variable. The environment defaults to development.

+  production:   `TARGET=production cordova build <platform>`
+  staging:      `TARGET=staging cordova build <platform>`
+  development:  `cordova build <platform>`



## Potential gotchas

+  locationType must be set to hash
