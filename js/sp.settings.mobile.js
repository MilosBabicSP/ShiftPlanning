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
	console.log('overview events');
}
ShiftPlanningSettings.prototype.overviewSubEvents = function(employee){
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
	console.log('EDITsubevents');
}
ShiftPlanningSettings.prototype.upcomingShiftsSubEvents = function(){
	console.log('Upcomingsubevents');
}
ShiftPlanningSettings.prototype.recentShiftsSubEvents = function(){
	console.log('RECENTsubevents');
}
ShiftPlanningSettings.prototype.passwordSubEvents = function(){
	console.log('PASORDsubevents');
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