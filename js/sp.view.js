var ShiftPlanningView = function(){
    
}

ShiftPlanningView.prototype.optionSchedules = function(id){
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    var opt = '<option disabled="disabled" selected="selected" value="0">Select Schedule</option>';
    $.each(data, function(i, item){
        opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
    });
    
    return opt;
}

ShiftPlanningView.prototype.staffOption = function(notAdmin){
    if (typeof notAdmin == 'undefined'){
        notAdmin = false;
    }
    var opt;
    if (notAdmin == false){
        opt = '<option disabled="disabled" selected="selected">Select Staff</option>';
        $.each(spModel.staff.allStaff(), function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    
    
    return opt;
}

ShiftPlanningView.prototype.timeRanges = function(){
    var times = spRanges.createSelector('times');
    var res = '<option value="-1">Select</option>';
    $.each(times, function(i, item){
        res += '<option value="' + i + '" >' + item + '</option>'; 
    });
    
    return res;
}



var spView = new ShiftPlanningView();