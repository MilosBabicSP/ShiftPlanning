//creation of touchmove event used for tablet/mobile devices
var cal;
var lastTouch;
var clickEvent = 'click';
var deviceAgent = navigator.userAgent.toLowerCase();
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);

var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

if (agentID) {
    clickEvent = 'touch';
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
}

ShiftPlanning.prototype.loadSubPage = function(obj, page, subpage){
    if (subpage == 'logout'){
        sp.staff.logout();
        return false;
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
    
    $('#menu .mainNav').removeClass('active');
    $('#menu_' + page).addClass('active');
    
    $('.subNavigation div.' + page + ' .subnNav[page=' + page + '] li').removeClass('active');
    
    $('.subNavigation div.' + page + ' .subnNav[page=' + page + '] li a[page=' + subpage + ']').parent().addClass('active');
    
    if (typeof this[page] != 'undefined' && 'loadSubPageEvents' in this[page]){
        this[page].loadSubPageEvents(subpage);
    }
    
    sp.fixCheckboxes();
}

ShiftPlanning.prototype.initialize = function(){
    var self = this;
    $(window).hashchange(function(){
        if (sp.hash().length > 0) {
            if(sp.hash() == 'logout')
            {
                sp.staff.logout();
                return false;
            }
            if ($('#menu [page=' + sp.hash() + ']').length > 0)
            {
                $('#pages > div').hide();
                setTimeout(function(){
                    $('#menu [page=' + sp.hash() + ']').parent().parent().find('li').removeClass('active');
                    $('#menu [page=' + sp.hash() + ']').parent().addClass('active');
                    self.loadPage(sp.hash());
                }, 50);
            }
            else
            {
                if(sp.hash() != 'login' && sp.hash() != 'logout')
                {
                        user.loggedIn ? sp.hash('dashboard') : sp.hash('login') ;
                }
                else
                {
                    if(sp.hash() == 'logout' && user.loggedIn)
                    {
                            sp.staff.logout();
                    }
                    if(sp.hash() == 'sp.hash()login' && user.loggedIn)
                    {
                            sp.hash('dashboard');
                    }
                }
            }
        }
    });  
    $(document).ready(function(){
        init();
        $('.toggleMenu').bind('click', function(e){
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
            if ($(this).attr('page') == sp.hash()){
                return false;
            }
            self.toggleMenu();
            sp.hash($(this).attr('page'));
        });
        $(window).hashchange();
        
        setInterval(function(){
            $('#menu').css('height', ($(window).height() > $(document).height() ? $(window).height() : $(document).height()));
        }, 1000);
        $('#wrapper').width($(window).width());
        $('body').width($(window).width());
        
        //all mainUser names to lead to settings 
        $('.userName').bind(clickEvent, function(){
            sp.loadSubPage('', 'dashboard', 'settings');
        });
        
        $('#wrapper').bind(clickEvent, function(e){
            if ($('#wrapper').hasClass('extended') && !$(e.target.parentElement).hasClass('toggleMenu')){
                self.toggleMenu();
            }
        })
        
        if (isAndroid){
            $('#da_up_fi_hide').hide();
        }
    });
    
    $(window).bind('resize', function(){
        $('#wrapper').width($(window).width());
        $('body').width($(window).width());
    });
}

ShiftPlanning.prototype.globalLoader = function(){
    
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
        }, 3000);
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
        }, 3000);
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
