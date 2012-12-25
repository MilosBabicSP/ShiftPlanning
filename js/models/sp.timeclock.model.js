var SPModelTimeClock = function(){
    this.model = 'timeclock';
}


SPModelTimeClock.prototype.dtc = function(id, callback){
    spModel.timeclock.del('timeclock', {id : id}, function(response){
        callback(response);
    });
}