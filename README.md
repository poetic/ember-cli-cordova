# Installation

`npm install -g git://github.com/poetic/ember-cli-cordova`

# Commands
+ `ember cdv:init com.poetic.myapp` initialize cordova project
+ `ember cdv:open` open cordova xcode project
+ `ember cdv:build --environment production --platform ios` build cordova project
+ `ember cdv:archive 0.0.2 --environment staging --commit --tag` archive ios project with xcode
+ `ember cdv:prepare` needs to be run after cloning a project

# Development

## General
In the root folder you can run standard ember-cli commands and develop in the
browser. Most cordova commands you need are wrapped in some way by ember-cli-cordova,
if you need to run raw commands you will need to cd into the `cordova/`
directory

## Simulator
After making a change to the ember app, you must run `ember cdv:build`
to update the build to contain those changes. You can then relaunch the app by
building inside of xcode/eclipse or running `cordova emulate <platform>`

## Builds

To build for different environments you run the `ember cdv:build` command with
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

#### I am getting `Current working directory is not a Cordova-based project.` when I run a cordova command

You need to cd into the cordova/ directory to run raw cordova commands

#### When running `ember cdv:archive` command I get an Xcode build error saying the scheme doesnt exist

Error example:

```
ld[10658:1007] WARNING: Timed out waiting for <IDEWorkspace,
0x7fc00d207d40>/"runContextManager.runContexts" (10.000125 seconds elapsed)
xcodebuild: error: The project 'MyApp' does not contain a scheme named 'MyApp'.
```

This is caused by now having opened the project in Xcode before. It
automatically generates some info it needs to archive the project. To fix this,
run `ember cdv:open` and let it open in Xcode. After you have done this once you
can just run the `archive` command again and it shouldn't give you any more
trouble.

# Potential gotchas

+  locationType must be set to hash to work inside cordova

# Contributing

## Working with master

``` sh
git clone https://github.com/poetic/ember-cli-cordova.git
cd ember-cli-cordova
npm link
ember new CordovaTest
cd CordovaTest
npm install --save-dev <path to where you cloned it>
npm link ember-cli-cordova
```

After this, any changes you make to the cloned repo will be instantly reflected
in the test app you generated. It just symlinks the node_modules folder.

# Credits

[ember-cli](https://github.com/stefanpenner/ember-cli)
[ember](https://github.com/emberjs/emberjs)
