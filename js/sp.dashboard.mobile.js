ShiftPlanningDashboard.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.wallEvents();
        self.inboxEvents();
        self.settingsEvents();
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
    
    $('#da_wa_nm_ca').bind(clickEvent, function(e){
        e.preventDefault();
        $('#da_wa_nm_b').trigger(clickEvent);
    });
    
    $('#da_wa_nm_sa').bind(clickEvent, function(e){
        e.preventDefault();
        spModel.messaging.create('wall', {
            post : $.trim($('#da_wa_nm_ti').val()), 
            title: $.trim($('#da_wa_nm_me').val())
            }, function(response){
            self.wallSubEvents();
        }, function(response){
            console.log(response);
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
        var c = confirm('Do you want to delete this message?');
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
            }, function(response){
                console.log(response);
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
        if (post.length == 0){
            alert('Please write your message');
            return false;
        }
        spModel.messaging.create('wall', {
            post: post, 
            id: id
        }, function(response) {
            console.log(response);
            var d = {
                avatar : sp.staff.admin.info.dfAvatar,
                id : id,
                userName : sp.staff.admin.info.name,
                comment: post,
                time : 'Now'
            }
            obj.parent().before($.tmpl($('#te_da_wa_me_co'), d));
        }, function(response){
            console.log(response);
        });
        
        return true;
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
            spModel.messaging.update('message', {id : id, read : 1}, function(response){
                obj.parent().toggleClass('extended');
                obj.parent().removeClass('unread');
            });
        }
    });
    
    $('#da_in_nm_b, #da_in_nm_ca').bind(clickEvent, function(e){
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
            var obj = $(this).parents('.newMsg');
            obj.find('input[type=text]').val('re: ' + $('#da_in_msg_' + id).find('.msgHead h5').html());
        });
    });
    
    $('#da_in_me').delegate('a.butDel', clickEvent, function(e){
        e.preventDefault();
        var c = confirm('Are you sure you want to delete this messaage?');
        if (!c){
            return false;
        }
        var id = $(this).attr('rel');
        spModel.messaging.del('message', {id : id}, function(response){
            $('#da_in_msg_' + id).fadeOut('fast', function(){
                $(this).remove();
            });
        });
        
    });
    
    $('#da_in_me').delegate('.msgBody .newMsg .title .fr', clickEvent, function(e){
        var obj = $(this).parents('.newMsg');
        var data = {
            subject : obj.find('input[type=text]').val(),
            message : obj.find('textarea').val(),
            to : obj.find('input[type=hidden]').val()
        };
        
        spModel.messaging.create('message', data, function(resonse){
            self.inboxSubEvents();
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
        $('#da_se_' + $(this).attr('subpage')).show();
        $(this).parent().addClass('active');
    });
    
    $('#da_se').delegate('.checkbox', clickEvent, function(){
        var id = $(this).attr('id');
        var skills = ($(this).parents('.skills').length > 0) ? true : false;
        var checked = ($(this).hasClass('check')) ? true : false;
        var obj = this;
        var data = {
            id : $('#da_se_cur_us_id').val()
        }
        if (skills){
            if (checked) {
                data.removeSkill = id;
            } else {
                data.addSkill = id;
            }
        } else {
            if (checked) {
                data.removeSchedule = id;
            } else {
                data.addSchedule = id;
            }
        }
        spModel.staff.update('employee', data, function(response){
            if (checked) {
                $(obj).removeClass('check');
            } else {
                $(obj).addClass('check');
            }
            self.updateUser($('#da_se_cur_us_id').val(), response);
        })
    });
    
    $('#da_se_ed_ue').delegate('#da_se_ed_ue', clickEvent, function(e){
        e.preventDefault();
        self.saveEditForm();
    });
}


//sub page events
ShiftPlanningDashboard.prototype.wallSubEvents = function(){
    spModel.messaging.get('wall', {}, function(response){
        $('#da_wa_li').html($.tmpl($('#te_da_wa_me'), response.data));
    }, function(){
        
    });
}


ShiftPlanningDashboard.prototype.upcomingShiftsSubEvents = function(){
    var send = {
        start_date: 'today', 
        end_date: 'today +2 months', 
        mode: 'employee'
    };
    if (typeof employee != 'undefined'){
        send.employees = sp.staff.admin.info.id
    } else {
        send.employees = sp.staff.admin.info.id;
    }
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
    spModel.messaging.get('messages', {mode : 'to'}, function(response){
        $('#da_in_me').html($.tmpl($('#te_da_wa_in'), response.data));
    }, function(response){
        console.log(response);
    });
    
    $('#da_in_nm_to').html(spView.staffOption());
}

ShiftPlanningDashboard.prototype.settingsSubEvents = function(employee){
    var self = this;
    
    if (typeof employee == 'undefined'){
        employee = sp.staff.admin.info;
    }


    //prefill
    self.prefillOverview(employee);
    self.prepareEditDetails(employee);
    
    $('#dashboard .search.settings.mainSub li a:first').trigger(clickEvent);
}

//functions
ShiftPlanningDashboard.prototype.prefillOverview = function(employee){
    //this page needs to be cached after first load and to be reprepared if data are changed - DONE
    $('#da_se_cur_us_id').val(employee.id);
    
    $('#da_se_ov_fn').html(employee.name);
    $('#da_se_ov_id').html(employee.id);
    $('#da_se_ov_un').html(employee.username);
    $('#da_se_ov_mo').html(employee.cell_phone);
    $('#da_se_ov_ho').html(employee.home_phone);
    $('#da_se_ov_em').html(employee.email);
    if ($.trim(employee.wage).length != 0){
        $('#da_se_ov_wa').html('$' + employee.wage);
    }
    
    var status_name = 'Administrative accounts cannot be de-activated.';
    var status = 'User has actived his/her account.';
    
    if (parseInt(employee.status) == 1 && parseInt(employee.group) > 2){
        status_name = 'User Account is Enabled.';
    } else if (parseInt(employee.status) == 0 && parseInt(employee.group) > 2){
        status_name = 'User Account is Enabled.';
        status = 'User account is not activated.';
    }
    
    if (employee.group <= 2){
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
    if (employee.birth_month != 0 && employee.birth_day != 0)
        $('#da_se_ov_bd').html(months[employee.birth_month-1] + ' ' + employee.birth_day);
    


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
    
    //this page needs to be cached after first load and to be reprepared if data are changed
    $('#da_se_ed_na').val(employee.name);
    $('#da_se_ed_em').val(employee.email);
    $('#da_se_ed_nn').val(employee.nick_name);
    $('#da_se_ed_us').val(employee.username);
    //mobile phone
    var mphone = employee.cell_phone.split('-');
    $('#da_se_ed_mph_0').val(mphone[0]);
    $('#da_se_ed_mph_1').val(mphone[1]);
    $('#da_se_ed_mph_2').val(mphone[2]);
    //home phone
    var hphone = employee.home_phone.split('-');
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
    $('#da_se_ed_no').html((employee.notes.length > 0) ? employee.notes : '');
    
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
        sp.api('staff.employee','update',{id : eId, password: $('#da_se_pa_np').val()},function(response){
            self.updateUser(eId, response);
            sp.showSuccess('Password changed.');
        }, function(response){
            sp.showError(response.error);
        });
    } else {
        //add other error type
        sp.showError('Passwords don\'t match');
    }
}

ShiftPlanningDashboard.prototype.saveEditForm = function(){
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
    
    data.birth_day = $('#da_se_ed_bday_d').val();
    data.birth_month = $('#da_se_ed_bday_m').val();
    
    if ($('#da_se_ed_mph_0').val().length > 0 && $('#da_se_ed_mph_1').val().length > 0 && $('#da_se_ed_mph_2').val().length > 0){
        data.cell_phone = $('#da_se_ed_mph_0').val() + '-' + $('#da_se_ed_mph_1').val() + '-' + $('#da_se_ed_mph_2').val();
    }
    
    if ($('#da_se_ed_hph_0').val().length > 0 && $('#da_se_ed_hph_1').val().length > 0 && $('#da_se_ed_hph_2').val().length > 0){
        data.home_phone = $('#da_se_ed_hph_0').val() + '-' + $('#da_se_ed_hph_1').val() + '-' + $('#da_se_ed_hph_2').val();
    }
    
    
    spModel.staff.update('employee', data, function(response){
        self.updateUser(eId, response);
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
                sp.showSuccess('User deactivated!');
                $('#menu_staff').trigger(clickEvent);
            } else if (type == 'delete'){
                $('#menu_staff').trigger(clickEvent);
                sp.showSuccess('User deleted!');
            } else if (type == 'activate'){
                sp.showSuccess('Activation successfully sent.');
                $(obj).hide();
            } else {
                sp.showSuccess('Employee activated successfully.');
                $('#da_se_ov_aa a[type=activate]').hide();
                $(obj).hide();
                $('#da_se_ov_st').html('User Account is Enabled.');
            }
        });
    }, function(response){
        sp.showError(response.error);
    });
}

ShiftPlanningDashboard.prototype.updateUser = function(id, res){
    if (id == sp.staff.admin.info.id){
        sp.staff.admin.info = res.data;
    }
    sp.staff.data.employees['' + id] = res.data;
}

ShiftPlanningDashboard.prototype.loadPage = function(){
    
}



