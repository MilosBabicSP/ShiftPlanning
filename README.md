##About

* This branch contains static files only.
* This branch doesn't contains cordova files/plugins.
* Cordova files/plugins has been moved in separate branches [cordova\_android, cordova\_ios]
* This branch need to be linked into iOS and Android project under "www" directory.
* Android project branch is: [ finalgapandroid360 ]. 360 is from Cordova v3.6.
* iOS project branch is: [ finalgapios ].

## Process:

* Create new branch from this branch.
* Based on platform checkout cordova branches and copy content into new brach root dir.
* Once development has been completed, create build for android \*.apk and submit app on testflight service for ios.

**Note:**

    Testflight service need to be better explored. 
    Otherwise application need to be deployed directly on devices.

* Android APK file need to be attached on JIRA task and reference to testflight service need to be provided for iOS.
* Remove cordova files/plugins from new branch.
* Create pull request into branch 'gaphtmlproduction'

##Steps To Setup New Project 

### Create folder structure and checkout branches

#####Create project dir
    # e.g. shiftplanning_mobile_app
    $ mkdir shiftplanning_mobile_app
    $ cd shiftplanning_mobile_app

#####Clone shiftplanning-mobile repo
    $ git clone git@github.com:shiftplanning/shiftplanning-mobile.git

##### Common for both platforms
    $ cp -a shiftplanning-mobile gaphtmlproduction 
    $ cd gaphtmlproduction
    $ git checkout gaphtmlproduction
    $ cd ../
    
##### iOS specific
    $ cp -a shiftplanning-mobile finalgapios
    $ cp -a shiftplanning-mobile cordova_ios
    $ cd finalgapios 
    $ git checkout finalgapios
    $ cd ../cordova_ios
    $ git checkout cordova_ios 
    $ cd ../
    
##### Android specific
    $ cp -a shiftplanning-mobile finalgapandroid360
    $ cp -a shiftplanning-mobile cordova_android
    $ cd finalgapandroid360
    $ git checkout finalgapandroid360
    $ cd cordova_android
    $ git checkout cordova_android 
    $ cd ../

###Project structure after checkouts for iOS:
    #NOTE#
     From the root of project dir

    $ ls -1
      finalgapios
      cordova_ios
      gaphtmlproduction

###Project structure after checkouts for Andorid:
    #NOTE#
     From the root of project dir

    $ ls -1
      finalgapandroid360
      cordova_android
      gaphtmlproduction

##Starting With New Task
    $ cd gaphtmlproduction
    $ git pull origin gaphtmlproduction
    $ git checkout -b NEW_BRANCH_NAME

###Link dependencies into app project for iOS
    
##### Linking static files into app project
    $ cd ../finalgapios/
    $ ln -s ../gaphtmlproduction/www/ www

##### Linking Cordova into static files
    $ cd ../gaphtmlproduction/www
    $ ln -s ../../cordova_ios/www/plugins/ plugins
    $ ln -s ../../cordova_ios/www/cordova.js cordova.js
    $ ln -s ../../cordova_ios/www/cordova_plugins.js cordova_plugins.js

###Link dependencies into app project for Android

##### Linking static files into app project
    $ cd ../finalgapandroid360/assets/
    $ ln -s ../../gaphtmlproduction/www/ www

##### Linking Cordova into static files
    $ cd ../../gaphtmlproduction/www
    $ ln -s ../../cordova_android/www/plugins/ plugins
    $ ln -s ../../cordova_android/www/cordova.js cordova.js
    $ ln -s ../../cordova_android/www/cordova_plugins.js cordova_plugins.js

###Preparing NEW\_BRANCH for Pull Request
     
#####Remove created simlinks
    $ cd gaphtmlproduction/www
    $ unlink plugins
    $ unlink cordova.js
    $ unlink cordova_plugins.js

