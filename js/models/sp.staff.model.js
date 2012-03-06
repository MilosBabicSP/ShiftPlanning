var SPModelStaff = function(){
    this.model = 'staff';
}

SPModelStaff.prototype.allStaff = function(scheduleId){
    if (typeof scheduleId == 'undefined'){
        return sp.staff.raw.employees;
    } else {
        spModel.staff.get('employees', {schedule : scheduleId}, function(response){
            return response.data;
        }, function(response){
            Log.log('implement');
            return {};
        });
    }
}

SPModelStaff.prototype.allSkills = function(r){
    if (typeof r == 'undefined'){
        return sp.staff.raw.skills;
    } else {
        spModel.schedule.get('schedules', {}, function(response){
            sp.staff.raw.skills = response.data;
            sp.staff.data.skills = sp.map(response.data);
            return sp.staff.raw.skills;
        }, function(response){
            Log.log('implement');
            return {};
        })
    }
}