# Install

`./install.js NameOfApp reverse.style.domain`

# Workflow
You will always Work out of the app/ember directory

### general development
In there you can run standard ember-cli commands and develop in the browser

### simulator development
After making a change to the ember app, you must run `cordova build <platform>`
to update the build to contain those changes. You can then relaunch the app by
building inside of xcode or running `cordova simulate <platform>`

### environment builds

The environment is passed into the ember build command and is pulled from the
TARGET environment variable. The environment defaults to development.

+  production:   `TARGET=production cordova build <platform>`
+  staging:      `TARGET=staging cordova build <platform>`
+  development:  `cordova build <platform>`

## scripts

`script/symlink_dev.js` to set up cordova symlink to watch tmp directory. you
must also run `ember server` at the same time so that the files get recompiled.
This is useful when developing to save time from having to do a full compile and
minification.

`script/symlink_prod.js` to set up cordova symlink to watch dist directory.
Needed when creating a production build

## potential gotchas

+  locationType must be set to hash!

## TODO

1. setup config.xml
2. get `ember server` to rebuild cordova on changes
