ShiftPlanningDashboard.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
	self.wallEvents();
	self.inboxEvents();
	self.settingsEvents();
	self.upcomingShiftsEvents();
    });
}

ShiftPlanningDashboard.prototype.loadSubPageEvents = function(subpage){
    switch(subpage){
	case 'wall':
	    this.wallSubEvents();
	    break;
	case 'upcomingShifts':
	    this.upcomingShiftsSubEvents();
	    break;
	case 'inbox':
	    this.inboxSubEvents();
	    break;
	case 'settings':
	    this.settingsSubEvents();
	    break;
	case 'logout':
	    sp.staff.logout();
	    break;
    }
}

ShiftPlanningDashboard.prototype.wallEvents = function(){
    var self = this;
    $('#da_wa_nm_b').bind(clickEvent, function(e){
	e.preventDefault();
	$('#da_wa_nm_f').toggleClass('hidden');
	$('#da_wa_nm_ti').val('');
	$('#da_wa_nm_me').val('');
    });
    
    $('#da_wa_nm_st').bind(clickEvent, function(e){
	e.preventDefault();
	$(this).toggleClass('check');
    });
    
    $('#da_wa_nm_ca').bind(clickEvent, function(e){
	e.preventDefault();
	$('#da_wa_nm_b').trigger(clickEvent);
    });
    
    $('#da_wa_nm_sa').bind(clickEvent, function(e){
	e.preventDefault();
	var obj = $(this);
	obj.addClass('loading');
	var data = {};
	if (sp.isL($('#da_wa_nm_ti').val())){
	    data.title = $.trim($('#da_wa_nm_ti').val());
	} else {
	    data.title = '';
	}
	
	if (!sp.isL($('#da_wa_nm_me').val())){
	    sp.showError(_s('Message must be entered'));
	    return false;
	}
	data.post = $.trim($('#da_wa_nm_me').val());
	spModel.messaging.create('wall', data, function(response){
	    obj.removeClass('loading');
	    $('#da_wa_nm_f').toggleClass('hidden');
	    $('#da_wa_nm_ti').val('');
	    $('#da_wa_nm_me').val('');
	    self.wallSubEvents();
	}, function(){
	    obj.removeClass('loading');
	});
    })
    
    $('#da_wa_li').delegate('.msgRpl, .cmtCount', clickEvent, function(e){
	e.preventDefault();
	var id = $(this).attr('rel');
	if (!$('#da_wa_msg_' + id).find('.cmts').is(':visible')){
	    $('#da_wa_msg_' + id).find('.cmtCount').hide();
	    $('#da_wa_msg_' + id).find('.cmts').show();
	    if ($(this).hasClass('msgRpl')){
		$('#da_wa_msg_' + id).find('input[type=text]').focus();
	    }
	} else {
	    if ($(this).hasClass('msgRpl')){
		$('#da_wa_msg_' + id).find('input[type=text]').val($('#da_wa_msg_' + id).find('input[type=text]').attr('origin'));
	    }
	    $('#da_wa_msg_' + id).find('.cmtCount').show();
	    $('#da_wa_msg_' + id).find('.cmts').hide();
	}
    });
    
    $('#da_wa_li').delegate('.msgDel', clickEvent, function(e){
	e.preventDefault();
	var obj = $(this);
	var c = confirm(_s('Do you want to delete this message?'));
	if (c){
	    var id = $(this).attr('rel');
	    var del = 'message';
	    if ($(this).hasClass('comment')){
		del = 'comment';
	    }
	    spModel.messaging.del('wall', {
		id : id, 
		'delete' : del
	    }, function(response){
		obj.parent().fadeOut('fast', function(){
		    $(this).remove();
		});
	    });
	}
    });

    $('#da_wa_li').delegate('input[type=text]', 'focus', function(){
	$(this).attr('origin',$(this).val());
	$(this).val('');
    });
    
    $('#da_wa_li').delegate('input[type=submit]', clickEvent, function(){
	var obj = $(this);
	var id = $(this).attr('rel');
	var post = $.trim($('#da_wa_msg_' + id + ' input[type=text]').val());
	if (post.length == 0 || post == 'Write a comment...'){
	    alert(_s('Please write your message'));
	    return false;
	}
	spModel.messaging.create('wall', {
	    post: post, 
	    id: id
	}, function(response) {
	    var d = {
		avatar : sp.staff.admin.info.dfAvatar,
		id : id,
		userName : sp.staff.admin.info.name,
		comment: post,
		time : 'Now',
		full : false
	    }
	    obj.parent().before($.tmpl($('#te_da_wa_me_co'), d));
	    $('#da_wa_msg_' + id + ' input[type=text]').val('Write a comment...');
	});
        
	return true;
    });
}

ShiftPlanningDashboard.prototype.upcomingShiftsEvents = function(){
    $('#da_up_li').delegate('li a', clickEvent, function(e){
	e.preventDefault();
	$(this).addClass('loading');
	spModel.schedule.get('shift', {
	    id : $(this).attr('rel'), 
	    detailed : 1
	}, function(response){
	    sp.schedule.fromDashboard = true;
	    sp.schedule.shift = response.data;
	    sp.loadSubPage('', 'schedule', 'shiftDisplay');
	});
    });
}

ShiftPlanningDashboard.prototype.inboxEvents = function(){
    var self = this;
    $('#da_in_me').delegate('.msgHead', clickEvent, function(e){
	e.preventDefault();
	var id = $(this).attr('messageId');
	var obj = $(this);
	if (obj.hasClass('extended')){
	    obj.parent().toggleClass('extended');
	} else {
	    $(obj).addClass('loading');
	    spModel.messaging.update('message', {
		id : id, 
		read : 1
	    }, function(response){
		obj.parent().toggleClass('extended');
		obj.parent().removeClass('unread');
		$(obj).removeClass('loading');
	    });
	}
    });
    
    $('#da_in_nm_b, #da_in_nm_ca').bind(clickEvent, function(e){
	e.preventDefault();
	$('#da_in_nm_f').toggleClass('hidden');
	$('#da_in_nm_ti').val('');
	$('#da_in_nm_me').val('');
	$('#da_in_nm_to').val(0);
    });
    
    $('#da_in_nm_sa').bind(clickEvent, function(e){
	self.sendMessage();
    });
    
    $('#da_in_me').delegate('a.butRpl', clickEvent, function(e){
	e.preventDefault();
	var id = $(this).attr('rel');
	$('#da_in_msg_' + id).find('.newMsg').show(function(){
	    var obj = $(this);
	    obj.find('input[type=text]').val('re: ' + $('#da_in_msg_' + id).find('.msgHead h5').html());
	});
    });
    
    $('#da_in_me').delegate('a.butDel', clickEvent, function(e){
	e.preventDefault();
	var c = confirm(_s('Are you sure you want to delete this messaage?'));
	if (!c){
	    return false;
	}
	var id = $(this).attr('rel');
	spModel.messaging.del('message', {
	    id : id
	}, function(response){
	    $('#da_in_msg_' + id).fadeOut('fast', function(){
		$(this).remove();
	    });
	});
        
    });
    
    $('#da_in_me').delegate('.msgBody .newMsg .title .fr', clickEvent, function(e){
	e.preventDefault();
	var obj = $(this).parents('.newMsg');
	var curr = $(this).find('a');
	curr.addClass('loading');
	var data = {
	    subject : obj.find('input[type=text]').val(),
	    message : obj.find('textarea').val(),
	    to : obj.find('input[type=hidden]').val()
	};
        
	spModel.messaging.create('message', data, function(resonse){
	    self.inboxSubEvents();
	}, function(){
	    curr.removeClass('loading');
	});
    });
    
    $('#da_in_me').delegate('.msgBody .newMsg .title .fl', clickEvent, function(e){
	e.preventDefault();
	var obj = $(this).parents('.newMsg');
	obj.find('input[type=text]').val('');
	obj.find('textarea').val('');
	obj.hide('fast');
    });
}

ShiftPlanningDashboard.prototype.settingsEvents = function(){
    var self = this;
    $('#dashboard .search.settings.mainSub li a').bind(clickEvent, function(e){
	e.preventDefault();
	$('#da_se > div').hide();
	$('#dashboard .search.settings.mainSub li').removeClass('active');
	switch ($(this).attr('subpage')){
	    case 'overview':
		self.prefillOverview(sp.staff.data.employees[$('#da_se_cur_us_id').val()]);
		break;
	    case 'edit':
		self.prepareEditDetails(sp.staff.data.employees[$('#da_se_cur_us_id').val()]);
		break;
	}
	$('#da_se_' + $(this).attr('subpage')).show();
	$(this).parent().addClass('active');
	sp.fixCheckboxes();
    });
    
    $('#da_se').delegate('.checkbox', clickEvent, function(){
	var sid = $(this).attr('itemId');
	var skills = ($(this).parents('.skills').length > 0) ? true : false;
	var checked = ($(this).hasClass('check')) ? true : false;
	var obj = this;
	$(obj).parent().addClass('loading');
	var data = {
	    id : $('#da_se_cur_us_id').val()
	}
	if (skills){
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
	spModel.staff.update('employee', data, function(response){
	    if (checked) {
		$(obj).removeClass('check');
	    } else {
		$(obj).addClass('check');
	    }
	    $(obj).parent().removeClass('loading');
	    self.updateUser($('#da_se_cur_us_id').val(), response, false);
	});
    });
    
    $('#da_se_ed_ue').bind(clickEvent, function(e){
	$(this).addClass('loading');
	e.preventDefault();
	self.saveEditForm($(this));
    });
    
    $('textarea#da_se_ov_no, textarea#da_se_ed_no').bind('blur', function(){
	self.updateNotes($(this).val());
    });
    
    $('#da_se_pa_up').bind(clickEvent, function(e){
	e.preventDefault();
	self.changePassword();
    });
    
    $('#da_se_ov_aa a').bind(clickEvent, function(e){
	e.preventDefault();
	var c = confirm(_s('Are you sure?'));
	if (c){
	    self.adminActions(this);
	}
    })
}


//sub page events
ShiftPlanningDashboard.prototype.wallSubEvents = function(){
    if (parseInt(sp.staff.admin.settings.message_wall_on) != 0){
	$('#da_wa_li').html(spView.ulLoader());
	spModel.messaging.get('wall', {}, function(response){
	    if (response.data.length > 0){
		$('#da_wa_li').html($.tmpl($('#te_da_wa_me'), response.data));
	    } else {
		$('#da_wa_li').html(spView.emptyResult(_s('No wall messages'), 'li'));
	    }
	}, function(){
	    $('#da_wa_li').html(spView.emptyResult(_s('Something went wrong'), 'li'));
	});
    }
}


ShiftPlanningDashboard.prototype.upcomingShiftsSubEvents = function(){
    $('#da_up_li').html(spView.ulLoader());
    $('#da_up_li').show();
    $('#da_up_li').next().hide();
    var send = {
	start_date: 'today', 
	end_date: 'today +2 months', 
	mode: 'employee'
    };
    send.employees = sp.staff.admin.info.id;
    spModel.schedule.get('shifts', send, function(response){
	var data = [];
	if(typeof response.data != 'undefined' && response.data.length > 0){
	    data = response.data;
	}
	if (data.length > 0){
	    $('#da_up_li').html($.tmpl($('#te_da_up_li'), data));
	    $('#da_up_li').next().hide();
	} else {
	    $('#da_up_li').hide()
	    $('#da_up_li').next().show();
	}
    });
}

ShiftPlanningDashboard.prototype.inboxSubEvents = function(){
    $('#da_in_me').html(spView.ulLoader());
    spModel.messaging.get('messages', {
	mode : 'to'
    }, function(response){
	if (response.data.length > 0){
	    $('#da_in_me').html($.tmpl($('#te_da_wa_in'), response.data));
	} else {
	    $('#da_in_me').html(spView.emptyResult(_s('No messages in your inbox'), 'li'));
	}
    }, function(response){
	$('#da_in_me').html(spView.emptyResult(_s('Something went wrong'), 'li'));
    });
    
    $('#da_in_nm_to').html(spView.staffOption());
}

ShiftPlanningDashboard.prototype.settingsSubEvents = function(employee){
    var self = this;
    
    if (typeof employee == 'undefined'){
	employee = sp.staff.admin.info;
    }
    
    if (employee.id == sp.staff.admin.info.id){
	$('#dashboard .search').show();
	if (!sp.permissions.hasPermission('edit_profile')){
	    $('#dashboard .filters a[subpage=edit]').hide();
	} else {
	    $('#dashboard .filters a[subpage=edit]').show();
	}
    } else {
	if (sp.staff.admin.info.group > 4){
	    $('#dashboard .search').hide();
	} else {
	    $('#dashboard .filters a[subpage=edit]').show();
	    $('#dashboard .search').show();
	}
    }
    
    if (employee.group == 2){
	$('#da_se_ov_aa .button').hide();
    } else {
	$('#da_se_ov_aa .button').show();
    }


    
    

    //prefill
    self.prefillOverview(employee);
    self.prepareEditDetails(employee);
    self.preparePasswordField(employee);
    
    $('#dashboard .search.settings.mainSub li a:first').trigger(clickEvent);
    
    sp.fixCheckboxes();
}

//functions
ShiftPlanningDashboard.prototype.prefillOverview = function(employee){
    var p = {};
    
    $.each(employee, function(i, item){
	if (item == null || item.length == 0){
	    item = '&nbsp;';
	}
	p[i] = item;
    })
    
    employee = p;
    //this page needs to be cached after first load and to be reprepared if data are changed - DONE
    $('#da_se_cur_us_id').val(employee.id);
    
    $('#da_se_ov_fn').html(employee.name);
    $('#da_se_ov_id').html(employee.eid);
    $('#da_se_ov_un').html(employee.username);
    $('#da_se_ov_mo').html(employee.cell_phone);
    $('#da_se_ov_ho').html(employee.home_phone);
    $('#da_se_ov_em').html(employee.email);
    if ($.trim(employee.wage).length != 0){
	$('#da_se_ov_wa').html(spView.fixCurrency(sp.staff.admin.settings.currency, true) + employee.wage);
    }
    
    var status_name = _s('Administrative accounts cannot be de-activated.');
    var status = _s('User has actived his/her account.');
    
    if (parseInt(employee.status) == 1 && parseInt(employee.group) > 2){
	status_name = _s('User Account is Enabled.');
    } else if (parseInt(employee.status) == 0 && parseInt(employee.group) > 2){
	status_name = _s('User Account is Enabled.');
	status = _s('User account is not activated.');
    }
    
    if (sp.staff.admin.info.group > 3){
	$('#da_se_ov_aa').hide();
	$('#da_se_ov_aa').prev().hide();
    } else {
	$('#da_se_ov_aa').prev().show();
	$('#da_se_ov_aa').show();
    }
    if (employee.status == 0){
	$('#da_se_ov_aa a[type=activate]').show();
	$('#da_se_ov_aa a[type=manualyActivate]').show();
    } else {
	$('#da_se_ov_aa a[type=activate]').hide();
	$('#da_se_ov_aa a[type=manualyActivate]').hide();
    }
    
    $('#da_se_ov_st').html(status);
    $('#da_se_ov_ac').html(status_name);
    
    //transfer month number into month name
    if (employee.birth_month != 0 && employee.birth_day != 0) {
	$('#da_se_ov_bd').html(months[employee.birth_month-1] + ' ' + employee.birth_day);
    } else {
	$('#da_se_ov_bd').html('&nbsp;');
    }
        
    


    $('#da_se_ov_po').html(spView.editableSchedules(employee));

    $('#da_se_ov_sk').html(spView.editableSkills(employee));
    $('#da_se_ov_no').html((employee.notes.length > 0) ? employee.notes : '');
    $('#da_se_ov_pos').html('');
    if (typeof employee.schedules != 'undefined'){
	var pos = '';
	$.each(employee.schedules, function(i, item){
	    pos += item + ', ';
	});
	$('#da_se_ov_pos').html(pos.substr(0,pos.length - 2));
    }
//approvers missing
}

ShiftPlanningDashboard.prototype.prepareEditDetails = function(employee){
    var p = {};
    $.each(employee, function(i, item){
	if (item == null || item.length == 0){
	    item = '';
	}
	p[i] = item;
    });
    
    employee = p;
    
    //this page needs to be cached after first load and to be reprepared if data are changed
    $('#da_se_ed_na').val(employee.name);
    $('#da_se_ed_em').val(employee.email);
    $('#da_se_ed_nn').val(employee.nick_name);
    $('#da_se_ed_us').val(employee.username);
    //mobile phone
    var mphone = (employee.cell_phone == null) ? '---'.split('-') : employee.cell_phone.split('-');
    $('#da_se_ed_mph_0').val(mphone[0]);
    $('#da_se_ed_mph_1').val(mphone[1]);
    $('#da_se_ed_mph_2').val(mphone[2]);
    //home phone
    var hphone = (employee.home_phone == null) ? '---'.split('-') : employee.home_phone.split('-');
    $('#da_se_ed_hph_0').val(hphone[0]);
    $('#da_se_ed_hph_1').val(hphone[1]);
    $('#da_se_ed_hph_2').val(hphone[2]);
    
    $('#da_se_ed_ad').val(employee.address);
    $('#da_se_ed_ci').val(employee.city);
    $('#da_se_ed_sp').val(employee.state);
    $('#da_se_ed_pz').val(employee.zip);
    
    $('#da_se_ed_bday_m').val(employee.birth_month);
    $('#da_se_ed_bday_d').val(employee.birth_day);
    $('#da_se_ed_no').val(employee.notes);
    
    
    $('#da_se_ed_po').html(spView.editableSchedules(employee));
    $('#da_se_ed_sk').html(spView.editableSkills(employee));
    $('#da_se_ed_no').html((employee.notes != null && employee.notes.length > 0) ? employee.notes : '');
    
}

ShiftPlanningDashboard.prototype.preparePasswordField = function(){
    $('#da_se_pa_np').val('');
    $('#da_se_pa_cp').val('');
}

ShiftPlanningDashboard.prototype.sendMessage = function(){
    var self = this;
    var data = {
	subject : $('#da_in_nm_ti').val(),
	message : $('#da_in_nm_me').val(),
	to  : $('#da_in_nm_to').val()
    }
    
    spModel.messaging.create('message', data, function(response){
	$('#da_in_nm_b').trigger(clickEvent);
	self.inboxSubEvents();
    });
}

ShiftPlanningDashboard.prototype.changePassword = function (){
    var self = this;
    var eId = $('#da_se_cur_us_id').val();
    if ($('#da_se_pa_np').val().length > 6 && $('#da_se_pa_np').val() == $('#da_se_pa_cp').val()){
	spModel.staff.update('employee', {
	    id : eId, 
	    password: $('#da_se_pa_np').val()
	}, function(response){
	    self.updateUser(eId, response);
	});
    } else {
	//add other error type
	sp.showError(_s('Password length must be over 6 chars and passwords must match.'));
    }
}

ShiftPlanningDashboard.prototype.saveEditForm = function(obj){
    //missing wage
    //missing location, mininum weekly hours, maximum weekly hours, auto approve shift requests
    // mising calendar size
    //privacy settings
    var eId = $('#da_se_cur_us_id').val();
    var self = this;
    var data = {};
   
    data.id = eId;
    data.name = $('#da_se_ed_na').val();
    data.email = $('#da_se_ed_em').val();
    
    if ($('#da_se_ed_nn').val().length > 0){
	data.nick_name = $('#da_se_ed_nn').val();
    }
    
    if ($('#da_se_ed_us').val().length > 3){
	data.username = $('#da_se_ed_us').val();
    }
    
    if ($('#da_se_ed_ad').val().length > 0){
	data.address = $('#da_se_ed_ad').val();
    }
    
    if ($('#da_se_ed_ci').val().length > 0){
	data.city = $('#da_se_ed_ci').val();
    }

    if ($('#da_se_ed_sp').val().length > 0){
	data.state = $('#da_se_ed_sp').val();
    }
    if ($('#da_se_ed_pz').val().length > 0){
	data.zip = $('#da_se_ed_pz').val();
    }
    
    data.languages=$('#da_se_ed_lang').val();//adding lanuage to staff details
    
    data.birth_day = $('#da_se_ed_bday_d').val();
    data.birth_month = $('#da_se_ed_bday_m').val();
    
    if ($('#da_se_ed_mph_0').val().length > 0 && $('#da_se_ed_mph_1').val().length > 0 && $('#da_se_ed_mph_2').val().length > 0){
	data.cell_phone = $('#da_se_ed_mph_0').val() + '-' + $('#da_se_ed_mph_1').val() + '-' + $('#da_se_ed_mph_2').val();
    }
    
    if ($('#da_se_ed_hph_0').val().length > 0 && $('#da_se_ed_hph_1').val().length > 0 && $('#da_se_ed_hph_2').val().length > 0){
	data.home_phone = $('#da_se_ed_hph_0').val() + '-' + $('#da_se_ed_hph_1').val() + '-' + $('#da_se_ed_hph_2').val();
    }
    
    
    spModel.staff.update('employee', data, function(response){
	obj.removeClass('loading');
	self.updateUser(eId, response);
    }, function(){
	obj.removeClass('loading');
    });
}

ShiftPlanningDashboard.prototype.adminActions = function(obj){
    var eId = $('#da_se_cur_us_id').val();
    var type = $(obj).attr('type');
    var method = 'update';
    var data = {
	id : eId
    }
    if (type == 'deactivate'){
	data.status = -1
    } else if (type == 'delete'){
	method = 'delete'
    } else if (type == 'activate'){
	data.send_activation = 1;
    } else {
	data.status = 1;
    }
    sp.api('staff.employee',method,data,function(response){
	sp.staff.getStaff(function(){
	    if (type == 'deactivate'){
		sp.showSuccess(_s('User deactivated!'));
		$('.subNavigation .staff .subWrapp a[subpage=list]').trigger(clickEvent);
	    } else if (type == 'delete'){
		sp.showSuccess(_s('User deleted!'));
		$('.subNavigation .staff .subWrapp a[subpage=list]').trigger(clickEvent);
	    } else if (type == 'activate'){
		sp.showSuccess(_s('Activation successfully sent.'));
		$(obj).hide();
	    } else {
		sp.showSuccess(_s('Employee activated successfully.'));
		$('#da_se_ov_aa a[type=activate]').hide();
		$(obj).hide();
		$('#da_se_ov_st').html(_s('User Account is Enabled.'));
	    }
	});
    }, function(response){
	sp.showError(response.error);
    });
}

ShiftPlanningDashboard.prototype.updateUser = function(id, res, over){
    if (typeof over == 'undefined'){
	over = true;
    }
    
    if (id == sp.staff.admin.info.id){
	sp.staff.admin.info = res.data;
    }
    sp.staff.data.employees['' + id] = res.data;
    
    if (over){
	this.settingsSubEvents(sp.staff.data.employees['' + id]);
    }
    
    
    
    sp.showSuccess(_s('Selected user updated.'));
}

ShiftPlanningDashboard.prototype.updateNotes = function(text){
    if (sp.hasPermission(4) || parseInt($('#da_se_cur_us_id').val()) == sp.staff.admin.info.id){
	var self = this;
	var eId = $('#da_se_cur_us_id').val();
	spModel.staff.update('employee', {
	    id : eId, 
	    notes : text
	}, function(response){
	    self.updateUser(eId, response);
	});
    }
}

//get all staff and add it to main variables
ShiftPlanningStaff.prototype.getStaff = function(callback){
    sp.api('staff.employees','get',{},function(response){
	sp.staff.raw.employees = response.data;
	sp.staff.data.employees = sp.map(response.data);
	if (typeof callback != 'undefined'){
	    callback();
	}
    }, function(response){
	sp.showError(response.error);
    });   
}

ShiftPlanningDashboard.prototype.loadPage = function(){
    
    }



