ShiftPlanningStaff.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        if (user.loggedIn == 1){
            self.prepareConfig();
        }
        $('#lo_b').bind('click', function(){
            self.login(); 
        });
    });
}


ShiftPlanningStaff.prototype.loadSubPageEvents = function(subpage){
    console.log(subpage + 'SubEvents');
    this[subpage + 'SubEvents']();
}

ShiftPlanningStaff.prototype.listSubPageEvents = function(){
    console.log('test');
}

ShiftPlanningStaff.prototype.login = function(){
    var u = $('#lo_u').val();
    var p = $('#lo_p').val();
    var self = this;
    sp.api('staff.login', 'GET', {
        username: u, 
        password: p
    }, function(loginResponse){
        sp.staff.admin.info = loginResponse.data.employee;
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
                    sp.staff.admin.info.dfAvatar = (typeof sp.staff.admin.info.avatar != 'undefined' && typeof sp.staff.admin.info.avatar.small != 'undefined') ?sp.staff.admin.info.avatar.small : 'images/no-avatar.png',
                    sp.raw.config = config.data;
                    $('body').removeClass('login');
                    $('.notification').remove();
                    $('html').css('height','auto');
                    $('.applicationContainer').fadeIn(500);
                    sp.hash('dashboard');
                    self.prepareConfig();
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
        tstring: (sp.staff.admin.settings['24hr'] ? 'HH:mm' : 'h:mm tt' ),
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