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
        $('#da_wa_li').html(spView.emptyResult('Message wall is off. Please contact your manager for more info.', 'li'));
    }
    
    //remove button for writing new wall message
    if (group > this.manager && parseInt(perms.message_wall_emp) == 0){
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
    
    //fix employee only perms
    if (group >= this.employee){
        $('#da_se .aPerm').remove();
    }
    
    if (group >= this.scheduler){
        //remove manage timeclock
        $('#tc_mts_sub_button').remove();
        $('#tc_mts').remove();
    }
   
    if (group > this.manager){
        $('#da_se_ov_aa').prev().remove();
        $('#da_se_ov_aa').remove();
    }
    
    //Employees can manually add time clocks
    if (group > this.scheduler && parseInt(perms.tc_empl_addtime) == 0){
        $('#tc_act_sub_button').remove();
        $('#tc_act').remove();
    }
    
    //Time Clock Module is on
    if (parseInt(perms.timeclock) == 0){
        $('#menu #menu_timeClock').unbind(clickEvent);
        $('#menu #menu_timeClock').remove();
        $('#timeClock').remove();
        $('.subNavigation div.timeClock').remove();
    }

    
 
/*    //Employees can view staff gallery
    if (group >= this.employee && parseInt(perms.visible_staff) == 0){
        $('#menu #menu_staff').unbind(clickEvent);
        $('#menu #menu_staff').remove();
        $('#staff').remove();
        $('.subNavigation div.staff').remove();
    }
    
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
            if (group > this.supervisor && parseInt(perms.edit_profile) == 0){
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