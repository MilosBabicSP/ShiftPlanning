var A_TC_SETTOKEN = 0;
var A_TC_STARTSERVICE = 1;
var A_TC_STOPSERVICE = 2;
var A_TC_PLUGIN_NAME = 'TimeClock';

/*
    CALLING PG PLUGIN
    //        cordova.exec(
    //            tcSuccess, tcError,
    //            A_TC_PLUGIN_NAME,
    //            A_TC_SETTOKEN,
    //            new Array({
    //                  token : newToken,
    //                  timeclockID: timeclockID
    //                  api_url: nApiUrl
    //            })
    //        );
*/

cordova.define("cordova/plugin/Timeclock", function(require, exports, module) {
    var exec = require('cordova/exec');

    var Timeclock = function() {};

    Timeclock.prototype.start = function(nToken, nTimeClockID, nApiUrl){
        console.log("Starting service...");
        tcService.startService(
            function(respSS){
//                console.log("startService response => " + JSON.stringify(respSS));
                tcService.getStatus(function(response){
//                    console.log("tcService.getStatus => " + JSON.stringify(response) );
                    tcPlugin.setConfig(nToken, nTimeClockID, nApiUrl);
                }, function(err){
                    console.log("#### ERROR => tcService.getStatus => " + JSON.stringify(err) );
                });
            },
            function(err){
                console.log("#### ERROR => tcService.startService => " + JSON.stringify(err) );
            }
        );

    }

    Timeclock.prototype.setConfig = function(nToken, nTimeClockID, nApiUrl){
//        console.log("setConfig => " + nToken + ", " + nTimeClockID );

        var nConfig = {
               "sptoken": nToken,
               "timeclockid": nTimeClockID,
               "api_url": nApiUrl,
               "HelloTo": "Gordon Freeman"
        }
        tcService.setConfiguration(
            nConfig,
            function(respSC){
//                console.log("setConfiguration response => " + JSON.stringify(respSC));
                tcPlugin.setTimerEnabled();
            },
            function(err){
                console.log("#### ERROR => tcService.setConfiguration => " + JSON.stringify(err) );
            }
        );
    }

    Timeclock.prototype.setTimerEnabled = function(){
//        console.log("setTimerEnabled" );
        tcService.enableTimer(
            tcServiceTimer,
            function(respET){
//                console.log("setTimerEnabled response => " + JSON.stringify(respET));
                tcService.getStatus(function(response){
//                    console.log("tcService.getStatus => " + JSON.stringify(response) );

                }, function(err){
                    console.log("#### ERROR => tcService.getStatus => " + JSON.stringify(err) );
                });
            },
            function(err){
                console.log("#### ERROR => tcService.setTimerEnabled => " + JSON.stringify(err) );
            }
        );
    }

    Timeclock.prototype.startService = function(){
        console.log("startService" );
        tcService.startService(
            function(respSS){
//                console.log("startService response => " + JSON.stringify(respSS));

            },
            function(err){
              console.log("#### ERROR => tcService.setTimerEnabled => " + JSON.stringify(err) );
            }
        );
    }

    Timeclock.prototype.stop = function(){
        console.log("Stoping service...");
        tcService.stopService(
            function(respSS){
                console.log("stopService response => " + JSON.stringify(respSS));

            }, tcError
        );
    }

    Timeclock.prototype.updateToken = function(nToken, nTimeClockID){
//        console.log("Updating service with: token => " + nToken + ", TimeClockID => " + nTimeClockID);
        tcService.setConfiguration(
            new Array({
               "sptoken": nToken,
               "timeclockid": nTimeClockID,
               "HelloTo": "Gordon Freeman"
             }),
            function(respSC){
                console.log("setConfiguration response => " + JSON.stringify(respSC));
            },
            tcError);
    }

    var timeclock = new Timeclock();
    module.exports = timeclock;
});

function tcSuccess(){
    console.log("tcSuccess YEAH");
}

function tcError(tcError){
    console.log("tcError");
    console.log(JSON.stringify(tcError));
}