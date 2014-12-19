##Overview

All commands follow the pattern `ember cordova:{command}`. You can use the `cdv` alias
insted of`cordova`, for example `ember cdv:{command}`.

##Open

####Description

Open the native platform project with the default or specified application

####Available options
+ platform (default:ios)
+ application (default:system default application)

####Examples
+ `ember cordova:open`
+ `ember cordova:open --platform=android --application=eclipse`


##Archive

####Description

Build project and create xcode archive. If the tag or commit options are present
they will be performed after archiving.

####Available options
+ environment (default:staging)
+ tag (default:false)
+ commit (default:false)

####Examples
+ `ember cordova:archive`
+ `ember cordova:archive 0.0.2 --environment=staging --commit --tag `

##Build

####Description

Build the ember and cordova project together running in the simulator or on a device

####Available options
+ environment (default:development)
+ platform (default:ios)

####Examples
+ `ember cordova:build`
+ `ember cordova:build --environment=production --platform=ios`

##Prepare

####Description

Needed after cloning or copying a project.

###Available options

####Examples
+ `ember cordova:prepare`

##Cordova

####Description

Passes commands(plugin(s), platform(s), run, emulate) and arguments to the cordova command

###Available options
  + run
  + emulate
  + platform(s)
  + plugin(s)

####Examples
+ `ember cordova platform`
+ `ember cordova platforms`
+ `ember cordova run`
