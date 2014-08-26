//$(document).ready(function(){
//    console.log("document ready");
//    $("#serviceStart").click(function(event){
//        tcPlugin.start("tc77c8xcx876cx878cxv", 123456789);
//    });
//    $("#serviceStop").click(function(event){
//        tcPlugin.stop();
//    });
//
//});

var gUtils = function(){};

gUtils.device = {
    isGap: true,
    isAndroid: isAndroid,
    Ready: function(){
        console.log("dev is ready");

        setTimeout(function() {
            //navigator.splashscreen.hide();
        }, 1000);

        gUtils.setupPlugins();
    }
};

gUtils.loadTemplates = function(){
    $("#templates").load(appPath + "templates.html");
};

gUtils.shouldStartService = function(tcData){
    if( isAndroid ){
        try{
            if (tcData != 'out') {
            console.log("BUSINESS STUFF => " + JSON.stringify(sp.staff.admin.business.pref_gps_tracker));
            if( typeof sp.staff.admin.business.pref_gps_tracker != "undefined" ){
                 var gpsTracker = sp.staff.admin.business.pref_gps_tracker;
                 if( gpsTracker != "0" ){
                     tcServiceTimer = gpsTracker * 60 * 1000;
                     //tcServiceTimer = gpsTracker;
                     tcPlugin.start(user.token, tcData.id, _server);
                 }else{
                     tcPlugin.stop();
                 }
             }else{
                 tcPlugin.stop();
             }
            }else{
                tcPlugin.stop();
            }
        }catch(e){}
    }
};

gUtils.setupPlugins = function(){
//    console.log("IN setupPlugins");
    if( isAndroid ){
        if (!window.plugins) {
            window.plugins = {};
        }

        if (!window.plugins.GPSService) {
            window.plugins.GPSService = cordova.require("cordova/plugin/GPSService");
        }

        if (!window.plugins.timeclock) {
            window.plugins.timeclock = cordova.require("cordova/plugin/Timeclock");
        }

        tcService = window.plugins.GPSService;
        tcPlugin = window.plugins.timeclock;
    }

//    console.log("END setupPlugins");

//    setInterval(function(){
//        tcService.getStatus(function(response){
//            console.log("tcService.getStatus => " + JSON.stringify(response) );
//        }, function(err){
//            console.log("#### ERROR => tcService.getStatus => " + JSON.stringify(err) );
//        });
//    }, 15000);
}

//document.addEventListener("deviceready", gUtils.device.Ready, false);