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
SPModelSchedule.prototype.schedulesByUser = function(id){
    if (typeof sp.staff.data.employees[id] != 'undefined'){
        return (typeof sp.staff.data.employees[id].schedules == 'undefined') ? {} : sp.staff.data.employees[id].schedules;
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
