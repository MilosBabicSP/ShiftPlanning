ShiftPlanningTimeClock.prototype.initialize = function() {
    var self = this;
	this.moduleName = 'timeclock';
	if( initNeeded(this.moduleName) ){
		initializeModule(this.moduleName);
	}else{
		return false;
	}
    $(document).ready(function() {
        self.overviewEvents();
        self.addClockTimeEvents();
        self.manageTimeSheetsEvents();
        self.displayTimeSheetsEvents();
    });
}

var subpageTemp = '';
var timeClockEditing = false;
ShiftPlanningTimeClock.prototype.loadSubPageEvents = function(subpage) {
	if( initNeeded(this.moduleName) ){
		this.initialize();
		initializeModule(this.moduleName);
	}
    $("#gpsMap").hide();
    $('.subNavigation').show();
    if (subpage == 'displayTimeClock') {
        $('.subNavigation').hide();
    }
    //this[subpage + 'SubEvents']();

    if (!(subpageTemp == subpage && subpageTemp == 'addClockTime')) {
        subpageTemp = subpage;
        this[subpage + 'SubEvents']();
    }
}

ShiftPlanningTimeClock.prototype.isClockedIn = false;
ShiftPlanningTimeClock.prototype.dataIn = {};
ShiftPlanningTimeClock.prototype.dataOut = {};
ShiftPlanningTimeClock.prototype.apiCallIn = function() {
    $("#gpsMap").hide();
    sp.showSuccess(_s('ClockingIn'));
    console.log("CLOCKIN REQUEST => " + JSON.stringify( sp.timeClock.dataIn ) );
    spModel.timeclock.get('clockin', sp.timeClock.dataIn,
        function(response) {
            console.log("CLOCKIN RESPONSE => " + JSON.stringify( response ) );

            // CHECKING IF WE NEED TO START GPS TRACKING BACKGROUND SERVICE
            gUtils.shouldStartService(response.data);
            $('#tc_ov_cb span.fr a').hide();
            $('#tc_ov_way_msg').hide();
            $('#tc_ov_cf').show();
            $('#tc_ov_co').show();
            $('#tc_ov_ca').attr('rel', response.data.id);
            $('#tc_ov_no').val('');
            $('#tc_ov_ss').val(0);
            $('#tc_ov_remote').val(0);
            if( typeof response.data.schedule !== "undefined" && response.data.schedule !== null && response.data.schedule !== "" ){
                $("#tc_ov_ss").val( response.data.schedule.id );
            }
            sp.timeClock.isClockedIn = true;
        }, function error(err){
            /** Employee is already ClockedIn */
            $('.subNavigation .timeClock a[subpage=overview]').trigger(clickEvent);
        });
};

ShiftPlanningTimeClock.prototype.apiCallOut = function() {
    $("#gpsMap").hide();
    sp.showSuccess(_s('ClockingOut'));
    console.log("CLOCKOUT REQUEST => " + JSON.stringify( sp.timeClock.dataOut ) );
    spModel.timeclock.get('clockout', sp.timeClock.dataOut, function(response) {
        console.log("CLOCKOUT RESPONSE => " + JSON.stringify( response ) );
        // CHECKING IF WE NEED TO START GPS TRACKING BACKGROUND SERVICE
        gUtils.shouldStartService('out');
        $('#tc_ov_cb span.fr a').hide();
        $('#tc_ov_cf').hide();
        $('#tc_ov_cn').hide();
        $('#tc_ov_ci').show();

        if(sp.staff.admin.business.pref_pre_time_clock == '1'){
            $('#tc_ov_way').show();
        }
        if(sp.staff.admin.business.pref_mandatory_pre_time_clock == '1'){
            $('#tc_ov_way').show();
            $('#tc_ov_ci').hide();
        }
        sp.timeClock.isClockedIn = false;
    }, function error(err, err2){
        /** Employee is already ClockedOut */
        $('.subNavigation .timeClock a[subpage=overview]').trigger(clickEvent);
    });
};

ShiftPlanningTimeClock.prototype.overviewEvents = function() {
    var self = this;
//    console.log('device exit IP => ' + device.)
    $('#gpsRetry').bind(clickEvent, function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#gpsMap").hide();
        if( sp.timeClock.isClockedIn ){
            $('#tc_ov_cf').show();
            $('#tc_ov_co').click();
        }else{
            $('#tc_ov_ci').click();
        }
    });

    $('#gpsProceed').bind(clickEvent, function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#gpsMap").hide();
        if( sp.timeClock.isClockedIn ){
            $('#tc_ov_cf').show();
            setTimeout( sp.timeClock.apiCallOut, 500 );
        }else{
            setTimeout( sp.timeClock.apiCallIn, 500 );
        }
    });

    $('#tc_ov_ci').bind(clickEvent, function(e) {
        e.preventDefault();
        var data = {};
        var done = false;
        var errorCallback = function() {
            done = true;
            if( typeof gpsCoords.coords == "undefined" ){
                sp.showError(_s('Coordinates not available'));
                setTimeout(sp.timeClock.apiCallIn, 1000);
            }else{
                sp.showError(_s('New coordinates not available, using last known'));
                sp.timeClock.dataIn.latitude = gpsCoords.coords.latitude;
                sp.timeClock.dataIn.longitude = gpsCoords.coords.longitude;
				var latLong = sp.timeClock.dataIn.latitude + ',' + sp.timeClock.dataIn.longitude;
				$("#gpsMap .mapImage").html(gUtils.getMapStatic(latLong, 'static-map'));
				/*
                $("#gpsMap .mapImage").html('<iframe  id="map" width="100%" height="50%" frameborder="0" scrolling="no" src="http://google.com/maps?f=d&source=s_d&daddr=' + sp.timeClock.dataIn.latitude + ',' + sp.timeClock.dataIn.longitude + '&hl=en&z=19&output=embed&z=18"></iframe>');
				*/
                $("#gpsMap").show();
            }
        }
        if (sp.staff.admin.business.pref_tc_gps == '1' && navigator.geolocation) {
            sp.showSuccess(_s('Getting Coordinates'));
            getCurrentPosition(
                function(response) {
                    console.log("Location found => " + JSON.stringify( response ) );
                    if (typeof response != 'function') {
                        done = true;
                        sp.timeClock.dataIn.latitude = response.coords.latitude;
                        sp.timeClock.dataIn.longitude = response.coords.longitude;
						var latLong = sp.timeClock.dataIn.latitude + ',' + sp.timeClock.dataIn.longitude;
						$("#gpsMap .mapImage").html(gUtils.getMapStatic(latLong, 'static-map'));
						/*
                        $("#gpsMap .mapImage").html('<iframe  id="map" width="100%" height="50%" frameborder="0" scrolling="no" src="http://google.com/maps?f=d&source=s_d&daddr=' + sp.timeClock.dataIn.latitude + ',' + sp.timeClock.dataIn.longitude + '&hl=en&z=19&output=embed&z=18"></iframe>');
						*/
                        $("#gpsMap").show();
                    }
                }, errorCallback
            );
        } else {
            sp.timeClock.apiCallIn();
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
        }, function error(err){
            /** Employee is already on the way */
            $('.subNavigation .timeClock a[subpage=overview]').trigger(clickEvent);
        });
    });

    $('#tc_ov_co').bind(clickEvent, function(e) {
        e.preventDefault();
        var data = {}
        var notes = $.trim($('#tc_ov_no').val());
        if ($('#tc_ov_ss').val() != 0 && $('#tc_ov_ss').val() !== null ) {
            sp.timeClock.dataOut.schedule = $('#tc_ov_ss').val();
        };
        var done = false;
        var errorCallback = function() {
            done = true;
            if( typeof gpsCoords.coords == "undefined" ){
                sp.showError(_s('Coordinates not available'));
                setTimeout(sp.timeClock.apiCallOut, 1000);
            }else{
                sp.timeClock.dataOut.latitude = gpsCoords.coords.latitude;
                sp.timeClock.dataOut.longitude = gpsCoords.coords.longitude;
				
				var latLong = sp.timeClock.dataOut.latitude + ',' + sp.timeClock.dataOut.longitude;
				$("#gpsMap .mapImage").html(gUtils.getMapStatic(latLong, 'static-map'));
				/*
                $("#gpsMap .mapImage").html('<iframe  id="map" width="100%" height="50%" frameborder="0" scrolling="no" src="http://google.com/maps?f=d&source=s_d&daddr=' + sp.timeClock.dataOut.latitude + ',' + sp.timeClock.dataOut.longitude + '&hl=en&z=19&output=embed&z=18"></iframe>');
				*/
                $('#tc_ov_cf').hide();
                $("#gpsMap").show();
            }
        }

        if( parseInt( sp.staff.admin.business.pref_tc_require_pos ) == 1 && ( $('#tc_ov_ss').val() == 0 || $('#tc_ov_ss').val() == null ) ) {
            sp.showError(_s('Please choose schedule first'));
            return false;
        }

        if( parseInt( sp.staff.admin.business.pref_tc_require_remote_site ) == 1 && ( $('#tc_ov_remote').val() == 0 || $('#tc_ov_remote').val() == null ) ){
            sp.showError(_s('Please choose remote site first'));
            return false;
        }

        if(notes.length != 0) {
            sp.timeClock.dataOut.notes = $('#tc_ov_no').val();
        }

        if( parseInt( sp.staff.admin.business.pref_tc_require_notes ) == 1 && notes.length == 0) {
            sp.showError(_s('Please provide some notes'));
            return false;
        }

        if( parseInt( sp.staff.admin.business.pref_tc_gps ) == 1 && navigator.geolocation) {
            sp.showSuccess(_s('Getting Coordinates'));

            getCurrentPosition(
                function(response) {
                    console.log("Location found => " + JSON.stringify( response ) );
                    if (typeof response != 'function') {
                        sp.timeClock.dataOut.latitude = response.coords.latitude;
                        sp.timeClock.dataOut.longitude = response.coords.longitude;

						var latLong = sp.timeClock.dataOut.latitude + ',' + sp.timeClock.dataOut.longitude;
						$("#gpsMap .mapImage").html(gUtils.getMapStatic(latLong, 'static-map'));
						/*
                        $("#gpsMap .mapImage").html('<iframe  id="map" width="100%" height="50%" frameborder="0" scrolling="no" src="http://google.com/maps?f=d&source=s_d&daddr=' + sp.timeClock.dataOut.latitude + ',' + sp.timeClock.dataOut.longitude + '&hl=en&z=19&output=embed&z=18"></iframe>');
						*/
                        $('#tc_ov_cf').hide();
                        $("#gpsMap").show();
                    }
                }, errorCallback
            );
        } else {
            sp.timeClock.apiCallOut();
        }
    });

    $('#tc_ov_ss').bind('change', function() {
        self.saveClockInChanges();
    });

    //    $('#tc_ov_no').bind('blur', function(){
    //        self.saveClockInChanges();
    //    });
    $('#tc_ov_sa').bind(clickEvent, function(e) {
        e.preventDefault();
        self.saveClockInChanges();
    });

    $('#tc_ov_ca').bind(clickEvent, function(e) {
        e.preventDefault();
        tClockID = $(this).attr('rel');
        navigator.notification.confirm(_s('Are You sure?'), confRemoveTimeClock, "Delete This Time Clock");
/*
		 spModel.timeclock.dtc($(this).attr('rel'), function(){
		 $('#tc_ov_cb span.fr a').hide();
		 $('#tc_ov_cf').hide();
		 $('#tc_ov_ci').show();
		 });
		 */
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

    $('#tc_ov_cn').bind(clickEvent, function(e) {
        e.preventDefault();
        var timeclock = $('#tc_ov_ca').attr('rel');
        sp.api('timeclock.event', 'CREATE', {
            timeclock: timeclock,
            type: 'breakout'
        }, function(response) {
            sp.showSuccess('Shift continued.');
            $('.subNavigation .timeClock a[subpage=overview]').trigger(clickEvent);
        }, function error(err){
            /** Employee is already Back on the Shift */
            $('.subNavigation .timeClock a[subpage=overview]').trigger(clickEvent);
        });
    });

    $('#tc_ov_cba').bind(clickEvent, function(e) {
        e.preventDefault();
        var timeclock = $('#tc_ov_ca').attr('rel');
        sp.api('timeclock.event', 'CREATE', {
            timeclock: timeclock,
            type: 'breakin'
        }, function(response) {
            sp.showSuccess('Break started.');
            $('.subNavigation .timeClock a[subpage=overview]').trigger(clickEvent);
        }, function error(err){
             /** Employee is already on a break */
             $('.subNavigation .timeClock a[subpage=overview]').trigger(clickEvent);
         });
    });
}

ShiftPlanningTimeClock.prototype.manageTimeSheetsEvents = function() {
    var self = this;
    $('#tc_mts_adv').bind(clickEvent, function(e) {
        e.preventDefault();
        if ($('#tc_mts_hiin').hasClass('hidden')) {
            $(this).html('Simple');
        } else {
            $(this).html('Advanced');
        }
        $('#tc_mts_hiin').toggleClass('hidden');
    });

    $('#tc_mts_tr').bind('change', function() {
        if ($(this).val() != '-1') {
            self.getTimeSheets();
        }
    });

    $('#tc_mts_sh').on(clickEvent, 'li', function(e) {
        if (e.target.className != 'tPending') {
            $(this).addClass('loading');
            spModel.timeclock.get(
                'timeclock',
                { id: $(this).attr('timeclockId') },
                function (response) {
                    self.current = response.data;
                    sp.loadSubPage('', 'timeClock', 'displayTimeClock');
                },
                function (err) {
                    console.log(JSON.stringify(err));
                }
            );
        }
    });

    $('#timeClock .displayTimeClock .backMenu').bind(clickEvent, function(e) {
        e.preventDefault();
        $('.subNavigation .timeClock li.active a').trigger(clickEvent);
    });

    $('#tc_mts_hiin select, #tc_mts_au').bind('change', function() {
        self.showHideTimeSheets();
    });

    $('#tc_dtc_buttons a').bind(clickEvent, function(e) {
        e.preventDefault();
        var id = $(this).attr('rel');
        switch ($(this).attr('class')) {
        case 'approve':
            spModel.timeclock.update('timeclock', {
                id: id,
                approved: 1
            }, function() {
                sp.showSuccess(_s('Timeclock updated'));
                $('.subNavigation .timeClock li.active a').trigger(clickEvent);
            });
            break;
        case 'unapprove':
            spModel.timeclock.update('timeclock', {
                id: id,
                approved: 0
            }, function() {
                sp.showSuccess(_s('Timeclock updated'));
                $('.subNavigation .timeClock li.active a').trigger(clickEvent);
            });
            break;
        case 'edit':
			self.edit = true;
            timeClockEditing = true;
            this.edit = true;
            $('#tc_act_onci').hide();
//            $('#tc_act_tc_id').addClass('editOn');
            sp.loadSubPage('', 'timeClock', 'addClockTime');
            break;
        case 'delete':
            tClockID = id;
            navigator.notification.confirm(_s('Are you sure?'), confTimeClock, "TimeClock Delete");
            break;
        }
    });

    $('#tc_mts_sh').on(clickEvent, 'li span.tPending', function(e) {
        $(this).parent('li').addClass('loading');
        spModel.timeclock.get('clockout', {
            employee: $(this).attr('user')
        }, function() {
            sp.showSuccess(_s('User clocked out'));
            self.getTimeSheets();
        });
    });
}

ShiftPlanningTimeClock.prototype.addClockTimeEvents = function() {
    var self = this;

    $('#tc_act_onci').bind(clickEvent, function() {
        $(this).toggleClass('check');
        $('#tc_act .detailsGrid .odd').toggleClass('nonVisible');
    });

    $('#tc_act_sa_b').bind(clickEvent, function(e) {
        e.preventDefault();
        self.saveClockTime(false);
    });
}

ShiftPlanningTimeClock.prototype.displayTimeSheetsEvents = function() {
    var self = this;
    $('#tc_dts_au').bind('change', function() {
        self.showHideTimeSheetsPro();
    })
    $('#tc_dts_tr').bind('change', function() {
        if ($(this).val() != '-1') {
            self.getMyTimeSheets();
        }
    })
}

ShiftPlanningTimeClock.prototype.displayTimeSheetsSubEvents = function() {
    var self = this;
    $('#tc_dts_tr').html(spView.timeRanges());
    $('#tc_dts_tr').val(3);
    this.getMyTimeSheets();
    //    spModel.timeclock.get('timeclocks',{},function(response){
    //        $('#tc_dts_ul').html($.tmpl($('#te_tc_dts_li'), response.data));
    //
    //    })
}

ShiftPlanningTimeClock.prototype.overviewSubEvents = function() {

    $('#tc_ov_cf').hide();
    $('#tc_ov_cb span.fr a').hide();
    $('#tc_ov_ss').html(spView.optionSchedules(sp.staff.admin.info.id));
    var remoteSites = spView.locationFields(2);

    $('#tc_ov_remote').html(remoteSites);
    if( $('#tc_ov_remote option').size() <= 1 ){
        $('#tc_ov_remote').parent().hide();
        $('.lblRemoteLoc').hide();
    }else{
        $('#tc_ov_remote').parent().show();
        $('.lblRemoteLoc').show();
    }

    $('#tc_ov_cb .icoClock').html('<time style="height:35px;display:block;">' + sp.raw.config.today.formatted + '</time>');
    var t24hr = sp.staff.admin.settings['24hr'];
    if( t24hr != "0" ){
        t24hr = "&24hr=true";
    }else{
        t24hr = "";
    }

    $.ajax({
        url: _serverMob+'index.php?getDateTime=true&dtFormat='+sp.staff.admin.settings.date+'&tzName='+sp.staff.admin.info.timezone_name+t24hr,
        type: 'get',
        success: function(response) {
            $('#tc_ov_cb .icoClock').html(response);
        }
    });

    if (parseInt(sp.staff.admin.settings.tc_terminal_lock) == 0) {
        $('#tc_ov_cb').show();
        $('#tc_ov_ad').hide();
        $('#tc_ov_way_msg').hide();
        spModel.timeclock.get('status', {
            details: 1
        }, function(response) {
            var events = response.data.events,
                evLgth = events && events.length;
            if (events && events[evLgth - 1] && events[evLgth - 1].type == '1') {
                $('#tc_ov_cn').show();
                $('#tc_ov_cf').hide();
                $('#tc_ov_ca').attr('rel', response.data.id);
                return false;
            }
            $('#tc_ov_cb span.fr a').hide();

            // CHECKING IF WE NEED TO START GPS TRACKING BACKGROUND SERVICE
            gUtils.shouldStartService(response.data);
            if (response.data != 'out') {
                sp.timeClock.isClockedIn = true;
                $('#tc_ov_cf').show();
                $('#tc_ov_co').show();

                $('#tc_ov_ca').attr('rel', response.data.id);
                if (response.data.schedule != null) {
                    $('#tc_ov_ss').val(response.data.schedule.id)
                }
                if (response.data.notes != null) {
                    $('#tc_ov_no').val(response.data.notes);
                }
                var eventKey = response.data.events ? response.data.events.length : false;
                var events = response.data.events;
                if (eventKey) {
                    while (eventKey--) {
                        if (events[eventKey].type == '4') {
                            $('#tc_ov_remote').val(events[eventKey].data.location);
                            break;
                        }
                    }
                }
            } else {
                sp.timeClock.isClockedIn = false;
                $('#tc_ov_cf').hide();
                var data = {
                    employee: sp.staff.admin.info.id
                };
                spModel.timeclock.get('preclockin', data, function(response) {
                    if (response.data.status == '0') {
                        $('#tc_ov_way_msg .sc_way_time_since').html(response.data.formatted);
                        $('#tc_ov_way_msg').show();
                        $('#tc_ov_ci').show();
                    } else {
                        $('#tc_ov_ci').show();
                        if (sp.staff.admin.business.pref_pre_time_clock == '1') {
                            $('#tc_ov_way').show();
                        }
                        if (sp.staff.admin.business.pref_mandatory_pre_time_clock == '1') {
                            $('#tc_ov_way').show();
                            $('#tc_ov_ci').hide();
                        }
                    }
                });
            }
        });
    } else {
        sp.timeClock.isClockedIn = false;
        $('#tc_ov_cb').hide();
        $('#tc_ov_cf').hide();
        $('#tc_ov_ad').show();
    }
    if( parseInt( sp.staff.admin.business.pref_enable_break_button ) == 0 ){
    	$("#tc_ov_cba").hide();
   	}else{
   		$("#tc_ov_cba").show();
   	}
    $('#tc_ov_cb .icoClock time').html(sp.raw.config.today.formatted);
    $('#tc_ov_cb .icoClock span').html(formatted('nowT'));

    /**
    * Display message if GPS location is required
    */
    if (sp.staff.admin.business.pref_tc_gps == '1') {
        $("#tc_ov_note").show();
    }else{
        $("#tc_ov_note").hide();
    }
}

ShiftPlanningTimeClock.prototype.manageTimeSheetsSubEvents = function() {
    var self = this;
    var s = Date.parse('today at 9am');
    var e = Date.parse('today at 5pm');

    var tf = (cal.tmode == 24) ? 'HH:mm' : 'hh:mm tt';

    $('#tc_mts_sd_i').scroller('destroy');
    $('#tc_mts_sd_i').val(s.toString(cal.dformat));
    $('#tc_mts_sd_i').scroller({
        preset: 'date',
        dateFormat: (sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat).substr(2, sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat).length) : sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat),
        dateOrder: sp.strReplace(['MM', 'yyyy', ' ', '-', '/'], ['mm', 'yy', '', '', ''], cal.dformat),
        onSelect: function() {
            $('#tc_mts_tr').val(-1);
            self.getTimeSheets();
        }
    });

    $('#tc_mts_ed_i').scroller('destroy');
    $('#tc_mts_ed_i').val(e.toString(cal.dformat));
    $('#tc_mts_ed_i').scroller({
        preset: 'date',
        dateFormat: (sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat).substr(2, sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat).length) : sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat),
        dateOrder: sp.strReplace(['MM', 'yyyy', ' ', '-', '/'], ['mm', 'yy', '', '', ''], cal.dformat),
        onSelect: function() {
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

ShiftPlanningTimeClock.prototype.addClockTimeSubEvents = function() {
    var employee, emp = {};
    if (this.edit != false) {
        emp = timeClock = this.current;
        $('#tc_etc_em option').attr("disabled", "");
        $('#tc_act_em option').attr("selected", "");
        $('#tc_act_em').attr("disabled", "");

        $('#tc_act .title h3').html(_s('Edit Clock Time'));
        $('#tc_act_tc_id').removeClass('editOn').addClass('editOn');
        $('#tc_act_tc_id').val(emp.id);
        $('.addClockTime .odd').removeClass('nonVisible');
        $('#tc_act_onci').removeClass('check');

        emp.in_time.time = sp.strReplace(['am', 'pm'], [' AM', ' PM'], emp.in_time.time);
        emp.out_time.time = sp.strReplace(['am', 'pm'], [' AM', ' PM'], emp.out_time.time);
        emp.in_time.day = Date.parse(emp.in_time.day).toString(cal.dformat);
        emp.out_time.day = Date.parse(emp.out_time.day).toString(cal.dformat);
    } else {
        $('#tc_act .title h3').html(_s('Add Clock Time'));
        $('#tc_act_tc_id').removeClass('editOn');
        $('#tc_act_em').removeAttr('disabled');
        $('#tc_act_onci').show();
        emp.in_timestamp = Date.parse('today at 9am').getTime() / 1000;
        emp.out_timestamp = Date.parse('today at 5pm').getTime() / 1000;
    }

    $('#tc_act_sc').html(spView.optionSchedules(sp.staff.admin.info.group > 4 ? sp.staff.admin.info.id : 0));
	$('#tc_act_loc').html(spView.locationFields(2));
    if( $('#tc_act_loc option').size() <= 1 ){
		/**
		 * Hide Remote Sites List, since there aren't any
		 */
        $('#tc_act_loc').parent().hide();
        $('.lblRemoteLoc').hide();
    }else{
		/**
		 * Show Remote Sites List
		 */
        $('#tc_act_loc').parent().show();
        $('.lblRemoteLoc').show();
    }

    var preselect = (this.edit) ? true: undefined;

	spView._staffOption((sp.staff.admin.info.group > 4) ? true : false, preselect);

    var s = new Date(emp.in_timestamp * 1000);
    var e = new Date(emp.out_timestamp * 1000);

    var tf = (cal.tmode == 24) ? 'HH:mm' : 'hh:mm tt';

//    $('#tc_act_tclin').scroller('destroy');
//    $('#tc_act_tclin').val((this.edit) ? emp.in_time.time : s.toString(tf));
//    $("#tc_act_tclin").scroller({
//        preset: 'time',
//        ampm: (cal.tmode == 24 ? false : true),
//        stepMinute: 1,
//        timeFormat: sp.strReplace(['tt', 'mm'], ['A', 'ii'], cal.tstring)
//    });
//
//    //$('#tc_act_c_co_dp_i').val(outD.toString(cal.dformat));
//    $('#tc_act_tclou').scroller('destroy');
//    $('#tc_act_tclou').val((this.edit) ? emp.out_time.time : e.toString(tf));
//    $("#tc_act_tclou").scroller({
//        preset: 'time',
//        ampm: (cal.tmode == 24 ? false : true),
//        stepMinute: 1,
//        timeFormat: sp.strReplace(['tt', 'mm'], ['A', 'ii'], cal.tstring)
//    });
//
//    $('#tc_act_c_cl_dp_i').scroller('destroy');
//    $('#tc_act_c_cl_dp_i').val((this.edit) ? emp.in_time.day : s.toString(cal.dformat));
//    $('#tc_act_c_cl_dp_i').scroller({
//        preset: 'date',
//        dateFormat: (sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat).substr(2, sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat).length) : sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat),
//        dateOrder: sp.strReplace(['MM', 'yyyy', ' ', '-', '/'], ['mm', 'yy', '', '', ''], cal.dformat)
//    });
//
//    $('#tc_act_c_co_dp_i').scroller('destroy');
//    $('#tc_act_c_co_dp_i').val((this.edit) ? emp.out_time.day : e.toString(cal.dformat));
//    $('#tc_act_c_co_dp_i').scroller({
//        preset: 'date',
//        dateFormat: (sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat).substr(2, sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat).length) : sp.strReplace(['MM', 'yyyy'], ['mm', 'yy'], cal.dformat),
//        dateOrder: sp.strReplace(['MM', 'yyyy', ' ', '-', '/'], ['mm', 'yy', '', '', ''], cal.dformat)
//    });

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

ShiftPlanningTimeClock.prototype.displayTimeClockSubEvents = function() {
    this.current.employee.avatar = sp.getAvatar(this.current.employee.id);
    $('#tc_dtc').html($.tmpl($('#te_tc_dtc'), this.current));
    $('#tc_dtc_buttons a').attr('rel', this.current.id);

    if (typeof sp.timeClock.current.out_timestamp != "undefined") {
        if ("0" == sp.timeClock.current.out_timestamp) {
            $('#tc_dtc_buttons a.edit').css('display', 'none');
            $('#tc_dtc_buttons a.approve').css('display', 'none');
        } else {
            $('#tc_dtc_buttons a.edit').css('display', 'block');
            $('#tc_dtc_buttons a.approve').css('display', 'block');
        }
    }

    if (parseInt(this.current.approved_by) != 0) {
        $('#tc_dtc_buttons a#tc_dtc_ap').removeClass('approve').removeClass('unapprove').addClass('unapprove');
    } else {
        $('#tc_dtc_buttons a#tc_dtc_ap').removeClass('approve').removeClass('unapprove').addClass('approve');
    }
}















// Functions
ShiftPlanningTimeClock.prototype.getTimeSheets = function() {
    $('#tc_mts_sh').html(spView.divLoader());
    var self = this;
    var d = {};

    var period = $('#tc_mts_tr').val();
    var times = {};
    if (period != "-1") {
        times = spRanges.getRange('times', period);
    } else {
        times = {
            start_time: Date.parse($('#tc_mts_sd_i').val()).getTime(),
            end_time: Date.parse($('#tc_mts_ed_i').val()).getTime()
        }
    }

    var p = new Date(times.start_time);
    var e = new Date(times.end_time);

    $('#tc_mts_sd_i').val(p.toString(cal.dformat));
    $('#tc_mts_ed_i').val(e.toString(cal.dformat));

    d.start_date = p.toString(cal.dformat);
    d.end_date = e.toString(cal.dformat);

    spModel.timeclock.get(
        'timeclocks',
        d,
        function (response) {
            self.renderManageTimeSheets(response.data);
        },
        function (err) {
            console.log(JSON.stringify(err));
        }
    );
}

ShiftPlanningTimeClock.prototype.getMyTimeSheets = function() {
    $('#tc_dts_ul').html(spView.ulLoader());
    var self = this;
    var interval = $('#tc_dts_tr').val();
    var times = {}
    var params = {}

    times = spRanges.getRange('times', interval);

    var startT = new Date(times.start_time);
    var endT = new Date(times.end_time);

    params.start_date = startT.toString(cal.dformat);
    params.end_date = endT.toString(cal.dformat);
    params.employee = sp.staff.admin.info.id;

    spModel.timeclock.get('timeclocks', params, function(response) {
        $('#tc_dts_ul').html($.tmpl($('#te_tc_dts_li'), response.data));
        self.showHideTimeSheetsPro();
    });
}
ShiftPlanningTimeClock.prototype.renderManageTimeSheets = function(data) {
    var l = data.length;
    var res = {};

    while (l--) {
        var item = data[l];
        var ident = (Date.parse(item.in_time.day).getTime() / 1000) + '';
        if (typeof res[ident] == 'undefined') {
            res[ident] = {
                month: item.in_time.day,
                rest: [],
                ident: parseInt(ident)
            }
        }
        var obj = this.rItem(item);
        res[ident].rest.push(obj);
    }

    $.each(res, function(i, item) {
        res[i].rest.reverse();
    });

    var r = [];
    var counter = 0;
    $.each(res, function(i, item) {
        r[counter] = item;
        counter++;
    });

    r.objSort('ident');
    r.reverse();



    $('#tc_mts_sh').html('');
    $('#tc_mts_sh').html($.tmpl($('#te_tc_mts_li'), r));

    this.showHideTimeSheets();
}

ShiftPlanningTimeClock.prototype.rItem = function(item) {
    var o = {};
    var status = 2;
    if (parseInt(item.approved_by) > 0) {
        status = 1;
    }
    var dl = (item.in_location == item.out_location) ? '0' : '1';
    var sc = (item.schedule != null && typeof item.schedule.id != 'undefined') ? item.schedule.id : item.schedule;
    var scn = (item.schedule != null && typeof item.schedule.name != 'undefined') ? item.schedule.name : '';
    o = {
        id: item.id,
        name: item.employee.name,
        user: item.employee.id,
        st: item.in_time,
        out: item.out_time,
        dl: dl,
        length: item.length,
        schedule: sc,
        scn: scn,
        status: status,
        approved_by: item.approved_by
    };

    return o;
}

ShiftPlanningTimeClock.prototype.showHideTimeSheetsPro = function() {
    var sel = $('#tc_dts_au').val();
    switch (sel) {
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
    var elm = $('#tc_dts_ul li:visible')
    if (elm.length == 0) {
        $('#tc_dts_ul_msg').html(spView.emptyResult('No timesheets for selected filters'))
    } else {
        $('#tc_dts_ul_msg').html('')
    }
}

ShiftPlanningTimeClock.prototype.showHideTimeSheets = function() {
    //$('#tc_mts_slist tr').removeClass('odd');
    var s = parseInt($('#tc_mts_au').val());
    var e = parseInt($('#tc_mts_eml').val());
    var sc = parseInt($('#tc_mts_scl').val());

    var search = '';
    if (s != 0) {
        search += '.s_' + s;
    }

    if (e != 0 && $('#tc_mts_eml').is("visible")) {
        search += '.e_' + e;
    }

    if (sc != 0 && $('#tc_mts_scl').is("visible")) {
        search += '.sc_' + sc;
    }

    $('#tc_mts_sh').find('li').hide();
    $('#tc_mts_sh').find('li' + search).show();

    $('#tc_mts_sh div.title').hide();
    $('#tc_mts_sh ul li:visible').parents('.timeSheet').prev().show();

    if ($('#tc_mts_sh ul li:visible').length > 0) {
        $('#tc_mts_sh').next().hide();
    } else {
        $('#tc_mts_sh').next().show();
    }
}

ShiftPlanningTimeClock.prototype.saveClockInChanges = function() {
    var data = {
        id: $('#tc_ov_ca').attr('rel')
    }

    if ($('#tc_ov_ss').val() != 0) {
        data.schedule = $('#tc_ov_ss').val();
    }

    if ($('#tc_ov_no').val() != 0) {
        data.notes = $('#tc_ov_no').val();
    }

    spModel.timeclock.update('timeclock', data, function() {
        sp.showSuccess(_s('Timeclock updated'));
    });
	timeClockEditing = false;
}

ShiftPlanningTimeClock.prototype.saveClockTime = function() {
    var data = {};
    var f = 'get';
    var module = 'timeclock.addclocktime';
    var success = _s('Clock Time added');
	var startDateTime = $('#tc_act_tclin').val().split('T');
	var endDateTime = $('#tc_act_tclou').val().split('T');

    if ($('#tc_act_tc_id').hasClass('editOn') == true) {
        f = 'update';
        module = 'timeclock.timeclock'
        data.id = $('#tc_act_tc_id').val();
        success = _s('Clock time edited');
		
		
        data.start_date = startDateTime[0];
        data.start_time = startDateTime[1];
        data.end_date = endDateTime[0];
        data.end_time = endDateTime[1];

    } else {
        data.datein = startDateTime[0] + ' ' + startDateTime[1];
        data.dateout = endDateTime[0] + ' ' + endDateTime[1];

        data.remote_site = $('#tc_act_loc').val();
    }

    data.schedule = $('#tc_act_sc').val();
    data.employee = $('#tc_act_em').val();

    if ($('#tc_act_onci').hasClass('check')) {
        data.onlyin = 1;
    }

    data.notes = $('#tc_act_no').val();

    if (checkTimes(data) == true || $('#tc_act .detailsGrid .odd').hasClass('nonVisible')) {
        sp.api(module, f, data, function(response) {
            sp.showSuccess(success);
            setTimeout(function() {
                var subpage = 'displayTimeSheets';
                if (sp.staff.admin.info.group <= 2 || "addClockTime" == subpageTemp) {
                    subpage = 'manageTimeSheets';
                }
                $('.subNavigation div.timeClock ul.timeClock a[subpage=' + subpage + ']').trigger(clickEvent);
            }, 400);
        }, function(response) {
            sp.showError(response.error);
        });
    } else {
        sp.showError("Please check your time and date input fields");
    }
}

function checkTimes(data) {
	var comparedDates = "";
    var start_date_temp = "";
    var end_date_temp = "";
    var timeFormat = "HH:mm";
    var timeFormatS = "H:mm";
    var fullDFormat = "";
    var fullDFormatS = "";

    if (typeof data.start_date != "undefined") {
        start_date_temp = data.start_date + ' ' + data.start_time;
        end_date_temp = data.end_date + ' ' + data.end_time;
    } else {
        if (typeof data.onlyin != "undefined") {
            return true;
        } else {
            start_date_temp = data.datein;
            end_date_temp = data.dateout;
        }
    }

    if( cal.tmode == "12" ){
        timeFormat = "hh:mm tt";
        timeFormatS = "h:mm tt";
    }

    fullDFormat = cal.dformat + ' ' + timeFormat;
    fullDFormatS = cal.dformat + ' ' + timeFormatS;

    var tmp_start_date_temp = Date.parse( start_date_temp, fullDFormat ) ;
    var tmp_end_date_temp = Date.parse( end_date_temp, fullDFormat );

    if( tmp_start_date_temp == null ){
        start_date_temp = Date.parse( start_date_temp, fullDFormatS );
    }else{
        start_date_temp = tmp_start_date_temp;
    }

    if( tmp_end_date_temp == null ){
        end_date_temp = Date.parse( end_date_temp, fullDFormatS );
    }else{
        end_date_temp = tmp_end_date_temp;
    }

    comparedDates = dates.compare(new Date(start_date_temp), new Date(end_date_temp));

    if (comparedDates < 0) {
        return true;
    } else {
        return false;
    }
}

var dates = {
    convert: function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp)
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
        d.constructor === Date ? d : d.constructor === Array ? new Date(d[0], d[1], d[2]) : d.constructor === Number ? new Date(d) : d.constructor === String ? new Date(d) : typeof d === "object" ? new Date(d.year, d.month, d.date) : NaN);
    },
    compare: function(a, b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
        isFinite(a = this.convert(a).valueOf()) && isFinite(b = this.convert(b).valueOf()) ? (a > b) - (a < b) : NaN);
    },
    inRange: function(d, start, end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
        isFinite(d = this.convert(d).valueOf()) && isFinite(start = this.convert(start).valueOf()) && isFinite(end = this.convert(end).valueOf()) ? start <= d && d <= end : NaN);
    }
}

ShiftPlanningTimeClock.prototype.loadPage = function() {
	this.moduleName = 'timeclock';

}