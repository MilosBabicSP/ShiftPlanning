var ShiftPlanningView = function(){
    
}

ShiftPlanningView.prototype.optionSchedules = function(id, m){
    if (typeof m == 'undefined'){
	m = false;
    }
    var opt;
    var self = this;
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    if (!m){
	opt = '<option disabled="disabled" selected="selected" value="0">Select Schedule</option>';
    } else {
	opt = '<option disabled="disabled" selected="selected" value="0">Select Schedule</option>';
    }
    $.each(data, function(i, item){
        if (self.checkPerm(item)){
            opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        }
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
	var l;
	if (sp.staff.admin.info.group == 4){
	    l = sp.staff.fixed.employees;
	} else {
	    l = spModel.staff.allStaff();
	}
        $.each(l, function(i, item){
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
    var opt = '';
    if (notAdmin == false){
	if (sp.staff.admin.info.group <= 3){
	    opt = '<option value="0">All Employees</option>';
	}
	var l;
	
	if (sp.staff.admin.info.group == 4){
	    l = sp.staff.fixed.employees;
	} else {
	    l = spModel.staff.allStaff();
	}
        $.each(l, function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.scheduleFilter = function(id, deep){
    if (typeof deep == 'undefined'){
	deep = false;
    }
    var self = this;
    var opt = '';
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    if (sp.staff.admin.info.group <= 3){
	opt = '<option value="0">All Positions</option>';
    }
    
    $.each(data, function(i, item){
        if (self.checkPerm(item, deep)){
            opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        }
    });
    
    return opt;
}

ShiftPlanningView.prototype.schedulerFilter = function(id, deep){
    if (typeof deep == 'undefined'){
	deep = false;
    }
    var self = this;
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    var opt = '';
    $.each(data, function(i, item){
        if (self.checkPerm(item, deep)){
            opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        }
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

ShiftPlanningView.prototype.locationSelector = function(type){
    if (typeof type == 'undefined'){
        type = 2;
    }
    var opt = '<option value="0" selected="selected">' + ((type == 1) ? 'Select Location' : 'Select Work Slot') + '</option>';
    opt += '<optgroup lable="locations">';
    $.each(spModel.location.locationsList(), function(i, item){
        if (item.type == type){
            opt += '<option value="' + item.id + '">' + item.name + '</option>';
        }
    });
    opt += '</optgroup><optgroup><option value="add" type="' + type + '">' + ((type == 1) ? 'New Location?' : 'New Work Slot?') + '</option></optgroup>';
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
    
    return (l.length > 0) ? l : this.emptyResult(_s('No positions to display'), 'li', 'noBorder');
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
    
    return (l.length > 0) ? l : this.emptyResult(_s('No skills to display'), 'li', 'noBorder');
}

ShiftPlanningView.prototype.ulLoader = function(){
    return '<li class="loading"></li>';
}

ShiftPlanningView.prototype.divLoader = function(){
    return '<div class="loading"></div>';
}

ShiftPlanningView.prototype.emptyResult = function(text, tag, cl){
    if (typeof cl == 'undefined'){
	cl = '';
    }
    if (typeof tag == 'undefined'){
        tag = 'div'
    }
    if (typeof text == 'undefined'){
        text = _s('Na data for selected criteria!');
    }
    return '<' + tag + ' class="additional ' + cl + '"><p>' + text + '</p></' + tag + '>'
}

ShiftPlanningView.prototype.checkPerm = function(item, deep){
    if (typeof deep == 'undefined'){
	deep = false;
    }
    var c = 1;
    if (deep){
	c = 2;
    }
    var perm = true;
    if (typeof item.perms != 'undefined'){
        if (item.perms >= c){
            perm = true;
        } else {
            perm = false;
        }
    }
    return perm;
}

ShiftPlanningView.prototype.fixCurrency = function(cId, r){
    if (typeof r == 'undefined'){
	r = false;
    }
    var c = spRanges.currencies[cId];
    
    if (!r){
	$('span.currency').html(c);
    } else {
	return c;
    }
    
}

var spView = new ShiftPlanningView();