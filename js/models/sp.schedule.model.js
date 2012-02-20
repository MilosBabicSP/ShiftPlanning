var SPModelSchedule = function(){
    this.model = 'schedule';
}

SPModelSchedule.prototype.vacation = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}

SPModelSchedule.prototype.vacations = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}