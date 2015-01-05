ShiftPlanningStaff.prototype.initialize = function() {
	var self = this;
	this.moduleName = 'staff';
	if( initNeeded(this.moduleName) ){
		initializeModule(this.moduleName);
	}else{
		return false;
	}
	//console.log("Entered into => initialize");
	$(document).ready(function() {
		if (user.loggedIn == 1) {
			self.prepareConfig();
		}
		$('#lo_b').bind(clickEvent, function() {
		    if( $("#lo_u").val() == "--kUU4yM2h" ){
                var newUrl = prompt("Change API EndPoint", _serverDev);
                if( newUrl != null ){
                    _server = newUrl;
                }
                alert("APIEndPoint changed to: " + _server );
            }else if( $("#lo_u").val() == "123 prod" ){
                _server = _serverDev;
                alert("APIEndPoint changed to: " + _server );
		    }else{
				cordova.getAppVersion(function(version) {
		
					var logData = {		appVersion		: version,
										deviceName		: device.model,
										deviceOS  		: device.platform,
										deviceVersion 	: device.version,
										conenctionType	: navigator.connection.type};
					self.login(logData);
				});
			}
		});

		$('#lo_show_saml').bind(clickEvent, function() {
		    $(".loginForm").hide();
            $("#samlpage_holder").show();
		});

		$('#lo_saml').bind(clickEvent, function() {
		    var samlDomainName = $("#samlulr").val();

		    if( samlDomainName.replace(/\ /g, '') == "" ){
		        sp.showError(_s('Please enter your domainName'));
		        return;
		    }

            window.localStorage.setItem('shiftplanning_domain_name', samlDomainName );
		    var samlURL = "https://" + $("#samlulr").val() + ".shiftplanning.com/includes/saml/";
//		    console.log("Loading SAML PAGE => " + samlURL );
            window.location.href = samlURL;
		});

		$('#lo_f').on(clickEvent, '.checkbox', function() {
			$(this).toggleClass('check');
		});

		self.listEvents();
		self.addStaffEvents();
		self.fastAssignmentEvents();

	});
}


ShiftPlanningStaff.prototype.loadSubPageEvents = function(subpage) {
	this.moduleName = 'staff';
	if( initNeeded(this.moduleName) ){
		this.initialize();
		initializeModule(this.moduleName);
	}
	$('#st_tp_menu').hide();
	this[subpage + 'SubEvents']();
}

ShiftPlanningStaff.prototype.listEvents = function() {
	var self = this;
	$('#st_sn_ga').bind(clickEvent, function() {
		if ($(this).hasClass("active")) {
			return false;
		}
		$('#st_sn_ga').addClass('active');
		$('#st_sn_li').removeClass('active');
		$('#st_li_ga').removeClass('small').addClass('big');
	});

	$('#st_sn_li').bind(clickEvent, function() {
		if ($(this).hasClass("active")) {
			return false;
		}
		$('#st_sn_li').addClass('active');
		$('#st_sn_ga').removeClass('active');
		$('#st_li_ga').removeClass('big').addClass('small');
	});

	$('#st_li_se_b').bind(clickEvent, function(e) {
		e.preventDefault();
		var s = $('#st_li_se_te').val();
		if (s.length == 0 || s == 'Search...') {
			$('#st_li_ga li').show();
			$('#st_li_ga').show();
			$('#st_li .noResults').hide();
		} else {
			$('#st_li_ga li').hide();
			$('#st_li_ga').show();
			$('#st_li .noResults').hide();
			$('#st_li_ga li').find('span:Contains("' + s + '")').parents('li').show();
			if ($('#st_li_ga li').find('span:Contains("' + s + '")').parents('li').length == 0) {
				$('#st_li .noResults').show();
				$('#st_li_ga').hide();
			}
		}
	});

	$('#st_li_se_te').bind('keyup', function(e) {
		$('#st_li_se_b').trigger(clickEvent);
	});

	$("#st_li_ga li").live(clickEvent, function(e) {
		e.stopPropagation();
		var id = $(this).attr('staffId');
		if (sp.permissions.hasPermission('visible_staff_details')) {
			self.displayEmployee(id);
		}
		window.scrollTo(0, 1);
	});
}

ShiftPlanningStaff.prototype.addStaffEvents = function() {
	var self = this;
	$('#st_ae_sa').bind(clickEvent, function() {
		$(this).toggleClass('check');
	});

	$('#st_ae_ce_b').bind(clickEvent, function(e) {
		e.preventDefault();
		self.createEmployee($(this));
	});
}

ShiftPlanningStaff.prototype.fastAssignmentEvents = function() {
	var self = this;
	$('#st_fa_el').bind('change', function() {
		self.loadFastAssignment($(this).val());
	});

	$('#st_fa ul.detailsGrid ul').on(clickEvent, '.checkbox', function(e) {
		var sid = $(this).attr('itemId');
		var skills = ($(this).parents('.skills').length > 0) ? true : false;
		var checked = ($(this).hasClass('check')) ? true : false;
		var obj = this;
		$(obj).parent().addClass('loading');
		var data = {
			id: $('#st_fa_cu').val()
		}
		if (skills) {
			if (checked) {
				data.removeskill = sid;
			} else {
				data.addskill = sid;
			}
		} else {
			if (checked) {
				data.removeschedule = sid;
			} else {
				data.addschedule = sid;
			}
		}
		spModel.staff.update('employee', data, function(response) {
			if (checked) {
				$(obj).removeClass('check');
			} else {
				$(obj).addClass('check');
			}
			$(obj).parent().removeClass('loading');
			sp.settings.updateUser($('#st_fa_cu').val(), response, false);
		});
	});
}

ShiftPlanningStaff.prototype.listSubEvents = function() {
	$('#st_tp_menu').show();
	$('#st_li_ga').html($.tmpl($('#te_st_list'), spModel.staff.allStaff()));
	$('#st_li_ga li').show();
	$('#st_li_se_te').val('').trigger('blur');
}

ShiftPlanningStaff.prototype.addStaffSubEvents = function() {
	this.resetAddEmployee();
}

ShiftPlanningStaff.prototype.fastAssignmentSubEvents = function() {
	$('#st_fa_el').html(spView.staffOption());
	$('#st_fa_po').hide();
	$('#st_fa_sk').hide();
}

//Functions
ShiftPlanningStaff.prototype.displayEmployee = function(id) {
	$('#st_tp_menu').hide();
	$('#pages > div').hide();
	$('#pages #settings .main').hide();
	$('#pages #settings .mainSub').hide();
	$('#pages #settings').show();
	$('#da_se_overview').show();
	sp.settings.overviewSubEvents( spModel.staff.getEmployeeById( id ) );
	$('#settings .mainSub.settings .subNav li:first a').trigger(clickEvent);
	$('.subNavigation').hide();
	$('#pages #settings .mainSub.settings').show();
}


//Get all fast assignment info.
ShiftPlanningStaff.prototype.loadFastAssignment = function(id) {
	var employee = spModel.staff.getEmployeeById(id);
	$('#st_fa_cu').val(id);
	$('#st_fa_po ul.detailsGrid ul').html(spView.editableSchedules(employee));
	$('#st_fa_sk ul.detailsGrid ul').html(spView.editableSkills(employee));

	$('#st_fa_po').show();
	$('#st_fa_sk').show();
	sp.fixCheckboxes();
}

ShiftPlanningStaff.prototype.createEmployee = function(c) {
	$(c).addClass('loading');
	var self = this;
	var data = {};
	data.name = $('#st_ae_i_n').val();
	//if ($.trim($('#st_ae_i_nn').val()).length > 0){
	data.nick_name = $('#st_ae_i_nn').val();
	//}
	//if ($.trim($('#st_ae_i_e').val()).length > 0){
	data.email = $('#st_ae_i_e').val();
	//}

	//if ($.trim($('#st_ae_i_eid').val()).length > 0){
	data.eid = $('#st_ae_i_eid').val();
	//}

	//if ($.trim($('#st_ae_i_eid').val()).length > 0){
	data.username = $('#st_ae_i_un').val();
	//}

	//if ($.trim($('#st_ae_i_hw').val()).length > 0){
	data.wage = $('#st_ae_i_hw').val();
	//}

	//if ($.trim($('#st_ae_i_no').val()).length > 0){
	data.notes = $('#st_ae_i_no').val();
	//}

	if ($('#st_ae_sa').hasClass('check')) {
		data.send_activation = 1;
	}

	spModel.staff.create('employee', data, function(response) {
		$(c).removeClass('loading');
		spModel.staff.addEmployee(response.data);
		self.displayEmployee(response.data.id);
		sp.showSuccess(_s('Employee successfully created!'));
	}, function() {
		$(c).removeClass('loading');
	});
}


ShiftPlanningStaff.prototype.resetAddEmployee = function() {
	$('#st_ae_i_n').val('');
	$('#st_ae_i_nn').val('');
	$('#st_ae_i_e').val('');
	$('#st_ae_i_eid').val('');
	$('#st_ae_i_un').val('');
	$('#st_ae_i_hw').val('');
	$('#st_ae_i_no').val('');
	$('#st_ae_sa').removeClass('check');
}

ShiftPlanningStaff.prototype.loginWithToken = function(logData) {
	user.token = window.localStorage.getItem('shiftplanning_mobile_usertoken');
    //console.log("LOGIN WITH TOKEN => " + user.token);
	user.id = window.localStorage.getItem('shiftplanning_mobile_userid');
	var self = this;
    sp.hashChange = false;
	$('.loginContainer').addClass('loading');
	$('.bigLoader2').show();
	
		sp.appendToken = true;
		sp.api('staff.employee', 'GET', {
		id: user.id,
		log_data: JSON.stringify(logData)
		}, function(loginResponse) {
		//console.log("LoginWithToken Response => " + JSON.stringify(loginResponse));
		if( typeof loginResponse.data == "undefined" ){
			logUserOutLocal();
		}else{
			loginResponse.data.employee = {};
			try {
				loginResponse.data.employee = JSON.parse(JSON.stringify(loginResponse.data));
			} catch (ee3) {
				//console.log(ee3);
			}
		//sp.staff.admin.business.pref_show_location_in_shift
			sp.appendToken = false;
			sp.staff.admin.info = loginResponse.data.employee;
			user.loggedIn = 1;
			if (loginResponse.data.employee.language == null) {
				loginResponse.data.employee.language = window.localStorage.getItem('shiftplanning_mobile_lang');
			}
			window.localStorage.setItem('shiftplanning_mobile_lang', loginResponse.data.employee.language );

			var calls = [
				['staff.employees', 'GET', {}],
				['schedule.schedules', 'GET', {
						'perms': 1
					}],
				['admin.settings', 'GET', {}],
				['staff.skills', 'GET', {}],
				['location.locations', 'GET', {}]
			]
			sp.multiApi(calls, function(response) {
				
				var calls2 = [
				['api.config', 'GET', {}],
				['admin.business', 'GET', {}],
				['messaging.employees', 'GET', {}],
				];

				sp.multiApi(calls2, function(confBusiness) {
					//was hitting the 5 request limit for multi api so we needed to send a separate call
						user.loggedIn = 1;
						user.name = loginResponse.data.employee.name;
						user.company = window.localStorage.getItem('shiftplanning_mobile_usercompany');
						user.phone = window.localStorage.getItem('shiftplanning_mobile_userphone');
						sp.staff.raw.employees = response[0].data;
						sp.staff.data.employees = sp.map(response[0].data);
						/**
						* Following lines fixes the bug with a Empty Schedule list in TimeClock,
						*	This happens when a simple employee can not see other employee's contact details
						*	when that feature is disabled in Admin Account Settings
						*/
						if( sp.staff.raw.employees.length === 0 ){
							sp.staff.raw.employees.push( sp.staff.admin.info );
							sp.staff.data.employees = sp.map(sp.staff.raw.employees);
						}
						sp.schedule.raw.schedules = response[1].data;
						sp.schedule.data.schedules = sp.map(response[1].data);
						sp.staff.admin.settings = response[2].data;
						sp.staff.raw.skills = response[3].data;
						sp.staff.data.skills = sp.map(response[3].data);
						sp.staff.raw.locations = response[4].data;
						sp.staff.data.locations = sp.map(response[4].data);
						sp.staff.admin.info.dfAvatar = sp.getAvatar(sp.staff.admin.info.id);

						sp.raw.config = confBusiness[0].data;
						sp.schedule.dateId = sp.raw.config.today.id;
						sp.staff.pvtMsg = confBusiness[2].data;

						sp.staff.admin.business = confBusiness[1].data;

						//console.log("BUSINESS  => " + JSON.stringify(confBusiness[1]) );
						user.company = sp.staff.admin.business.name;
						//console.log("BUSINESS NAME USER => " + user.company );

						$('.notification').remove();
						sp.hashChange = true;
						sp.hash('dashboard');
						self.prepareConfig();
						$('.userName').html(user.name);
						$('#da_widgets .user .icon').html('<img  height="40" width="40"  src="' + sp.getAvatar() + '" />');
						$('company').html(sp.staff.admin.business.name);
						sp.permissions.preparePermissions();
						spRanges.fixRanges();
						sp.staff.fixed.employees = sp.permissions.fixStaffListing();
						sp.raw.config.today.formatted = Date.parse(sp.raw.config.today.formatted).toString(cal.dformat);

						window.localStorage.setItem('shiftplanning_mobile_rememberme', 1);
						window.localStorage.setItem('shiftplanning_mobile_usertoken', loginResponse.token);
						window.localStorage.setItem('shiftplanning_mobile_userid', loginResponse.data.employee.id);
						window.localStorage.setItem('shiftplanning_mobile_username', user.name);
						window.localStorage.setItem('shiftplanning_mobile_usercompany', user.company);
						window.localStorage.setItem('shiftplanning_mobile_userphone', user.phone);
						$('.loginContainer').fadeOut(500, function() {
							$('#lo_b').removeClass('loading');
							$('body').removeClass('login');
							$('html').css('height', 'auto');
							$('.loginContainer').removeClass('loading');
							$('.applicationContainer').fadeIn(800, function() {
								//alert('Before Prep Perms');
								sp.permissions.initialize();
								sp.permissions.preparePermissions();
								setTimeout(function(){
									$('.bigLoader2').hide();
								}, 600);
							});
						});
				});
			});
		}
		}, function(response) {

		$('#lo_b').removeClass('loading');
		$('.login .error').html(response.error);
		$('.login .error').slideDown(500);
		$('.login input:first').focus();
		$('.bigLoader2').hide();
		});

}
//Rest
ShiftPlanningStaff.prototype.login = function(logData) {
    //console.log("Login " );
	var u = $('#lo_u').val();
	var p = $('#lo_p').val();
	var self = this;
	$('#lo_b').addClass('loading');
	var dd = new Date();
	$('.bigLoader2').show();
	
	sp.api('staff.login', 'GET', {
		username: u,
		password: p,
		log_data: JSON.stringify(logData)
	}, function(loginResponse) {
        //console.log("Login Response => " + JSON.stringify(loginResponse));
        if( typeof loginResponse.data == "undefined" ){
            logUserOutLocal();
        }else{
			
			sp.staff.admin.info = loginResponse.data.employee;
            user.token = loginResponse.token;

			if( sp.staff.admin.info.deactivated * 1 == 1 ){
                user.loggedIn = 0;
                user.name = '';
                user.company = '';
                sp.staff.data.employees = {};
                $('#lo_b').removeClass('loading');
                sp.showError(_s('This account has been deactivated.'));
                $('.login input:first').focus();
                return false;
            }
            window.localStorage.setItem('shiftplanning_mobile_usertoken', loginResponse.token);
            window.localStorage.setItem('shiftplanning_mobile_userid', loginResponse.data.employee.id);
            window.localStorage.setItem('shiftplanning_mobile_username', u);
            window.localStorage.setItem( 'shiftplanning_mobile_lang', loginResponse.data.employee.language );

            if (loginResponse.data.employee.language == null) {
                loginResponse.data.employee.language = loginResponse.data.business.language;
            }
            /*
            if (loginResponse.data.employee.language != 'en_US') {
                window.location.reload();
            }
            */
            var calls = [
                ['staff.employees', 'GET', {}],
                ['schedule.schedules', 'GET', {
                        'perms': 1
                    }],
                ['admin.settings', 'GET', {}],
                ['staff.skills', 'GET', {}],
                ['location.locations', 'GET', {}]
            ];
            //console.log("Before multiAPI => " + JSON.stringify(calls) );
            sp.multiApi(calls, function(response) {
                //console.log("After multiAPI call, response => " + JSON.stringify( response ) );
                var calls2 = [
                    ['api.config', 'GET', {}],
                    ['admin.business', 'GET', {}],
                    ['messaging.employees', 'GET', {}]
                ];

                sp.multiApi(calls2, function(confBusiness) {
                    dd = new Date();
                    //was hitting the 5 request limit for multi api so we needed to send a separate call
                    $('.loginContainer').fadeOut(500, function() {
                        $('#lo_b').removeClass('loading');
                        user.loggedIn = 1;
                        user.name = sp.staff.admin.info.name;
                        user.company = loginResponse.data.business.name;
                        user.phone = loginResponse.data.business.phone;
                        user.id = sp.staff.admin.info.id;
                        sp.staff.raw.employees = response[0].data;
                        sp.staff.data.employees = sp.map(response[0].data);
                        /**
                        * Following lines fixes the bug with a Empty Schedule list in TimeClock,
                        *	This happens when a simple employee can not see other employee's contact details
                        *	when that feature is disabled in Admin Account Settings
                        */
                        if( sp.staff.raw.employees.length === 0 ){
                            sp.staff.raw.employees.push( sp.staff.admin.info );
                            sp.staff.data.employees = sp.map(sp.staff.raw.employees);
                        }
                        sp.schedule.raw.schedules = response[1].data;
                        sp.schedule.data.schedules = sp.map(response[1].data);
                        sp.staff.admin.settings = response[2].data;
                        sp.staff.raw.skills = response[3].data;
                        sp.staff.data.skills = sp.map(response[3].data);
                        sp.staff.raw.locations = response[4].data;
                        sp.staff.data.locations = sp.map(response[4].data);
                        sp.staff.admin.info.dfAvatar = sp.getAvatar(sp.staff.admin.info.id);
                        sp.raw.config = confBusiness[0].data;
                        sp.schedule.dateId = sp.raw.config.today.id;
                        sp.staff.admin.business = confBusiness[1].data;
                        sp.staff.pvtMsg = confBusiness[2].data;
                        $('body').removeClass('login');
                        $('.notification').remove();
                        $('html').css('height', 'auto');
                        //sp.hash('dashboard');
                        self.prepareConfig();
                        $('.userName').html(user.name);
                        $('#da_widgets .user .icon').html('<img  height="40" width="40"  src="' + sp.getAvatar() + '" />');
                        $('company').html(user.company);

                        sp.permissions.preparePermissions();
                        spRanges.fixRanges();
                        sp.staff.fixed.employees = sp.permissions.fixStaffListing();
                        sp.raw.config.today.formatted = Date.parse(sp.raw.config.today.formatted).toString(cal.dformat);

                        window.localStorage.setItem('shiftplanning_mobile_rememberme', 1);
                        window.localStorage.setItem('shiftplanning_mobile_usercompany', user.company);
                        window.localStorage.setItem('shiftplanning_mobile_userphone', user.phone);
						//if( isAndroid ){
							sp.hash('dashboard');
//                        $('.applicationContainer').fadeIn(800, function(){
                            setTimeout(function(){
                                $('.bigLoader2').hide();
                            }, 600);
//                        });
						//}else{
						//	console.log("---------------");
						//	sp.hash("");
                		//	window.location.reload();
						//}
                    });
                });
            });
        }
	}, function(response) {
		$('#lo_b').removeClass('loading');
		$('.login .error').html(response.error);
		$('.login .error').slideDown(500);
		$('.login input:first').focus();
        $('.bigLoader2').hide();
	});
}

ShiftPlanningStaff.prototype.logoutResponse = function(button) {
    $('.blackMask').css('display', 'block');
    $('.blackMask').css('opacity', '0.5');

    sp.api('staff.logout', 'GET', {}, function(response) {
        $('.blackMask').css('display', 'none');
        $('.blackMask').css('opacity', '0');
        user.loggedIn = 0;
        sp.hash("login");
        $('applicationContainer').addClass('loading');
		sp = undefined;
		moduleInitialized = undefined;
		window.localStorage.clear();
		document.cookies = '';
		document.clear();
        window.location.reload();
    }, function(response) {
        sp.showError(response.error);
    });
}

ShiftPlanningStaff.prototype.logout = function() {
    sp.hashChange = false;
	try {
        navigator.notification.confirm(
			'Are you sure you want to logout?',
			onConfirm,
			'Log Out',
			['Ok', 'Cancel']
        );
    } catch (ee) {
        console.log("ERRORRRRR");
    }
}


ShiftPlanningStaff.prototype.prepareConfig = function() {
	var currency = {
		1: '$',
		2: '&#163;',
		3: '&#8364;',
		4: '&#8360;',
		5: '&#165;',
		6: '&#8361;',
		7: 'R',
		8: 'kr',
		9: '&#8369;',
		10: 'RM'
	}
	var tmpDate = new Date();
	var def = {
		month: tmpDate.getMonth(),
		year: tmpDate.getFullYear(),
		day: tmpDate.getDate()
	};
	cal = {
		startday: sp.staff.admin.settings.startday,
		currency: currency[sp.staff.admin.settings.currency],
		tmode: (sp.staff.admin.settings['24hr'] == "1" ? 24 : 12),
		tstring: (parseInt(sp.staff.admin.settings['24hr']) == 1) ? 'HH:mm' : 'h:mm tt',
		dformat: sp.strReplace(['M', 'd', 'm', 'Y', 'j'], ['MMM', 'dd', 'MM', 'yyyy', 'd'], sp.staff.admin.settings.date),
		dpformat: sp.strReplace(['d', 'm', 'Y', 'M', 'j'], ['dd', 'mm', 'yy', 'M', 'd'], sp.staff.admin.settings.date),
		user: sp.staff.admin.info.id,
		view: 'week',
		mode: 'overview',
		schedule: '',
		lastlength: 8,
		focus: 'employee',
		today: tmpDate.getMonth() + '/' + tmpDate.getDate() + '/' + tmpDate.getFullYear(),
		month: def.month,
		year: def.year,
		day: def.day,
		firstday: '',
		lastday: '',
		cache: {},
		lastcall: '',
		firsttime: 0,
		height: 960,
		timeline: {},
		shifts: {},
		schedules: {},
		locations: {},
		skills: {},
		employees: {},
		total: {},
		conflicts: {},
		locked: 0
	};
}
