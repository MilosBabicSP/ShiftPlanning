ShiftPlanningRequests.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.overviewEvents();
        self.vacationEvents();
        self.availableEvents();
        self.openShiftsEvents();
        self.shiftTradesEvents();
        self.shiftApprovalsEvents();
    });
}


ShiftPlanningRequests.prototype.loadSubPageEvents = function(subpage){
    $('.subNavigation').show();
    switch (subpage){
        case 'overview':
            this.overviewSubEvents();
            break;
        case 'vacation':
            this.vacationSubEvents();
            break;
        case 'available':
            this.availableSubEvents();
            break;
        case 'shiftTrades':
            this.shiftTradesSubEvents();
            break;
        case 'shiftApprovals':
            this.shiftApprovalsSubEvents();
            break;
        case 'openShifts':
            this.openShiftsSubEvents();
            break;
        case 'vacationRequestManage':
            $('.subNavigation').hide();
            this.displayVacationRequest();
            break;
        case 'shiftTradeManager':
            $('.subNavigation').hide();
            this.displayShiftTradeManager();
            break;
        case 'shiftTradeManagerAP':
            $('.subNavigation').hide();
            this.displayShiftTradeManagerAP();
            break; 
        case 'shiftSwapRequest':
            $('.subNavigation').hide();
            this.shiftSwapRequestSubEvents();
            break;
        case 'shiftTradeManagerIM':
            $('.subNavigation').hide();
            this.displayShiftTradeManagerIM();
            break;
        case 'openShiftsOpen':
            $('.subNavigation').hide();
            this.displayOpenShifts();
            break;
        case 'openShiftsRequest':
            $('.subNavigation').hide();
            this.displayOpenRequests();
            break;
        case 'shiftApprovalsSingle':
            $('.subNavigation').hide();
            this.shiftApprovalsSingle();
            break;
    }
}


//initialize events
ShiftPlanningRequests.prototype.overviewEvents = function(){
    //we open page based on subpage found in a tag
    $('#requests #rq_ov a').bind(clickEvent, function(e){
        e.preventDefault();
        $('.subNavigation .requests li a[subpage=' + $(this).attr('subpage') + ']').trigger(clickEvent);
    });
    
    $('#requests .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        $('.subNavigation .requests li a[subpage=' + $(this).attr('subpage') + ']').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.vacationEvents = function(){
    var self = this;
    var p = $('#requests #rq_va');
    var t = $('#rq_va table');
    
    $('#rq_va_sr').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).addClass('loading');
        self.addVacationRequest($(this));
    });
    
    $('#rq_va_fr').scroller();
    $('#rq_va_to').scroller();
    
    
    $('#rq_va_rq').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.vacations[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'vacationRequestManage');
    });
    
    
    $('#rq_va_ma_acp').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).addClass('loading');
        self.approveVacationRequest($(this));
    });
    
    $('#rq_va_ma_dec').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).addClass('loading');
        self.declineVacationRequest($(this));
    });
    
    $('#rq_va_spd').bind(clickEvent, function(e){
        e.preventDefault();
        $('#rq_va_up .pastDate').toggleClass('hidden');
        if ($('#rq_va_spd').html() == 'Show past dates') {
            $('#rq_va_spd').html('Hide past dates');
        } else if ($('#rq_va_spd').html() == 'Hide past dates') {
            $('#rq_va_spd').html('Show past dates');
        }
    });
    
    $('#rq_va').delegate('a.deleteVacation', clickEvent, function(e){
        e.preventDefault();
        self.cancelVacationRequest($(this).attr('rel'));
    });
}

ShiftPlanningRequests.prototype.availableEvents = function() {
    var self= this;
    $('#rq_av_pu').bind(clickEvent, function(e){
        e.preventDefault();
        sp.loadSubPage('', 'requests', 'openShifts');
    });
    
    $('#rq_av_sw, #rq_av_tr').bind(clickEvent, function(e) {
        e.preventDefault();
        sp.loadSubPage('', 'requests', 'shiftTrades');
    });
    
    /*open shifts */
    $('#rq_av_pu_li').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.available.pickup[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'openShiftsOpen');
    });

    /*shift swap*/
    $('#rq_av_sw_li').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.available.swap[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftSwapRequest');
    });
    
    /*shift trades*/
    $('#rq_av_tr_li').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.available.trade[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManagerAP');
    });
    
}

ShiftPlanningRequests.prototype.openShiftsEvents = function(){
    var self = this;
    $('#rq_os_os').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.shifts[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'openShiftsOpen');
    });
    
    $('#rq_os_spr').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.shiftsR[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'openShiftsRequest');
    });
    
    $('#rq_os_os_s').delegate('#rq_os_rtw.green', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        spModel.schedule.create('shiftrequests', {
            shift : $(this).attr('rel') 
        }, function(response){
            obj.removeClass('loading').removeClass('green').addClass('grey').html(_s('<span>Cancel pending request</span>'));
        });
    });
    
    $('#rq_os_os_s').delegate('#rq_os_rtw.grey', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        spModel.schedule.update('shift', {
            id : $(this).attr('rel'), 
            remove : sp.staff.admin.info.id
        }, function(response){
            obj.removeClass('loading').removeClass('grey').removeClass('green').html(_s('Request Removed'));
        });
    });
    
    $('#rq_os_spr_s').delegate('.step a', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        var data = {
            id : $(this).attr('rel'),
            type : 'openshifts'
        }
        
        if ($(this).hasClass('accept')){
            data.mode = 'approve';
        } else {
            data.mode = 'reject';
        }
        spModel.schedule.update('requests', data, function(response){
            obj.removeClass('loading');
            $('.subNavigation .requests li a[subpage=openShifts]').trigger(clickEvent);
        }, function(response){
            obj.removeClass('loading');
        });
    });
}

ShiftPlanningRequests.prototype.shiftTradesEvents = function(){
    var self = this;
    $('#rq_st_mst').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.trades['manage'][$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManager');
    });
    
    $('#rq_st_ap').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.trades['avaiting'][$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManagerAP');
    });
    
    $('#rq_st_im').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.trades['requested'][$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManagerIM');
    });
    $('#rq_st_swap').delegate('a',clickEvent,function(e){
            e.preventDefault();
            self.current = self.swaps[$(this).attr('rel')];
            sp.loadSubPage('', 'requests', 'shiftSwapRequest');
    });
    $('#rq_st_sh_swap').delegate('.traders a', clickEvent, function(){
            var swapId = $(this).attr('swapId');
            var shift = $(this).attr('shiftId');
            var action = $(this).attr('class');
            var obj = $(this);
            obj.addClass('loading');		
            var message = action == 'accept' ? 'You have accepted this shift trade.' : 'You have rejected this shift trade.' ;
            spModel.schedule.update('tradeswap',{shift_for_swap:shift,trade:swapId,action:action},function(response){
                obj.removeClass('loading');
                sp.showSuccess(message);
                $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
            });
    });
    $('#rq_st_mst_s').delegate('.traders a', clickEvent, function(e){
        var obj = $(this);
        obj.addClass('loading');
        e.preventDefault();
        var id = $(this).attr('tradeId');
        var uId = $(this).attr('userId');
        var data = {
            trade: id,
            user: uId
        }
        
        if ($(this).hasClass('accept')){
            data.action = 'accept';
        } else {
            data.action = 'reject';
        }
        
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        }, function(response){
            sp.showError(response.error);
        });
    });
    
    $('#rq_st_mts_sub ul a').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        var id = $(this).attr('rel');
        var data = {
            trade : id
        }
        
        if ($(this).hasClass('activate')){
            data.action = 'activate';
        }
        
        if ($(this).hasClass('cancel')){
            data.action = 'cancel';
            var c = confirm(_s('Are you sure you want to cancel this request?'));
            if (!c){
                obj.removeClass('loading');
                return false;
            }
        }
        
        if ($(this).hasClass('deactivate')){
            data.action = 'deactivate';
        }
        obj.addClass('loading');
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            if (data.action == 'activate'){
                sp.showSuccess(_s('Shift trade accepted, waiting for potentional acceptors to accept.'));
            } else if (data.action == 'deactivate'){
                sp.showSuccess(_s('Shift trade rejected.'));
            } else {
                sp.showSuccess(_s('Shift trade canceled.'));
            }
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        }, function(response){
            sp.showError(response.error);
        });
    });
    
    $('#rq_st_ap_sub ul a').bind(clickEvent, function(e){
        var obj = $(this);
        obj.addClass('loading');
        e.preventDefault();
        var id = $(this).attr('rel');
        var data = {
            trade : id
        }
        
        if ($(this).hasClass('accept')){
            data.action = 'accept';
        } else {
            data.action = 'reject';
        }
        
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            sp.showSuccess(i18n.format(_s("Shift trade pick up {action}"), {action:data.action}));
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        }, function(response){
            sp.showError(response.error);
        });
    });
    
    $('#rq_st_im_sm a').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        var id = $(this).attr('rel');
        var data = {
            trade : id
        }
        
        if ($(this).hasClass('cancel')){
            var c = confirm(_s('Are you sure you want to cancel this request?'));
            if (!c){
                obj.removeClass('loading');
                return false;
            }
            data.action = 'cancel';
        }
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        });
    });
}

ShiftPlanningRequests.prototype.shiftApprovalsEvents = function(){
    var self = this;
    $('#rq_sa select').bind('change', function(){
        self.shiftApproveList();
    });
    
    $('#rq_sa_ho').delegate('.checkbox', clickEvent, function(){
        var obj = $(this);
        if (!obj.hasClass('check')){
            var id = obj.attr('shiftId');
            spModel.schedule.update('shiftapprove', {
                id: id
            }, function(response){
                obj.addClass('check');
                self.addShift(id, response.data);
            }, function(response){
                sp.showError(response.error);
            });
        }
    });
    
    $('#rq_sa_ho').delegate('span.names, span.time', clickEvent, function(){
        var main = $(this).parent();
        main.addClass('loading');
        var id = main.find('.checkbox').attr('shiftId');
        var check = main.find('.checkbox').hasClass('check');
        if (check){
            spModel.schedule.get('shiftapprove', {
                id : id
            }, function(response){
                var shift = self.getShift(id);
                if (shift.employees != null){
                    $.each(response.data, function(i, item){
                        $.each(shift.employees, function(i2, item2){
                            if (item2.id == item.employee){
                                shift.employees[i2].shift = item
                            }
                        });
                    });
                }
                self.current = self.fixShiftsApproval(shift);
                sp.loadSubPage('', 'requests', 'shiftApprovalsSingle');
            }, function(response){
                main.removeClass('loading');
                sp.showError(response.data);
            });
        } else {
            spModel.schedule.update('shiftapprove', {
                id : id
            }, function(response){
                main.find('.checkbox').addClass('check');
                self.addShift(id, response.data);
                self.current = self.fixShiftsApproval(response.data);
                sp.loadSubPage('', 'requests', 'shiftApprovalsSingle');
            }, function(response){
                main.removeClass('loading');
                sp.showError(response.data);
            });
        }
    });
    
    $('#rq_sa_s').delegate('.checkbox', clickEvent, function(){
        $(this).toggleClass('check');
    });
    
    $('#rq_sa_sub .approve').bind(clickEvent, function(e){
        e.preventDefault();
        self.saveShiftApprove();
    })
}

//sub events
ShiftPlanningRequests.prototype.overviewSubEvents = function(){
    $('#rq_ov_loader').show();
    $('#rq_ov_widgets').hide();
    $('#rq_ov_hd').hide();
    $('#rq_ov_loader').html(spView.ulLoader());
    spModel.admin.get('nrequests', {}, function(response){
        if (typeof response.data.vacation == 'undefined'){
            response.data.vacation = 0;
        }
        if (typeof response.data.shift_approval == 'undefined'){
            response.data.shift_approval = 0;
        }
        if (typeof response.data.shift_request_waiting == 'undefined'){
            response.data.shift_request_waiting = 0;
        }
        if (typeof response.data.trade_approval == 'undefined'){
            response.data.trade_approval = 0;
        }
        if (typeof response.data.trade_approval == 'undefined'){
            response.data.trade_approval = 0;
        }
        if (typeof response.data.shift_available == 'undefined'){
            response.data.shift_available = 0;
        }
        
        if (response.data.vacation == 0){
            $('#rq_rl_va').hide();
        } else {
            $('#rq_rl_va').show();
        }
        
        if (response.data.shift_approval == 0){
            $('#rq_rl_sp').hide();
        } else {
            $('#rq_rl_sp').show();
        }
        
        if (response.data.shift_request_waiting == 0){
            $('#rq_rl_sr').hide();
        } else {
            $('#rq_rl_sr').show();
        }
        
        if (response.data.trade_approval == 0){
            $('#rq_rl_ast').hide();
        } else {
            $('#rq_rl_ast').show();
        }
        
        if (response.data.shift_available == 0){
            $('#rq_rl_sv').hide();
        } else {
            $('#rq_rl_sv').show();
        }
        
        $('#rq_rl_va .icon b').html(response.data.vacation);
        $('#rq_rl_sp .icon b').html(response.data.shift_approval);
        $('#rq_rl_sr .icon b').html(response.data.shift_request_waiting);
        $('#rq_rl_ast .icon b').html(response.data.trade_approval);
        $('#rq_rl_sv .icon b').html(response.data.shift_available);
        $('#rq_ov_widgets').show();
        $('#rq_ov .widgets li:visible').attr('style','');
        $('#rq_ov .widgets li:visible:first').css('border-top', 'none');
        if ($('#rq_ov .widgets li:visible').length == 0){
            $('#rq_ov_hd').show();
            $('#rq_ov_widgets').hide();
        } else {
            $('#rq_ov_hd').hide();
        }
        $('#rq_ov_loader').hide();
        
    }, function(response){
        sp.showError(response.error);
    });
}

ShiftPlanningRequests.prototype.vacationSubEvents = function(){
    var self = this;
    $('#rq_va_wc').val('');
    $('#rq_va_fr').val('');
    $('#rq_va_to').val('');
    
    if (sp.staff.admin.settings.book_days_off == 1){
        $('#rq_va .newMsg').show();
        $('#rq_va .newMsg').next().show();
    } else {
	$('#rq_va .newMsg').hide();
        $('#rq_va .newMsg').next().hide();
    }
    
    $('#rq_va_en').html(spView.staffOption((sp.staff.admin.info.group <= 4) ? false : true));
    $('#rq_va_spd').hide()


    $('#rq_va_rq').html(spView.ulLoader());
    $('#rq_va_aa').html(spView.ulLoader());
    $('#rq_va_up').html(spView.ulLoader());

    $('#rq_va_rq').show();
    $('#rq_va_aa').show();
    $('#rq_va_up').show();

    $('#rq_va_rq').next().hide();
    $('#rq_va_aa').next().hide();
    $('#rq_va_up').next().hide();
    
    
    $('#rq_va_ma_acp, #rq_va_ma_dec').removeClass('loading');
    
    
    if (sp.staff.admin.info.group <= 4){
		console.log("sp.staff.admin.info.group is " + sp.staff.admin.info.group );
        spModel.schedule.get('vacations', {
            mode: 'manage'
        }, function(response){
			console.log(JSON.stringify(response));
            if (response.data.length == 0){
                $('#rq_va_rq').hide();
                $('#rq_va_rq').next().show();
            } else {
                $('#rq_va_rq').show();
                $('#rq_va_rq').next().hide();
                var d = [];
                $.each(response.data, function(i, item){
                    d[i] = item;
                    d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                    d[i].rId = i;
                });
                self.vacations = d;
                $('#rq_va_rq').html($.tmpl($('#te_rq_va_ma'), d));
            }
        });
    } else {
	$('#rq_va_rq').hide();
	$('#rq_va_rq').next().show();
    }

    spModel.schedule.get('vacations', {
        mode: 'requested'
    }, function(response){
        if (response.data.length == 0){
            $('#rq_va_aa').hide();
            $('#rq_va_aa').next().show();
        } else {
            $('#rq_va_aa').show();
            $('#rq_va_aa').next().hide();
            $('#rq_va_aa').html($.tmpl($('#te_rq_va_aa'), response.data));
        }
    }, function(response){
        sp.showError(response.error);
    });
    
    //    
    //    //getting upcoming confirmed vacations
    spModel.schedule.get('vacations', {start_date : 'last year', end_date : 'next year'}, function(response){
	response.data = self.clearVacations(response.data);
        if (response.data.length == 0){
            $('#rq_va_up').hide();
            $('#rq_va_up').next().show();
        } else {
            $('#rq_va_up').show();
            $('#rq_va_up').next().hide();
            $('#rq_va_up').html($.tmpl($('#te_rq_va_up'), response.data));
	    if ($('#rq_va_up .pastDate').length > 0){
		$('#rq_va_spd').show();
	    } else {
		$('#rq_va_spd').hide();
	    }
        }
    }, function(response){
        sp.showError(response.error);
    });
//    
//    $('#rq_va_up').addClass('appHidden');
}

ShiftPlanningRequests.prototype.availableSubEvents = function() {
    $('#rq_av_pu .icon b').html('');
    $('#rq_av_sw .icon b').html('');
    $('#rq_av_tr .icon b').html('');
    $('#rq_av_pu_li').html(spView.ulLoader());
    $('#rq_av_sw_li').html(spView.ulLoader());
    $('#rq_av_tr_li').html(spView.ulLoader());
    var calls = [
        ['schedule.shifts','GET', {
            'mode': 'open'
        }],
        ['schedule.trades','GET', {}],
        ['schedule.trades', 'get', {'mode' : 'swap'}]
    ]
    var self = this;
    sp.multiApi(calls, function(response){
        self.available.pickup = sp.map(response[0].data);
        self.available.swap = sp.map(response[2].data);
        self.available.trade = sp.map(response[1].data);
        $('#rq_av_pu .icon b').html( sp.countResponse( response[0].data ) );
        $('#rq_av_pu_li').html($.tmpl($('#te_da_all_shiftV2'), sp.objToArray(response[0].data)));
        
        if ( sp.countResponse( response[0].data ) > 0 ) {
            $('#rq_av_pu_li').show();
        } else {
            $('#rq_av_pu_li').hide();
        }
        
        $('#rq_av_sw .icon b').html( sp.countResponse( response[2].data ) );
        var swap = [];
        $.each(response[2].data,function(key,item){
                item.avatar = sp.getAvatar(item.user);
                swap.push(item);
        });
        
        if ( sp.countResponse( response[2].data ) > 0 ) {
            $('#rq_av_sw_li').show();
        } else {
            $('#rq_av_sw_li').hide();
        }
        
        $('#rq_av_sw_li').html($.tmpl($('#te_da_all_shiftV2'), swap ));
        $('#rq_av_tr .icon b').html( sp.countResponse( response[1].data ) );
        
        if ( sp.countResponse( response[1].data ) > 0 ) {
            $('#rq_av_tr_li').show();
        } else {
            $('#rq_av_tr_li').hide();
        }
        $('#rq_av_tr_li').html($.tmpl($('#te_da_all_shiftV2'), sp.objToArray(response[1].data)));
    });
}

ShiftPlanningRequests.prototype.openShiftsSubEvents = function() {
    var self = this;
    
    $('#rq_os_os').html(spView.ulLoader());
    
    $('#rq_os_os').next().hide();
    
    $('#rq_os_spr').prev().show();
    $('#rq_os_spr').html(spView.ulLoader());
    $('#rq_os_spr').next().hide();
    
    
    
    spModel.schedule.get('shifts', {
        mode: 'open', 
        detailed : 1
    }, function(response){
        if (response.data.length == 0){
            $('#rq_os_os').hide();
            $('#rq_os_os').next().show();
        } else {
            $('#rq_os_os').show();
            $('#rq_os_os').next().hide();
            var d = [];
            $.each(response.data, function(i, item){
                d[i] = item;
                d[i].rId = i;
            });
            self.shifts = d;
            $('#rq_os_os').html($.tmpl($('#te_da_all_shift'), response.data));
        }
    }, function(response){
        sp.showError(response.error);
    });
    
    
    if (sp.staff.admin.info.group < 4){
        spModel.schedule.get('shifts', {
            mode: 'openapproval'
        }, function(response){
            if (response.data.length == 0){
                $('#rq_os_spr').hide();
                $('#rq_os_spr').next().show();
            } else {
                $('#rq_os_spr').show();
                $('#rq_os_spr').next().hide();
				try{
					response.data = self.prepareOpenShiftsNA(response.data);
            	}catch(excErr){
            		//console.log( " " );
            	}
                var d = [];
				try{
					$.each(response.data, function(i, item){
						d[i] = item;
						d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
						d[i].rId = i;
					});
            	}catch(excErr2){
            		//console.log( " " );
            	}
                self.shiftsR = d;
                $('#rq_os_spr').html($.tmpl($('#te_da_all_shift'), response.data));
				if( $("#rq_os_spr").children().length == 0 ){
					$("#rq_os .additional").first().show();
				}
            }
        }, function(response){
            sp.showError(response.error);
        });
    } else {
        $('#rq_os_spr').prev().hide();
        $('#rq_os_spr').hide();
        $('#rq_os_spr').next().hide();
    }
}

ShiftPlanningRequests.prototype.shiftTradesSubEvents = function(){
    var self = this;
    $('#rq_st_mst').html(spView.ulLoader());
    $('#rq_st_ap').html(spView.ulLoader());
    $('#rq_st_swap').html(spView.ulLoader());
    $('#rq_st_im').html(spView.ulLoader());
    
    $('#rq_st_mst').show();
    $('#rq_st_ap').show();
    $('#rq_st_im').show();
    
    $('#rq_st_mst').next().hide();
    $('#rq_st_ap').next().hide();
    $('#rq_st_im').next().hide();
    $('#rq_st_swap').next().hide();
    if (sp.staff.admin.info.group <= 4){
        spModel.schedule.get('trades', {
            mode : 'manage'
        }, function(response){
            if (response.data.length == 0){
                $('#rq_st_mst').hide();
                $('#rq_st_mst').next().show();
            } else {
                $('#rq_st_mst').show();
                $('#rq_st_mst').next().hide();
                var d = [];
                $.each(response.data, function(i, item){
                    d[i] = item;
                    d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                    d[i].rId = i;
                });
                self.trades['manage'] = d;
                $('#rq_st_mst').html($.tmpl($('#te_rq_st_mst'), d));
            }
        }, function(response){
            sp.showError(response.error);
        });
    } else {
        $('#rq_st_mst').hide();
        $('#rq_st_mst').next().show();
    }
    //    
    spModel.schedule.get('trades', {}, function(response){
        if (response.data.length == 0){
            $('#rq_st_ap').hide();
            $('#rq_st_ap').next().show();
        } else {
            $('#rq_st_ap').show();
            $('#rq_st_ap').next().hide();
            var d = [];
            $.each(response.data, function(i, item){
                d[i] = item;
                d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                d[i].rId = i;
            });
            self.trades['avaiting'] = d;
            $('#rq_st_ap').html($.tmpl($('#te_rq_st_ap'), d));
        }
    }, function(response){
        sp.showError(response.error);
    });
        
    spModel.schedule.get('trades', {
        mode : 'requested'
    }, function(response){
        if (response.data.length == 0){
            $('#rq_st_im').hide();
            $('#rq_st_im').next().show();
        } else {
            $('#rq_st_im').show();
            $('#rq_st_im').next().hide();
            var d = [];
            $.each(response.data, function(i, item){
                d[i] = item;
                d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                d[i].rId = i;
            });
            self.trades['requested'] = d;
            $('#rq_st_im').html($.tmpl($('#te_rq_st_ap'), d));
        }
    }, function(response){
        sp.showError(response.error);
    });
	
    spModel.schedule.get('trades',{
            mode : 'swap'
    },function(response){
            if(response.data != ''){
                    self.swaps= response.data;
                    var swap = [];
                    $('#rq_st_swap').show();
                    $.each(response.data,function(key,item){
                            item.avatar = sp.getAvatar(item.user);
                            swap.push(item);
                    });
                    $('#rq_st_swap').html($.tmpl($('#te_rq_swap_single'),swap));
            }else{
                    $('#rq_st_swap').hide();
                    $('#rq_st_swap_empty').show();
            }
    });
}

ShiftPlanningRequests.prototype.clearVacations = function(data){
    var vacations = [];
    if (data.length == 0){
	return vacations;
    }
    $.each(data, function(i, item){
	if (item.employee == sp.staff.admin.info.id){
	    vacations.push(item);
	}
    });
    
    return vacations;
}

ShiftPlanningRequests.prototype.shiftApprovalsSubEvents = function(){
    $('#rq_sa_po').html(spView.scheduleFilter());
    $('#rq_sa_em').html(spView.staffFilter());
    $('#rq_sa_ho').html(spView.divLoader());
    this.shiftApproveList();
}

//functions

ShiftPlanningRequests.prototype.shiftApproveList = function(){
    this.shifts = [];
    $('#rq_sa_ho').html(spView.divLoader());
    var self = this;
    var data = {
        mode: 'confirm'
    }
    
    if ($('#rq_sa_po').val() != 0){
        data.schedule = $('#rq_sa_po').val();
    }
    
    if ($('#rq_sa_em').val() != 0){
        data.employees = $('#rq_sa_em').val();
    }
    
    spModel.schedule.get('shifts', data, function(response){
        if (response.data.length > 0){
            $('#rq_sa_ho').html($.tmpl($('#te_rq_sa'), self.prepareShiftApprovals(response.data)));
        } else {
            $('#rq_sa_ho').html(spView.emptyResult());
        }
    }, function(response){
        sp.showError(response.error);
    });
}

ShiftPlanningRequests.prototype.prepareShiftApprovals = function(data){
    var res = {};
    $.each(data, function(i, item){
        var t = item.start_date.formatted + '';
        if (typeof res[t] == 'undefined'){
            res[t] = {
                shiftDate : item.start_date.formatted,
                shifts : [item]
            }
        } else {
            res[t].shifts.push(item);
        }
    });
    var a = [];
    
    $.each(res, function(i, item){
        a.push(item);
    });
    
    return a;
}

ShiftPlanningRequests.prototype.addVacationRequest = function(obj){
    var self = this;
    if ($.trim($('#rq_va_fr').val()).length == 0){
        sp.showError(_s('Please select FROM time'));
        obj.removeClass('loading');
        return false;
    }
    
    if ($.trim($('#rq_va_to').val()).length == 0){
        sp.showError(_s('Please select TO time'));
        obj.removeClass('loading');
        return false;
    }
    
    var data = {
        start_date : $('#rq_va_fr').val(),
        end_date : $('#rq_va_to').val(),
        employee : $('#rq_va_en').val(),
        comments : $('#rq_va_wc').val()
    };
    
    spModel.schedule.create('vacation', data, function(response){
        self.vacationSubEvents();
        obj.removeClass('loading');
        $('#rq_va_wc').val('');
        $('#rq_va_fr').val('');
        $('#rq_va_to').val('');
    });
}

ShiftPlanningRequests.prototype.displayVacationRequest = function(){
    $('#rq_va_ma_s').html($.tmpl($('#te_rq_va_ma_s'), this.current));   
}

ShiftPlanningRequests.prototype.displayShiftTradeManager = function(){
    $('#rq_st_mst_s').html($.tmpl($('#te_rq_st_mst_s'), this.prepareSingleViewTrade(this.current)));
    $('#rq_st_mts_sub ul a').attr('rel', this.current.id);
    
    if (parseInt(this.current.confirm_before) == 0){
        $('#rq_st_mts_fm').show();
        $('#rq_st_mts_sm').hide();
    } else {
        $('#rq_st_mts_sm').show();
        $('#rq_st_mts_fm').hide();
    }
}

ShiftPlanningRequests.prototype.displayShiftTradeManagerIM = function(){
    
    $('#rq_st_im_s').html($.tmpl($('#te_rq_st_im_s'), this.current));
    
    $('#rq_st_im_sm a').attr('rel', this.current.id);
}

ShiftPlanningRequests.prototype.shiftSwapRequestSubEvents = function(){
    $('#rq_st_sh_swap').html($.tmpl($('#te_rq_st_swap_single'),this.current));
}

ShiftPlanningRequests.prototype.displayShiftTradeManagerAP = function(){
    
    $('#rq_st_ap_s').html($.tmpl($('#te_rq_st_ap_s'), this.current));
    
    $('#rq_st_ap_sub ul a').attr('rel', this.current.trade_id);
    
    if (parseInt(this.current.confirmed) == 1){
        $('#rq_st_ap_sub ul').hide();
    } else {
        $('#rq_st_ap_sub ul').show();
    }
}

ShiftPlanningRequests.prototype.displayOpenShifts = function(){
    $('#rq_os_os_s').html($.tmpl($('#te_rq_os_os_s'), this.current));
    
    var h = '';
    var una = '<p>' + _s('You are un-available') + '</p>';
    var s = this.current.status;
    if (typeof sp.staff.admin.settings.open_overtime == 'undefined'){
        sp.staff.admin.settings.open_overtime = false;
    }
    switch (s){
        case 0 :
            h = '<a class="grey" href="#" id="rq_os_rtw" rel="' + this.current.id + _s('"><span>Cancel pending request</span>');
            if (!this.current.available) {
                h += una;
            }
            break;
        case 1 : 
            h = '<p>' + _s('Management rejected your request for this shift') + '</p>';
            break;
        case 2 :
            h = '<p>' + _s('Already on this shift') + '</p>';
            break;
        case 3 :
            h = '<p>' + _s('Booked Off') + '</p>';
            break;
        case 5 :
        case 6 :
            if (!sp.staff.admin.settings.open_overtime) {
                if (s == 5) {
                    h = '<p>' + _s('Will put you into weekly overtime') + '</p>';
                } else {
                    h = '<p>' + _s('Will put you into daily overtime') + '</p>';
                }
            } else {
                h = '<a class="green" href="#" id="rq_os_rtw" rel="' + this.current.id + _s('"><span>Request to work</span>') + '</a>';
            }
            break;
        case 7 :
            h = '<p>' + _s('Max Days in a Row Breached') + '</p>';
            break;
        case 8 :
            h = '<p>' + _s('Scheduled during this time') + '</p>';
            break;
        case 9 :
            h = '<p>' + _s('Invalid time between shifts') + '</p>';
            break;
        case 10 :
            h = '<a class="green" href="#" id="rq_os_rtw" rel="' + this.current.id + _s('"><span>Request to work</span>') + '</a>';
            if (!this.current.available) {
                h += una;
            }
            break;
    }
    $('#rq_os_pickup_req_button').html(h);
}

ShiftPlanningRequests.prototype.displayOpenRequests = function(){
    if (typeof this.current.full == 'undefined'){
        this.current.full = this.current;
    }
    $('#rq_os_spr_s').html($.tmpl($('#te_rq_os_spr_s'), this.current));
    
    $('#rq_os_spr_sub a').attr('rel',this.current.full.request_id);
}

ShiftPlanningRequests.prototype.shiftApprovalsSingle = function(){
    $('#rq_sa_s').html($.tmpl($('#te_rq_sa_s'), this.current));
    $('#rq_sa_s .shiftStartInput').scroller('destroy');
    $('#rq_sa_s .shiftEndInput').scroller('destroy');
    
    $('#rq_sa_s .shiftStartInput').scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    $('#rq_sa_s .shiftEndInput').scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
}

ShiftPlanningRequests.prototype.approveVacationRequest = function(obj){
    var self = this;
    spModel.schedule.update('vacation', {
        id: self.current.id, 
        status : 1
    }, function(){
        $('.subNavigation .requests li a[subpage=vacation]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.declineVacationRequest = function(obj){
    var self = this;
    spModel.schedule.update('vacation', {
        id: self.current.id, 
        status : -1
    }, function(){
        $('.subNavigation .requests li a[subpage=vacation]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.cancelVacationRequest = function(id){
    spModel.schedule.update('vacation', {
        id: id, 
        status : -2
    }, function(){
        $('.subNavigation .requests li a[subpage=vacation]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.prepareSingleViewTrade = function (data){
    if (data.traders.count == 0){
        data.traders.data = [];
    }
    var d = [];
    $.each(data.traders.data, function(i, item){
        var p = item;
        p.avatar = (typeof sp.staff.data.employees[item.user] != 'undefined' && typeof sp.staff.data.employees[item.user].avatar != 'undefined' && sp.staff.data.employees[item.user].avatar != '' && typeof sp.staff.data.employees[item.user].avatar.small != 'undefined') ? sp.staff.data.employees[item.user].avatar.small : 'images/no-avatar.png';
        d.push(p);
    });
    
    data.traders.data = d;
    return data;
}
ShiftPlanningRequests.prototype.prepareSingleViewSwap = function(data){
	
}

ShiftPlanningRequests.prototype.prepareOpenShiftsNA = function(data){
    var res = {};
    $.each(data, function(i, item){
    	if( item.requests != null ){
			$.each(item.requests, function(iV2, itemV2){
				item.user_name = itemV2.name;
				item.user_id = itemV2.id;
				item.avatar = sp.getAvatar(itemV2.id);
				res[item.user_id + item.start_date.formatted + item.start_time.time + item.end_time.time + item.schedule_name] = {
					user_name : itemV2.name,
					user_id : itemV2.id,
					start_date : {
						formatted: item.start_date.formatted
					},
					start_time : {
						time : item.start_time.time
					},
					end_time : {
						time : item.end_time.time
					},
					schedule_name : item.schedule_name,
					notes : item.notes,
					id : item.id,
					rId : item.request_id,
					full : item
				};
			});
		}
    });
    var p = [];
    $.each(res, function(i, item){
        p.push(item);
    });
    return p;
}

ShiftPlanningRequests.prototype.saveShiftApprove = function(){
    var self = this;
    var data = [];
    $.each($('#rq_sa_s .save'), function(){
        var t = {
            employee: $(this).attr('userId'),
            id : $(this).attr('shiftId'),
            start_time : $(this).find('.shiftStartInput').val(),
            end_time : $(this).find('.shiftEndInput').val()
        }
        if (!$(this).find('.checkbox').hasClass('check')){
            t.absent = 1
        }
        var tmp = ['schedule.shiftapprove', 'update', t];
        data.push(tmp);
    });
    
    sp.multiApi(data, function(response){
        $('.subNavigation .requests li a[subpage=shiftApprovals]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.addShift = function(id, data, field){
    if (typeof field != 'undefined'){
        this.shifts[parseInt(id) + ''][field] = data;
    } else {
        this.shifts[parseInt(id) + ''] = data;
    }
}

ShiftPlanningRequests.prototype.getShift = function(id){
    return this.shifts[id];
}

ShiftPlanningRequests.prototype.fixShiftsApproval = function(data){
    if (data.employees != null){
        $.each(data.employees, function(i, item){
            if (typeof data.employees[i].shift == 'undefined'){
                data.employees[i].shift = data;
                data.employees[i].shift.absent = 0;
            }
        });
    }
    return data;
}

ShiftPlanningRequests.prototype.loadPage = function(){
    
    }
