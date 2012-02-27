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