ShiftPlanningSchedule.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.allPageEvents();
    });
}

ShiftPlanningSchedule.prototype.allPageEvents = function(){
    var self = this;
    $('#sc_fl').bind('change', function(e){
        var val = $(this).val();
        if (parseInt(val) != val){
            self.settings.mode = val;
        } else {
            self.settings.mode = 'schedule';
            self.settings.schedule = val;
        }
        self.displayShifts();
    });
    
    $('#sc_prev_day').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_to_sub').html(Date.parse($.trim($('#sc_to_sub').html())).add(-1).day().toString('dddd, ' + cal.dformat));
        self.nextPrevPrepare();
    });
    
    $('#sc_next_day').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_to_sub').html(Date.parse($.trim($('#sc_to_sub').html())).add(1).day().toString('dddd, ' + cal.dformat));
        self.nextPrevPrepare();
    });
    
    $('#sc_prev_month').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_mo_di').html(Date.parse($.trim($('#sc_mo_di').html())).addMonths(-1).toString('MMMM yyyy'));
        self.displayShifts();
    });
    
    $('#sc_next_month').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_mo_di').html(Date.parse($.trim($('#sc_mo_di').html())).addMonths(1).toString('MMMM yyyy'));
        self.displayShifts();
    });
    
    
    $('#sc_ca_bo').delegate('td:not(.notM)', clickEvent, function(){
        $('#sc_ca_bo td').removeClass('today');
        $(this).addClass('today');
        var i = $(this).attr('time');
        if (typeof self.shifts[i] != 'undefined'){
            console.log(self.shifts[i]);
            $('#sc_td_list').parent().show();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').hide();
            $('#sc_td_list').html($.tmpl($('#te_sc_shifts'), self.shifts[i].shifts));
            $('#sc_days_m').show();
        } else {
            $('#sc_td_list').parent().hide();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').show();
        }
    });
    
    $('#sc_td_list').delegate('tr', clickEvent, function(e){
        if (!$(this).hasClass('isShift')){
            return false;
        }
        $(this).addClass('loading');
        spModel.schedule.get('shift', {id : $(this).attr('shiftId'), detailed : 1}, function(response){
            self.shift = response.data;
            sp.loadSubPage('', 'schedule', 'shiftDisplay');
        });
    });
    
    $('#schedule .shiftDisplay .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        $('.subNavigation .schedule li.active a').trigger(clickEvent);
    });
    
    $('#sc_sub_shift_display ul a').bind(clickEvent, function(e){
        e.preventDefault();
        var o = $(this);
        o.addClass('loading');
        spModel.schedule.get('shift', {id : $(this).attr('rel'), detailed:  1}, function(response){
            o.removeClass('loading');
            self.shift = response.data;
            self.edit = true;
            sp.loadSubPage('', 'schedule', 'addShift');
        }, function(){
            o.removeClass('loading');
        });
    });
    
    $('#sc_refresh').bind(clickEvent, function(e){
        e.preventDefault();
        self.displayShifts();
    });
    
    $('#sc_add').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).parent().parent().parent().find('li').removeClass('active');
        sp.loadSubPage('', 'schedule', 'addShift');
    });
    
    $('#sc_add_add').bind(clickEvent, function(e){
        var obj = $(this);
        var isEdit = ($('#sc_edit_id').val() != 0) ? true : false;
        obj.addClass('loading');
        e.preventDefault();
        var data = {
            schedule : $('#sc_add_sc').val(),
            location : $('#sc_add_lo').val(),
            title : $('#sc_add_ti').val(),
            start_time : $('#sc_date_st').val(),
            end_time : $('#sc_date_et').val(),
            start_date : $('#sc_date_sd').val(),
            end_date : $('#sc_date_ed').val(),
            notes : $('#sc_add_no').val()
        }
        
        var method = 'create';
        if (isEdit){
            method = 'update';
            data.id = $('#sc_edit_id')
        }
        
        spModel.schedule[method]('shift', data, function(response){
            if (!isEdit){
                spModel.schedule.get('shift', {id : response.data.id, detailed : 1}, function(){
                    obj.removeClass('loading');
                    self.shift = response.data;
                    self.edit = true;
                    sp.loadSubPage('', 'schedule', 'addShift');
                })
            } else {
                obj.removeClass('loading');
            }
        }, function(){
            obj.removeClass('loading');
        });
    });
}

ShiftPlanningSchedule.prototype.loadSubPageEvents = function(subpage){
    $('.subNavigation').show();
    $('#sc_additional_menu').show();
    if (subpage == 'shiftDisplay'){
        $('.subNavigation').hide();
    }
    if (subpage == 'addShift'){
        $('#sc_additional_menu').hide();
    }
    this[subpage + 'SubEvents']();
}

//sub events
ShiftPlanningSchedule.prototype.todaySubEvents = function(){
    $('#sc_to_sub').html(formatted('today'));
    $('#sc_to_sub').prev().html('Today');
    this.page = 'today';
    this.displayShifts();
}

ShiftPlanningSchedule.prototype.daySubEvents = function(){
    this.page = 'day';
    $('#sc_to_sub').prev().html('Current Day');
    this.displayShifts();
}

ShiftPlanningSchedule.prototype.monthSubEvents = function(){
    this.page = 'month';
    $('#sc_to_sub').prev().html('Selected Day');
    $('#sc_mo_di').html(Date.parse($.trim($('#sc_to_sub').html())).add(1).day().toString('MMMM yyyy'));
    this.displayShifts();
}

ShiftPlanningSchedule.prototype.shiftDisplaySubEvents = function(){
    var e = [];
    if (typeof this.shift.employees != 'undefined' && this.shift.employees != null){
        $.each(this.shift.employees, function(i, item){
            e[i] = item;
            e[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png';
        });
        this.shift.employees = e;
    } else {
        this.shift.employees = [];
    }
    $('#sc_shift_display').html($.tmpl($('#te_sc_shift_display'), this.shift))
    
    $('#sc_sub_shift_display ul a').attr('rel', this.shift.id);
}

ShiftPlanningSchedule.prototype.addShiftSubEvents = function(){
    $('#sc_add_sc').html(spView.schedulerFilter());
    $('#sc_add_lo').html(spView.locationSelector());
    
    var emp = {};
    if (this.edit != false){
        console.log(this.shift);
        emp = this.shift;
        emp.start_date.formatted = Date.parse(emp.start_date.formatted + ' ' + emp.start_time.time).getTime()/1000;
        emp.end_date.formatted = Date.parse(emp.end_date.formatted + ' ' + emp.end_time.time).getTime()/1000;
        if (emp.schedule != null) $('#sc_add_sc').val(emp.schedule);
        if (emp.schedule != null) $('#sc_add_sc').val(emp.schedule);
    } else {
        emp.start_date = {};
        emp.end_date = {};
        emp.start_date.formatted = Date.parse('today at 9am').getTime()/1000;
        emp.end_date.formatted = Date.parse('today at 5pm').getTime()/1000;
    }
    
    var s = new Date(emp.start_date.formatted*1000);
    var e = new Date(emp.end_date.formatted*1000);
    
    var tf = (cal.tmode == 24)? 'HH:mm' : 'hh:mm tt';
    
    $('#sc_date_st').scroller('destroy');
    $('#sc_date_st').val(s.toString(tf));
    $("#sc_date_st").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    
    
    $('#sc_date_et').scroller('destroy');
    $('#sc_date_et').val(e.toString(tf));
    $("#sc_date_et").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    
    $('#sc_date_sd').scroller('destroy');
    $('#sc_date_sd').val(s.toString(cal.dformat));
    $('#sc_date_sd').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    $('#sc_date_ed').scroller('destroy');
    $('#sc_date_ed').val(e.toString(cal.dformat));
    $('#sc_date_ed').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    
    $('#sc_add_no').val((this.edit) ? emp.notes : '');
    $('#sc_add_ti').val((this.edit) ? emp.title : '');
//    $('#tc_act_sc').val((this.edit) ? (emp.schedule != null) ? emp.schedule.id : 0 : 0);

    if (this.edit){
        $('#sc_add_add span').html('Save Shift');
    } else {
        $('#sc_add_add span').html('Add Shift And Set Users');
    }
    
    //prepare users
    if (this.edit){
        $('#sc_add_user .working').html($.tmpl($('#te_sc_users'), this.prepareStaff(emp.staff.scheduled)));
        $('#sc_add_user .available').html($.tmpl($('#te_sc_users'), this.prepareStaff(emp.staff.available)));
        $('#sc_add_user').show();
    }

    this.edit = false;
}

ShiftPlanningSchedule.prototype.prepareStaff = function(staff){
    var l = staff.length;
    var res = []
    while (l--){
        res.push(sp.staff.data.employees[staff[l][0]]);
    }
    
    return res;
}

ShiftPlanningSchedule.prototype.nextPrevPrepare = function(){
    $('#sc_mo_di').html(Date.parse($.trim($('#sc_to_sub').html())).toString('MMMM yyyy'));
    if (this.page == 'today'){
        $('.subNavigation .schedule li a[subpage=day]').trigger(clickEvent);
    } else if (this.page == 'day'){
        this.displayShifts();
    } else if (this.page == 'month'){
        
    }
}

ShiftPlanningSchedule.prototype.displayShifts = function(){
    var self = this;
    if (this.page == 'month'){
        this.generateCalendar();
    }
    $('#sc_td_list').parent().hide();
    $('#sc_td .loading').show();
    $('#sc_td .additional').hide();
    $('#sc_ca_bo').parent().addClass('loading');

    
    var data = this.getSettings();
    
    spModel.schedule.get('shifts', data, function(response){
        $('#sc_ca_bo').parent().removeClass('loading');
        if (response.data.length > 0){
            if (self.page == 'month'){
                self.fillCalendar(response.data);
                $('#sc_td_list').html($.tmpl($('#te_sc_shifts_months'), self.shifts));
            } else {
                $('#sc_td_list').html($.tmpl($('#te_sc_shifts'), response.data));
            }
            $('#sc_td_list').parent().show();
            $('#sc_td .loading').hide();
            
        } else {
            $('#sc_td_list').parent().hide();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').show();
        }
    });
}

ShiftPlanningSchedule.prototype.fillCalendar = function(data){
    var res = {};
    $.each(data, function(i, item){
        if (typeof res[item.start_date.day + ''] == 'undefined'){
            res[item.start_date.day + ''] = {
                dateToday : item.start_date.formatted,
                shifts : []
            };
        }
        res[item.start_date.day+ ''].shifts.push(item);
    });
    console.log(res);
    $('#sc_ca_bo td').removeClass('hasAny');
    
    var fin = []
    $.each(res, function(i, item){
        fin[i] = item;
        $('#sc_ca_fi_' + i).addClass('hasAny');
    });
    
    
    
    this.shifts = fin;
}

ShiftPlanningSchedule.prototype.getColorsBySchedule = function(id){
    if (typeof sp.schedule.data.schedules[id] != 'undefined'){
        return sp.raw.config.newcolorsets[sp.schedule.data.schedules[id].color];
    } else {
        return ['000', 'aaa', 'fff', 'fff', '000'];
    }
}

ShiftPlanningSchedule.prototype.getSettings = function(){
    if (this.page != 'month'){
        this.settings.start_date = Date.parse($.trim($('#sc_to_sub').html())).toString(cal.dformat);
        this.settings.end_date = Date.parse($.trim($('#sc_to_sub').html())).toString(cal.dformat);
    } else {
        this.settings.start_date = Date.parse($.trim($('#sc_to_sub').html())).moveToFirstDayOfMonth().toString(cal.dformat);
        this.settings.end_date = Date.parse($.trim($('#sc_to_sub').html())).moveToLastDayOfMonth().toString(cal.dformat);
    }
    
    return this.settings;
}

ShiftPlanningSchedule.prototype.setSettings = function(){
    $('#sc_start_day').val(this.settings.start_date);
    $('#sc_end_day').val(this.settings.end_day);
    $('#sc_mode').val(this.settings.end_day);
    $('#sc_schedule').val(this.settings.end_day);
}

ShiftPlanningSchedule.prototype.generateCalendar = function(){
    var month = '';
    
    
    //now attach selection
    $('#sc_ca_he').html(this.generateTop());
    $('#sc_ca_bo').html(this.generateMiddle());
}




ShiftPlanningSchedule.prototype.generateTop = function(){
    var b = cal.startday - 1;
    var res = '';
    if (b>0){
        for (var i = b; i<7; i++){
            res += '<th>' + daysOfWeekS[i] + '</th>';
        }
        for (var i = 0; i<b; i++){
            res += '<th>' + daysOfWeekS[i] + '</th>';
        }
    } else {
        for (var i = 0; i<7; i++){
            res += '<th>' + daysOfWeekS[i] + '</th>';
        }
    }
    
    return res;
}

ShiftPlanningSchedule.prototype.generateMiddle = function(currentDate){
    //definig rows
    var rows;
    
    //define days from old month
    var bm;
    
    //define current day full date
    var cD = (typeof currentDate == 'undefined') ? $.trim($('#sc_mo_di').html()) : currentDate;
    
    //
    
    //start of month
    var s = Date.parse(cD).moveToFirstDayOfMonth().getDate();
    
    //end of month
    var e = Date.parse(cD).moveToLastDayOfMonth().getDate();
    
    //position from which we start calendar
    var startPosition = Date.parse(cD).moveToFirstDayOfMonth().getDay() - (cal.startday - 1);
    
    //how much days had last month
    var lM = Date.parse($.trim($('#sc_to_sub').html())).addMonths(-1).moveToLastDayOfMonth().getDate();
    
    //calculate how much days to display from old month
    if (startPosition >= 0){
        bm = startPosition;
    } else {
        bm = 7 + startPosition;
    }
   
    
    //calculate last month
    var startDayLastMonth = (lM - bm) + 1;
    
    //number of displayed days in this month;
    
    var res = '';
    
    var daysArray = new Array();
    
    for (var i = startDayLastMonth; i <= lM; i++){
        daysArray.push('<td class="notM">' + i + '</td>');
    }
    
    for (var i = s; i <= e; i++){
        daysArray.push('<td id="sc_ca_fi_' + i + '" time="' + i + '">' + i + '</td>');
    }
    
    var cp = 7 - (daysArray.length % 7);
    
    for (var i = 1; i<= cp; i++){
        daysArray.push('<td class="notM">' + i + '</td>');
    }
    
    for (var c = 0; c < daysArray.length / 7; c++){
        res += '<tr>' + daysArray.slice(c * 7, (c+1) * 7).join('') + '</tr>';
    }
    //class "today" is for selecting today
    return res;
}

ShiftPlanningSchedule.prototype.fixCalendar = function(){
    
}


ShiftPlanningSchedule.prototype.loadPage = function(){
    console.log('test');
    var opt = '';
    opt += '<option value="employee">My Schedules</option>';
    opt += '<option value="overview">Schedule Overview</option>';
    opt += spView.schedulerFilter();
    $('#sc_fl').html(opt);
    
    this.generateCalendar();
}