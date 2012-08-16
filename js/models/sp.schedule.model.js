var SPModelSchedule = function(){
    this.model = 'schedule';
}

SPModelSchedule.prototype.vacation = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}

SPModelSchedule.prototype.vacations = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}



//Prepare data
SPModelSchedule.prototype.schedulesByUser = function(id, locations){
    if (typeof locations == 'undefined'){
	locations = false;
    }
    if (typeof sp.staff.data.employees[id] != 'undefined'){
	if (!locations){
	    return (typeof sp.staff.data.employees[id].schedules == 'undefined') ? {} : sp.staff.data.employees[id].schedules;
	} else {
	    var loc = (typeof sp.staff.data.employees[id].schedules == 'undefined') ? {} : sp.staff.data.employees[id].schedules;
	    var locs = {};
	    $.each(sp.schedule.raw.schedules, function(i, item){
		if (typeof loc[item.id] != 'undefined'){
		    if (typeof item.location == 'undefined'){
			item.location  = {
			    name : _('Schedules')
			} 
		    }
		    if (typeof locs[item.location.name] == 'undefined'){
			locs[item.location.name] = {
			    name : item.location.name,
			    data : []
			}
		    }
		    locs[item.location.name].data.push(item);
		}
	    });
	    
	    return locs;
	}
    } else {
	return {};
    }
}

SPModelSchedule.prototype.allSchedules = function(r){
    if (typeof r == 'undefined'){
        return sp.schedule.data.schedules;
    } else {
        spModel.schedule.get('schedules', {}, function(response){
            sp.schedule.raw.schedules = response.data;
            sp.schedule.data.schedules = sp.map(response.data);
            return sp.schedule.data.schedules;
        }, function(response){
            Log.log('implement');
            return {};
        })
    }
}
