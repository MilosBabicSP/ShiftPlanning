ShiftPlanningTimeClock.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.overviewEvents();
        self.addClockTimeEvents();
        self.manageTimeSheetsEvents();
        self.displayTimeSheetsEvents();
    });
}

ShiftPlanningTimeClock.prototype.loadSubPageEvents = function(subpage){
    $('.subNavigation').show();
    if (subpage == 'displayTimeClock'){
        $('.subNavigation').hide();
    }
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
            $('#tc_ov_no').val('');
            $('#tc_ov_ss').val(0);
        });
    });
    
    $('#tc_ov_co').bind(clickEvent, function(e){
        e.preventDefault();
	var data = {}
	var notes = $.trim($('#tc_ov_no').val());
	if ($('#tc_ov_ss').val() != 0){
	    data.schedule = $('#tc_ov_ss').val();
	}
	if(sp.staff.admin.business.pref_tc_require_pos && $('#tc_ov_ss').val() == 0){
		sp.showError(_s('Please choose schedule first'));
		return false;
	}

	if (notes.length != 0 ){
	    data.notes = $('#tc_ov_no').val();
	}
	
	if(sp.staff.admin.business.pref_tc_require_notes && notes.length == 0){
		sp.showError(_s('Please provide some notes'));
		return false;
	}
        spModel.timeclock.get('clockout', data, function(response){
            $('#tc_ov_cb span.fr a').hide();
            $('#tc_ov_cf').hide();
            $('#tc_ov_ci').show();
        });
    });
    
    $('#tc_ov_ss').bind('change', function(){
        self.saveClockInChanges();
    });
    
//    $('#tc_ov_no').bind('blur', function(){
//        self.saveClockInChanges();
//    });
    
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
        if ($(this).val() != '-1'){
            self.getTimeSheets();
        }
    });
    
    $('#tc_mts_sh').delegate('li', clickEvent, function(e){
        if (e.target.className != 'tPending'){
            $(this).addClass('loading');
            spModel.timeclock.get('timeclock', {
                id : $(this).attr('timeclockId')
                }, function(response){
                self.current = response.data;
                sp.loadSubPage('', 'timeClock', 'displayTimeClock');
            });
        }
    });
    
    $('#timeClock .displayTimeClock .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        $('.subNavigation .timeClock li.active a').trigger(clickEvent);
    });
    
    $('#tc_mts_hiin select, #tc_mts_au').bind('change', function(){
        self.showHideTimeSheets();
    });
    
    $('#tc_dtc_buttons a').bind(clickEvent, function(e){
        e.preventDefault();
        var id = $(this).attr('rel');
        switch ($(this).attr('class')){
            case 'approve':
                spModel.timeclock.update('timeclock', {
                    id : id, 
                    approved : 1
                }, function(){
                    sp.showSuccess(_s('Timeclock updated'));
                    $('.subNavigation .timeClock li.active a').trigger(clickEvent);
                });
                break;
            case 'unapprove':
                spModel.timeclock.update('timeclock', {
                    id : id, 
                    approved : 0
                }, function(){
                    sp.showSuccess(_s('Timeclock updated'));
                    $('.subNavigation .timeClock li.active a').trigger(clickEvent);
                });
                break;
            case 'edit':
                self.edit = true;
                sp.loadSubPage('', 'timeClock', 'addClockTime');
                break;
            case 'delete':
                var c = confirm(_s('Are you sure?'));
                if (c){
                    spModel.timeclock.del('timeclock', {
                        id : id
                    }, function(){
                        $('.subNavigation .timeClock li.active a').trigger(clickEvent);
                    });
                }
                break;
        }
    });
    
    $('#tc_mts_sh').delegate('li span.tPending', clickEvent, function(e){
        $(this).parent('li').addClass('loading');
        spModel.timeclock.get('clockout', {
            employee : $(this).attr('user')
            }, function(){
            sp.showSuccess(_s('User clocked out'));
            self.getTimeSheets();
        });
    });
}

ShiftPlanningTimeClock.prototype.addClockTimeEvents = function(){
    var self = this;
    $('#tc_act_onci').bind(clickEvent, function(){
        $(this).toggleClass('check');
        $('#tc_act .detailsGrid .odd').toggleClass('nonVisible');
    });
    
    $('#tc_act_sa_b').bind(clickEvent, function(e){
        e.preventDefault();
        self.saveClockTime(false);
    });
}

ShiftPlanningTimeClock.prototype.displayTimeSheetsEvents = function(){
    var self=this;
    $('#tc_dts_au').bind('change',function(){
        self.showHideTimeSheetsPro();
    })
    $('#tc_dts_tr').bind('change',function(){
        if($(this).val() != '-1'){
            self.getMyTimeSheets();
        }
    })
}

ShiftPlanningTimeClock.prototype.displayTimeSheetsSubEvents = function (){
    var self=this;
    $('#tc_dts_tr').html(spView.timeRanges());
    $('#tc_dts_tr').val(3);
    this.getMyTimeSheets();
//    spModel.timeclock.get('timeclocks',{},function(response){
//        $('#tc_dts_ul').html($.tmpl($('#te_tc_dts_li'), response.data));
//        
//    })
}

ShiftPlanningTimeClock.prototype.overviewSubEvents = function(){
    $('#tc_ov_cf').hide();
    $('#tc_ov_cb span.fr a').hide();
    $('#tc_ov_ss').html(spView.optionSchedules(sp.staff.admin.info.id));
    $('#tc_ov_cb .icoClock').html('<time style="height:35px;display:block;">' + sp.raw.config.today.formatted + '</time>');
    
    $.ajax({
	url: 'index.php?timezone=true&id=' + sp.staff.admin.info.id,
	type: 'get',
	success: function(response){
	    $('#tc_ov_cb .icoClock').html(response);
	}
    });
    
    
    
    if (parseInt(sp.staff.admin.settings.tc_terminal_lock) == 0){
	$('#tc_ov_cb').show();
	$('#tc_ov_ad').hide();
	spModel.timeclock.get('status', {
	    details : 1
	}, function(response){
	    $('#tc_ov_cb span.fr a').hide();
	    if (response.data != 'out'){
		$('#tc_ov_cf').show();
		$('#tc_ov_co').show();
		$('#tc_ov_ca').attr('rel', response.data.id);
		if (response.data.schedule != null){
		    $('#tc_ov_ss').val(response.data.schedule.id)
		}
		if (response.data.notes != null){
		    $('#tc_ov_no').val(response.data.notes);
		}
	    } else {
		$('#tc_ov_cf').hide();
		$('#tc_ov_ci').show();
	    }
	});
    } else {
	$('#tc_ov_cb').hide();
	$('#tc_ov_cf').hide();
	$('#tc_ov_ad').show();
    }
    

    
    $('#tc_ov_cb .icoClock time').html(sp.raw.config.today.formatted);
    $('#tc_ov_cb .icoClock span').html(formatted('nowT'));
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
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
        onSelect : function(){
            $('#tc_mts_tr').val(-1);
            self.getTimeSheets();
        }
    });
    
    $('#tc_mts_ed_i').scroller('destroy');
    $('#tc_mts_ed_i').val(e.toString(cal.dformat));
    $('#tc_mts_ed_i').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
        onSelect : function(){
            $('#tc_mts_tr').val(-1);
            self.getTimeSheets();
        }
    });
    
    
    $('#tc_mts_tr').html(spView.timeRanges());
    $('#tc_mts_tr').val(3);
    
    
    $('#tc_mts_scl').html(spView.scheduleFilter(0, true));
    $('#tc_mts_eml').html(spView.staffFilter());
    self.getTimeSheets();
}

ShiftPlanningTimeClock.prototype.addClockTimeSubEvents = function(){
    var emp = {};
    if (this.edit != false){
        emp = this.current;
        $('#tc_act .title h3').html(_s('Edit Clock Time'));
        $('#tc_act_tc_id').removeClass('editOn').addClass('editOn');
        $('#tc_act_tc_id').val(emp.id);
	emp.in_time.time = sp.strReplace(['am','pm'],[' AM',' PM'],emp.in_time.time);
	emp.out_time.time = sp.strReplace(['am','pm'],[' AM',' PM'],emp.out_time.time);
	emp.in_time.day = Date.parse(emp.in_time.day).toString(cal.dformat);
	emp.out_time.day = Date.parse(emp.out_time.day).toString(cal.dformat);
    } else {
        $('#tc_act .title h3').html(_s('Add Clock Time'));
        $('#tc_act_tc_id').removeClass('editOn');
        emp.in_timestamp = Date.parse('today at 9am').getTime()/1000;
        emp.out_timestamp = Date.parse('today at 5pm').getTime()/1000;
    }
    
    $('#tc_act_sc').html(spView.optionSchedules(sp.staff.admin.info.group > 4 ? sp.staff.admin.info.id : 0));
    $('#tc_act_em').html(spView.staffOption(sp.staff.admin.info.group > 4 ? true : false));
    
    var s = new Date(emp.in_timestamp*1000);
    var e = new Date(emp.out_timestamp*1000);
    
    var tf = (cal.tmode == 24)? 'HH:mm' : 'hh:mm tt';
    
    $('#tc_act_tclin').scroller('destroy');
    $('#tc_act_tclin').val((this.edit) ? emp.in_time.time : s.toString(tf));
    $("#tc_act_tclin").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    

    
    //$('#tc_act_c_co_dp_i').val(outD.toString(cal.dformat));
    
    $('#tc_act_tclou').scroller('destroy');
    $('#tc_act_tclou').val((this.edit) ? emp.out_time.time : e.toString(tf));
    $("#tc_act_tclou").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    
    $('#tc_act_c_cl_dp_i').scroller('destroy');
    $('#tc_act_c_cl_dp_i').val((this.edit) ? emp.in_time.day : s.toString(cal.dformat));
    $('#tc_act_c_cl_dp_i').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    $('#tc_act_c_co_dp_i').scroller('destroy');
    $('#tc_act_c_co_dp_i').val((this.edit) ? emp.out_time.day : e.toString(cal.dformat));
    $('#tc_act_c_co_dp_i').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    
    $('#tc_act_no').val((this.edit) ? emp.notes : '');
    $('#tc_act_em').val((this.edit) ? emp.employee.id : 0);
    $('#tc_act_sc').val((this.edit) ? (emp.schedule != null) ? emp.schedule.id : 0 : 0);
    
    this.edit = false;
}

ShiftPlanningTimeClock.prototype.displayTimeClockSubEvents = function(){
    this.current.employee.avatar = sp.getAvatar(this.current.employee.id);
    $('#tc_dtc').html($.tmpl($('#te_tc_dtc'), this.current));
    $('#tc_dtc_buttons a').attr('rel', this.current.id);
    
    if (parseInt(this.current.approved_by) != 0){
        $('#tc_dtc_buttons a#tc_dtc_ap').removeClass('approve').removeClass('unapprove').addClass('unapprove');
    } else {
        $('#tc_dtc_buttons a#tc_dtc_ap').removeClass('approve').removeClass('unapprove').addClass('approve');
    }
}















// Functions
ShiftPlanningTimeClock.prototype.getTimeSheets = function(){
    $('#tc_mts_sh').html(spView.divLoader());
    var self = this;
    var d = {};
    
    var period = $('#tc_mts_tr').val();
    var times = {};
    if (period != "-1"){
        times = spRanges.getRange('times', period);
    } else {
        times = {
            start_time : Date.parse($('#tc_mts_sd_i').val()).getTime(),
            end_time : Date.parse($('#tc_mts_ed_i').val()).getTime()
        }
    }
    var p = new Date(times.start_time);
    var e = new Date(times.end_time);
    
    $('#tc_mts_sd_i').val(p.toString(cal.dformat));
    $('#tc_mts_ed_i').val(e.toString(cal.dformat));
    
    d.start_date = p.toString(cal.dformat);
    d.end_date = e.toString(cal.dformat);
    
    spModel.timeclock.get('timeclocks', d, function(response){
        self.renderManageTimeSheets(response.data); 
    });
}

ShiftPlanningTimeClock.prototype.getMyTimeSheets = function(){
    var self=this;
    var interval=$('#tc_dts_tr').val();
    var times={}
    var params={}
  
    times=spRanges.getRange('times', interval);
    
    var startT = new Date(times.start_time);
    var endT = new Date(times.end_time);
    
    params.start_date=startT.toString(cal.dformat);
    params.end_date=endT.toString(cal.dformat);
    params.employee=sp.staff.admin.info.id;
    
    spModel.timeclock.get('timeclocks',params,function(response){
        $('#tc_dts_ul').html($.tmpl($('#te_tc_dts_li'), response.data));
        self.showHideTimeSheetsPro();
        } 
    )
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
    
    this.showHideTimeSheets();
}

ShiftPlanningTimeClock.prototype.rItem = function(item){
    var o = {};
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

ShiftPlanningTimeClock.prototype.showHideTimeSheetsPro = function (){
    var sel=$('#tc_dts_au').val();
    switch(sel){
        case '2':
            $('#tc_dts_ul li').hide();
            $('#tc_dts_ul').find('li.app_0').show();
            break;
        case '1':
            $('#tc_dts_ul li').show();
            $('#tc_dts_ul').find('li.app_0').hide();
            break;
        case '0':
            $('#tc_dts_ul li').show();
            break;
    }
    var elm=$('#tc_dts_ul li:visible')
    if(elm.length == 0){
        $('#tc_dts_ul_msg').html(spView.emptyResult('No timesheets for selected filters'))  
    }else{
        $('#tc_dts_ul_msg').html('')
    }
}

ShiftPlanningTimeClock.prototype.showHideTimeSheets = function(){
    //$('#tc_mts_slist tr').removeClass('odd');
    var s = parseInt($('#tc_mts_au').val());
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
    
    $('#tc_mts_sh').find('li').hide();
    $('#tc_mts_sh').find('li'+search).show();
    
    $('#tc_mts_sh div.title').hide();
    $('#tc_mts_sh ul li:visible').parents('.timeSheet').prev().show();
    
    if ($('#tc_mts_sh ul li:visible').length > 0){
	$('#tc_mts_sh').next().hide();
    } else {
	$('#tc_mts_sh').next().show();
    }
    
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
    
    spModel.timeclock.update('timeclock', data, function(){
        sp.showSuccess(_s('Timeclock updated'));
    });
}

ShiftPlanningTimeClock.prototype.saveClockTime = function(){
    var data = {};
    var f = 'create';
    if ($('#tc_act_tc_id').hasClass('editOn') == true){
        f = 'update';
        data.id = $('#tc_act_tc_id').val();
    }
    
    data.schedule = $('#tc_act_sc').val();
    data.employee = $('#tc_act_em').val();
    
    data.start_time = $('#tc_act_tclin').val();
    data.start_date = $('#tc_act_c_cl_dp_i').val();
    
    if (!$('#tc_act .detailsGrid .odd').hasClass('nonVisible')){
        data.end_time = $('#tc_act_tclou').val();
        data.end_date = $('#tc_act_c_co_dp_i').val();
    }
    
    data.notes = $('#tc_act_no').val();
    
    spModel.timeclock[f]('timeclock', data, function(response){
	sp.showSuccess(_s('Clock Time added'));
        $('.subNavigation div.timeClock ul.timeClock a[subpage=manageTimeSheets]').trigger(clickEvent);
    });
}


ShiftPlanningTimeClock.prototype.loadPage = function(){
    
    }
