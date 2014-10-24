//creation of touchmove event used for tablet/mobile devices
var cal;
var lastTouch;
var clickEvent = 'click';
var deviceAgent = navigator.userAgent.toLowerCase();
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);

var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

if (agentID) {
	clickEvent = 'click';
}

jQuery.event.special.touch = {
	setup: function(data, namespaces) {
		var elem = this, $elem = jQuery(elem);
		if (window.Touch) {
			$elem.bind('touchstart', jQuery.event.special.touch.onTouchStart);
			$elem.bind('touchmove', jQuery.event.special.touch.onTouchMove);
			$elem.bind('touchend', jQuery.event.special.touch.onTouchEnd);
		} else {
			$elem.bind('click', jQuery.event.special.touch.click);
		}
	},
	click: function(event) {
		event.type = "touch";
		jQuery.event.handle.apply(this, arguments);
	},
	teardown: function(namespaces) {
		var elem = this, $elem = jQuery(elem);
		if (window.Touch) {
			$elem.unbind('touchstart', jQuery.event.special.touch.onTouchStart);
			$elem.unbind('touchmove', jQuery.event.special.touch.onTouchMove);
			$elem.unbind('touchend', jQuery.event.special.touch.onTouchEnd);
		} else {
			$elem.unbind('click', jQuery.event.special.touch.click);
		}
	},
	onTouchStart: function(e) {
		this.moved = false;
		lastTouch = e.originalEvent.targetTouches[0];
	},
	onTouchMove: function(e) {
		this.moved = true;
	},
	onTouchEnd: function(event) {
		if (!this.moved) {
			event.type = "touch";
			jQuery.event.handle.apply(this, arguments)
		}
	}
}

ShiftPlanning.prototype.toggleMenu = function() {
	$('#menu').toggleClass('hidden');
	$('#wrapper').toggleClass('extended');

	if ($('#wrapper').hasClass('extended')) {
		$('#wrapper').css('margin-left', 190);
		$('#menu').css('margin-left', 0);
		$('.blackMask').css('display', 'block');
		$('.blackMask').css('opacity', '0.5');
        $('.privacy-policy').css('display', 'block');
	} else {
		$('#wrapper').css('margin-left', 0);
		$('#menu').css('margin-left', -190);
		$('.blackMask').css('display', 'none');
		$('.blackMask').css('opacity', '0');
        $('.privacy-policy').css('display', 'none');
	}
}

ShiftPlanning.prototype.loadSubPage = function(obj, page, subpage) {
	if (subpage == 'logout') {
		this.staff.logout();
		return false;
	}

	if (obj != '') {
		obj.parent().parent().find('li').removeClass('active');
		obj.parent().addClass('active');
	}

	$('.subNavigation > div').hide();
	$('.subNavigation > div.' + page).show();

	$('#pages > div').hide();
	$('#pages #' + page + ' .main').hide();
	$('#pages #' + page + ' .mainSub').hide();
	$('#pages #' + page).show();
	$('#pages #' + page + ' .main.' + subpage).show();
	$('#pages #' + page + ' .mainSub.' + subpage).show();

	$('#menu .mainNav > li').removeClass('active');
	$('#menu_' + page).addClass('active');

	$('.subNavigation div.' + page + ' .subnNav[page=' + page + '] li').removeClass('active');

	$('.subNavigation div.' + page + ' .subnNav[page=' + page + '] li a[page=' + subpage + ']').parent().addClass('active');
	sp.hashChange = false;
	sp.hash(page);

	if (typeof this[page] != 'undefined' && 'loadSubPageEvents' in this[page]) {
		this[page].loadSubPageEvents(subpage);
	}

	sp.fixCheckboxes();
	if (page == 'schedule' && subpage == 'addShift') {
	} else {
		$(window).scrollTop(0);
	}
}

ShiftPlanning.prototype.initialize = function() {
	var self = this;
    //console.log("++++++++++ initialize called. USER =>>>> " + JSON.stringify(user) );
    if ( !user.loggedIn ) {
        //console.log("++++++++++>>>> user is no logged in");
        $('.applicationContainer').hide();
    }

	$('.applicationContainer').hide();
	$(window).hashchange(function() {
		if (self.hashChange == false) {
			self.hashChange = true;
			return false;
		}
		if (self.hash().length > 0) {
			//if(self.hash() == 'logout')
			//{
			//    self.staff.logout();
			//    return false;
			//}
            var page = sp.hash();
            var subpage = false;
            // Check if the hash contains subpage
            var subpagePosition = sp.hash().search("/");

            if(subpagePosition >= 0){
                page = sp.hash().substring(0, subpagePosition);
                subpage = sp.hash().substring(subpagePosition+1);
            }

            if(page == 'privacy' || page == 'terms'){
                self.togglePrivacy(false, page);
                return false;
            }

            if ($('#menu [page=' + self.hash() + ']').length > 0) {
				$('#pages > div').hide();
				setTimeout(function() {
					$('#menu [page=' + self.hash() + ']').parent().parent().find('li').removeClass('active');
					$('#menu [page=' + self.hash() + ']').parent().addClass('active');
					self.loadPage(self.hash());
				}, 100);
			} else {
				if (self.hash() != 'login' && self.hash() != 'logout') {
					user.loggedIn ? self.hash('dashboard') : self.hash('login');
				} else {
					//if(self.hash() == 'logout' && user.loggedIn)
					//{
					//       self.staff.logout();
					//}
					if (self.hash() == 'login' && user.loggedIn) {
						self.hash('dashboard');
					}else if (self.hash() == 'login' && !user.loggedIn ) {
                        //console.log("Window reload is next. USER => " + JSON.stringify(user));
                        $(".applicationContainer").hide();
                        $("body").show();
                    }
				}
			}
		}
	});

	if (typeof gap != 'undefined') {
		self.loadSite();
	} else {
		$(document).ready(function() {
			self.loadSite();
		});
	}

	$(window).bind('resize', function() {
		$('#wrapper').width($(window).width());
		$('body').width($(window).width());
	});
}


ShiftPlanning.prototype.loadSite = function() {
	var self = this;
	console.log("Entered into => loadSite => href => " + window.location.href);
    if( appPath == "" ){
        appPath = window.location.href.replace(/index.html/g,'');
        gUtils.loadTemplates();
    }
    if( window.location.hash.indexOf("token") > 0 ){
        var mSamlUrl = window.location.hash;
        var tToken = mSamlUrl.substring(mSamlUrl.indexOf('tok'));
        console.log("tToken => " + tToken);
        window.location.hash = "#login";
        if( typeof tToken != "undefined" ){
            tToken = tToken.split('&');
            console.log("tToken.split() => " + JSON.stringify(tToken));
            console.log("tToken[0]" + tToken[0] );
            if( typeof tToken[0] != "undefined" && tToken[0].split('=')[1] != "null" ){
                window.localStorage.setItem('shiftplanning_mobile_usertoken', tToken[0].split('=')[1]);
            }
            if( typeof tToken[1] != "undefined" && tToken[1].split('=')[1] != "0" ){
                window.localStorage.setItem('shiftplanning_mobile_userid', tToken[1].split('=')[1]);
            }
        }

        gUtils.loadTemplates();
		//sp.staff.loginWithToken();
        //window.location.reload();
        //window.location.href = "file:///android_asset/www/index.html";
        //return;
    }
    init();
    $('.toggleMenu').bind(clickEvent, function(e){
        e.preventDefault();
        e.stopPropagation();
        self.toggleMenu();
    });

    var tmpToken = window.localStorage.getItem('shiftplanning_mobile_usertoken');
    console.log("loadSite => tmpToken => " + tmpToken );
    if(user.loggedIn && user.id !== "" && user.name !== "" && user.company !== "" ) {
        $('.loginContainer').hide();
        $('body').removeClass('login');
        $('html').css('height','auto');
        $('.applicationContainer').show();
        if (sp.hash().length == 0 || sp.hash() == 'login') {
            sp.permissions.preparePermissions();
            sp.hash('dashboard');
        }
    } else {
        if( typeof tmpToken != "undefined" && "" != tmpToken && tmpToken !== null ){
            sp.staff.loginWithToken();
        }else{
            if( !$('.loginContainer').is(":visible") ){
                $('.loginContainer').show();
                $('body').addClass('login');
                sp.hash('login');
                $('#lo_u').focus();
            }else{

            }
        }
    }

    $('#wrapper .subNavigation .subNav:not(.notMain) a').bind(clickEvent, function(e){
        e.preventDefault();
        self.loadSubPage($(this), $(this).parent().parent().attr('page'), $(this).attr('subpage'));
    });

    $('#menu .mainNav > li > a').bind(clickEvent, function(e){
        if ($(this).hasClass('exit') && $(this).attr('page') != 'logout') return true;
        e.preventDefault();
        if( $(this).attr('page') == "logout" || sp.hash() == "logout" ){
            sp.staff.logout();
        }else{
            if ($(this).attr('page') == sp.hash() ){
                self.toggleMenu();
                return false;
            }
            if ($('#wrapper').hasClass('extended') ){
                self.toggleMenu();
            }
        }
        sp.hashChange = true;
        sp.loadPage($(this).attr('page'));
    });

    $(window).hashchange();

    setInterval(function(){
        $('#menu').css('height', self.calculateMenuHeight() );
        var h = self.calculateMenuHeight();
        $('#wrapper').css('min-height', (h > self.calculateWrapperHeight() ? h : self.calculateWrapperHeight()));
        if ( $('.blackMask').css('opacity') == '0' ) {
            $('.blackMask').hide();
        }
    }, 1000);
    $('#wrapper').width($(window).width());
    $('body').width($(window).width());

    //all mainUser names to lead to settings
    $('.userName').bind(clickEvent, function(){
        sp.loadSubPage('', 'settings', 'overview');
    });

    $('#pr_back a,#pr_back_down a').bind(clickEvent, function(e){
        e.preventDefault();
		if( sp.hash() != "login" && sp.hash() != "privacy" ){
			sp.loadPage(sp.hash());
		}else{
        	sp.togglePrivacy('login', 'privacy');
		}
    });

    $('#terms_back a,#terms_back_down a').bind(clickEvent, function(e){
        e.preventDefault();
        sp.togglePrivacy('login', 'terms');
    });

}

ShiftPlanning.prototype.calculateWrapperHeight = function() {
	var wrapperHeight = $('#pages').height() + $('.subNavigation').height() + 20;
	return ($(window).height() > wrapperHeight) ? $(window).height() : wrapperHeight;
}

ShiftPlanning.prototype.calculateMenuHeight = function() {
	var h = this.calculateWrapperHeight();
	if ($('#menu .mainNav').height() + 150 > h) {
		return $('#menu .mainNav').height() + 150;
	} else {
		return h;
	}
}

ShiftPlanning.prototype.globalLoader = function() {
	//$('.bigLoader').show();
}

ShiftPlanning.prototype.fixCheckboxes = function() {
	$('#pages .checkbox:visible').removeClass('failsafe');
	$('#pages .checkbox:visible').each(function(i, item) {
		if ($(this).outerHeight(true) > 45) {
			$(this).addClass('failsafe');
		}
	});
}

ShiftPlanning.prototype.showSuccess = function(text) {
	$('body').append('<div class="notification success hidden">' + text + '</div>');
	$('body > .notification').css('top', $(document).scrollTop());
	$('body > .notification').fadeIn('fast', function() {
		setTimeout(function() {
			$('body > .notification').fadeOut('fast', function() {
				$('body > .notification').remove();
			});
		}, 2000);
	});
}

ShiftPlanning.prototype.showError = function(text) {
	$('body').append('<div class="notification error hidden">' + text + '</div>');
	$('body > .notification').css('top', $(document).scrollTop());
	$('body > .notification').fadeIn('fast', function() {
		setTimeout(function() {
			$('body > .notification').fadeOut('fast', function() {
				$('body > .notification').remove();
			});
		}, 2000);
	});
}

ShiftPlanning.prototype.togglePrivacy = function(hash, page){
    isTermsVisible = true;

    if(hash){
        $('.loginContainer').show();
        $('.applicationContainer').hide();
        $('#pages>div').hide();
        $('.subNavigation').show();
        isTermsVisible = false;
        sp.hash(hash);
    }else{
        $('.loginContainer').hide();
        $('.applicationContainer').show();
        $('.subNavigation').hide();

        var pagesL = $('#pages>div').length;
        $.each( $('#pages>div'), function(i,v){
            $(this).hide();
            if( i == pagesL - 1 ){
                $('#pages #' + page).show();
            }
        });
        //console.log("togglePrivacy: Hash => " + hash + ", Page => " + page );
    }
}

ShiftPlanning.prototype.showPrivacyPolicy = function(){
    this.toggleMenu();
    $("#wrapper > #pages > div").css('display', "none");
    $("#wrapper > #pages > div[id='privacy']").css('display', "block");
}

function callAndroid(func, callback) {
	if (typeof Android != 'undefined') {
		if (typeof func != 'undefined') {
			func = 'showToast';
		}
		return Android[func](function(res) {
			if (typeof callback != 'undefined') {
				callback(res);
			} else {
				return res;
			}
		});
	}

	return false;
}


if (typeof gap == 'undefined') {
//Initalizing javascript library
	var sp = new ShiftPlanning();
	ShiftPlanning.prototype.staff = new ShiftPlanningStaff();
	ShiftPlanning.prototype.schedule = new ShiftPlanningSchedule();
	ShiftPlanning.prototype.dashboard = new ShiftPlanningDashboard();
	ShiftPlanning.prototype.timeClock = new ShiftPlanningTimeClock();
	ShiftPlanning.prototype.reports = new ShiftPlanningReports();
	ShiftPlanning.prototype.requests = new ShiftPlanningRequests();
	ShiftPlanning.prototype.location = new ShiftPlanningLocation();
	ShiftPlanning.prototype.permissions = new ShiftPlanningPermissions();
	ShiftPlanning.prototype.training = new ShiftPlanningTraining();
	ShiftPlanning.prototype.settings = new ShiftPlanningSettings();
}
