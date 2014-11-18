var _serverDev = "https://www.production-s.dev.shiftplanning.com/api/";
var _serverMob = "https://www.shiftplanning.com/app/iphone/";
var _server = "https://www.shiftplanning.com/api/";
var tcPlugin = function(){};
var tcService = function(){};
var tcServiceTimer = 30000;
var myIPAddress = "";
var appPath = "";

/** This is an iOS API Key */
var apiKey = "08b5181033e32284bb4f62b40ba00b721ed6282b";
var isAndroid = false;
if( navigator.userAgent.indexOf("Android") >= 0 ){
	isAndroid = true;
	/** This is an Android API Key */
	apiKey = "1b1933e7e0a9fdeca1be7801ada2e04ad1719454";
}

// TODO: REPLACE API endpoint to LIVE
_server = _serverDev;
