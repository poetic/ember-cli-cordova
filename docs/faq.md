# FAQ

#### I am getting `Current working directory is not a Cordova-based project.` when I run a cordova command

If you are running a cli command, make sure the dist directory exists. You can
run `ember build` to create it if it doesnt. You can also try to run `ember
cordova:prepare`

#### When running `ember cordova:archive` command I get an Xcode build error saying the scheme doesnt exist

Error example:

```
ld[10658:1007] WARNING: Timed out waiting for <IDEWorkspace,
0x7fc00d207d40>/"runContextManager.runContexts" (10.000125 seconds elapsed)
xcodebuild: error: The project 'MyApp' does not contain a scheme named 'MyApp'.
```

This is caused by not having opened the project in Xcode before. It
automatically generates some info it needs to archive the project. To fix this,
run `ember cordova:open` and let it open in Xcode. After you've done this once you
can just run `ember cordova:archive` command again and it shouldn't give you any more
trouble.

