var SPModelRequests = function(){
    this.model = 'requests';
}

SPModelRequests.prototype.vacations = function(module, method, data, success, error){
    console.log(this.model, module);
    sp.api(this.model + '.' + module, method, data, success, error);
}