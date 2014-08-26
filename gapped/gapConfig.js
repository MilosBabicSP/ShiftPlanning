var _serverDev = "http://www.production-s.dev.shiftplanning.com/api/";
var _serverMob = "http://www.shiftplanning.com/app/iphone/";
var _server = "http://www.shiftplanning.com/api/";
var tcPlugin = function(){};
var tcService = function(){};
var tcServiceTimer = 30000;
var myIPAddress = "";
var appPath = "";
var isAndroid = false;
if( navigator.userAgent.indexOf("Android") >= 0 ){
	isAndroid = true;
}

// TODO: REPLACE API endpoint to LIVE
//_server = _serverDev;
