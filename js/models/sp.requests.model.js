var SPModelRequests = function(){
    this.model = 'requests';
}

SPModelRequests.prototype.vacations = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}