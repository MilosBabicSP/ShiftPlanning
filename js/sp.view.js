var ShiftPlanningView = function(){
    
}

ShiftPlanningView.prototype.optionSchedules = function(id){
    var data;
    
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    var opt = '<option disabled="disabled" selected="selected">Select Schedule</option>';
    $.each(data, function(i, item){
        opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
    });
    return opt;
}



var spView = new ShiftPlanningView();