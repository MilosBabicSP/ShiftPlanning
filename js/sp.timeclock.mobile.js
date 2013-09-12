ShiftPlanningTimeClock.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.overviewEvents();
        self.addClockTimeEvents();
        self.manageTimeSheetsEvents();
        self.displayTimeSheetsEvents();
    });
}
var subpageTemp = '';
ShiftPlanningTimeClock.prototype.loadSubPageEvents = function(subpage){
    $('.subNavigation').show();
    if (subpage == 'displayTimeClock'){
        $('.subNavigation').hide();
    };
    if (!(subpageTemp == subpage && subpageTemp == 'addClockTime')){      
        subpageTemp = subpage;
        this[subpage + 'SubEvents']();
    }
}

ShiftPlanningTimeClock.prototype.overviewEvents = function(){
    var self = this;
    $('#tc_ov_ci').bind(clickEvent, function(e){
        e.preventDefault();
        var data = {};
        var done = false;
        var apiCall = function(){
            spModel.timeclock.get('clockin', data, function(response){
                $('#tc_ov_cb span.fr a').hide();
                $('#tc_ov_way_msg').hide();
                $('#tc_ov_cf').show();
                $('#tc_ov_co').show();
                $('#tc_ov_ca').attr('rel', response.data.id);
                $('#tc_ov_no').val('');
                $('#tc_ov_ss').val(0);
				$('#tc_ov_remote').val(0);
				if( typeof response.data.schedule !== "undefined" && response.data.schedule !== null && response.data.schedule !== "" ){
					$("#tc_ov_ss option[value=" + response.data.schedule.id + "]").attr("selected", "selected");
				}
            });
        }
        var errorCallback = function(){
            done = true;
            sp.showError(_s('Coordinates not available'));
            setTimeout(apiCall, 2000);
        }
        
        if (sp.staff.admin.business.pref_tc_gps == '1' && navigator.geolocation){
            
            setTimeout(function(){
                if(!done){
                    errorCallback();
                }
            },10000);
            
            sp.showSuccess(_s('Getting Coordinates'));
            
            
            navigator.geolocation.getCurrentPosition(
                //success
                function(response){
                    if(typeof response != 'function'){
                        done = true;
                        data.latitude = response.coords.latitude;
                        data.longitude = response.coords.longitude;
                        setTimeout(apiCall,2000);
                    }
                },
                //errorCallback
                errorCallback,
                //force gps use
                {enableHighAccuracy: true}
            );

        }else{
            apiCall();
        }
        
    });
    
    $('#tc_ov_way').bind(clickEvent, function(e){
        e.preventDefault();
        
        var data = {
            employee : sp.staff.admin.info.id
        };
        
        spModel.timeclock.create('preclockin', data, function(response){
            $('#tc_ov_way_msg .sc_way_time_since').html(response.data.formatted);
            $('#tc_ov_way_msg').show();
            $('#tc_ov_way').hide();
            $('#tc_ov_ci').show();
        });
    });
    
    $('#tc_ov_co').bind(clickEvent, function(e){
        e.preventDefault();
        var data = {}
        var notes = $.trim($('#tc_ov_no').val());
        if ($('#tc_ov_ss').val() != 0){
            data.schedule = $('#tc_ov_ss').val();
        }
        var done = false;
        var apiCall = function(){
            spModel.timeclock.get('clockout', data, function(response){
                $('#tc_ov_cb span.fr a').hide();
                $('#tc_ov_cf').hide();

                $('#tc_ov_ci').show();
                
                if(sp.staff.admin.business.pref_pre_time_clock == '1'){
                    $('#tc_ov_way').show();
                }
                if(sp.staff.admin.business.pref_mandatory_pre_time_clock == '1'){
                    $('#tc_ov_way').show();
                    $('#tc_ov_ci').hide();
                }
            });     
        };
        var errorCallback = function(){
            done = true;
            sp.showError(_s('Coordinates not available'));
            setTimeout(function(){
                apiCall();              
            }, 2000);
        }
        if(sp.staff.admin.business.pref_tc_require_pos && $('#tc_ov_ss').val() == 0){
            sp.showError(_s('Please choose schedule first'));
            return false;
        }
		
		if(sp.staff.admin.business.pref_tc_require_remote_site && $('#tc_ov_remote').val() == 0){
			sp.showError(_s('Please choose remote site first'));
            return false;
		}

        if (notes.length != 0 ){
            data.notes = $('#tc_ov_no').val();
        }
    
        if(sp.staff.admin.business.pref_tc_require_notes && notes.length == 0){
            sp.showError(_s('Please provide some notes'));
            return false;
        }
    
        if (sp.staff.admin.business.pref_tc_gps == '1' && navigator.geolocation){
            setTimeout(function(){
                if(!done){
                    errorCallback();
                }
            },10000);

            sp.showSuccess(_s('Getting Coordinates'));      
        
            navigator.geolocation.getCurrentPosition(
                //success
                function(response){
                    if(typeof response != 'function'){
                        done = true;
                        data.latitude = response.coords.latitude;
                        data.longitude = response.coords.longitude;
                        setTimeout(apiCall,2000);                   
                    }
                },
                errorCallback
                );
        
        } else {
            apiCall()
        }

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
    
	$('#tc_ov_remote').bind('change', function(){
		var id = $(this).val();
		var timeclock = $('#tc_ov_ca').attr('rel'); 
		if(id>0 && timeclock){
			sp.api('timeclock.event','CREATE',{timeclock:timeclock,type:'location',location:id}, function(response){
				if(response.status == '1'){
					sp.showSuccess('Remote Site Added');
				}
			});
		}
	});
	$('#tc_act_loc').bind('change', function(){
		var id = $(this).val();
		var timeclock = self.current.id;
		var isEdit = $('#tc_act_tc_id').hasClass('editOn');
		if(isEdit && id>0 && timeclock){
			sp.api('timeclock.event','CREATE',{timeclock:timeclock,type:'location',location:id}, function(response){
				if(response.status == '1'){
					sp.showSuccess('Remote Site Added');
				}
			});
		}
	});
	
    $('#tc_ov_ca').bind(clickEvent, function(e){
        e.preventDefault();
        spModel.timeclock.dtc($(this).attr('rel'), function(){
            $('#tc_ov_cb span.fr a').hide();
            $('#tc_ov_cf').hide();

            $('#tc_ov_ci').show();
            
            if(sp.staff.admin.business.pref_pre_time_clock == '1'){
                $('#tc_ov_way').show();
            }
            if(sp.staff.admin.business.pref_mandatory_pre_time_clock == '1'){
                $('#tc_ov_way').show();
                $('#tc_ov_ci').hide();
            }
        });
    });
	
	$('#tc_ov_cn').bind(clickEvent, function(e){
		e.preventDefault();
		var timeclock = $('#tc_ov_ca').attr('rel');
		sp.api('timeclock.event','CREATE',{timeclock:timeclock,type:'breakout'}, function(response){
			if(response.status == '1'){
				sp.showSuccess('Shift continued.');
				$('.subNavigation .timeClock a[subpage=overview]').trigger(clickEvent);
			}
		});
		
	});
	
	$('#tc_ov_cba').bind(clickEvent, function(e){
		e.preventDefault();
		var timeclock = $('#tc_ov_ca').attr('rel');
		sp.api('timeclock.event','CREATE',{timeclock:timeclock,type:'breakin'}, function(response){
			if(response.status == '1'){
				sp.showSuccess('Break started.');
				$('.subNavigation .timeClock a[subpage=overview]').trigger(clickEvent);
			}
		});
		
	});
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
        //var self = this;        
       // timeClockEditing = false;
        e.preventDefault();
        e.stopPropagation();
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
                timeClockEditing = true;
                $('#tc_act_onci').hide();   
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
	$('#tc_ov_remote').html(spView.locationFields(2));
    $('#tc_ov_cb .icoClock').html('<time style="height:35px;display:block;">' + sp.raw.config.today.formatted + '</time>');
    
    $.ajax({
        url: 'index.php?timezone=false&id=' + sp.staff.admin.info.id,
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
            var events = response.data.events,
				evLgth = events && events.length;
			
			if(events && events[evLgth - 1] && events[evLgth - 1].type == '1'){
				$('#tc_ov_cn').show();
				$('#tc_ov_cf').hide();
				$('#tc_ov_ca').attr('rel', response.data.id);
				return false;
			}
			
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
				var eventKey = response.data.events ? response.data.events.length : false;
				var events = response.data.events;
				if(eventKey){
					while(eventKey--){
						if(events[eventKey].type == '4'){
							$('#tc_ov_remote').val(events[eventKey].data.location);
							break;
						}
					}
				}
				
            } else {
                $('#tc_ov_cf').hide();
                
                var data = {
                    employee : sp.staff.admin.info.id
                };
                spModel.timeclock.get('preclockin', data, function(response){
                    if(response.data.status == '0'){
                        $('#tc_ov_way_msg .sc_way_time_since').html(response.data.formatted);
                        $('#tc_ov_way_msg').show();
                        $('#tc_ov_ci').show();
                    } else {
                        $('#tc_ov_ci').show();
                        
                        if(sp.staff.admin.business.pref_pre_time_clock == '1'){
                            $('#tc_ov_way').show();
                        }
                        if(sp.staff.admin.business.pref_mandatory_pre_time_clock == '1'){
                            $('#tc_ov_way').show();
                            $('#tc_ov_ci').hide();
                        }
                    }
                });
            }
        });
    } else {
        $('#tc_ov_cb').hide();
        $('#tc_ov_cf').hide();
        $('#tc_ov_ad').show();
    }
    
	if(sp.staff.admin.business.pref_enable_break_button == '1'){
		$('#tc_ov_cba').show();
	} else {
		$('#tc_ov_cba').hide();
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
var timeClockEditing = false;

ShiftPlanningTimeClock.prototype.addClockTimeSubEvents = function(){    
    var emp = {};  
    if (this.edit != false){        
        emp = this.current;
        $('#tc_etc_em option').attr("disabled", "");
        $('#tc_act_em option').attr("selected", "");
        $('#tc_act_em option[value='+emp.employee.id+']').attr("selected", "selected");
        $('#tc_act .title h3').html(_s('Edit Clock Time'));
        $('#tc_act_tc_id').removeClass('editOn').addClass('editOn');
        $('#tc_act_tc_id').val(emp.id);
        $('.addClockTime .odd').removeClass('nonVisible');
        $('#tc_act_onci').removeClass('check');
        emp.in_time.time = sp.strReplace(['am','pm'],[' AM',' PM'],emp.in_time.time);
        emp.out_time.time = sp.strReplace(['am','pm'],[' AM',' PM'],emp.out_time.time);
        emp.in_time.day = Date.parse(emp.in_time.day).toString(cal.dformat);
        emp.out_time.day = Date.parse(emp.out_time.day).toString(cal.dformat);
    } else {
        $('#tc_act .title h3').html(_s('Add Clock Time'));
        $('#tc_act_tc_id').removeClass('editOn');
        $('#tc_act_onci').show();
        emp.in_timestamp = Date.parse('today at 9am').getTime()/1000;
        emp.out_timestamp = Date.parse('today at 5pm').getTime()/1000;
    }
    
    $('#tc_act_sc').html(spView.optionSchedules(sp.staff.admin.info.group > 4 ? sp.staff.admin.info.id : 0));
	$('#tc_act_loc').html(spView.locationSelector());
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
    
	if(this.edit && this.current.events.length){
		var evnts = this.current.events.length;
		while(evnts--){
			if(this.current.events[evnts].type == '4'){
				$('#tc_act_loc').val(this.current.events[evnts].data.location);
				break;
			}
		}
	}
    
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
    $('#tc_dts_ul').html(spView.ulLoader());
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
    
    if (e != 0 && $('#tc_mts_eml').is("visible") ){
        search += '.e_' + e;
    }
    
    if (sc != 0 && $('#tc_mts_scl').is("visible") ){
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
    
    timeClockEditing = false;
}

ShiftPlanningTimeClock.prototype.saveClockTime = function(){
    var data = {};
    var f = 'get';
    var module = 'timeclock.addclocktime';
    var success = _s('Clock Time added');
    if ( $('#tc_act_tc_id').hasClass('editOn') === true ){
        f = 'update';
        module = 'timeclock.timeclock'
        data.id = $('#tc_act_tc_id').val();
        success = _s('Clock time edited');
        data.start_date = $('#tc_act_c_cl_dp_i').val() ;
        data.start_time = $('#tc_act_tclin').val();  
        data.end_date = $('#tc_act_c_co_dp_i').val();
        data.end_time = $('#tc_act_tclou').val();
    } else {
        data.datein = $('#tc_act_c_cl_dp_i').val() +' '+ $('#tc_act_tclin').val();    
        data.dateout = $('#tc_act_c_co_dp_i').val() + ' ' + $('#tc_act_tclou').val();  
		data.remote_site = $('#tc_act_loc').val();
    }
    
    data.schedule = $('#tc_act_sc').val();
    data.employee = $('#tc_act_em').val();
        
    if ( $('#tc_act_onci').hasClass('check') ) {
        data.onlyin = 1;
    }
    
    data.notes = $('#tc_act_no').val();
    
	if( checkTimes(data) === true || $('#tc_act .detailsGrid .odd').hasClass('nonVisible') ){
    	sp.api(module, f, data, function(response){
			sp.showSuccess(success);
			setTimeout(function(){
				var subpage = 'displayTimeSheets'
				if(sp.staff.admin.info.group <=2){
					subpage = 'manageTimeSheets';
				}
				$('.subNavigation div.timeClock ul.timeClock a[subpage='+subpage+']').trigger(clickEvent);
			},400);
		}, function(response){
			sp.showError(response.error);
		});
	}else{
		sp.showError("Please check your time and date input fields");
	}
}


ShiftPlanningTimeClock.prototype.loadPage = function(){
    
    }

function checkTimes( data ){
	var comparedDates = "";
    	var start_date_temp;
    	var end_date_temp;
		var start_time = "";
		var end_time = "";
		var splitedStart = "";
		var splitedEnd = "";
	
	if( typeof data.start_date !== "undefined" ){
    	start_date_temp = data.start_date;
    	end_date_temp = data.end_date;
		splitedStart = "";
		splitedEnd = "";
		
		if ( cal.dpformat === 'mm/dd/yy' ){
			splitedStart = start_date_temp.split('/');
			splitedEnd = end_date_temp.split('/');
			
            start_date_temp = splitedStart[2] + '/' + splitedStart[0] + '/' + splitedStart[1];
            end_date_temp = splitedEnd[2] + '/' + splitedEnd[0] + '/' + splitedEnd[1];
        }
		if ( cal.dpformat === 'dd-mm-yy' ){
			splitedStart = start_date_temp.split('-');
			splitedEnd = end_date_temp.split('-');
			
            start_date_temp = splitedStart[2] + '/' + splitedStart[1] + '/' + splitedStart[0];
            end_date_temp = splitedEnd[2] + '/' + splitedEnd[1] + '/' + splitedEnd[0];
        }
		comparedDates = dates.compare( new Date( start_date_temp + " " + data.start_time ), new Date( end_date_temp + " " + data.end_time ) );
	}else{
		if( typeof data.onlyin !== "undefined" ){
			return true;
		}else{
			start_time = data.datein.split(" ")[1];
			end_time = data.dateout.split(" ")[1];
			
			if( data.datein.split(" ").length > 2 ){
				start_time += ' ' + data.datein.split(" ")[2];
			}
			if( data.dateout.split(" ").length > 2 ){
				end_time += ' ' + data.dateout.split(" ")[2];
			}
			
			if ( cal.dpformat === 'mm/dd/yy' ){
				start_date_temp = data.datein.split(" ")[0];
				end_date_temp = data.dateout.split(" ")[0];
				splitedStart = start_date_temp.split('/');
				splitedEnd = end_date_temp.split('/');

				start_date_temp = splitedStart[2] + '/' + splitedStart[0] + '/' + splitedStart[1] + ' ' + start_time;
				end_date_temp = splitedEnd[2] + '/' + splitedEnd[0] + '/' + splitedEnd[1] + ' ' + end_time;
			}else if ( cal.dpformat === 'dd-mm-yy' ){
				start_date_temp = data.datein.split(" ")[0];
				end_date_temp = data.dateout.split(" ")[0];
				
				splitedStart = start_date_temp.split('-');
				splitedEnd = end_date_temp.split('-');

				start_date_temp = splitedStart[2] + '/' + splitedStart[1] + '/' + splitedStart[0] + ' ' + start_time;
				end_date_temp = splitedEnd[2] + '/' + splitedEnd[1] + '/' + splitedEnd[0] + ' ' + end_time;
			}else{
				start_date_temp = data.datein;
				end_date_temp = data.dateout;
			}
			comparedDates = dates.compare( new Date( start_date_temp ), new Date( end_date_temp ) );
		}
	}
	
	if( comparedDates < 0 ){
		return true;
	}else{
		return false;
	}
}
var dates = {
    convert:function(d) {
		/*
         Converts the date in d to a date-object. The input can be:
           a date object: returned without modification
          an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
           a number     : Interpreted as number of milliseconds
                          since 1 Jan 1970 (a timestamp) 
           a string     : Any format supported by the javascript engine, like
                          "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
          an object     : Interpreted as an object with year, month and date
                          attributes.  **NOTE** month is 0-11.
		*/
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
		/*
         Compare two dates (could be of any type supported by the convert
         function above) and returns:
          -1 : if a < b
           0 : if a = b
           1 : if a > b
         NaN : if a or b is an illegal date
         NOTE: The code inside isFinite does an assignment (=).
		*/
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
		/*
         Checks if date in d is between dates in start and end.
         Returns a boolean or NaN:
            true  : if d is between start and end (inclusive)
            false : if d is before start or after end
            NaN   : if one or more of the dates is illegal.
         NOTE: The code inside isFinite does an assignment (=).
		*/
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}