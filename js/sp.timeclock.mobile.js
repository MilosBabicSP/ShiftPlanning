ShiftPlanningTimeClock.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.overviewEvents();
        self.addClockTimeEvents();
        self.manageTimeSheetsEvents();
    });
}

ShiftPlanningTimeClock.prototype.loadSubPageEvents = function(subpage){
    this[subpage + 'SubEvents']();
}

ShiftPlanningTimeClock.prototype.overviewEvents = function(){
    var self = this;
    $('#tc_ov_ci').bind(clickEvent, function(e){
        e.preventDefault();
        spModel.timeclock.get('clockin', {}, function(response){
            $('#tc_ov_cb span.fr a').hide();
            $('#tc_ov_cf').show();
            $('#tc_ov_co').show();
            $('#tc_ov_ca').attr('rel', response.data.id);
        });
    });
    
    $('#tc_ov_co').bind(clickEvent, function(e){
        e.preventDefault();
        spModel.timeclock.get('clockout', {}, function(response){
            $('#tc_ov_cb span.fr a').hide();
            $('#tc_ov_cf').hide();
            $('#tc_ov_ci').show();
        });
    });
    
    $('#tc_ov_ss').bind('change', function(){
        self.saveClockInChanges();
    });
    
    $('#tc_ov_no').bind('blur', function(){
        self.saveClockInChanges();
    });
    
    $('#tc_ov_sa').bind(clickEvent, function(e){
        e.preventDefault();
        self.saveClockInChanges();
    });
    
    $('#tc_ov_ca').bind(clickEvent, function(e){
        e.preventDefault();
        spModel.timeclock.dtc($(this).attr('rel'), function(){
            $('#tc_ov_cb span.fr a').hide();
            $('#tc_ov_cf').hide();
            $('#tc_ov_ci').show();
        });
    })
}

ShiftPlanningTimeClock.prototype.manageTimeSheetsEvents = function(){
    var self = this;
    $('#tc_mts_adv').bind(clickEvent, function(e){
        e.preventDefault();
        if ($('#tc_mts_hiin').hasClass('hidden')){
            $(this).html('Simple');
        } else {
            $(this).html('Advanced');
        }
        $('#tc_mts_hiin').toggleClass('hidden');
    });
    
    $('#tc_mts_tr').bind('change', function(){
        self.getTimeSheets();
    });
}

ShiftPlanningTimeClock.prototype.addClockTimeEvents = function(){
    var self = this;
    $('#tc_act_onci').bind(clickEvent, function(){
        $(this).toggleClass('check');
        $('#tc_act .multiInput .odd').toggleClass('nonVisible');
    });
    
    $('#tc_act_sa_b').bind(clickEvent, function(){
        self.saveClockTime(false);
    });
}

ShiftPlanningTimeClock.prototype.overviewSubEvents = function(){
    $('#tc_ov_cf').hide();
    $('#tc_ov_cb span.fr a').hide();
    $('#tc_ov_ss').html(spView.optionSchedules(sp.staff.admin.info.group >= 3 ? sp.staff.admin.info.id : 0));
    
    spModel.timeclock.get('status', {details : 1}, function(response){
        $('#tc_ov_cb span.fr a').hide();
        if (response.data != 'out'){
            $('#tc_ov_cf').show();
            $('#tc_ov_co').show();
            $('#tc_ov_ca').attr('rel', response.data.id);
        } else {
            $('#tc_ov_cf').hide();
            $('#tc_ov_ci').show();
        }
    });
}

ShiftPlanningTimeClock.prototype.manageTimeSheetsSubEvents = function(){
    var self = this;
    var s = Date.parse('today at 9am');
    var e = Date.parse('today at 5pm');
    
    var tf = (cal.tmode == 24)? 'HH:mm' : 'hh:mm tt';
    
    $('#tc_mts_sd_i').scroller('destroy');
    $('#tc_mts_sd_i').val(s.toString(cal.dformat));
    $('#tc_mts_sd_i').scroller({
        preset : 'date',
        dateFormat : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    $('#tc_mts_ed_i').scroller('destroy');
    $('#tc_mts_ed_i').val(e.toString(cal.dformat));
    $('#tc_mts_ed_i').scroller({
        preset : 'date',
        dateFormat : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
    });
    
    
    $('#tc_mts_tr').html(spView.timeRanges());
    $('#tc_mts_tr').val(3);
    
    
    $('#tc_mts_scl').html(spView.optionSchedules());
    $('#tc_mts_eml').html(spView.staffOption());
    
    self.getTimeSheets();
}

ShiftPlanningTimeClock.prototype.addClockTimeSubEvents = function(){
    $('#tc_act_sc').html(spView.optionSchedules(sp.staff.admin.info.group > 3 ? sp.staff.admin.info.id : 0));
    $('#tc_act_em').html(spView.staffOption(sp.staff.admin.info.group >= 4 ? true : false));
    
    
    
    var s = Date.parse('today at 9am');
    var e = Date.parse('today at 5pm');
    
    var tf = (cal.tmode == 24)? 'HH:mm' : 'hh:mm tt';
    
    $('#tc_act_tclin').scroller('destroy');
    $('#tc_act_tclin').val(s.toString(tf));
    $("#tc_act_tclin").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    

    
    //$('#tc_act_c_co_dp_i').val(outD.toString(cal.dformat));
    
    $('#tc_act_tclou').scroller('destroy');
    $('#tc_act_tclou').val(e.toString(tf));
    $("#tc_act_tclou").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    
    $('#tc_act_c_cl_dp_i').scroller('destroy');
    $('#tc_act_c_cl_dp_i').val(s.toString(cal.dformat));
    $('#tc_act_c_cl_dp_i').scroller({
        preset : 'date',
        dateFormat : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
    });
    
    $('#tc_act_c_co_dp_i').scroller('destroy');
    $('#tc_act_c_co_dp_i').val(e.toString(cal.dformat));
    $('#tc_act_c_co_dp_i').scroller({
        preset : 'date',
        dateFormat : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
    });
}
















// Functions
ShiftPlanningTimeClock.prototype.getTimeSheets = function(){
    var self = this;
    var d = {};
    
    var period = $('#tc_mts_tr').val();
    var times = {};
    if (period != "-1"){
        times = spRanges.getRange('times', period);
    } else {
        times = {
            start_time : strtotime($('#tc_mts_sd_i').val()),
            end_time : strtotime($('#tc_mts_ed_i').val())
        }
    }
    
    $('#tc_mts_sd_i').val(date(sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat), times.start_time));
    $('#tc_mts_ed_i').val(date(sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat), times.end_time));
    
    d.start_date = times.start_time;
    d.end_date = times.end_time;
    
    spModel.timeclock.get('timeclocks', d, function(response){
       self.renderManageTimeSheets(response.data); 
    });
}

ShiftPlanningTimeClock.prototype.renderManageTimeSheets = function(data){
    var l = data.length;
    var res = {};
    while (l--){
        var item = data[l];
        var ident = (Date.parse(item.in_time.day).getTime()/1000) + '';
        if (typeof res[ident] == 'undefined'){
            res[ident] = {
                month : item.in_time.day,
                rest : [],
                ident : parseInt(ident)
            }
        }
        var obj = this.rItem(item);
        res[ident].rest.push(obj); 
    }
    
    $.each(res, function(i, item){
        res[i].rest.reverse();
    });
    var r = [];
    var counter = 0;
    $.each(res, function(i, item){
        r[counter] = item;
        counter++;
    });
    r.objSort('ident');
    r.reverse();
    
    
    
    $('#tc_mts_sh').html('');
    
    $('#tc_mts_sh').html($.tmpl($('#te_tc_mts_li'), r));
    
    //this.showHideTimeSheets();
}

ShiftPlanningTimeClock.prototype.rItem = function(item){
    var o = {}
    var status = 2;
    if (parseInt(item.approved_by) > 0){
        status = 1;
    }
    var dl = (item.in_location == item.out_location) ? '0' : '1';
    var sc = (item.schedule != null && typeof item.schedule.id != 'undefined') ? item.schedule.id : item.schedule;
    var scn = (item.schedule != null && typeof item.schedule.name != 'undefined') ? item.schedule.name : '';
    o = {
        id : item.id,
        name : item.employee.name,    
        user : item.employee.id,
        st : item.in_time,
        out : item.out_time,
        dl : dl,
        length : item.length,
        schedule : sc,
        scn : scn,
        status : status,
        approved_by : item.approved_by
    };
    
    return o;
}


ShiftPlanningTimeClock.prototype.showHideTimeSheets = function(){
    //$('#tc_mts_slist tr').removeClass('odd');
    var s = parseInt($('#tc_mts_tr').val());
    var e = parseInt($('#tc_mts_eml').val());
    var sc = parseInt($('#tc_mts_scl').val());
    var search = '';
    if (s != 0){
        search += '.s_' + s;
    }
    if (e != 0){
        search += '.e_' + e;
    }
    if (sc != 0){
        search += '.sc_' + sc;
    }
    $('#tc_mts_sh').find('tr').hide();
    $('#tc_mts_sh').find('tr'+search).show();
    
    
//    $('#tc_mts_slist tr').each(function(i, item){
//        if (i % 2 == 0){
//            $(this).addClass('odd');
//        }
//    })
}

ShiftPlanningTimeClock.prototype.saveClockInChanges = function(){
    var data = {
        id : $('#tc_ov_ca').attr('rel')
    }
    
    if ($('#tc_ov_ss').val() != 0){
        data.schedule = $('#tc_ov_ss').val();
    }
    
    if ($('#tc_ov_no').val() != 0){
        data.notes = $('#tc_ov_no').val();
    }
    
    spModel.timeclock.update('timeclock', data, function(response){
        console.log(response);
    });
}

ShiftPlanningTimeClock.prototype.saveClockTime = function(edit){
    var data = {};
    var f = 'create';
    if (edit == true){
        f = 'update';
        data.id = $('#tc_act_tc_id').val();
    }
    
    data.schedule = $('#tc_act_sc').val();
    data.employee = $('#tc_act_em').val();
    
    data.start_time = $('#tc_act_tclin').val();
    data.start_date = $('#tc_act_c_cl_dp_i').val();
    
    if (!$('#tc_act .multiInput .odd').hasClass('nonVisible')){
        data.end_time = $('#tc_act_tclou').val();
        data.end_date = $('#tc_act_c_co_dp_i').val();
    }
    
    data.notes = $('#tc_act_no').val();
    
    spModel.timeclock[f]('timeclock', data, function(response){
        $('.subNavigation div.timeClock ul.timeClock a[subpage=manageTimeSheets]').trigger(clickEvent);
    });
}


ShiftPlanningTimeClock.prototype.loadPage = function(){
    
}