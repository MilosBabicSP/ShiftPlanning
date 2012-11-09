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
        $('#sc_to_sub').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).add(-1).day().toString(cal.dformat));
        self.nextPrevPrepare('prev');
    });
    
    $('#sc_next_day').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_to_sub').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).add(1).day().toString(cal.dformat));
        self.nextPrevPrepare('next');
    });
    
    $('#sc_prev_month').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_mo_di').html(Date.parse($.trim($('#sc_mo_di').html())).addMonths(-1).toString('MMMM yyyy'));
        $('#sc_days_m').hide();
        self.displayShifts();
    });
    
    $('#sc_next_month').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_mo_di').html(Date.parse($.trim($('#sc_mo_di').html())).addMonths(1).toString('MMMM yyyy'));
        $('#sc_days_m').hide();
        self.displayShifts();
    });
    
    
    $('#sc_ca_bo').delegate('td:not(.notM)', clickEvent, function(){
        $('#sc_ca_bo td').removeClass('today');
        $(this).addClass('today');
        var i = $(this).attr('time');
        if (typeof self.shifts[i] != 'undefined'){
            $('#sc_td_list').parent().show();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').hide();
            $('#sc_td_list').html($.tmpl($('#te_sc_shifts'), self.shifts[i].shifts));
        } else {
            $('#sc_td_list').parent().hide();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').show();
        }
        $('#sc_to_sub').html(Date.parse(i + ' ' + $.trim($('#sc_mo_di').html())).toString(cal.dformat));
        $('#sc_days_m').show();
    });
    
    $('#sc_td_list').delegate('tr', clickEvent, function(e){
        if (!$(this).hasClass('isShift')){
            return false;
        }
        $(this).addClass('loading');
        spModel.schedule.get('shift', {
            id : $(this).attr('shiftId'), 
            detailed : 1
        }, function(response){
            self.shift = response.data;
            sp.loadSubPage('', 'schedule', 'shiftDisplay');
        });
    });
    
    $('#schedule .shiftDisplay .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        if(self.fromUpcoming){
            self.fromUpcoming = false;
            $('.subNavigation').show();
                    if(self.fromStaff){
                self.fromStaff = false;
                $('.subNavigation .schedule').hide()
                $('.staff .subWrapp ul li a[subpage=list]').trigger(clickEvent);
                sp.staff.displayEmployee($('#da_se_cur_us_id').val());
                $('#dashboard .search.settings.mainSub li a[subpage=upcomingShifts]').trigger(clickEvent);
            }else{
            $('.subNavigation .dashboard li a[subpage=settings]').trigger(clickEvent);
            $('#dashboard .search.settings.mainSub li a[subpage=upcomingShifts]').trigger(clickEvent);
            }
        }else{
        if(self.fromRecent){
            self.fromRecent = false;
            $('.subNavigation').show();
                    if(self.fromStaff){
                self.fromStaff = false;
                $('.subNavigation .schedule').hide()
                $('.staff .subWrapp ul li a[subpage=list]').trigger(clickEvent);
                sp.staff.displayEmployee($('#da_se_cur_us_id').val());
                $('#dashboard .search.settings.mainSub li a[subpage=recentShifts]').trigger(clickEvent);
            }else{
            $('.subNavigation .dashboard li a[subpage=settings]').trigger(clickEvent);
            $('#dashboard .search.settings.mainSub li a[subpage=recentShifts]').trigger(clickEvent);
            }
        }else{
            if (self.fromDashboard){
                self.fromDashboard = false;
                $('.subNavigation').show();
                $('.subNavigation .dashboard li a[subpage=upcomingShifts]').trigger(clickEvent);
            } else {
                if ($('#sc_sub_shift_display ul a.publish').attr('first') == 'false'){
                    self.resetPublishFields(true);
                } else {
                    $('.subNavigation .schedule li.active a').trigger(clickEvent);
                }
              }
            }
          }
    });
    
    $('#schedule .addShift .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        if ($(this).attr('bck') == 'edit'){
            spModel.schedule.get('shift', {
                id : $('#sc_edit_id').val(), 
                detailed : 1
            }, function(response){
                self.shift = response.data;
                sp.loadSubPage('', 'schedule', 'shiftDisplay');
            });
        } else {
            $('.subNavigation .schedule li.active a').trigger(clickEvent);
        }
    });
    
    $('#sc_sub_shift_display ul a.edit').bind(clickEvent, function(e){
        e.preventDefault();
        var o = $(this);
        o.addClass('loading');
        spModel.schedule.get('shift', {
            id : $(this).attr('rel'), 
            detailed:  1
        }, function(response){
            o.removeClass('loading');
            self.shift = response.data;
            self.edit = true;
            sp.loadSubPage('', 'schedule', 'addShift');
        }, function(){
            o.removeClass('loading');
        });
    });
    $('#sc_sub_shift_display ul a.delete').bind(clickEvent,function(e){
        e.preventDefault();
        var shiftId = $(this).attr('rel');  
        var obj = $(this);        
        if($(this).attr('first') == 'true'){
                spModel.schedule.del('shift',{id:shiftId,rule:$('#te_sc_shift_display_delete .radio.check').attr('value')},function(response){
                    sp.showSuccess(response.data);
                    setTimeout(function(){
                        $('#schedule .shiftDisplay .backMenu').trigger(clickEvent)
                    },3000);
                }) 
                obj.attr('first','false');
        }else{
        spModel.schedule.get('shift',{id:shiftId,detailed:1},function(response){
            self.shift=response.data;
            if(typeof self.shift.repeats == 'undefined' || self.shift.repeats == 0){
                spModel.schedule.del('shift',{id:shiftId},function(response){
                    sp.showSuccess(response.data);
                    setTimeout(function(){
                        $('#schedule .shiftDisplay .backMenu').trigger(clickEvent)
                    },3000);
                })
            }else{
                $('#te_sc_shift_display_info').hide();
                $('#te_sc_shift_display_delete').show();
                obj.attr('first','true');
            }
        })
        }
    })
    $('#sc_sub_shift_display ul a.publish').bind(clickEvent, function(e){
	e.preventDefault();
	if ($(this).attr('first') == 'true'){
	    $('#te_sc_shift_display_info').hide();
	    $('#te_sc_shift_display_publish').show();
	    $(this).attr('first', 'false');
	    return false;
	}
	var obj = $(this);
	obj.addClass('loading');
	if (typeof self.conflicts[obj.attr('rel')] != 'undefined'){
	    var c = confirm(self.conflicts[obj.attr('rel')].title);
	    if (c){
		spModel.schedule.get('publish', {shifts: obj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response){
		    sp.showSuccess(response.data);
		    obj.removeClass('loading');
		    obj.hide();
		    self.resetPublishFields(true);
		});
	    } else {
		obj.removeClass('loading');
	    }
	} else {
	    spModel.schedule.get('conflicts', {schedule : $(this).attr('rel')}, function(response){
		self.setConflicts(response.data);
		if (typeof self.conflicts[obj.attr('rel')] != 'undefined'){
		    var c = confirm(_s('This shift has conflicts, but you can\'t fix them from mobile app. Force publish?'));
		    if (c){
			spModel.schedule.get('publish', {shifts: obj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response){
			    sp.showSuccess(response.data);
			    obj.removeClass('loading');
			    obj.hide();
			    self.resetPublishFields(true);
			});
		    } else {
			obj.removeClass('loading');
		    }
		} else {
		    spModel.schedule.get('publish', {shifts: obj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response){
			sp.showSuccess(response.data);
			obj.removeClass('loading');
			obj.hide();
			self.resetPublishFields(true);
		    });
		}
	    });
	}
    });
    
    $('#sc_shift_display').delegate('#te_sc_shift_display_publish .radio', clickEvent, function(){
	$('#te_sc_shift_display_publish .radio').removeClass('check');
	$(this).addClass('check');
    });
    
    $('#sc_shift_display').delegate('#te_sc_shift_display_delete .radio', clickEvent, function(){
	$('#te_sc_shift_display_delete .radio').removeClass('check');
	$(this).addClass('check');
    });    
    
    $('#sc_shift_display').delegate('#te_sc_shift_display_publish .checkbox', clickEvent, function(){
	$(this).toggleClass('check');
	$('#tc_sc_shift_display_publish_textarea').toggle();
    });
    
    $('#sc_refresh').bind(clickEvent, function(e){
        e.preventDefault();
        self.displayShifts();
    });
    
    $('#sc_add').bind(clickEvent, function(e){
        e.preventDefault();
        sp.loadSubPage('', 'schedule', 'addShift');
    });
    
    $('#sc_add_add').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        var isEdit = ($('#sc_edit_id').val() != 0) ? true : false;
        obj.addClass('loading');
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
            data.id = $('#sc_edit_id').val();
        }

        spModel.schedule[method]('shift', data, function(response){
            spModel.schedule.get('shift', {
                id : response.data.id, 
                detailed : 1
            }, function(r1){
                if (!isEdit){
                    obj.removeClass('loading');
                    self.shift = r1.data;
                    self.edit = true;
                    sp.loadSubPage('', 'schedule', 'addShift');
                } else {
                    spModel.schedule.get('shift', {
                        id : $('#sc_edit_id').val(), 
                        detailed : 1
                    }, function(response){
                        self.shift = response.data;
                        sp.loadSubPage('', 'schedule', 'shiftDisplay');
                        sp.showSuccess(_s('Shift Updated'));
                    });
                }
            });
        }, function(){
            obj.removeClass('loading');
        });
    });
    
    $('#sc_add_user').delegate('.checkbox', clickEvent, function(){
        
        var data = {
            id : $('#sc_edit_id').val()
        }
        var obj = $(this);
        //add loader
        obj.parent().addClass('loading');
        
        if (obj.hasClass('check')){
            data.remove = obj.attr('user');
        } else {
            data.add = obj.attr('user');
        }
        spModel.schedule.update('shift', data, function(response){
            spModel.schedule.get('shift', {
                id : response.data.id, 
                detailed : 1
            }, function(r1){
                obj.parent().removeClass('loading');
                self.shift = r1.data;
                self.edit = true;
                sp.loadSubPage('', 'schedule', 'addShift');
            }, function(){
                obj.parent().removeClass('loading');
            });
        }, function(){
            obj.parent().removeClass('loading');
        });
    });
    
    $('#sc_edit_submenu .subMenu a').bind(clickEvent, function(e){
        var obj = $(this);
        e.preventDefault();
        obj.addClass('loading');
        spModel.schedule.update('shiftapprove', {
            id : $('#sc_edit_id').val()
        }, function(response){
            sp.showSuccess(_s('Shift approved'));
            obj.removeClass('loading');
            obj.hide();
        }, function(){
            obj.removeClass('loading');
        })
    });
	
}

ShiftPlanningSchedule.prototype.loadSubPageEvents = function(subpage){
    $('#sc_edit_id').val(0);
    $('.subNavigation').show();
    $('#sc_additional_menu').show();
    if (subpage == 'shiftDisplay' || subpage == 'addShift'){
        $('.subNavigation').hide();
    }
    
    if (subpage == 'addShift'){
        $('#sc_additional_menu').hide();
    }
    this[subpage + 'SubEvents']();
}

//sub events
ShiftPlanningSchedule.prototype.todaySubEvents = function(){
    $('#sc_to_sub').html(sp.raw.config.today.formatted);
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
    $('#sc_mo_di').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).add(1).day().toString('MMMM yyyy'));
    this.displayShifts();
}

ShiftPlanningSchedule.prototype.shiftDisplaySubEvents = function(){
    this.shift = this.cleanPerm(this.shift);
    if (this.fromDashboard || this.fromRecent || this.fromUpcoming){
        $('#sc_sub_shift_display a.delete').hide();
        $('#sc_sub_shift_display a.edit').hide();
	$('#sc_sub_shift_display a.publish').hide();
    } else {
        if (this.shift.perms == 0){
            $('#sc_sub_shift_display a.delete').hide();
            $('#sc_sub_shift_display a.edit').hide();
	    $('#sc_sub_shift_display a.publish').hide();
        } else if (this.shift.perms == 1){
            $('#sc_sub_shift_display a.delete').hide();
            $('#sc_sub_shift_display a.edit').hide();
	    $('#sc_sub_shift_display a.publish').hide();
        } else {
	    if (this.shift.published == 0){
		$('#sc_sub_shift_display a.publish').show();
		$('#sc_sub_shift_display a.publish span').html('Publish');
	    } else if (this.shift.published < this.shift.edited && this.shift.published != 0) {
		$('#sc_sub_shift_display a.publish').show();
		$('#sc_sub_shift_display a.publish span').html('Republish');
	    } else {
		$('#sc_sub_shift_display a.publish').hide();
	    }
	    if (sp.staff.admin.settings.draft == 0){
		$('#sc_sub_shift_display a.publish').hide();
	    }
	    $('#sc_sub_shift_display a.delete').show();
            $('#sc_sub_shift_display a.edit').show();
        }
	$('#sc_sub_shift_display a.publish').attr('first','true');
    }
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
	this.shift.user_location=sp.staff.admin.info.city+','+sp.staff.admin.info.state+','+sp.staff.admin.info.address;
    $('#sc_shift_display').html($.tmpl($('#te_sc_shift_display'), this.shift));
    
    
    this.resetPublishFields(true);
    
    $('#sc_sub_shift_display ul a').attr('rel', this.shift.id);
    
    if (this.shift.location != 0){
        $('#sc_location_iframe').html('<iframe  id="map" width="100%" height="220" frameborder="0" scrolling="no" src="http://' + googleIp + '/maps/?f=d&source=s_d&saddr=' + this.shift.location.address + '&hl=en&z=15&output=embed"></iframe>');
    }
}

ShiftPlanningSchedule.prototype.resetPublishFields = function(f){
    if (typeof f == 'undefined'){
	f = false;
    }
    
    if (f){
	$('#te_sc_shift_display_publish').hide();
	$('#te_sc_shift_display_info').show();
    }
    
    $('#te_sc_shift_display_publish .radio').removeClass('check');
    $('#te_sc_shift_display_publish .checkbox').removeClass('check');
    $('#te_sc_shift_display_publish .radio[value=1]').addClass('check');
    $('#tc_sc_shift_display_publish_textarea').hide();
    $('#tc_sc_shift_display_publish_textarea textarea').val('');
    $('#sc_sub_shift_display ul a.publish').attr('first', 'true');
}

ShiftPlanningSchedule.prototype.addShiftSubEvents = function(){
    var self = this;
    $('#sc_add_user').hide();
    $('#sc_add_sc').html(spView.schedulerFilter(0, true));
    $('#sc_add_lo').html(spView.locationSelector());
    $('#sc_add_add').removeClass('loading');
    var emp = {};
    if (this.edit != false){
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
    $('#sc_add_lo').val((this.edit) ? (emp.location != 0) ? emp.location.id : 0 : 0);
    
    if (this.edit){
        $('#sc_add_add span').html(_s('Save Shift'));
        $('#sc_edit_id').val(emp.id);
        $('#sc_edit_submenu .backMenu').attr('bck', 'edit');
        if (emp.confirmed == 0 && emp.end_date.id < sp.raw.config.today.id && sp.staff.admin.settings.shift_confirm == 1){
            $('#sc_edit_submenu .subMenu').show();
        } else {
            $('#sc_edit_submenu .subMenu').hide();
        }
    } else {
        $('#sc_edit_submenu .subMenu').hide();
        $('#sc_edit_submenu .backMenu').attr('bck', 'add');
        $('#sc_add_add span').html(_s('Add Shift And Set Users'));
    }
    //prepare users
    if (this.edit){
        $('#sc_add_user .working ul').html((emp.staff.scheduled == null) ? spView.emptyResult(_s('No scheduled employees for selected shift'), 'li') : $.tmpl($('#te_sc_usersW'), this.prepareStaff(emp.staff.scheduled)));
        delete emp.staff.scheduled;
        
        $.each(emp.staff, function(i, item){
            if (item == null ){
                $('#sc_add_user div[type=' + i + ']').hide();
            } else {
                $('#sc_add_user div[type=' + i + '] ul.detailsGrid li ul').html($.tmpl($('#te_sc_users'), self.prepareStaff(item)));
				$('#sc_add_user div[type=' + i + ']').show();
            }
        });		
        $.each($('#sc_add_user .detailsGrid ul'), function(i, item){
            $.each($(item).find('li'), function(iV2, itemV2){
                if (iV2 % 2 == 0){
                    $(this).addClass('even');
                } else {
                    $(this).addClass('odd');
                }
            });
        });
        $('#sc_add_user').show();
    }

    this.edit = false;
}

ShiftPlanningSchedule.prototype.prepareStaff = function(staff){
    var l = staff.length;
    var res = [];
    while (l--){
        res.push(sp.staff.data.employees[staff[l][0]]);
    }
    return res;
}

ShiftPlanningSchedule.prototype.nextPrevPrepare = function(type){
    var self = this;
    $('#sc_mo_di').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).toString('MMMM yyyy'));
    if (this.page == 'today'){
        $('.subNavigation .schedule li a[subpage=day]').trigger(clickEvent);
    } else if (this.page == 'day'){
        this.displayShifts();
    } else if (this.page == 'month'){
        var i = parseInt($('#sc_ca_bo .today').attr('time'));
        // get 
        var cD = $.trim($('#sc_mo_di').html());
        
        var sD = Date.parse(cD).moveToFirstDayOfMonth().getDate();

        //end of month
        var eD = Date.parse(cD).moveToLastDayOfMonth().getDate();
        if (type == 'prev'){
            if (i == 1){
                self.displayShifts(eD);
            } else {
                i--; 
                $('#sc_ca_fi_' + i).trigger(clickEvent)
            }
        } else {
            i++;
            if ($('#sc_ca_fi_' + i).length == 0){
                self.displayShifts(1);
            } else {
                $('#sc_ca_fi_' + i).trigger(clickEvent)
            }
        }
    }
}

ShiftPlanningSchedule.prototype.displayShifts = function(sDay){
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
	    response.data = self.cleanPerms(response.data);
            if (self.page == 'month'){
                self.fillCalendar(response.data);
                $('#sc_td_list').html($.tmpl($('#te_sc_shifts_months'), self.shifts));
                if (typeof sDay != 'undefined'){
                    $('#sc_ca_fi_' + sDay).trigger(clickEvent);
                }
            } else {
                $('#sc_td_list').html($.tmpl($('#te_sc_shifts'), response.data));
            }
            $('#sc_td_list').parent().show();
            $('#sc_td .loading').hide();
	    $('#sc_td_list .dTitle  span').each(function(){
                var o = $(this).find('t:last');
		if ($(o).html() != null){
		    $(o).html($(o).html().substr(0,($(o).html().length -2 )));
		}
            });
        } else {
            if (self.page == 'month'){
                if (typeof sDay != 'undefined'){
                    $('#sc_ca_fi_' + sDay).trigger(clickEvent);
                }
            }
            $('#sc_td_list').parent().hide();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').show();
        }
    });
}

ShiftPlanningSchedule.prototype.cleanPerms = function(data){
    var self = this;
    $.each(data, function(i, item){
	data[i] = self.cleanPerm(item);
    });
    
    return data;
}

ShiftPlanningSchedule.prototype.cleanPerm = function(data){
    if (data.employees != null){
	if (data.perms < 2 && sp.staff.admin.settings.visible_coworkers == 0){
	    var e = [];
	    $.each(data.employees, function(i, item){
		if (item.id == sp.staff.admin.info.id){
		    e.push(item);
		}
	    });
	    data.employees = e;
	}
    }
    
    return data;
}

ShiftPlanningSchedule.prototype.clearSchedules = function(){
    var schedules = {};
    $.each(sp.schedule.data.schedules, function(i, item){
	if (spView.checkPerm(item, true)){
	    schedules[i +''] = item;
	}
    });
    
    return schedules;
}

ShiftPlanningSchedule.prototype.checkSchedulePerm = function(scheduleID) {
    if (typeof sp.schedule.data.schedules[scheduleID] == 'undefined') {
	return 0;
    } else {
	return sp.schedule.data.schedules[scheduleID].perms;
    }
}

ShiftPlanningSchedule.prototype.fillCalendar = function(data) {
    var res = {};
    $.each(data, function(i, item){
        if (typeof res[item.start_date.day + ''] == 'undefined') {
            res[item.start_date.day + ''] = {
                dateToday : item.start_date.formatted,
                shifts : []
            };
        }
        res[item.start_date.day+ ''].shifts.push(item);
    });
    $('#sc_ca_bo td').removeClass('hasAny');
    
    var fin = []
    $.each(res, function(i, item){
        fin[i] = item;
        $('#sc_ca_fi_' + i).addClass('hasAny');
    });
    
    
    
    this.shifts = fin;
}

ShiftPlanningSchedule.prototype.getColorsBySchedule = function(id, color_id){
    if (typeof sp.schedule.data.schedules[id] != 'undefined') {
        if (typeof color_id != 'undefined'){
            console.log(sp.raw.config.newcolorsets[sp.schedule.data.schedules[id].color][color_id]);
            return sp.raw.config.newcolorsets[sp.schedule.data.schedules[id].color][color_id];
        } else {
            return sp.raw.config.newcolorsets[sp.schedule.data.schedules[id].color];
        }
    } else {
        return ['000', 'aaa', 'fff', 'fff', '000'];
    }
}

ShiftPlanningSchedule.prototype.getSettings = function(){
    if (this.page != 'month'){
        this.settings.start_date = Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).toString(cal.dformat);
        this.settings.end_date = Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).toString(cal.dformat);
    } else {
        this.settings.start_date = Date.parse($.trim($('#sc_mo_di').html())).moveToFirstDayOfMonth().toString(cal.dformat);
        this.settings.end_date = Date.parse($.trim($('#sc_mo_di').html())).moveToLastDayOfMonth().toString(cal.dformat);
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


ShiftPlanningSchedule.prototype.loadPage = function(){
    var opt = '';
    opt += _s('<option value="employee">My Schedules</option>');
    opt += _s('<option value="overview">Schedule Overview</option>');
    opt += spView.schedulerFilter();
    $('#sc_fl').html(opt);
    
    this.generateCalendar();
}