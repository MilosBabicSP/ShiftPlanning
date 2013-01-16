ShiftPlanningSettings.prototype.initialize = function(){
	var self= this ;
	$(document).ready(function(){
		self.overviewEvents();
	})
}
ShiftPlanningSettings.prototype.loadSubPageEvents = function(subpage){
	    if(subpage == 'recentShifts' || subpage == 'upcomingShifts'){
			this.displayShifts(sp.staff.data.employees[$('#da_se_cur_us_id').val()],subpage);
		}else{
			this[subpage + 'SubEvents']();
		}
}
ShiftPlanningSettings.prototype.loadPage = function(){
    
}
ShiftPlanningSettings.prototype.overviewEvents = function(){
    var self = this;
    
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
    });
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
    });
	$('.settings .backMenu').bind(clickEvent, function(e){
		e.preventDefault();
		sp.loadPage('staff');
		$('.subNavigation').show()
	});	
	$('#settings .mainSub.settings .subNav').delegate('a', clickEvent, function(e){
		e.preventDefault();
		var subpage = $(this).attr('subpage');
		var id = $('#da_se_cur_us_id').val();
		if(subpage == 'overview'){
			self.overviewSubEvents(sp.staff.data.employees[id]);
		}else{
			self.loadSubPageEvents(subpage);			
		}
		$('#settings .mainSub.settings .subNav li').removeClass('active');
		$('#settings .mainSub.settings .subNav a[subpage='+subpage+']').parent().addClass('active');
		$('#settings .main').hide();
		$('#settings .main.'+subpage).show();
		$('#settings .mainSub.settings').show();
        sp.fixCheckboxes();
	});	
}
ShiftPlanningSettings.prototype.overviewSubEvents = function(employee){
    var self = this;

    if (typeof employee == 'undefined'){
	employee = sp.staff.admin.info;
    }
    
    if (employee.id == sp.staff.admin.info.id){
	$('#settings .search').show();
	if (!sp.permissions.hasPermission('edit_profile')){
	    $('#settings .subNav a[subpage=edit]').hide();
	} else {
	    $('#settings .subNav a[subpage=edit]').show();
	}
    } else {
	if (sp.staff.admin.info.group > 4){
	    $('#settings .search').hide();
	} else {
	    $('#settings .subNav a[subpage=edit]').show();
	    $('#settings .search').show();
	}
        if ( sp.staff.admin.info.group >= 4 ) {
            $('.settings .subNav .hideEm').hide();
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
    
    $('#settings .search.settings.mainSub ').hide();
    
    sp.fixCheckboxes();
}
ShiftPlanningSettings.prototype.editSubEvents = function(){
	//console.log('EDITsubevents');
}
ShiftPlanningSettings.prototype.upcomingShiftsSubEvents = function(){
	//console.log('Upcomingsubevents');
}
ShiftPlanningSettings.prototype.recentShiftsSubEvents = function(){
	//console.log('RECENTsubevents');
}
ShiftPlanningSettings.prototype.passwordSubEvents = function(){
	//console.log('PASORDsubevents');
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
ShiftPlanningSettings.prototype.listLanguages = function (){
    var result='<option  value="none">' + _s('Company default') + '</option>'
    $.each(sp.raw.config.languages,function(key,value){
	result+='<option value="'+value['code']+'">'+value['name']+' ' + ((value.machine == 1) ? '(machine)' : '') + '</option>'
    });
    $('#da_se_ed_lang').html(result);
}
ShiftPlanningSettings.prototype.preparePasswordField = function(){
    $('#da_se_pa_np').val('');
    $('#da_se_pa_cp').val('');
}
ShiftPlanningSettings.prototype.displayShifts = function (employee,from){
    var element;
    var notify;
	var desc=false;
    switch (from){
	case 'recentShifts':
	    $('#da_se_rs_li').html(spView.ulLoader());
	    var params={
		start_date: 'today -2 months', 
		end_date: 'yesterday', 
		mode: 'employee', 
		employees: employee.id
	    }
		desc = true ;
	    element=$('#da_se_rs_li');
	    notify='No recent shifts'
	    break;
	case 'upcomingShifts':
	    $('#da_se_us_li').html(spView.ulLoader());
	    var params={
		start_date: 'today ', 
		end_date: 'today +2 months', 
		mode: 'employee', 
		employees: employee.id
	    }
	    element=$('#da_se_us_li');
	    notify='No upcoming shifts'
	    break;
    }
    spModel.schedule.get('shifts',params,function(response){
	if(response.data == ""){
	    $(element).html(spView.emptyResult(notify))   
	}else{
		if(desc){
		desc = false ;
		var data =[];
		var j =response.data.length-1;
		for(var count=0;count<response.data.length;count++){
			data.push(response.data[j--]);
			}
			$(element).html($.tmpl($('#te_da_se_rs'),data));
		}else{
			$(element).html($.tmpl($('#te_da_se_rs'),response.data));   
		}
	}
    }) 
  
}
ShiftPlanningSettings.prototype.updateUser = function(id, res, over){
    if (typeof over == 'undefined'){
	over = true;
    }
    
    if (id == sp.staff.admin.info.id){
	sp.staff.admin.info = res.data;
    }
    sp.staff.data.employees['' + id] = res.data;
    
    if (over){
	this.overviewSubEvents(sp.staff.data.employees['' + id]);
    }
    
    if(sp.hash() == 'staff'){
		$('#pages #settings .mainSub.settings').show();
	}
    
    sp.showSuccess(_s('Selected user updated.'));
}
ShiftPlanningSettings.prototype.updateNotes = function(text){
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
ShiftPlanningSettings.prototype.saveEditForm = function(obj){
    //missing wage
    //missing location, mininum weekly hours, maximum weekly hours, auto approve shift requests
    // mising calendar size
    //privacy settings
    var eId = $('#da_se_cur_us_id').val();
    var self = this;
    var data = {};
    var employee = spModel.staff.getEmployeeById($('#da_se_cur_us_id').val());
   
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
    
    data.language= ($('#da_se_ed_lang').val() == 'none') ? '' : $('#da_se_ed_lang').val();//adding lanuage to staff details
    
    data.birth_day = $('#da_se_ed_bday_d').val();
    data.birth_month = $('#da_se_ed_bday_m').val();
    
    if ($('#da_se_ed_mph_0').val().length > 0 && $('#da_se_ed_mph_1').val().length > 0 && $('#da_se_ed_mph_2').val().length > 0){
	data.cell_phone = $('#da_se_ed_mph_0').val() + '-' + $('#da_se_ed_mph_1').val() + '-' + $('#da_se_ed_mph_2').val();
    }
    
    if ($('#da_se_ed_hph_0').val().length > 0 && $('#da_se_ed_hph_1').val().length > 0 && $('#da_se_ed_hph_2').val().length > 0){
	data.home_phone = $('#da_se_ed_hph_0').val() + '-' + $('#da_se_ed_hph_1').val() + '-' + $('#da_se_ed_hph_2').val();
    }
    
    var customFields = {};   
    var value="";
    $('#da_se_ed_cu li [item="edit"]').each(function(i,field) {
        
        value = $(field).val();
        
        if (value.lenght == 0){
            value = "";
        }
        
        if ($(field).hasClass('checkbox check')){    
            value = 1;
            }
        
        else if ($(field).hasClass('checkbox')){
            value = 0;
            }
 
        customFields[$(field).attr('id')] = value;
    });

    customFields = JSON.stringify(customFields);
    data.custom = customFields;
    
    spModel.staff.update('employee', data, function(response){
	if (employee.id == sp.staff.admin.info.id && employee.language != response.data.language){
	    setCookie('shiftplanning_mobile_lang', response.data.language, cookieExpire);
	    window.location.reload();
	}
	obj.removeClass('loading');
	self.updateUser(eId, response);
    }, function(){
	obj.removeClass('loading');
    });
}
ShiftPlanningSettings.prototype.changePassword = function (){
    var self = this;
    var eId = $('#da_se_cur_us_id').val();
    if ($('#da_se_pa_np').val().length >= 6 && $('#da_se_pa_np').val() == $('#da_se_pa_cp').val()){
	spModel.staff.update('employee', {
	    id : eId, 
	    password: $('#da_se_pa_np').val()
	}, function(response){
	    self.updateUser(eId, response);
	});
    } else {
	//add other error type
	sp.showError(_s('Password length must 6 or more chars and passwords must match.'));
    }
}
ShiftPlanningSettings.prototype.adminActions = function(obj){
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
                $('.search.settings.mainSub .backMenu').trigger(clickEvent);
            } else if (type == 'delete'){
                sp.showSuccess(_s('User deleted!'));
                $('.search.settings.mainSub .backMenu').trigger(clickEvent);
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