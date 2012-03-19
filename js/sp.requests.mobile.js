ShiftPlanningRequests.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.overviewEvents();
        self.vacationEvents();
        self.openShiftsEvents();
        //        self.shiftApprovalsEvents();
        self.shiftTradesEvents();
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
        case 'shiftTradeManagerIM':
            $('.subNavigation').hide();
            this.displayShiftTradeManagerIM();
            break;
        case 'openShiftsOpen':
            $('.subNavigation').hide();
            this.displayOpenShifts();
            break;
        case 'openShiftsRequests':
            $('.subNavigation').hide();
            this.displayOpenRequests();
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
    });
    
    $('#rq_va').delegate('a.deleteVacation', clickEvent, function(e){
        e.preventDefault();
        self.cancelVacationRequest($(this).attr('rel'));
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
    
    $('#rq_os_sub').delegate('#rq_os_rtw.icoReqWor', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        spModel.schedule.update('shift', {
            id : $(this).attr('rel'), 
            add : sp.staff.admin.info.id
        }, function(response){
            obj.removeClass('loading').removeClass('icoReqWork').addClass('icoReqCan').html('Cancel pending request');
        });
    });
    
    $('#rq_os_sub').delegate('#rq_os_rtw.icoReqCan', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        spModel.schedule.update('shift', {
            id : $(this).attr('rel'), 
            remove : sp.staff.admin.info.id
        }, function(response){
            obj.removeClass('loading').removeClass('icoReqCan').removeClass('icoReqWork').html('Request Removed');
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
        obj.addClass('loading');
        var id = $(this).attr('rel');
        var data = {
            trade : id
        }
        
        if ($(this).hasClass('activate')){
            data.action = 'activate';
        }
        
        if ($(this).hasClass('cancel')){
            data.action = 'cancel';
            var c = confirm('Are you sure you want to cancel this request?');
            if (!c){
                obj.removeClass('loading');
                return false;
            }
        }
        
        if ($(this).hasClass('deactivate')){
            data.action = 'deactivate';
        }
        
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
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
            var c = confirm('Are you sure you want to cancel this request?');
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

//sub events
ShiftPlanningRequests.prototype.overviewSubEvents = function(){
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
            $('#rq_rl_va').parent().hide();
        } else {
            $('#rq_rl_va').parent().show();
        }
        
        if (response.data.shift_approval == 0){
            $('#rq_rl_sp').parent().hide();
        } else {
            $('#rq_rl_sp').parent().show();
        }
        
        if (response.data.shift_request_waiting == 0){
            $('#rq_rl_sr').parent().hide();
        } else {
            $('#rq_rl_sr').parent().show();
        }
        
        if (response.data.trade_approval == 0){
            $('#rq_rl_ast').parent().hide();
        } else {
            $('#rq_rl_ast').parent().show();
        }
        
        if (response.data.shift_available == 0){
            $('#rq_rl_sv').parent().hide();
        } else {
            $('#rq_rl_sv').parent().show();
        }
        
        $('#rq_rl_va').parent().find('info').html(response.data.vacation);
        $('#rq_rl_sp').parent().find('info').html(response.data.shift_approval);
        $('#rq_rl_sr').parent().find('info').html(response.data.shift_request_waiting);
        $('#rq_rl_ast').parent().find('info').html(response.data.trade_approval);
        $('#rq_rl_sv').parent().find('info').html(response.data.shift_available);
    }, function(response){
        sp.showError(response.error);
    });
}

ShiftPlanningRequests.prototype.vacationSubEvents = function(){
    var self = this;
    $('#rq_va_en').html(spView.staffOption((sp.staff.admin.info.group < 4) ? false : true));


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
        spModel.schedule.get('vacations', {
            mode: 'manage'
        }, function(response){
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
    spModel.schedule.get('vacations', {
        mode : 'upcoming'
    }, function(response){
        if (response.data.length == 0){
            $('#rq_va_up').hide();
            $('#rq_va_up').next().show();
        } else {
            $('#rq_va_up').show();
            $('#rq_va_up').next().hide();
            $('#rq_va_up').html($.tmpl($('#te_rq_va_up'), response.data));
        }
    }, function(response){
        sp.showError(response.error);
    });
//    
//    $('#rq_va_up').addClass('appHidden');
}

ShiftPlanningRequests.prototype.openShiftsSubEvents = function(){
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
            $('#rq_os_os').html($.tmpl($('#te_rq_os_os'), response.data));
        }
    }, function(response){
        sp.showError(response.error);
    });
    
    
    if (sp.staff.admin.info.group < 4){
        spModel.schedule.get('shifts', {
            mode: 'openapproval',
            detailed : 1
        }, function(response){
            if (response.data.length == 0){
                $('#rq_os_spr').hide();
                $('#rq_os_spr').next().show();
            } else {
                $('#rq_os_spr').show();
                $('#rq_os_spr').next().hide();
                response.data = self.prepareOpenShiftsNA(response.data);
                console.log(response.data);
                var d = [];
                $.each(response.data, function(i, item){
                    d[i] = item;
                    d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                    d[i].rId = i;
                });
                self.shiftsR = d;
                $('#rq_os_spr').html($.tmpl($('#te_rq_os_spr'), response.data));
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
    $('#rq_st_im').html(spView.ulLoader());
    
    $('#rq_st_mst').show();
    $('#rq_st_ap').show();
    $('#rq_st_im').show();
    
    $('#rq_st_mst').next().hide();
    $('#rq_st_ap').next().hide();
    $('#rq_st_im').next().hide();
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

}

//functions

ShiftPlanningRequests.prototype.addVacationRequest = function(obj){
    var self = this;
    if ($.trim($('#rq_va_fr').val()).length == 0){
        sp.showError('Please select FROM time');
        obj.removeClass('loading');
        return false;
    }
    
    if ($.trim($('#rq_va_to').val()).length == 0){
        sp.showError('Please select TO time');
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
    });
}

ShiftPlanningRequests.prototype.displayVacationRequest = function(){
    $('#rq_va_ma_s').html($.tmpl($('#te_rq_va_ma_s'), this.current));
}

ShiftPlanningRequests.prototype.displayShiftTradeManager = function(){
    console.log(this.current);
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
    console.log(this.current);
    $('#rq_st_im_s').html($.tmpl($('#te_rq_st_im_s'), this.current));
    
    $('#rq_st_im_sm a').attr('rel', this.current.id);
}

ShiftPlanningRequests.prototype.displayShiftTradeManagerAP = function(){
    console.log(this.current);
    $('#rq_st_ap_s').html($.tmpl($('#te_rq_st_ap_s'), this.current));
    
    $('#rq_st_ap_sub ul a').attr('rel', this.current.trade_id);
    
    if (parseInt(this.current.confirmed) == 1){
        $('#rq_st_ap_sub ul').hide();
    } else {
        $('#rq_st_ap_sub ul').show();
    }
}

ShiftPlanningRequests.prototype.displayOpenShifts = function(){
    console.log(this.current);
    
    $('#rq_os_rtw').removeClass('icoReqCan').addClass('icoReqWork').html('Request to work');
    
    $('#rq_os_os_s').html($.tmpl($('#te_rq_os_os_s'), this.current));
    
    var h = '';
    var s = this.current.status;
    if (s == 10 || s == 4){
        h = '<a class="icoReqWor" href="#" id="rq_os_rtw" rel="' + this.current.id + '">Request to work</a>';
    } else if (s == 1){
        h = 'Management rejected your request for this shift';
    } else if (s == 0){
        h = '<a class="icoReqCan" href="#" id="rq_os_rtw" rel="' + this.current.id + '">Cancel pending request</a>';
    } else if (s == 2){
        h = 'Already on this shift';
    } else {
        h = 'Will put you into overtime';
    }
    
    $('#rq_os_sub .subMenu .single').html(h);
}

ShiftPlanningRequests.prototype.displayOpenRequests = function(){
    
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
        $('#rq_va_tb_tr_' + id).remove();
    });
}

ShiftPlanningRequests.prototype.prepareSingleViewTrade = function(data){
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

ShiftPlanningRequests.prototype.prepareOpenShiftsNA = function(data){
    var res = {};
    $.each(data, function(i, item){
        $.each(item.requests, function(iV2, itemV2){
            item.user_name = itemV2.name;
            item.user_id = itemV2.id;
            item.avatar = sp.getAvatar(itemV2.id);
            res[item.user_id + item.start_date.formatted + item.start_time.time + item.end_time.time + item.schedule_name] = {
                user_name : itemV2.name,
                user_id : itemV2.id,
                start_date : item.start_date.formatted,
                hours : item.start_time.time + ' - ' + item.end_time.time,
                schedule_name : item.schedule_name,
                notes : item.notes,
                id : item.id,
                rId : item.request_id,
                full : item
            };
        });
    });
    var p = [];
    $.each(res, function(i, item){
        p.push(item);
    });
    return p;
}



ShiftPlanningRequests.prototype.loadPage = function(){
    
    }