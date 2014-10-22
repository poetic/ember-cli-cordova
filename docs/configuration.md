### Configuration

All configuration is currently optional. Configuration will be done in your
app's `config/environment`. You need to set it up like this: 

```js
ENV.cordova = {
  // Rebuild the cordova project on file changes. Blocks the server until it's
  // finished.
  //
  // default: false
  rebuildOnChange: true,

  // Run the cordova emulate command after the build is finished
  //
  // default: false
  emulate: true,

  // Which platform to build and/or emulate
  //
  // default: 'ios'
  platform: 'ios',

  // Which URL the ember server is running on. This is used when using
  // live-reload that comes with the starter kit.
  //
  // default: 'the-device-ip:4200'
  emberUrl: 'http://10.0.1.12:4200',

  // Whether or not to use liveReload on the device simulator. Requires a few
  // plugins to be installed that come with the starter-kit. It will cause your
  // app to not boot up in the browser
  //
  // default: false and iOS
  liveReload: {
    enabled: false,
    platform: 'ios'
  }
};
```
