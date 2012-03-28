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
        opt = '<option disabled="disabled" selected="selected" value="0">Select Employee</option>';
        $.each(spModel.staff.allStaff(), function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.staffFilter = function(notAdmin){
    if (typeof notAdmin == 'undefined'){
        notAdmin = false;
    }
    var opt;
    if (notAdmin == false){
        opt = '<option value="0">All Employees</option>';
        $.each(spModel.staff.allStaff(), function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.scheduleFilter = function(id){
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    var opt = '<option value="0">All Positions</option>';
    $.each(data, function(i, item){
        opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
    });
    
    return opt;
}

ShiftPlanningView.prototype.schedulerFilter = function(id){
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    var opt = '';
    $.each(data, function(i, item){
        opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
    });
    
    return opt;
}

ShiftPlanningView.prototype.skillsFilter = function(notAdmin){
    if (typeof notAdmin == 'undefined'){
        notAdmin = false;
    }
    var opt;
    if (notAdmin == false){
        opt = '<option value="0">All Skills</option>';
        $.each(spModel.staff.allSkills(), function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.locationSelector = function(){
    var opt = '<optgroup lable="locations">';
    $.each(spModel.location.locationsList(), function(i, item){
        opt += '<option value="' + item.id + '">' + item.name + '</option>';
    });
    opt += '</optgroup><optgroup><option value="add">New Location?</option></optgroup>';
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

ShiftPlanningView.prototype.editableSchedules = function(employee){
    var l = '';
    var i = 2;
    $.each(spModel.schedule.allSchedules(), function(i2, item){
        var c = (typeof employee.schedules != 'undefined' && typeof employee.schedules[item.id] != 'undefined') ? 'check"' : '';
        l += '<li class="' + ((i % 2 == 0) ? 'even' : 'odd') + '">';
        l += '  <div>';
        l += '      <span class="checkbox ' + c + '" itemId=' + item.id + '>' + item.name + '</span>';
        l += '  </div>';
        l += '</li>';
        i++;
    });
    
    return l;
}

ShiftPlanningView.prototype.editableSkills = function(employee){
    var l = '';
    var i = 2;
    $.each(spModel.staff.allSkills(), function(i2, item){
        var c = (typeof employee.skills != 'undefined' && typeof employee.skills[item.id] != 'undefined') ? 'check' : '';
        l += '<li class="' + ((i % 2 == 0) ? 'even' : 'odd') + '">';
        l += '  <div>';
        l += '      <span class="checkbox ' + c + '" itemId=' + item.id + '>' + item.name + '</span>';
        l += '  </div>';
        l += '</li>';
        i++;
    });
    
    return l;
}

ShiftPlanningView.prototype.ulLoader = function(){
    return '<li class="loading"></li>';
}

ShiftPlanningView.prototype.divLoader = function(){
    return '<div class="loading"></div>';
}

ShiftPlanningView.prototype.emptyResult = function(text, tag){
    if (typeof tag == 'undefined'){
        tag = 'div'
    }
    if (typeof text == 'undefined'){
        text = 'Na data for selected criteria!';
    }
    return '<' + tag + ' class="additional">' + text + '</' + tag + '>'
}

var spView = new ShiftPlanningView();