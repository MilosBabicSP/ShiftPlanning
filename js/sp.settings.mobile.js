ShiftPlanningSettings.prototype.initialize = function(){
	var self= this ;
	$(document).ready(function(){
		self.overviewEvents();
	})
}
ShiftPlanningSettings.prototype.loadSubPageEvents = function(subpage){
	    this[subpage + 'SubEvents']();
}
ShiftPlanningSettings.prototype.loadPage = function(){
    
}
ShiftPlanningSettings.prototype.overviewEvents = function(){
    var self = this;
    $('#settings .search.settings.mainSub li a').bind(clickEvent, function(e){
	e.preventDefault();
	$('#da_se > div').hide();
	$('#settings .search.settings.mainSub li').removeClass('active');
	switch ($(this).attr('subpage')){
	    case 'overview':
		self.prefillOverview(sp.staff.data.employees[$('#da_se_cur_us_id').val()]);
		break;
	    case 'edit':
		self.prepareEditDetails(sp.staff.data.employees[$('#da_se_cur_us_id').val()]);
		break;
	    case 'recentShifts':
		self.displayShifts(sp.staff.data.employees[$('#da_se_cur_us_id').val()],'recentShifts');
		break;
	    case 'upcomingShifts':
		self.displayShifts(sp.staff.data.employees[$('#da_se_cur_us_id').val()],'upcomingShifts');
		break;                
	}
	$('#da_se_' + $(this).attr('subpage')).show();
	$(this).parent().addClass('active');
	sp.fixCheckboxes();
    });
    
    $('#da_se_ed_cu').delegate('.checkbox', clickEvent, function(){
        var obj = this;
        var checked = ($(this).hasClass('check')) ? true : false;
           if (checked) {
		$(obj).removeClass('check');
	    } else {
		$(obj).addClass('check');
	    }
    });
    
    $('#da_se_ed_po, #da_se_ov_po, #da_se_ed_sk, #da_se_ov_sk').delegate('.checkbox', clickEvent, function(){
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
    $('#da_se_rs_li').delegate('.fr',clickEvent,function(e){
	e.preventDefault()
	switch($('#menu .mainNav .active').attr('id')){
	    case 'menu_staff':
		sp.schedule.fromStaff =true;
		break;
	    case 'menu_dashboard':
		sp.schedule.fromStaff =false;
	}
	spModel.schedule.get('shift', {
	    id : $(this).attr('shiftId'), 
	    detailed : 1
	}, function(response){
	    sp.schedule.fromRecent = true ;
	    sp.schedule.shift = response.data;
	    sp.loadSubPage('', 'schedule', 'shiftDisplay');
	});

    })
    $('#da_se_us_li').delegate('.fr',clickEvent,function(e){
	e.preventDefault()
	switch($('#menu .mainNav .active').attr('id')){
	    case 'menu_staff':
		sp.schedule.fromStaff =true;
		break;
	    case 'menu_dashboard':
		sp.schedule.fromStaff =false;
	}
	spModel.schedule.get('shift', {
	    id : $(this).attr('shiftId'), 
	    detailed : 1
	}, function(response){
	    sp.schedule.fromUpcoming = true ;
	    sp.schedule.shift = response.data;
	    sp.loadSubPage('', 'schedule', 'shiftDisplay');
	});

    })
}
ShiftPlanningSettings.prototype.overviewSubEvents = function(){
    var self = this;

    if (typeof employee == 'undefined'){
	employee = sp.staff.admin.info;
    }
    
    if (employee.id == sp.staff.admin.info.id){
	$('#settings .search').show();
	if (!sp.permissions.hasPermission('edit_profile')){
	    $('#settings .filters a[subpage=edit]').hide();
	} else {
	    $('#settings .filters a[subpage=edit]').show();
	}
    } else {
	if (sp.staff.admin.info.group > 4){
	    $('#settings .search').hide();
	} else {
	    $('#settings .filters a[subpage=edit]').show();
	    $('#settings .search').show();
	}
    }
    
    if (employee.group <= 2){
	$('#da_se_ov_aa .button').hide();
    } else {
	$('#da_se_ov_aa .button').show();
    }
    
    
    
    if (sp.staff.admin.info.group > 3){
	$('#da_se_ov_wa').parent().hide();
    } else {
	$('#da_se_ov_wa').parent().show();
    }

    
    
    //prefill
    self.prefillOverview(employee);
    self.prepareEditDetails(employee);
    self.preparePasswordField(employee);
    
    $('#settings .search.settings.mainSub li a:first').trigger(clickEvent);
    
    sp.fixCheckboxes();
}
ShiftPlanningSettings.prototype.editSubEvents = function(){
	console.log('subevents');
}
ShiftPlanningSettings.prototype.upcomingShiftsSubEvents = function(){
	console.log('subevents');
}
ShiftPlanningSettings.prototype.recentShiftsSubEvents = function(){
	console.log('subevents');
}
ShiftPlanningSettings.prototype.passwordSubEvents = function(){
	console.log('subevents');
}
ShiftPlanningSettings.prototype.prefillOverview = function(employee){
    var p = {};
    
    $.each(employee, function(i, item){
	if (item == null || item.length == 0){
	    item = '&nbsp;';
	}
	p[i] = item;
    });
    
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
        
    

    $('#da_se_ov_cu').html(spView.customFields(employee));
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
ShiftPlanningSettings.prototype.prepareEditDetails = function(employee){
    var p = {};
    $.each(employee, function(i, item){
	if (item == null || item.length == 0){
	    item = '';
	}
	p[i] = item;
    });
    
    employee = p;
    this.listLanguages();
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
    
    //custome fields have to create divs
    $('#da_se_ed_cu').html(spView.editableCustomFields(employee));
    
    $('#da_se_ed_po').html(spView.editableSchedules(employee));
    $('#da_se_ed_sk').html(spView.editableSkills(employee));
    $('#da_se_ed_no').html((employee.notes != null && employee.notes.length > 0) ? employee.notes : '');
    
    $('#da_se_ed_lang').val(employee.language);
    
}