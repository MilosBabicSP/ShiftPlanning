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
    setup: function(data,namespaces){
        var elem = this, $elem = jQuery(elem);
        if (window.Touch) {
            $elem.bind('touchstart', jQuery.event.special.touch.onTouchStart);
            $elem.bind('touchmove', jQuery.event.special.touch.onTouchMove);
            $elem.bind('touchend', jQuery.event.special.touch.onTouchEnd);
        } else {
            $elem.bind('click', jQuery.event.special.touch.click);
        }
    },
    click: function (event) {
        event.type = "touch";
        jQuery.event.handle.apply(this, arguments);
    },

    teardown: function (namespaces) {
        var elem = this, $elem = jQuery(elem);
        if (window.Touch) {
            $elem.unbind('touchstart', jQuery.event.special.touch.onTouchStart);
            $elem.unbind('touchmove', jQuery.event.special.touch.onTouchMove);
            $elem.unbind('touchend', jQuery.event.special.touch.onTouchEnd);
        } else {
            $elem.unbind('click', jQuery.event.special.touch.click);
        }
    },

    onTouchStart: function (e) {
        this.moved = false;
        lastTouch = e.originalEvent.targetTouches[0];
    },

    onTouchMove: function (e) {
        this.moved = true;
    },

    onTouchEnd: function (event) {
        if (!this.moved) {
            event.type = "touch";
            jQuery.event.handle.apply(this, arguments)
        }
    }
}

ShiftPlanning.prototype.toggleMenu = function(){
    $('#menu').toggleClass('hidden');
    $('#wrapper').toggleClass('extended');
    
    if ($('#wrapper').hasClass('extended')){
        $('#wrapper').css('margin-left', 190);
        $('#menu').css('margin-left', 0);
        $('.blackMask').css('display','block');
        $('.blackMask').css('opacity','0.5');
    } else {
        $('#wrapper').css('margin-left', 0);
        $('#menu').css('margin-left', -190);
        $('.blackMask').css('display','none');
        $('.blackMask').css('opacity','0');
    }
}

ShiftPlanning.prototype.loadSubPage = function(obj, page, subpage) {
    if (subpage == 'logout'){
        this.staff.logout();
        return false;
    }
	
	$('.subNavigation').show();
	
	if($.trim(subpage)==''){
		subpage = $('.subNav[page=' + page + '] li:first a').attr('subpage');
	}
	
	// dirty fix for profile page, which is not in hashchange system
	if(page == 'staff' && subpage == 'view'){
		subpage = 'list';
	}
	
    if (obj != ''){
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
    
	if($('.subNav[page=' + page + '] li a[subpage=' + subpage + ']' ).length > 0){
		$('.subNav[page=' + page + '] li').removeClass('active');
		$('.subNav[page=' + page + '] li a[subpage=' + subpage + ']').parent().addClass('active');
		
		sp.hash(page+'/'+subpage);
	}
    
    if (typeof this[page] != 'undefined' && 'loadSubPageEvents' in this[page]){
        this[page].loadSubPageEvents(subpage);
    }
    
    sp.fixCheckboxes();
    if (page == 'schedule' && subpage == 'addShift') {
    } else {
        $(window).scrollTop(0);
    }
}

ShiftPlanning.prototype.initialize = function(){
    var self = this;
    $(window).hashchange(function(){
        if (sp.hashChange == false){
            sp.hashChange = true;
            return false;
        }
		
        if (sp.hash().length > 0) {
			var page = sp.hash();
			var subpage = false;
			// Check if the hash contains subpage
			var subpagePosition = sp.hash().search("/");
			
			if(subpagePosition >= 0){
				page = sp.hash().substring(0, subpagePosition);
				subpage = sp.hash().substring(subpagePosition+1);
			}
			
            if(page == 'logout')
            {
                self.staff.logout();
                return false;
            }

			
            if ($('#menu [page=' + page + ']').length > 0)
			{
                 $('#pages > div').hide();
                 setTimeout(function(){

                    $('#menu [page=' + page + ']').parent().parent().find('li').removeClass('active');
                    $('#menu [page=' + page + ']').parent().addClass('active');
					
					if(subpage){
						self.loadSubPage('', page, subpage);
					}
					else{
						self.loadPage(page);
					}
                    
                 }, 50);
			}
            else
            {
                if(page != 'login' && page != 'logout')
                {
                        user.loggedIn ? self.hash('dashboard') : self.hash('login') ;
                }
                else
                {
                    if(self.hash() == 'logout' && user.loggedIn)
                    {
                            self.staff.logout();
                    }
                    if(self.hash() == 'login' && user.loggedIn)
                    {
                            self.hash('dashboard');
                    }
                }
            }
        }
    });  
    $(document).ready(function(){
        init();
        $('.toggleMenu').bind(clickEvent, function(e){
            e.stopPropagation();
            e.preventDefault();
            self.toggleMenu();
        });
        
        
        if(user.loggedIn){
            $('.loginContainer').hide();
            $('body').removeClass('login');
            $('html').css('height','auto');
            $('.applicationContainer').show();
            if (sp.hash().length == 0 || sp.hash() == 'login'){
                sp.hash('dashboard');
            }
        } else {
            $('.loginContainer').show();
            $('body').addClass('login');
            sp.hash('login');
            $('#lo_u').focus();
        }
        
        $('#wrapper .subNavigation .subNav:not(.notMain) a').bind(clickEvent, function(e){
            e.preventDefault();
            self.loadSubPage($(this), $(this).parent().parent().attr('page'), $(this).attr('subpage'));
        });
        
        $('#menu .mainNav > li > a').bind(clickEvent, function(e){
            if ($(this).hasClass('exit')) return true;
            e.preventDefault();
			
			var page = sp.hash();
			// Check if the hash contains subpage
			var subpagePosition = sp.hash().search("/");
			if(subpagePosition >= 0){
				page = sp.hash().substring(0, subpagePosition);
			}
			
            if ( $(this).attr('page') == page ) {
                self.toggleMenu();
                return false;
            }
            if ( $('#wrapper').hasClass('extended') ) {
                self.toggleMenu();
            }
            sp.hashChange = true;
			
			page = $(this).attr('page');
			var subpage = $('.subNav[page=' + page + '] li:first a').attr('subpage');
            sp.hash(page + '/' + subpage);
        });
        $(window).hashchange();
        
        setInterval(function() {
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
        
        if (isAndroid){
            $('#da_up_fi_hide').hide();
        }
        
//        $('.wrapper').bind('swipe', function(e) {
//            var m = $('.wrapper').hasClass('extended');
//            if (e.direction == 'right' && !m) {
//                $('#menu').removeClass('hidden');
//                $('#wrapper').addClass('extended');
//                $('#wrapper').css('margin-left', 190);
//                $('#menu').css('margin-left', 0);
//                $('.blackMask').css('display','block');
//                $('.blackMask').css('opacity','0.5');
//            } else if (e.direction == 'left' && m) {
//                $('#menu').addClass('hidden');
//                $('#wrapper').removeClass('extended');
//                $('#wrapper').css('margin-left', 0);
//                $('#menu').css('margin-left', -190);
//                $('.blackMask').css('display','none');
//                $('.blackMask').css('opacity','0');
//            }
//        });
//        //dragstart drag dragend
//        var start = false;
//        var element = 
//        $('.wrapper').bind('dragstart', function(e){
//            e.preventDefault();
//            e.stopPropagation();
//            $('.blackMask').css('display','block');
//            $('.blackMask').css('opacity','0');
//        });
//        $('.wrapper').bind('drag', function(e){
//            e.preventDefault();
//            e.stopPropagation();
//            var m = $('.wrapper').hasClass('extended');
//            if (e.direction == 'left') {
//                e.distanceX = 190 + parseInt(e.distanceX);
//                if (Math.abs(parseInt(e.distanceX)) > 50 && m){
//                    start = true;
//                }
//            } else {
//                if (parseInt(e.distanceX) > 50 && !m){
//                    start = true;
//                }
//            }
//            element = 'wrapper';
//            if (!start){
//                return false;
//            }
//            if (e.distanceX <= 0){
//                e.distanceX = 0;
//            }
//            if (e.distanceX >= 190){
//                e.distanceX = 190;
//            }
//            if (start) {
//                $('#wrapper').css('margin-left', parseInt(e.distanceX));
//                $('#menu').css('margin-left',(-190 + parseInt(e.distanceX)) );   
//                $('.blackMask').css('opacity',((0.5*parseInt(e.distanceX))/190).toFixed(1));
//            }
//        });
//        
//        $('.wrapper').bind('dragend', function(e){
//            start = false;
//            var len = parseInt($('#wrapper').css('margin-left'));
//            if ( len > 90 ) {
//                $('#menu').removeClass('hidden');
//                $('#wrapper').addClass('extended');
//                $('#wrapper').css('margin-left', 190);
//                $('#menu').css('margin-left', 0);
//                $('.blackMask').css('display','block');
//                $('.blackMask').css('opacity','0.5');
//            } else {
//                $('#menu').addClass('hidden');
//                $('#wrapper').removeClass('extended');
//                $('#wrapper').css('margin-left', 0);
//                $('#menu').css('margin-left', -190);
//                $('.blackMask').css('display','none');
//                $('.blackMask').css('opacity','0');
//            }
//        });
    });
    
    $(window).bind('resize', function() {
        $('#wrapper').width($(window).width());
        $('body').width($(window).width());
    });
}

ShiftPlanning.prototype.calculateWrapperHeight = function() {
    var wrapperHeight = $('#pages').height() + $('.subNavigation').height() + 20; 
    return ($(window).height() > wrapperHeight) ? $(window).height() : wrapperHeight; 
}

ShiftPlanning.prototype.calculateMenuHeight = function () {
    var h = this.calculateWrapperHeight();
    if ( $('#menu .mainNav').height() + 150 > h) {
        return $('#menu .mainNav').height() + 150;
    } else {
        return h;
    }
}

ShiftPlanning.prototype.globalLoader = function(){
    //$('.bigLoader').show();
}

ShiftPlanning.prototype.fixCheckboxes = function(){
    $('#pages .checkbox:visible').removeClass('failsafe');
    $('#pages .checkbox:visible').each(function(i, item){
	if ($(this).outerHeight(true) > 45){
	    $(this).addClass('failsafe');
	}
    });
}

ShiftPlanning.prototype.showSuccess = function(text){
    $('body').append('<div class="notification success hidden">' + text + '</div>');
    $('body > .notification').css('top', $(document).scrollTop());
    $('body > .notification').fadeIn('fast', function(){
        setTimeout(function(){
            $('body > .notification').fadeOut('fast', function(){
                $('body > .notification').remove();
            });
        }, 2000);
    });
}

ShiftPlanning.prototype.showError = function(text){
    $('body').append('<div class="notification error hidden">' + text + '</div>');
    $('body > .notification').css('top', $(document).scrollTop());
    $('body > .notification').fadeIn('fast', function(){
        setTimeout(function(){
            $('body > .notification').fadeOut('fast', function(){
                $('body > .notification').remove();
            });
        }, 2000);
    });
}

function callAndroid(func, callback){
    if (typeof Android != 'undefined'){
	if (typeof func != 'undefined'){
	    func = 'showToast';
	}
	return Android[func](function(res){
	    if (typeof callback != 'undefined'){
		callback(res);
	    } else {
		return res;
	    }
	});
    }
    
    return false;
}

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
