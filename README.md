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
