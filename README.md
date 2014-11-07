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


##Steps To Start With New Project 

### Checkout app project if not already:

	iOS:
		branch name: [ finalgapios ]

	Android:
		branch name: [ finalgapandroid360 ]


###Checkout Cordova files/plugins:

	iOS:
		branch name: [ cordova_ios ]

	Android:
		branch name: [ cordova_android ]

###Checkout Static Files (common for both platforms):
	branch name: [ gaphtmlproduction ]

###Project structure after checkouts for iOS:
    $ ls -1
      finalgapios
      cordova_ios
      gaphtmlproduction

###Project structure after checkouts for Andorid:
    $ ls -1
      finalgapandroid360
      cordova_android
      gaphtmlproduction

##Starting With New Task
    $ git checkout gaphtmlproduction
    $ git pull origin gaphtmlproduction
    $ git check -b NEW_BRANCH_NAME

###Link dependencies into app project for iOS
    
	# Linking static files into app project
	$ cd finalgapios/
	$ ln -s ../gaphtmlproduction/www www

	# Linking Cordova into static files
	$ cd ../gaphtmlproduction/www
	$ ln -s ../../cordova_ios/www/plugins plugins
	$ ln -s ../../cordova_ios/www/cordova.js cordova.js
	$ ln -s ../../cordova_ios/www/cordova_plugins.js cordova_plugins.js

###Link dependencies into app project for Android

	# Linking static files into app project
	$ cd finalgapandroid360/assets/
	$ ln -s ../gaphtmlproduction/www www

	# Linking Cordova into static files
	$ cd ../gaphtmlproduction/www
	$ ln -s ../../cordova_android/www/plugins plugins
	$ ln -s ../../cordova_android/www/cordova.js cordova.js
	$ ln -s ../../cordova_android/www/cordova_plugins.js cordova_plugins.js

###Preparing NEW\_BRANCH for Pull Request
     
    #remove created simlinks for iOS
    $ unlink www

    #remove created simlinks for Android
    $ unlink assets/www
