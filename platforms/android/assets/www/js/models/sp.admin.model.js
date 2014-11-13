var SPModelAdmin = function(){
    this.model = 'admin';
}

SPModelAdmin.prototype.vacations = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}