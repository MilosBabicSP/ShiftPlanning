ShiftPlanningDashboard.prototype.initialize = function() {
	var self = this;
	this.moduleName = 'dashboard';
	if( initNeeded(this.moduleName) ){
		initializeModule(this.moduleName);
	}else{
		return false;
	}
	$(document).ready(function() {
		self.dashboardEvents();
		self.wallEvents();
		self.inboxEvents();
		self.settingsEvents();
		self.upcomingShiftsEvents();
		self.whosonnowEvents();
		self.filesEvents();
		self.fixes();
	});
}

ShiftPlanningDashboard.prototype.loadSubPageEvents = function(subpage) {
	this.moduleName = 'dashboard';
	if( initNeeded(this.moduleName) ){
		this.initialize();
		initializeModule(this.moduleName);
	}

	switch (subpage) {
		case 'wall':
			this.wallSubEvents();
			break;
		case 'upcomingShifts':
			this.upcomingShiftsSubEvents();
			break;
		case 'files':
			this.filesSubEvents();
			break;
		case 'inbox':
			this.inboxSubEvents();
			break;
		case 'settings':
			this.settingsSubEvents();
			break;
		case 'whosonnow':
			this.whosonnowSubEvents();
			break;
		case 'dashboard':
			this.dashboardSubEvents();
			break;
		case 'logout':
			sp.staff.logout();
			break;
		case 'pingUser':
			this.pingUser();
			break;
	}
}

ShiftPlanningDashboard.prototype.dashboardEvents = function() {
	$('#da_widgets').delegate('.timeClock a', clickEvent, function(e) {
		e.preventDefault();
		//sp.hash('timeClock');
		sp.loadSubPage('', 'timeClock', 'overview');
	});

	$('#da_widgets').delegate('.tradePage', clickEvent, function(e) {
		e.preventDefault();
		sp.loadSubPage('', 'requests', 'available');
	});


	$('#da_widgets').delegate('ul.shifts a', clickEvent, function(e) {
		e.preventDefault();
		$(this).addClass('loading');
		spModel.schedule.get('shift', {
			id: $(this).attr('rel'),
			detailed: 1
		}, function(response) {
			sp.schedule.fromDashboard = true;
			sp.schedule.shift = response.data;
			sp.loadSubPage('', 'schedule', 'shiftDisplay');
		});
	});

	$('#da_widgets').delegate('.schedule a', clickEvent, function(e) {
		e.preventDefault();
		$('#menu_schedule a').trigger(clickEvent);
	});

	$('#da_widgets').delegate('.user a', clickEvent, function(e) {
		e.preventDefault();
		$('#menu_settings a').trigger(clickEvent);
	});
}

ShiftPlanningDashboard.prototype.wallEvents = function() {
	var self = this;
	$('#da_wa_nm_b').bind(clickEvent, function(e) {
		e.preventDefault();
		$('#da_wa_nm_f').toggleClass('hidden');
		$('#da_wa_nm_ti').val('');
		$('#da_wa_nm_me').val('');
	});

	$('#da_wa_nm_st').bind(clickEvent, function(e) {
		e.preventDefault();
		$(this).toggleClass('check');
	});

	$('#da_wa_nm_ca').bind(clickEvent, function(e) {
		e.preventDefault();
		$('#da_wa_nm_b').trigger(clickEvent);
	});

	$('#da_wa_nm_sa').bind(clickEvent, function(e) {
		e.preventDefault();
		var obj = $(this);
		obj.addClass('loading');
		var data = {};
		if (sp.isL($('#da_wa_nm_ti').val())) {
			data.title = $.trim($('#da_wa_nm_ti').val());
		} else {
			data.title = '';
		}

		if (!sp.isL($('#da_wa_nm_me').val())) {
			sp.showError(_s('Message must be entered'));
			return false;
		}
		data.post = $.trim($('#da_wa_nm_me').val());
		spModel.messaging.create('wall', data, function(response) {
			obj.removeClass('loading');
			$('#da_wa_nm_f').toggleClass('hidden');
			$('#da_wa_nm_ti').val('');
			$('#da_wa_nm_me').val('');
			self.wallSubEvents();
		}, function() {
			obj.removeClass('loading');
		});
	});

	$('#da_wa_li').delegate('.msgRpl, .cmtCount', clickEvent, function(e) {
		e.preventDefault();
		var id = $(this).attr('rel');
		if (!$('#da_wa_msg_' + id).find('.cmts').is(':visible')) {
			$('#da_wa_msg_' + id).find('.cmtCount').hide();
			$('#da_wa_msg_' + id).find('.cmts').show();
			if ($(this).hasClass('msgRpl')) {
				$('#da_wa_msg_' + id).find('input[type=text]').focus();
			}
		} else {
			if ($(this).hasClass('msgRpl')) {
				$('#da_wa_msg_' + id).find('input[type=text]').val($('#da_wa_msg_' + id).find('input[type=text]').attr('origin'));
			}
			$('#da_wa_msg_' + id).find('.cmtCount').show();
			$('#da_wa_msg_' + id).find('.cmts').hide();
		}
	});

	$('#da_wa_li').delegate('.msgDel', clickEvent, function(e) {
		e.preventDefault();
		var obj = $(this);
		msgDeleteData.obj = obj;
		msgDeleteData.id = $(this).attr('rel');
		msgDeleteData.del = 'message';
		if ($(this).hasClass('comment')) {
			msgDeleteData.del = 'comment';
		}
		navigator.notification.confirm(_s('Do you want to delete this message?'), confDeleteMessage, "Delete Message");
	});

	$('#da_wa_li').delegate('input[type=text]', 'focus', function() {
		$(this).attr('origin', $(this).val());
		$(this).val('');
	});

	$('#da_wa_li').delegate('input[type=submit]', clickEvent, function() {
		var obj = $(this);
		var id = $(this).attr('rel');
		var post = $.trim($('#da_wa_msg_' + id + ' input[type=text]').val());
		if (post.length == 0 || post == 'Write a comment...') {
			alert(_s('Please write your message'));
			return false;
		}
		spModel.messaging.create('wall', {
			post: post,
			id: id
		}, function(response) {
			var d = {
				avatar: sp.staff.admin.info.dfAvatar,
				id: id,
				userName: sp.staff.admin.info.name,
				comment: post,
				time: 'Now',
				full: false
			}
			obj.parent().before($.tmpl($('#te_da_wa_me_co'), d));
			$('#da_wa_msg_' + id + ' input[type=text]').val('Write a comment...');
		});

		return true;
	});

	$('#da_wa_li').delegate('input[type=text]', 'keyup', function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13) {
			$(this).parent().parent().find('input[type=submit]').trigger(clickEvent);
		}
	});
}

ShiftPlanningDashboard.prototype.filesEvents = function() {

	$('#da_fi_list').delegate('li div', clickEvent, function(e) {
		e.stopPropagation();
		var id = $(this).find('a').attr('rel');
		//downloadFile(id);

		$('#da_fi_form').attr('action', _serverMob + 'api.php?module=admin.file&method=get&content=1&id=' + this.id + '&token=' + user.token);
		$('#da_fi_form input[name=id]').val(id);
		$('#da_fi_form input[name=token]').val(user.token);

		//alert( "action: " + $('#da_fi_form').attr('action') + "\n");

		$('#da_fi_form').submit();
	});

}

ShiftPlanningDashboard.prototype.upcomingShiftsEvents = function() {
	$('#da_up .shifts a').bind(clickEvent, function(e) {
		e.preventDefault();
		sp.loadSubPage('', 'schedule', 'today');
	});

	$('#da_up_li').delegate('li a', clickEvent, function(e) {
		e.preventDefault();
		$(this).addClass('loading');
		spModel.schedule.get('shift', {
			id: $(this).attr('rel'),
			detailed: 1
		}, function(response) {
			sp.schedule.fromDashboardUpcoming = true;
			sp.schedule.shift = response.data;
			sp.loadSubPage('', 'schedule', 'shiftDisplay');
		});
	});
}

ShiftPlanningDashboard.prototype.inboxEvents = function() {
	var self = this;
	$('#da_in_me').delegate('.msgHead', clickEvent, function(e) {
		e.preventDefault();
		var id = $(this).attr('messageId');
		var obj = $(this);
		if (obj.hasClass('extended')) {
			obj.parent().toggleClass('extended');
		} else {
			$(obj).addClass('loading');
			spModel.messaging.update('message', {
				id: id,
				read: 1
			}, function(response) {
				obj.parent().toggleClass('extended');
				obj.parent().removeClass('unread');
				$(obj).removeClass('loading');
			});
		}
	});

	$('#da_in_nm_b, #da_in_nm_ca').bind(clickEvent, function(e) {
		e.preventDefault();
		$('#da_in_nm_f').toggleClass('hidden');
		$('#da_in_nm_ti').val('');
		$('#da_in_nm_me').val('');
		$('#da_in_nm_to').val(0);
	});

	$('#da_in_nm_sa').bind(clickEvent, function(e) {
		self.sendMessage();
	});

	$('#da_in_me').delegate('a.butRpl', clickEvent, function(e) {
		e.preventDefault();
		var id = $(this).attr('rel');
		$('#da_in_msg_' + id).find('.newMsg').show(function() {
			var obj = $(this);
			obj.find('input[type=text]').val('re: ' + $('#da_in_msg_' + id).find('.msgHead h5').html());
		});
	});

	$('#da_in_me').delegate('a.butDel', clickEvent, function(e) {
		e.preventDefault();
		msgDeleteData.obj = $(this);
		msgDeleteData.id = $(this).attr('rel');
		navigator.notification.confirm(_s('Do you want to delete this message?'), confDeleteMessageInbox, "Delete Message");
	});

	$('#da_in_me').delegate('.msgBody .newMsg .title .fr', clickEvent, function(e) {
		e.preventDefault();
		var obj = $(this).parents('.newMsg');
		var curr = $(this).find('a');
		curr.addClass('loading');
		var data = {
			subject: obj.find('input[type=text]').val(),
			message: obj.find('textarea').val(),
			to: obj.find('input[type=hidden]').val()
		};

		spModel.messaging.create('message', data, function(resonse) {
			self.inboxSubEvents();
		}, function() {
			curr.removeClass('loading');
		});
	});

	$('#da_in_me').delegate('.msgBody .newMsg .title .fl', clickEvent, function(e) {
		e.preventDefault();
		var obj = $(this).parents('.newMsg');
		obj.find('input[type=text]').val('');
		obj.find('textarea').val('');
		obj.hide('fast');
	});
}

ShiftPlanningDashboard.prototype.settingsEvents = function() {
//    var self = this;
//    $('#dashboard .search.settings.mainSub li a').bind(clickEvent, function(e){
//	e.preventDefault();
//	$('#da_se > div').hide();
//	$('#dashboard .search.settings.mainSub li').removeClass('active');
//	switch ($(this).attr('subpage')){
//	    case 'overview':
//		self.prefillOverview(sp.staff.data.employees[$('#da_se_cur_us_id').val()]);
//		break;
//	    case 'edit':
//		self.prepareEditDetails(sp.staff.data.employees[$('#da_se_cur_us_id').val()]);
//		break;
//	    case 'recentShifts':
//		self.displayShifts(sp.staff.data.employees[$('#da_se_cur_us_id').val()],'recentShifts');
//		break;
//	    case 'upcomingShifts':
//		self.displayShifts(sp.staff.data.employees[$('#da_se_cur_us_id').val()],'upcomingShifts');
//		break;                
//	}
//	$('#da_se_' + $(this).attr('subpage')).show();
//	$(this).parent().addClass('active');
//	sp.fixCheckboxes();
//    });
//    
//    $('#da_se_ed_cu').delegate('.checkbox', clickEvent, function(){
//        var obj = this;
//        var checked = ($(this).hasClass('check')) ? true : false;
//           if (checked) {
//		$(obj).removeClass('check');
//	    } else {
//		$(obj).addClass('check');
//	    }
//    });
//    
//    $('#da_se_ed_po, #da_se_ov_po, #da_se_ed_sk, #da_se_ov_sk').delegate('.checkbox', clickEvent, function(){
//	var sid = $(this).attr('itemId');
//	var skills = ($(this).parents('.skills').length > 0) ? true : false;
//	var checked = ($(this).hasClass('check')) ? true : false;
//	var obj = this;
//	$(obj).parent().addClass('loading');
//	var data = {
//	    id : $('#da_se_cur_us_id').val()
//	}
//	if (skills){
//	    if (checked) {
//		data.removeskill = sid;
//	    } else {
//		data.addskill = sid;
//	    }
//	} else {
//	    if (checked) {
//		data.removeschedule = sid;
//	    } else {
//		data.addschedule = sid;
//	    }
//	}
//	spModel.staff.update('employee', data, function(response){
//	    if (checked) {
//		$(obj).removeClass('check');
//	    } else {
//		$(obj).addClass('check');
//	    }
//	    $(obj).parent().removeClass('loading');
//	    self.updateUser($('#da_se_cur_us_id').val(), response, false);
//	});
//    });
//    
//    $('#da_se_ed_ue').bind(clickEvent, function(e){
//	$(this).addClass('loading');
//	e.preventDefault();
//	self.saveEditForm($(this));
//    });
//    
//    $('textarea#da_se_ov_no, textarea#da_se_ed_no').bind('blur', function(){
//	self.updateNotes($(this).val());
//    });
//    
//    $('#da_se_pa_up').bind(clickEvent, function(e){
//	e.preventDefault();
//	self.changePassword();
//    });
//    
//    $('#da_se_ov_aa a').bind(clickEvent, function(e){
//	e.preventDefault();
//	var c = confirm(_s('Are you sure?'));
//	if (c){
//	    self.adminActions(this);
//	}
//    })
//    $('#da_se_rs_li').delegate('.fr',clickEvent,function(e){
//	e.preventDefault()
//	switch($('#menu .mainNav .active').attr('id')){
//	    case 'menu_staff':
//		sp.schedule.fromStaff =true;
//		break;
//	    case 'menu_dashboard':
//		sp.schedule.fromStaff =false;
//	}
//	spModel.schedule.get('shift', {
//	    id : $(this).attr('shiftId'), 
//	    detailed : 1
//	}, function(response){
//	    sp.schedule.fromRecent = true ;
//	    sp.schedule.shift = response.data;
//	    sp.loadSubPage('', 'schedule', 'shiftDisplay');
//	});
//
//    })
//    $('#da_se_us_li').delegate('.fr',clickEvent,function(e){
//	e.preventDefault()
//	switch($('#menu .mainNav .active').attr('id')){
//	    case 'menu_staff':
//		sp.schedule.fromStaff =true;
//		break;
//	    case 'menu_dashboard':
//		sp.schedule.fromStaff =false;
//	}
//	spModel.schedule.get('shift', {
//	    id : $(this).attr('shiftId'), 
//	    detailed : 1
//	}, function(response){
//	    sp.schedule.fromUpcoming = true ;
//	    sp.schedule.shift = response.data;
//	    sp.loadSubPage('', 'schedule', 'shiftDisplay');
//	});
//
//    })
}

ShiftPlanningDashboard.prototype.whosonnowEvents = function() {
	var self = this;

	$('#da_wo .timeSheet').delegate('a.fr', clickEvent, function(e) {
		e.preventDefault();
		self.pingID = $(this).attr('userID')
		var employee = sp.staff.data.employees[self.pingID];
		if (employee.cell_phone.length == 0 && employee.email == null || employee.email.length == 0) {
			sp.showError("This user haven't set cell phone or email");
		} else {
			sp.loadSubPage('', 'dashboard', 'pingUser');
		}

	})
	$('#pingUser .backMenu').bind(clickEvent, function(e) {
		e.preventDefault();
		$('#da_who_tmpl div').unbind(clickEvent);
		$('#da_who_send').unbind(clickEvent);
		$('.subNavigation .dashboard li.active a').trigger('click');
	})
}

//sub page events
ShiftPlanningDashboard.prototype.wallSubEvents = function() {
	if (parseInt(sp.staff.admin.settings.message_wall_on) != 0) {
		$('#da_wa_li').html(spView.ulLoader());
		spModel.messaging.get('wall', {}, function(response) {
			if (response.data.length > 0) {
				$('#da_wa_li').html($.tmpl($('#te_da_wa_me'), response.data));
			} else {
				$('#da_wa_li').html(spView.emptyResult(_s('No wall messages'), 'li'));
			}
		}, function() {
			$('#da_wa_li').html(spView.emptyResult(_s('Something went wrong'), 'li'));
		});

	}
}

ShiftPlanningDashboard.prototype.filesSubEvents = function() {
	$('#da_fi_list').html(spView.ulLoader());
	spModel.admin.get('files', {}, function(response) {
		$.each(response.data, function() {
			var str = this.secureurl;
			switch (this.extension) {
				case 'jpg':
				case 'jpeg':
				case 'png':
				case 'bmp':
					this.extraclass = 'image';
					break;
				case 'txt':
				case 'doc':
					this.extraclass = 'txt';
					break;
				case 'xls':
				case 'csv':
					this.extraclass = 'doc'
					break;
				case 'pdf':
					this.extraclass = 'pdf';
					break;
				default:
					this.extraclass = 'other'
					break;
			}
//			this.secureurl=str.substring((str.indexOf("fid=")+4), str.length);
			this.file_size = spView.friendly_filesize(this.file_size);
		});
		if (response.data.length == 0) {
			$('#da_fi_list').html(spView.emptyResult('Currently no files for download', 'li'));
		} else {
			$('#da_fi_list').html($.tmpl($('#te_da_fi_list'), response));
		}
		$('#da_fi_list li:even').addClass('regular');
	});
}

ShiftPlanningDashboard.prototype.upcomingShiftsSubEvents = function() {
	$('#da_up_li').html(spView.ulLoader());
	var send = {
		start_date: 'today',
		end_date: 'today +2 months',
		mode: 'employee'
	};
	send.employees = sp.staff.admin.info.id;
	spModel.schedule.get('shifts', send, function(response) {
		var data = [];
		if (typeof response.data != 'undefined' && response.data.length > 0) {
			data = response.data;
		}
		if (data.length > 0) {
			$('#da_up_li').html($.tmpl($('#te_da_widget_shift'), data));
		} else {
			$('#da_up_li').html(spView.emptyResult('No upcoming shifts', 'li'));
		}

		$('#da_up .shifts .icon b').html(data.length);
	});
}

ShiftPlanningDashboard.prototype.inboxSubEvents = function() {
	$('#da_in_me').html(spView.ulLoader());
	spModel.messaging.get('messages', {
		mode: 'to'
	}, function(response) {
		if (response.data.length > 0) {
			$('#da_in_me').html($.tmpl($('#te_da_wa_in'), response.data));
		} else {
			$('#da_in_me').html(spView.emptyResult(_s('No messages in your inbox'), 'li'));
		}
	}, function(response) {
		$('#da_in_me').html(spView.emptyResult(_s('Something went wrong'), 'li'));
	});

    $('#da_in_nm_to').html(spView.staffMessagesOption());

}

//ShiftPlanningDashboard.prototype.settingsSubEvents = function(employee){
//    var self = this;
//
//    if (typeof employee == 'undefined'){
//	employee = sp.staff.admin.info;
//    }
//    
//    if (employee.id == sp.staff.admin.info.id){
//	$('#dashboard .search').show();
//	if (!sp.permissions.hasPermission('edit_profile')){
//	    $('#dashboard .filters a[subpage=edit]').hide();
//	} else {
//	    $('#dashboard .filters a[subpage=edit]').show();
//	}
//    } else {
//	if (sp.staff.admin.info.group > 4){
//	    $('#dashboard .search').hide();
//	} else {
//	    $('#dashboard .filters a[subpage=edit]').show();
//	    $('#dashboard .search').show();
//	}
//    }
//    
//    if (employee.group <= 2){
//	$('#da_se_ov_aa .button').hide();
//    } else {
//	$('#da_se_ov_aa .button').show();
//    }
//    
//    
//    
//    if (sp.staff.admin.info.group > 3){
//	$('#da_se_ov_wa').parent().hide();
//    } else {
//	$('#da_se_ov_wa').parent().show();
//    }
//
//    
//    
//    //prefill
//    self.prefillOverview(employee);
//    self.prepareEditDetails(employee);
//    self.preparePasswordField(employee);
//    
//    $('#dashboard .search.settings.mainSub li a:first').trigger(clickEvent);
//    
//    sp.fixCheckboxes();
//}

ShiftPlanningDashboard.prototype.whosonnowSubEvents = function() {
	$('#wrapper > .subNavigation').show();
	this.getWhosOn();
}
ShiftPlanningDashboard.prototype.dashboardSubEvents = function() {
	$('.applicationContainer').fadeIn(500);
	//$('.bigLoader').show();
	//$('#da_widgets .user .icon').html('<img src="' + sp.getAvatar() + '" height="50" width="50" />');
	//$('#da_widgets .timeClock.out, #da_widgets .timeClock.in').hide();
	$('#da_widgets .widgets').html(spView.ulLoader());
	$('#da_widgets ul.shifts.listing').hide();

	var releaseShiftsEnabled = (sp.staff.admin.business.pref_trade_shifts * 1) ? true : false;
	var tradeShiftsEnabled = (sp.staff.admin.business.pref_swap_shifts * 1) ? true : false;

	var calls = [
		['timeclock.status', 'GET', {details: 1}],
		['schedule.shifts', 'GET', {
				'mode': 'open'
			}],
		['schedule.trades', 'GET', {}],
		['schedule.shifts', 'GET', {
				start_date: 'today',
				end_date: 'today +2 months',
				mode: 'employee'
			}],
		['schedule.trades', 'get', {'mode': 'swap'}]
	]
    sp.multiApi(calls, function(response) {
		$('#da_widgets .widgets').html('');
		$('#da_widgets .widgets').append($.tmpl($('#te_da_widget_profile'), {avatar: sp.getAvatar(), name: user.name, company: user.company}));
		if( sp.staff.admin.info.group * 1 != 7 ){
            if (parseInt(sp.staff.admin.settings.timeclock) != 0
            		&& sp.staff.admin.business.pref_tc_terminal_lock * 1 == 0 ) {
                // CHECKING IF WE NEED TO START GPS TRACKING BACKGROUND SERVICE
                gUtils.shouldStartService(response[0].data);
				if (response[0].data != 'out') {
					if ( typeof response[0].data.current_length != "undefined" ) {
						var hs = response[0].data.current_length.hours;
						if(hs < 0){
							hs = 0;
						}
						var mns = response[0].data.current_length.mins;
						if(mns < 0){
							mns = 0;
						}
					}
					$('#da_widgets .widgets').append($.tmpl($('#te_da_widget_timeclock_in'), {time: hs + _s('h') + ' ' + mns + _s('mins')}));
				} else {
					$('#da_widgets .widgets').append($.tmpl($('#te_da_widget_timeclock_out')));
				}
            }
            if( releaseShiftsEnabled || tradeShiftsEnabled ){
                $('#da_widgets .widgets').append($.tmpl($('#te_da_widget_tradePage'), {count: (sp.countResponse(response[1].data) + sp.countResponse(response[2].data) + sp.countResponse(response[4].data))}));
            }
            var br = 0;
            $.each(response[3].data, function(i, item) {
                if (item.start_date.id == sp.raw.config.today.id) {
                    br++;
                }
                if (item.start_date.id > sp.raw.config.today) {
                    return false;
                }
            });
            $('#da_widgets .widgets').append($.tmpl($('#te_da_widget_schedule'), {month: sp.raw.config.today.mname.toUpperCase(), day: sp.raw.config.today.day, count: br}));

            if (response[3].data.length > 0) {
                $('#da_widgets ul.shifts.listing').show();
                $('#da_widgets ul.shifts.listing').html($.tmpl($('#te_da_widget_shift'), response[3].data));
            } else {
                $('#da_widgets ul.shifts.listing').hide();
            }
        }

		//$('.bigLoader').hide();
		//$('.applicationContainer').fadeIn(500);
	});
}

ShiftPlanningDashboard.prototype.preparePasswordField = function() {
	$('#da_se_pa_np').val('');
	$('#da_se_pa_cp').val('');
}

ShiftPlanningDashboard.prototype.getWhosOn = function() {
	var data = [];
	$('#da_wo_li').html(spView.ulLoader());
	spModel.schedule.get('shifts', {
		mode: 'onnow'
	}, function(response) {
		var count = 0;
		$.each(response.data, function(key, value) {
			if (typeof value.employees != 'undefined' && value.employees != null) {
				$.each(value.employees, function(i, item) {
					var d = {
						userID: item.id,
						avatar: sp.getAvatar(item.id),
						name: item.name,
						position: value.schedule_name,
						start_time: value.start_time.time,
						end_time: value.end_time.time
					}
					count++;
					data.push(d)
				})

			}
		})
		if (count == 0) {
			$('#da_wo_li').html(spView.emptyResult('No one is scheduled to work right now.', 'li'))
		} else {
			$('#da_wo_li').html($.tmpl($('#te_da_onnow'), data));
		}
	})
}
//
ShiftPlanningDashboard.prototype.pingUser = function(data) {
	var self = this;
	var employee = sp.staff.data.employees[self.pingID];
	employee.company = user.company;
	employee.company_phone = user.phone;
	$('#wrapper > .subNavigation').hide();
	$('#da_who_ping').html($.tmpl($('#te_da_ping'), employee));

	//binding ping actions
	$('#da_who_tmpl div.title1').bind(clickEvent, function() {
		$('#da_who_txt').val($(this).find('span').html())
	})
	$('#da_who_send').bind(clickEvent, function(e) {
		e.preventDefault();
		self.sendPingMessage()
	})
}

ShiftPlanningDashboard.prototype.sendPingMessage = function() {
	var txt = $('#da_who_txt').val();
	spModel.staff.create('ping', {
		to: this.pingID,
		message: txt
	}, function(response) {
		sp.showSuccess('Ping sent to user');
		setTimeout(function() {
			$('#pingUser .backMenu').trigger('click')
		}, 3000)
	})
}

ShiftPlanningDashboard.prototype.sendMessage = function() {
	var self = this;
	var data = {
		subject: $('#da_in_nm_ti').val(),
		message: $('#da_in_nm_me').val(),
		to: $('#da_in_nm_to').val()
	}

	spModel.messaging.create('message', data, function(response) {
		$('#da_in_nm_b').trigger(clickEvent);
		self.inboxSubEvents();
	});
}

//ShiftPlanningDashboard.prototype.changePassword = function (){
//    var self = this;
//    var eId = $('#da_se_cur_us_id').val();
//    if ($('#da_se_pa_np').val().length >= 6 && $('#da_se_pa_np').val() == $('#da_se_pa_cp').val()){
//	spModel.staff.update('employee', {
//	    id : eId, 
//	    password: $('#da_se_pa_np').val()
//	}, function(response){
//	    self.updateUser(eId, response);
//	});
//    } else {
//	//add other error type
//	sp.showError(_s('Password length must 6 or more chars and passwords must match.'));
//    }
//}

//ShiftPlanningDashboard.prototype.saveEditForm = function(obj){
//    //missing wage
//    //missing location, mininum weekly hours, maximum weekly hours, auto approve shift requests
//    // mising calendar size
//    //privacy settings
//    var eId = $('#da_se_cur_us_id').val();
//    var self = this;
//    var data = {};
//    var employee = spModel.staff.getEmployeeById($('#da_se_cur_us_id').val());
//   
//    data.id = eId;
//    data.name = $('#da_se_ed_na').val();
//    data.email = $('#da_se_ed_em').val();
//    
//    if ($('#da_se_ed_nn').val().length > 0){
//	data.nick_name = $('#da_se_ed_nn').val();
//    }
//    
//    if ($('#da_se_ed_us').val().length > 3){
//	data.username = $('#da_se_ed_us').val();
//    }
//    
//    if ($('#da_se_ed_ad').val().length > 0){
//	data.address = $('#da_se_ed_ad').val();
//    }
//    
//    if ($('#da_se_ed_ci').val().length > 0){
//	data.city = $('#da_se_ed_ci').val();
//    }
//
//    if ($('#da_se_ed_sp').val().length > 0){
//	data.state = $('#da_se_ed_sp').val();
//    }
//    if ($('#da_se_ed_pz').val().length > 0){
//	data.zip = $('#da_se_ed_pz').val();
//    }
//    
//    data.language= ($('#da_se_ed_lang').val() == 'none') ? '' : $('#da_se_ed_lang').val();//adding lanuage to staff details
//    
//    data.birth_day = $('#da_se_ed_bday_d').val();
//    data.birth_month = $('#da_se_ed_bday_m').val();
//    
//    if ($('#da_se_ed_mph_0').val().length > 0 && $('#da_se_ed_mph_1').val().length > 0 && $('#da_se_ed_mph_2').val().length > 0){
//	data.cell_phone = $('#da_se_ed_mph_0').val() + '-' + $('#da_se_ed_mph_1').val() + '-' + $('#da_se_ed_mph_2').val();
//    }
//    
//    if ($('#da_se_ed_hph_0').val().length > 0 && $('#da_se_ed_hph_1').val().length > 0 && $('#da_se_ed_hph_2').val().length > 0){
//	data.home_phone = $('#da_se_ed_hph_0').val() + '-' + $('#da_se_ed_hph_1').val() + '-' + $('#da_se_ed_hph_2').val();
//    }
//    
//    var customFields = {};   
//    var value="";
//    $('#da_se_ed_cu li [item="edit"]').each(function(i,field) {
//        
//        value = $(field).val();
//        
//        if (value.lenght == 0){
//            value = "";
//        }
//        
//        if ($(field).hasClass('checkbox check')){    
//            value = 1;
//            }
//        
//        else if ($(field).hasClass('checkbox')){
//            value = 0;
//            }
// 
//        customFields[$(field).attr('id')] = value;
//    });
//
//    customFields = JSON.stringify(customFields);
//    data.custom = customFields;
//    
//    spModel.staff.update('employee', data, function(response){
//	if (employee.id == sp.staff.admin.info.id && employee.language != response.data.language){
//	    setCookie('shiftplanning_mobile_lang', response.data.language, cookieExpire);
//	    window.location.reload();
//	}
//	obj.removeClass('loading');
//	self.updateUser(eId, response);
//    }, function(){
//	obj.removeClass('loading');
//    });
//}

//ShiftPlanningDashboard.prototype.adminActions = function(obj){
//    var eId = $('#da_se_cur_us_id').val();
//    var type = $(obj).attr('type');
//    var method = 'update';
//    var data = {
//	id : eId
//    }
//    if (type == 'deactivate'){
//	data.status = -1
//    } else if (type == 'delete'){
//	method = 'delete'
//    } else if (type == 'activate'){
//	data.send_activation = 1;
//    } else {
//	data.status = 1;
//    }
//    sp.api('staff.employee',method,data,function(response){
//	sp.staff.getStaff(function(){
//	    if (type == 'deactivate'){
//		sp.showSuccess(_s('User deactivated!'));
//		$('.subNavigation .staff .subWrapp a[subpage=list]').trigger(clickEvent);
//	    } else if (type == 'delete'){
//		sp.showSuccess(_s('User deleted!'));
//		$('.subNavigation .staff .subWrapp a[subpage=list]').trigger(clickEvent);
//	    } else if (type == 'activate'){
//		sp.showSuccess(_s('Activation successfully sent.'));
//		$(obj).hide();
//	    } else {
//		sp.showSuccess(_s('Employee activated successfully.'));
//		$('#da_se_ov_aa a[type=activate]').hide();
//		$(obj).hide();
//		$('#da_se_ov_st').html(_s('User Account is Enabled.'));
//	    }
//	});
//    }, function(response){
//	sp.showError(response.error);
//    });
//}

//ShiftPlanningDashboard.prototype.updateUser = function(id, res, over){
//    if (typeof over == 'undefined'){
//	over = true;
//    }
//    
//    if (id == sp.staff.admin.info.id){
//	sp.staff.admin.info = res.data;
//    }
//    sp.staff.data.employees['' + id] = res.data;
//    
//    if (over){
//	this.settingsSubEvents(sp.staff.data.employees['' + id]);
//    }
//    
//    
//    
//    sp.showSuccess(_s('Selected user updated.'));
//}

//Render select box
//ShiftPlanningDashboard.prototype.listLanguages = function (){
//    var result='<option  value="none">' + _s('Company default') + '</option>'
//    $.each(sp.raw.config.languages,function(key,value){
//	result+='<option value="'+value['code']+'">'+value['name']+' ' + ((value.machine == 1) ? '(machine)' : '') + '</option>'
//    });
//    $('#da_se_ed_lang').html(result);
//}

//ShiftPlanningDashboard.prototype.updateNotes = function(text){
//    if (sp.hasPermission(4) || parseInt($('#da_se_cur_us_id').val()) == sp.staff.admin.info.id){
//	var self = this;
//	var eId = $('#da_se_cur_us_id').val();
//	spModel.staff.update('employee', {
//	    id : eId, 
//	    notes : text
//	}, function(response){
//	    self.updateUser(eId, response);
//	});
//    }
//}
ShiftPlanningDashboard.prototype.fixes = function() {
	$('#dashboard .mainSub ul li a[subpage]').shorten();
	$('.mainNav a[page]').shorten();
}
//get all staff and add it to main variables
ShiftPlanningStaff.prototype.getStaff = function(callback) {
	sp.api('staff.employees', 'get', {}, function(response) {
		sp.staff.raw.employees = response.data;
		sp.staff.data.employees = sp.map(response.data);
		if (typeof callback != 'undefined') {
			callback();
		}
	}, function(response) {
		sp.showError(response.error);
	});
}

ShiftPlanningDashboard.prototype.loadPage = function() {
}



