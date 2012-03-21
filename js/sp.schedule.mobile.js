ShiftPlanningSchedule.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.allPageEvents();
    });
}

ShiftPlanningSchedule.prototype.allPageEvents = function(){
    var self = this;
    $('#sc_fl').bind('change', function(e){
        console.log($(this).val());
        var val = $(this).val();
        if (parseInt(val) != val){
            self.settings.mode = val;
        } else {
            self.settings.mode = 'schedule';
            self.settings.schedule = val;
        }
        
        self.todaySubEvents();
    });
}

ShiftPlanningSchedule.prototype.loadSubPageEvents = function(subpage){
    console.log(subpage + 'SubEvents');
    this[subpage + 'SubEvents']();
}

//sub events
ShiftPlanningSchedule.prototype.todaySubEvents = function(){
    $('#sc_td_list').parent().hide();
    $('#sc_td .loading').show();
    $('#sc_td .additional').hide();
    $('#sc_to_sub').html(formatted('today'));
    
    var data = this.getSettings();
    
    spModel.schedule.get('shifts', data, function(response){
        if (response.data.length > 0){
            $('#sc_td_list').parent().show();
            $('#sc_td .loading').hide();
            $('#sc_td_list').html($.tmpl($('#te_sc_shifts'), response.data));
        } else {
            $('#sc_td_list').parent().hide();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').show();
        }
    });
}

ShiftPlanningSchedule.prototype.getColorsBySchedule = function(id){
    if (typeof sp.schedule.data.schedules[id] != 'undefined'){
        return sp.raw.config.colorsets[sp.schedule.data.schedules[id].color];
    } else {
        return ['000', 'aaa', 'fff', 'fff', '000'];
    }
}

ShiftPlanningSchedule.prototype.getSettings = function(){
    return this.settings;
}

ShiftPlanningSchedule.prototype.loadPage = function(){
    console.log('test');
    
    
    var opt = '';
    
    opt += '<option value="employee">My Schedules</option>';
    opt += '<option value="overview">Schedule Overview</option>';
    opt += spView.schedulerFilter();
    $('#sc_fl').html(opt);
}