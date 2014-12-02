# ember-cli-cordova [![Build Status](https://travis-ci.org/poetic/ember-cli-cordova.svg?branch=master)](https://travis-ci.org/poetic/ember-cli-cordova)

*requires at least ember-cli >= 0.1.1*

I will not be focusing on backward compatibility with older ember-cli versions
as it's moving too fast and the API is constantly changing. I will always have
this working with the latest stable release of ember-cli.

## Goals

To provide a toolchain tightly integrated with ember-cli to make developing hybrid
apps with cordova and ember as simple as possible.

## Supported Platforms

Android and iOS. While we don't plan on actively supporting other platforms,
feel free to open an issue or submit a pull request.

## Getting Started

Please see our Getting Started guide
[here](https://github.com/poetic/ember-cli-cordova/blob/master/docs/getting-started.md)

## Blueprints
+ `ember g cordova-init com.reverse.domain platform:android` Required generator
  that sets up the cordova project with a few tweaks to the ember app
+ `ember g cordova-starter-kit` Adds some packages and files that makes up the
  base setup for projects I develop.

## Commands
+ `ember cordova:open` open xcode project
+ `ember cordova:build --environment production --platform ios` build cordova project
+ `ember cordova:archive 0.0.2 --environment staging --commit --tag` archive ios project with xcode
+ `ember cordova:prepare` needs to be run after cloning a project
+ `ember cordova` Passes commands(plugin(s), platform(s), run, emulate) and arguments to the cordova command
+ `ember help` ember cli help with a section for addon provided commands as well

# Docs

Documentation can be found found in the docs directory [here](https://github.com/poetic/ember-cli-cordova/tree/master/docs).

- [Getting Started](https://github.com/poetic/ember-cli-cordova/blob/master/docs/getting-started.md)
- [Configuration](https://github.com/poetic/ember-cli-cordova/blob/master/docs/configuration.md)
- [FAQ](https://github.com/poetic/ember-cli-cordova/blob/master/docs/faq.md)

# Dependency Docs

-  [ember-cli](http://ember-cli.com)
-  [cordova](http://cordova.apache.org/docs/en/4.0.0/)

# Contributing

## Working with master

``` sh
git clone https://github.com/poetic/ember-cli-cordova.git
cd ember-cli-cordova
npm i && bower i
npm link
ember new CordovaTest
cd CordovaTest
npm install --save-dev ember-cli-cordova
npm link ember-cli-cordova
```

After this, any changes you make to the cloned repo will be instantly reflected
in the test app you generated. It just symlinks the node_modules folder.

# Example App

You can find an example app using this here:
[jakecraige/ember-cli-cordova-example-app](https://github.com/jakecraige/ember-cli-cordova-example-app)

# Credits

[ember-cli](https://github.com/stefanpenner/ember-cli)
[ember](https://github.com/emberjs/emberjs)
