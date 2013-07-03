ShiftPlanningPermissions.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        if (user.loggedIn == 1){
            self.preparePermissions();
        }
    });
}


//hide all html parts of system wich permissions i don't have
ShiftPlanningPermissions.prototype.preparePermissions = function(){
    //missing view reports
    //missing edit profile
    
    var perms = sp.staff.admin.settings;
    var group = sp.staff.admin.info.group
 
     //Message Wall (is vissible)
    if (parseInt(perms.message_wall_on) == 0){
        $('#da_wa_nm_b').remove();
        $('#da_wa_nm_f').remove();
        $('#da_wa_li').html(spView.emptyResult(_s('Message wall is off. Please contact your manager for more info.'), 'li'));
    }
    
    //remove button for writing new wall message
    if (group > this.supervisor && parseInt(perms.message_wall_emp) == 0){
        $('#da_wa_nm_b').remove();
        $('#da_wa_nm_f').remove();
    }
    
    //Add class to ul to hide wall comments
    if (parseInt(perms.message_wall_comments) == 0){
        $('#da_wa_li').addClass('permMsgCommentOff');
    }
    
    //remove button for inbox if perms aren't met'
    if (group >= this.scheduler && parseInt(perms.pm) == 0){
        $('#da_in_nm_b').unbind(clickEvent);
        $('#da_in_nm_b').remove();
	

    }
    
    if (perms.shift_confirm == 0){
	$('.subNavigation .reports a[subpage=confirmedHours]').remove();
    }
    
    //fix employee only perms
    if (group >= this.employee){        
        $('#da_se_ov_no, #da_se_ed_no').parents('.detailsGrid').remove();
	
	//remove manage timeclock
	$('#tc_mts_sub_button').remove();
        $('#tc_mts').remove();
	
	$('.subNavigation .requests a[subpage=shiftApprovals]').remove();
	$('#rq_sa').remove();
    }
    
    if (group >= this.scheduler){

        $('#menu_reports').remove();
        $('#reports').remove();
	
	$('#settings .aPerm').remove();
	
	//remove staff fast assignment and add staff for employee
        $('.subNavigation .staff a[subpage=addStaff]').remove();
        $('.subNavigation .staff a[subpage=fastAssignment]').remove();
        $('#staff .addStaff').remove();
        $('#st_fa').remove();
    }
   
    if (group > this.supervisor){
//        $('#da_se_ov_aa').prev().remove();
//        $('#da_se_ov_aa').remove();
    }
    
    //Employees can manually add time clocks
    if (group > this.scheduler && parseInt(perms.tc_empl_addtime) == 0){
        $('#tc_act_sub_button').remove();
    }
    
    //Time Clock Module is on
    if (parseInt(perms.timeclock) == 0){
        $('#menu #menu_timeClock').unbind(clickEvent);
        $('#da_widgets .timeClock').remove();
        $('#menu #menu_timeClock').remove();
        $('#timeClock').remove();
        $('.subNavigation div.timeClock').remove();
	$('.subNavigation .reports a[subpage=confirmedTimeSheets]').remove();
    }

    //Employees can view staff gallery
    if (group >= this.employee && parseInt(perms.visible_staff) == 0){
        $('#menu #menu_staff').unbind(clickEvent);
        $('#menu #menu_staff').remove();
        $('#staff').remove();
        $('.subNavigation div.staff').remove();
    }
    
    if ( group >= this.scheduler && parseInt( perms.edit_profile ) == 0 ) {
        $('.subNavigation .settings .subNav a[subpage=edit]').hide();
    }
	var isChild = false;
	console.log(sp.staff.admin.business.master, sp.staff.admin.business.franchise);
	if(sp.staff.admin.business.master > 0){
		isChild = true;
	}
	
	if(sp.staff.admin.business.franchise > 0 && sp.staff.admin.business.franchise != sp.staff.admin.business.id){
		console.log('child with parent');
		isChild = true;
	}
    
	if(isChild){
		if(typeof sp.staff.admin.business.group_platform_settings != 'undefined'){
			var group_perms = '';
			try{
				group_perms = JSON.parse(sp.staff.admin.business.group_platform_settings);
			}catch(e){
				
			}
			console.log(group_perms);
			if(group_perms.disallow_employee_create == '1'){
				$('.staff a[subpage=addStaff]').hide()
			}
			if(group_perms.disallow_employee_activate == '1'){
				$('.settings a[type=manualyActivate]').remove();
			}
			if(group_perms.disallow_employee_activate == '1'){
				$('.settings a[type=deactivate]').remove();
			}
			if(group_perms.disallow_employee_delete == '1'){
				$('.settings a[type=delete]').remove();
			}
		}
	}
/*    
    //Employee can send private messages
    if (group >= this.employee && parseInt(perms.pm) == 0){
        $('#da_in_nm_b').unbind(clickEvent);
        $('#da_in_nm_b').remove();
    }
    
//    //Employee can view Who's on now
//    if (group >= this.employee && parseInt(perms.on_now) == 0){
//        $('#da_who').remove();
//    }
//      This doesn't exists on mobile version for now
    

    
    //Employees can manually add time clocks
    if (group >= this.employee && parseInt(perms.tc_empl_addtime) == 0){
        $('#tc_mts_sub_button').parent().remove();
        $('#tc_act_sub_button').remove();
    }
    
    //Message Wall
    if (parseInt(perms.message_wall_on) == 0){
        $('#da_w').remove();
        $('#da_nm_f').remove();
        $('#da_w_title').remove();
    }
    
    
    if (group > this.manager && parseInt(perms.message_wall_emp) == 0){
        $('#da_nmb').remove();
        $('#da_nm_f').remove();
    }
    
    if (group > this.supervisor){
        $('#footer_manageTimeSheets').parent().remove();
        $('#tc_manageTimeSheets').remove();
        $('#footer_addEmployee').parent().remove();
        $('#st_ae').remove();
        $('#footer_fastAssignment').parent().remove();
        $('#st_fa').remove();
        $('#da_se_ov_p .aPerm').remove();
        $('#menu_reports').remove();
        $('#reports').remove();
        $('#rq_rl_va, #rq_rl_sp, #rq_rl_sr, #rq_rl_ast').parent().hide();
        $('#rq_rl .breaker').hide();
        $('#rq_rl .breaker:last, #rq_rl .breaker:first,').show();
    }
    
    if (group > this.scheduler){
        $('#rq_va_rq').remove();
        $('ul.requests a[subPage=shiftApprovals]').parent().remove();
    }
*/
}

ShiftPlanningPermissions.prototype.hasPermission = function(type){
    var perms = sp.staff.admin.settings;
    var group = sp.staff.admin.info.group;
    switch (type){
        case 'visible_staff_details':
            //Employees can view staff contact details (staff gallery must be checked)
            if (group >= this.employee && parseInt(perms.visible_staff_details) == 0){
                return false;
            }
            break;
        case 'edit_profile':
            if (group > this.scheduler && parseInt(perms.edit_profile) == 0){
                return false;
            }
            break;
        case 'message_wall_comments':
            if (group > this.manager && parseInt(perms.message_wall_comments) == 0){
                return false;
            }
            break;

    }
    return true;
}

ShiftPlanningPermissions.prototype.fixStaffListing = function(){
    var st = sp.staff.data.employees;
    var sc = sp.schedule.clearSchedules();
    var employees = {};
    
    $.each(sc, function(i, item){
	$.each(st, function(eI, eItem){
	    if (eItem.schedules != null && typeof eItem.schedules[item.id] != 'undefined'){
		employees[eItem.id +''] = eItem;
	    }
	});
    });
    
    return employees;
}
