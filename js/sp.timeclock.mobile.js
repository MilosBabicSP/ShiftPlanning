ShiftPlanningTimeClock.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        
    })
}

ShiftPlanningTimeClock.prototype.loadSubPageEvents = function(subpage){
    this[subpage + 'SubEvents']();
}

ShiftPlanningTimeClock.prototype.overviewSubEvents = function(){
    $('#tc_ov_ss').html(spView.optionSchedules(sp.staff.admin.info.group >= 3 ? sp.staff.admin.info.id : 0));
    
    spModel.timeclock.get('status', {details : 1}, function(response){
        if (response.data != 'out'){
            $('#tc_ov_cf').show();
        } else {
            $('#tc_ov_cf').hide();
        }
    }, function(response){
        
    });
}


ShiftPlanningTimeClock.prototype.loadPage = function(){
    
}