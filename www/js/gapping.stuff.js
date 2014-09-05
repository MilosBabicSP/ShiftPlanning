function _s(str){
    return str;
}
function _(str){
    return str;
}
function onFail(message) {
	alert('Failed because: ' + message);
}
var onSuccess = function(position) {
	alert('Latitude: ' + position.coords.latitude + '\n' +
			'Longitude: ' + position.coords.longitude + '\n' +
			'Altitude: ' + position.coords.altitude + '\n' +
			'Accuracy: ' + position.coords.accuracy + '\n' +
			'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
			'Heading: ' + position.coords.heading + '\n' +
			'Speed: ' + position.coords.speed + '\n' +
			'Timestamp: ' + position.timestamp + '\n');
};
function getFile(fileID, filename){
    var fURL = 'http://www.shiftplanning.com/app/iphone/api.php?module=admin.file&method=get&content=1&id=' + fileID + '&token=' + user.token;
    console.log("USO U GET FILE");
    console.log( fURL, filename );
    if( isAndroid ){
    	sp.showSuccess('Download of ' + filename + ' started.' );
    	download( fURL, filename )
	}else{
		window.open(encodeURI(fURL ), '_blank');
	}
    return false;
}

function downloadFile(fileID) {
	alert('DownloadFile started for fileID: ' + fileID + ", with\n token: " + user.token);
	sp.api('admin.file', 'GET', {
		id: fileID,
		token: user.token
	}, function(fileResponse) {
		alert(JSON.stringify(fileResponse.data.secureurl));
		download(fileResponse.data.secureurl, fileResponse.data.filename);
	});
}
function download(remoteFile, localFileName) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
			var localPath = fileEntry.fullPath;
			if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
				localPath = localPath.substring(7);
			}
			var ft = new FileTransfer();

			ft.download(remoteFile, localPath, function(entry) {
				fp = entry.fullPath;
				alert('File is saved in: ' + fp + '.');
				entry.file(successFile, fail);
			}, fail);

		}, fail);

	}, fail);

}
function successFile(file) {
    sp.showSuccess('Download of ' + file.name + ' completed.' );
}
function fail(error) {
	alert(error.code);
}
function onError(error) {
	alert("onError entered");
	alert('code: ' + error.code + '\n' +
			'message: ' + error.message + '\n');
}
function onConfirm(button) {
	if (button == 1) {
		logUserOut();
	}
}

function logUserOut() {
	sp.api('staff.logout', 'GET', {"session_destroy":1}, function(response) {
		logUserOutLocal();
	}, function(response) {
		sp.showError(response.error);
	});
}

function logUserOutLocal() {
    //setCookie('shiftplanning_mobile_rememberme', 0, cookieExpire);
    user.loggedIn = 0;
    user.name = '';
    user.company = '';

    window.localStorage.removeItem('shiftplanning_mobile_rememberme');
    window.localStorage.removeItem('shiftplanning_mobile_usertoken');
    window.localStorage.removeItem('shiftplanning_mobile_userid');
    window.localStorage.removeItem('shiftplanning_mobile_username');
    window.localStorage.removeItem('shiftplanning_mobile_usercompany');
    window.localStorage.removeItem('shiftplanning_mobile_userphone');

    sp.staff.data.employees = {};
	if( isAndroid ){
    	sp.hash('login');
	}else{
		sp.hash('logout');
	}
    window.location.reload();
}

function logUserOutClearData(){
    //console.log("Entered into logUserOutClearData ");
    try{
        user.loggedIn = 0;
        user.name = '';
        user.company = '';

        window.localStorage.removeItem('shiftplanning_mobile_rememberme');
        window.localStorage.removeItem('shiftplanning_mobile_usertoken');
        window.localStorage.removeItem('shiftplanning_mobile_userid');
        window.localStorage.removeItem('shiftplanning_mobile_username');
        window.localStorage.removeItem('shiftplanning_mobile_usercompany');
        window.localStorage.removeItem('shiftplanning_mobile_userphone');

        sp.staff.data.employees = {};
    }catch(Ex){
        console.log("Error in logUserOutClearData => " + JSON.stringify( Ex ) );
    }

    $('.applicationContainer').hide();
    $('.loginContainer').removeClass('loading');
    $('body').addClass('login');
    $("body").show();
    $('.loginContainer').fadeIn(500);
}

function showConfirm12() {
    try{
        navigator.notification.confirm(
                'Are you sure you want to logout?',
                onConfirm,
                'LogOut',
                'OK,Cancel'
                );
    }catch(ee){
        console.log("ERRORRRRR");
    }
}

var msgDeleteData = {
	obj: null,
	id: 0,
	del: 'message'
};

var rqstData = {
	obj: null,
	id: 0,
	data: {}
};
var schDataObj;
var tClockID;
var tmpEmployees;
var objAdmin;
function confTimeClock(button) {
	if (button == 1) {
		spModel.timeclock.del('timeclock', {
			id: tClockID
		}, function() {
			$('.subNavigation .timeClock li.active a').trigger(clickEvent);
		});
	}
}
function confAdmin(button) {
	if (button == 1) {
		sp.settings.adminActions(objAdmin);
	}
}
function confSchedule1(button) {
	if (button == 1) {
		spModel.schedule.get('publish', {shifts: schDataObj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response) {
			console.log("publish response22 => " + JSON.stringify( response ) );
			sp.showSuccess(response.data);
			schDataObj.removeClass('loading');
			schDataObj.hide();
			sp.schedule.resetPublishFields(true);
		});
	} else {
		schDataObj.removeClass('loading');
		console.log("click on CANCEL22");
	}
}
function confSchedule2(button) {
	if (button == 1) {
		spModel.schedule.get('publish', {shifts: schDataObj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response) {
            console.log("publish response => " + JSON.stringify( response ) );
			sp.showSuccess(response.data);
			schDataObj.removeClass('loading');
			schDataObj.hide();
			sp.schedule.resetPublishFields(true);
		});
	} else {
		schDataObj.removeClass('loading');
		console.log("click on CANCEL");
	}
}
function confRequest(button) {
	if (button == 1) {
		rqstData.data.action = 'cancel';
		if (rqstData.obj.hasClass('deactivate')) {
			rqstData.data.action = 'deactivate';
		}
		if (rqstData.obj.hasClass('activate')) {
			rqstData.data.action = 'activate';
		}
		$(rqstData.obj).addClass('loading');

        var tradeType = "trade";
        try{
        if( sp.requests.current.swap == "1" ){
            tradeType = "tradeswap";
        }
        }catch(eee){
            console.log("Err at confRequest => " + eee.getMessage() )
        }
		spModel.schedule.update(tradeType, rqstData.data, function(response) {
            $(rqstData.obj).removeClass('loading');
			if (rqstData.data.action == 'activate') {
				sp.showSuccess('Shift trade accepted, waiting for potentional acceptors to accept.');
			} else if (rqstData.data.action == 'deactivate') {
				sp.showSuccess('Shift trade rejected.');
			} else {
				sp.showSuccess('Shift trade canceled.');
			}
			$('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
		}, function(response) {
			sp.showError(response.error);
		});
	} else {
		$(rqstData.obj).removeClass('loading');
		rqstData.obj = null;
		rqstData.id = 0;
		rqstData.data = {};
	}
	$(rqstData.obj).removeClass('loading');
	$('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
	sp.requests.shiftTradesSubEvents();
}
function confDeleteMessage(button) {
	if (button == 1) {
		spModel.messaging.del('wall', {
			id: msgDeleteData.id,
			'delete': msgDeleteData.del
		}, function(response) {
			msgDeleteData.obj.parent().fadeOut('fast', function() {
				msgDeleteData.obj.remove();
				msgDeleteData.obj = null;
				msgDeleteData.id = 0;
				msgDeleteData.del = 'message';
			});
		});
	} else {
		msgDeleteData.obj = null;
		msgDeleteData.id = 0;
		msgDeleteData.del = 'message';
	}
}
function confDeleteMessageInbox(button) {
	if (button == 1) {
		spModel.messaging.del('message', {
			id: msgDeleteData.id
		}, function(response) {
			$('#da_in_msg_' + msgDeleteData.id).fadeOut('fast', function() {
				msgDeleteData.obj.remove();
				msgDeleteData.obj = null;
				msgDeleteData.id = 0;
				msgDeleteData.del = 'message';
			});
		});
	} else {
		msgDeleteData.obj = null;
		msgDeleteData.id = 0;
		msgDeleteData.del = 'message';
	}
}
function confRemoveTimeClock(button) {
	if (button == 1) {
		spModel.timeclock.dtc(tClockID, function() {
			$('#tc_ov_cb span.fr a').hide();
			$('#tc_ov_cf').hide();
			$('#tc_ov_ci').show();

            if(sp.staff.admin.business.pref_pre_time_clock == '1'){
                $('#tc_ov_way').show();
            }
            if(sp.staff.admin.business.pref_mandatory_pre_time_clock == '1'){
                $('#tc_ov_way').show();
                $('#tc_ov_ci').hide();
            }
tClockID = 0;
		});
	} else {
		tClockID = 0;
	}
}
var startBodyHeight = 0;
function correctLoginHeight() {
	setTimeout(function() {
		window.scrollTo(0, 1);
	}, 100);
	startBodyHeight = $("body").height();
}

function internetNo() {
    // Do Stuff When user gets offline
}

function internetYeah() {
    // Do Stuff When user gets online
}

function online() {
	//console.log("Yeah oNlIne");
	$('#intCheck').hide();
}

function offline() {
	//console.log(":-( OFF LINE");
	$('#intCheck').show();
}

function exitApp() {
	if (typeof navigator.app !== "undefined") {
		if (typeof navigator.app.exitApp !== "undefined") {
			navigator.app.exitApp();
		}
	}
}

function mSetCookie(cname, cvalue) {
	try {
		$.cookie(cname, cvalue, {expires: 7});
	} catch (exc) {
		console.log(exc);
	}
}

function mGetCookie(cname) {
	var result = "";
	try {
		result = $.cookie(cname);
	} catch (exc) {
		console.log(exc);
	}
	return result;
}
function checkAccount() {
	/*
	 try{
	 console.log( "**** Check Account: sp.staff.admin.business.status = " + sp.staff.admin.business.status );
	 if( sp.staff.admin.business.status < 1 ){
	 if( sp.staff.admin.business.status == 0 ){
	 sp.showError("Your account is not activated.");
	 }else{
	 sp.showError("Billing has expired on your account");
	 }
	 logUserOut();
	 user.loggedIn = 0;
	 return false;
	 }
	 }catch(Ex){
	 console.log(JSON.stringify( Ex ) );
	 }
	 */
}
function htmlUnescape(value){
	var result = value.replace(/&quot;/g, '"').replace(/&quot/g, '"').replace(/&#39;/g, "'").replace(/&#39/g, "'").replace(/&lt;/g, '<').replace(/&lt/g, '<').replace(/&gt;/g, '>').replace(/&gt/g, '>').replace(/&amp;/g, '&').replace(/&amp/g, '&').replace(/< \/div >/g, '</div>').replace(/< \/a >/g, '</a>').replace(/< \/p >/g, '</p>').replace(/< \/b >/g, '</b>').replace(/< b >/g, '<b>').replace(/< a >/g, '<a>').replace(/< br\/ >/g, '<br/>').replace(/< div >/g, '<div>').replace(/< div c/g, '<div c').replace(/< a c/g, '<a c').replace(/< a t/g, '<a t');
    return result;
}

var isTermsVisible = false;
var watchID = null;
var gpsCoords = {};

function openExtURL(what){
    console.log("openExtURL => URL => " + what );
    console.log(JSON.stringify(window.nativeInterface));
    window.nativeInterface.openInDeviceBrowser(what);
}

var gpsOptions = {
    timeout: 30000,
    enableHighAccuracy: true,
    maximumAge: 2000
};

function getGPSData(){
    //console.log(" READY position STARTED " );
    watchID = navigator.geolocation.watchPosition(function(position){
        if( typeof position.coords != "undefined" ){
            gpsCoords = position;
            //console.log(" READY position => " + JSON.stringify( position ) );
            //console.log(" READY =====> latitude => " + position.coords.latitude );
            //console.log(" READY =====> longitude => " + position.coords.longitude );
        }else{
            //console.log("NEMA KOORDINATA :-(");
        }
    }, function(gpsError){
        //console.log("NEMA KOORDINATA ERROR => " + JSON.stringify( gpsError ) );
        getCurrentPosition();
    }, gpsOptions );
}

function getCurrentPosition( hndSucc, hndErr ){
    if( typeof hndSucc == "undefined" ){
        hndSucc = function( response ){
            if (typeof response != 'function') {
                gpsCoords = response;
                //console.log(" getCurrentPosition position => " + JSON.stringify( response ) );
            }
        };
    }

    if( typeof hndErr == "undefined" ){
        hndErr = function(gpsError){
            console.log("getCurrentPosition NEMA KOORDINATA ERROR => " + JSON.stringify( gpsError ) );
        }
    }
    //console.log("getCurrentPosition STARTED");
    navigator.geolocation.getCurrentPosition( hndSucc, hndErr, gpsOptions );
}

var $ = jQuery.noConflict();
function appReady() {
    console.log("dev is ready");
    console.log("UserAgent => isAndroid => " + isAndroid );
    var samlDomainName = window.localStorage.getItem('shiftplanning_domain_name');
    $("#samlulr").val( samlDomainName );
	if( !isAndroid ){
		var tmpVersion = device.version.substring(0,1);
		if( tmpVersion*1 >= 7 ){
			$("body").css("margin-top", "20px");
		}
	}
	setTimeout(function() {
		navigator.splashscreen.hide();
	}, 1000);
    setTimeout(function() {
        if( typeof sp != "undefined"  && typeof sp.staff.admin.business != "undefined" ){
            if ( sp.staff.admin.business.pref_tc_gps == '1' && navigator.geolocation) {
                getCurrentPosition();
            }
        }
    }, 2000 );
	sKeyboardStates();

	setInterval(function() {
        if( isTermsVisible == false ){
            if (user.loggedIn == 1 && ($(".applicationContainer").css('display') == 'none' || $("body").css('display') == 'none')) {
                $(".loginContainer").fadeOut(function() {
                    $("body").fadeIn(function() {
                        $("body").css('display', 'block');
                    });
                    $(".applicationContainer").fadeIn();
                });
            } else if (user.loggedIn == 0 && ($("body").css('display') == 'none' || $(".loginContainer").css('display') == 'none')) {
                $(".applicationContainer").fadeOut(function() {
                    $("body").fadeIn(function() {
                        $("body").css('display', 'block');
                    });
                });
            }
        }
	}, 1000);

    /*
    * GPS SERVICE SETUP
    */
    gUtils.setupPlugins();
    //getMyIP();
}
// ##########################################################################################
// TODO: This can be implemented when Module TimeClock Locations Get is finished on BACKEND
//function getMyIP(){
//    var url = _server.replace(/api/g,'app') + 'desktop/connection_test.php?my_ip=true';
//    console.log("getMyIP => URL => " + url );
//    $.ajax({
//        url: url,
//        dataType: 'json',
//        type: 'get',
//        cache: false,
//        success: function(response) {
//            console.log('getMyIP => response => ' + response );
//            myIPAddress = response;
//            alert("Ext");
//        },
//        error: function(errData, t, m) {
////            console.log("getMyIP => ####### IP connection Error: " + JSON.stringify(errData) + ", t => " + JSON.stringify(t) + ", m => " + JSON.stringify(m));
//            console.log('getMyIP => response => ' + errData.responseText );
//            myIPAddress = errData.responseText;
//        }
//    });
//
//}

function sKeyboardStates() {
    //console.log("sKeyboardStates");
	document.addEventListener("showkeyboard", function() {
		sKeyVisible();
	}, false);
	document.addEventListener("hidekeyboard", function() {
		sKeyGone();
	}, false);
}

function sKeyVisible() {
	if ($(".loginContainer").is(":visible")) {
		if ($("body").height() < 250) {
			console.log("$(body).height => je manji od 250");
		}
		$("body").height(startBodyHeight);
	}
}

function sKeyGone() {
	if ($(".loginContainer").is(":visible")) {
		$("body").css("height", "100%");
	}
}

document.addEventListener("deviceready", appReady, false);


//document.addEventListener("online", online, false);
//document.addEventListener("offline", offline, false);
//android:windowSoftInputMode="adjustUnspecified|stateUnchanged|adjustResize|adjustPan"