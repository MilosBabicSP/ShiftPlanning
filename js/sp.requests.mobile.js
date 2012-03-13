ShiftPlanningRequests.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.overviewEvents();
        self.vacationEvents();
//        self.openShiftsEvents();
//        self.shiftApprovalsEvents();
//        self.shiftTradesEvents();
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
//    
//    t.delegate('.options a', clickEvent, function(e){
//        var c = false;
//        e.preventDefault();
//        if ($(this).hasClass('approve')){
//            c = confirm('Are you sure you want to APPROVE this request?');
//            if (c){
//                self.approveVacationRequest($(this).attr('rel'));
//            }
//        } else if ($(this).hasClass('remove')){
//            c = confirm('Are you sure you want to DECLINE this request?');
//            if (c){
//                self.declineVacationRequest($(this).attr('rel'));
//            }
//        } else {
//            c = confirm('Are you sure you want to CANCEL this request?');
//            if (c){
//                self.cancelVacationRequest($(this).attr('rel'));
//            }
//        }
//    });
//    
//    t.delegate('a.conf', clickEvent, function(e){
//        e.preventDefault();
//        $(this).hide();
//        $(this).next().removeClass('appHidden');
//    });
//    
//    t.delegate('a.shifts', clickEvent, function(e){
//        e.preventDefault();
//        sp.shift.open($(this).attr('rel'));
//    });
//    
//    $('#rq_va_up a.more').bind(clickEvent, function(e){
//        e.preventDefault();
//        $(this).parent().find('tr.pastDate').toggleClass('hidden');
//    });
//    
//    $('#rq_va_rq .details').bind(clickEvent, function(e){
//        $('#rq_va_rq table .hidden').removeClass('hidden');
//    });
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

    $('#rq_va_rq').hide();
    $('#rq_va_rq').next().hide();
    
    $('#rq_va_aa').hide();
    $('#rq_va_aa').next().hide();
    
    $('#rq_va_up').hide();
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
    spModel.schedule.get('vacations', {mode : 'upcoming'}, function(response){
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


ShiftPlanningRequests.prototype.fixSubMenu = function(subpage){
    
}

ShiftPlanningRequests.prototype.loadPage = function(){
    
}