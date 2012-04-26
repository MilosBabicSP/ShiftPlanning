ShiftPlanningStaff.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        if (user.loggedIn == 1){
            self.prepareConfig();
            self.listLanguages();//list all languages
        }
        $('#lo_b').bind('click', function(){
            self.login(); 
        });
        
        self.listEvents();
        self.addStaffEvents();
        self.fastAssignmentEvents();
        
    });
}


ShiftPlanningStaff.prototype.loadSubPageEvents = function(subpage){
    $('#st_tp_menu').hide();
    this[subpage + 'SubEvents']();
}

ShiftPlanningStaff.prototype.listEvents = function(){
    var self = this;
    $('#st_sn_ga').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).parents('ul').find('li').removeClass('active');
        $(this).parent().addClass('active');
        $('#st_li_ga').removeClass('small').addClass('big');
    });
    
    $('#st_sn_li').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).parents('ul').find('li').removeClass('active');
        $(this).parent().addClass('active');
        $('#st_li_ga').removeClass('big').addClass('small');
    });
    
    $('#st_li_se_b').bind(clickEvent, function(e){
        e.preventDefault();
        var s = $('#st_li_se_te').val();
        if (s.length == 0 || s == 'Search...'){
            $('#st_li_ga li').show();
            $('#st_li_ga').show();
            $('#st_li .noResults').hide();
        } else {
            $('#st_li_ga li').hide();
            $('#st_li_ga').show();
            $('#st_li .noResults').hide();
            $('#st_li_ga li').find('span:Contains("'+s+'")').parents('li').show();
            if ($('#st_li_ga li').find('span:Contains("'+s+'")').parents('li').length == 0){
                $('#st_li .noResults').show();
                $('#st_li_ga').hide();
            }
        }
    });
    $('#st_li_ga').delegate('li', clickEvent, function(){
        var id = $(this).attr('staffId');
        if (sp.permissions.hasPermission('visible_staff_details')){
            self.displayEmployee(id);
        }
    });
}

ShiftPlanningStaff.prototype.addStaffEvents = function(){
    var self = this;
    $('#st_ae_sa').bind(clickEvent, function(){
        $(this).toggleClass('check');
    });
    
    $('#st_ae_ce_b').bind(clickEvent, function(e){
        e.preventDefault();
        self.createEmployee($(this));
    });
}

ShiftPlanningStaff.prototype.fastAssignmentEvents = function(){
    var self = this;
    $('#st_fa_el').bind('change', function(){
        self.loadFastAssignment($(this).val());
    });
    
    $('#st_fa ul.detailsGrid ul').delegate('.checkbox', clickEvent, function(e){
        var sid = $(this).attr('itemId');
        var skills = ($(this).parents('.skills').length > 0) ? true : false;
        var checked = ($(this).hasClass('check')) ? true : false;
        var obj = this;
	$(obj).parent().addClass('loading');
        var data = {
            id : $('#st_fa_cu').val()
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
            sp.dashboard.updateUser($('#st_fa_cu').val(), response, false);
        });
    });
}

ShiftPlanningStaff.prototype.listSubEvents = function(){
    $('#st_tp_menu').show();
    $('#st_li_ga').html($.tmpl($('#te_st_list'), spModel.staff.allStaff()));
    $('#st_li_ga li').show();
    $('#st_li_se_te').val('').trigger('blur');
}

ShiftPlanningStaff.prototype.addStaffSubEvents = function(){
    this.resetAddEmployee();
}

ShiftPlanningStaff.prototype.fastAssignmentSubEvents = function(){
    $('#st_fa_el').html(spView.staffOption());
    $('#st_fa_po').hide();
    $('#st_fa_sk').hide();
}
//Render select box
ShiftPlanningStaff.prototype.listLanguages = function (){
    var result='<option  value="none">Select Language</option>'
    $.each(sp.raw.config.languages,function(key,value){
        result+='<option value="'+value['code']+'">'+value['name']+'</option>'
    })
    $('#da_se_ed_lang').html(result);
}

//Functions
ShiftPlanningStaff.prototype.displayEmployee = function(id){
    $('#st_tp_menu').hide();
    $('#pages > div').hide();
    $('#pages #dashboard .main').hide();
    $('#pages #dashboard .mainSub').hide();
    $('#pages #dashboard').show();
    $('#pages #dashboard .main.settings').show();
    $('#pages #dashboard .mainSub.settings').show();
    sp.dashboard.settingsSubEvents(spModel.staff.getEmployeeById(id));
}


//Get all fast assignment info.
ShiftPlanningStaff.prototype.loadFastAssignment = function(id){
    var employee = spModel.staff.getEmployeeById(id);
    $('#st_fa_cu').val(id);
    $('#st_fa_po ul.detailsGrid ul').html(spView.editableSchedules(employee));
    $('#st_fa_sk ul.detailsGrid ul').html(spView.editableSkills(employee));
    
    $('#st_fa_po').show();
    $('#st_fa_sk').show();
}

ShiftPlanningStaff.prototype.createEmployee = function(c){
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
    
    if ($('#st_ae_sa').hasClass('check')){
        data.send_activation = 1;
    }
    
    spModel.staff.create('employee', data, function(response){
        $(c).removeClass('loading');
        spModel.staff.addEmployee(response.data);
        self.displayEmployee(response.data.id);
        sp.showSuccess(_s('Employee successfully created!'));
    }, function(){
        $(c).removeClass('loading');
    });
}


ShiftPlanningStaff.prototype.resetAddEmployee = function(){
    $('#st_ae_i_n').val('');
    $('#st_ae_i_nn').val('');
    $('#st_ae_i_e').val('');
    $('#st_ae_i_eid').val('');
    $('#st_ae_i_un').val('');
    $('#st_ae_i_hw').val('');
    $('#st_ae_i_no').val('');
    $('#st_ae_sa').removeClass('check');
}

//Rest
ShiftPlanningStaff.prototype.login = function(){
    var u = $('#lo_u').val();
    var p = $('#lo_p').val();
    var self = this;
    sp.api('staff.login', 'GET', {
        username: u, 
        password: p
    }, function(loginResponse){
        sp.staff.admin.info = loginResponse.data.employee;
        console.log(loginResponse);
//        sp.staff.data.language=loginResponse.data.employee.language;
        var calls = [
        ['staff.employees','GET', {}],
        ['schedule.schedules','GET', {
            'perms':1
        }],
        ['admin.settings', 'GET', {}],
        ['staff.skills', 'GET', {}],
        ['location.locations', 'GET', {}]
        ]
        sp.multiApi(calls, function(response){
            sp.api('api.config', 'GET', {}, function(config){
                //was hitting the 5 request limit for multi api so we needed to send a separate call
                $('.loginContainer').fadeOut(500, function(){
                    user.loggedIn = 1;
                    user.name = loginResponse.data.employee.name;
                    user.company = loginResponse.data.business.name;
                    user.phone = loginResponse.data.business.phone;
                    sp.staff.raw.employees = response[0].data;
                    sp.staff.data.employees = sp.map(response[0].data);
                    sp.schedule.raw.schedules = response[1].data;
                    sp.schedule.data.schedules = sp.map(response[1].data);
                    sp.staff.admin.settings = response[2].data;
                    sp.staff.raw.skills = response[3].data;
                    sp.staff.data.skills = sp.map(response[3].data);
                    sp.staff.raw.locations = response[4].data;
                    sp.staff.data.locations = sp.map(response[4].data);
                    sp.staff.admin.info.dfAvatar = sp.getAvatar(sp.staff.admin.info.id);
                    sp.raw.config = config.data;
                    sp.schedule.dateId = sp.raw.config.today.id;
                    $('body').removeClass('login');
                    $('.notification').remove();
                    $('html').css('height','auto');
                    $('.applicationContainer').fadeIn(500);
                    sp.hash('dashboard');
                    self.prepareConfig();
                    $('.userName').html(user.name);
                    sp.permissions.preparePermissions();
		    spRanges.fixRanges();
		    sp.staff.fixed.employees = sp.permissions.fixStaffListing();
		    sp.raw.config.today.formatted = Date.parse(sp.raw.config.today.formatted).toString(cal.dformat);
                });
            });
        });

    }, function(response){
        $('.login .error').html(response.error);
        $('.login .error').slideDown(500);
        $('.login input:first').focus();
        
    });
}


ShiftPlanningStaff.prototype.logout = function(){
    var c = confirm(_s('Are you sure you want to logout?'));
    if (!c){
        return false;
    }
    sp.api('staff.logout', 'GET', {}, function(response){
        window.location.reload();
    }, function(response){
        sp.showError(response.error);
    });
}


ShiftPlanningStaff.prototype.prepareConfig = function(){
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
        tmode: (sp.staff.admin.settings['24hr'] == "1"? 24 : 12),
        tstring: (parseInt(sp.staff.admin.settings['24hr']) == 1) ? 'HH:mm' : 'h:mm tt',
        dformat: sp.strReplace(['M','d', 'm', 'Y', 'j'], ['MMM', 'dd', 'MM', 'yyyy', 'd'], sp.staff.admin.settings.date),
        dpformat: sp.strReplace(['d', 'm', 'Y', 'M', 'j'], ['dd', 'mm', 'yy', 'M', 'd'], sp.staff.admin.settings.date),
        user: sp.staff.admin.info.id,
        view: 'week',
        mode: 'overview',
        schedule: '',
        lastlength: 8,
        focus: 'employee',
        today: tmpDate.getMonth()+'/'+tmpDate.getDate()+'/'+tmpDate.getFullYear(),
        month: def.month,
        year: def.year,
        day: def.day,
        firstday: '',
        lastday: '' ,
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