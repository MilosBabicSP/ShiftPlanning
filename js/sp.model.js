var ShiftPlanningModel = function(){
    //do we run initialize
    this.cache = {};
    //current diff
    this.diff = '';
}

ShiftPlanningModel.prototype.addModel = function(model, addClass){
    //we extends add class with base methods and initalize it into model object
    $.extend(addClass.prototype, spModel);
    if (typeof this[model] == 'undefined'){
        this[model] = new addClass;
    }
}

ShiftPlanningModel.prototype.get = function(module, data, success, error){
    var self = this;
//    self.cacheDiff(data);
//    if (self.isSetCache(module)){
//        success(self.getCache(module));
//    } else {
        if (typeof this[module] == 'undefined'){
            sp.api(this.model + '.' + module, 'get', data, function(response) {
                //self.setCache(module, sp.map(response.data));
                if(typeof success == 'function'){
                    success.call(this, response);
                }
            }, function(response){
                //self.clearCache(module);
                sp.showError(response.error);
                if(typeof error == 'function'){
                    error.call(this, error);
                }
            });
        } else {
            this[module](module, 'get', data, function(response){
                //self.setCache(module, sp.map(response.data));
                if(typeof success == 'function'){
                    success.call(this, response);
                }
            }, function(response){
                //self.clearCache(module);
                sp.showError(response.error);
                if(typeof error == 'function'){
                    error.call(this, response);
                }
            });
        }
    //}
}

ShiftPlanningModel.prototype.update = function(module, data, success, error){
    var self = this;
    //    self.cacheDiff(data);
    //    if (self.isSetCache(module)){
    //        success(self.getCache(module));
    //    } else {
    if (typeof this[module] == 'undefined'){
        sp.api(this.model + '.' + module, 'update', data, function(response) {
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    } else {
        this[module](module, 'update', data, function(response){
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, response);
            }
        });
    }
//}
}

ShiftPlanningModel.prototype.create = function(module, data, success, error){
    var self = this;
    //    self.cacheDiff(data);
    //    if (self.isSetCache(module)){
    //        success(self.getCache(module));
    //    } else {
    if (typeof this[module] == 'undefined'){
        sp.api(this.model + '.' + module, 'create', data, function(response) {
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    } else {
        this[module](module, 'create', data, function(response){
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, response);
            }
        });
    }
//}
}

ShiftPlanningModel.prototype.del = function(module, data, success, error){
    var self = this;
    //    self.cacheDiff(data);
    //    if (self.isSetCache(module)){
    //        success(self.getCache(module));
    //    } else {
    if (typeof this[module] == 'undefined'){
        sp.api(this.model + '.' + module, 'delete', data, function(response) {
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    } else {
        this[module](module, 'delete', data, function(response){
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(e){
            //self.clearCache(module);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    }
//}
}

ShiftPlanningModel.prototype.set = function(module){
    
}

ShiftPlanningModel.prototype.setCache = function(field, data){
    if (typeof this.cache[field] == 'unfedined'){
        this.cache[field] = {};
    }
    this.cache[field][this.diff] = data;
}

ShiftPlanningModel.prototype.clearCache = function(field){
    this.cache[field] = {};
}

ShiftPlanningModel.prototype.getCache = function(field){
    return this.cache[field];
}

ShiftPlanningModel.prototype.isSetCache = function(field){
    if (typeof this.cache[field] != 'undefined' && this.cache[field].length > 0){
        return true;
    } else {
        return false;
    }
}

//different data for same modul
ShiftPlanningModel.prototype.cacheDiff = function(diff){
    if (typeof diff != 'undefined'){
        this.diff = JSON.stringify(diff);
    } else {
        if (this.diff.length == 0){
            Log.log('Please set diff');
        } else {
            return this.diff;
        }
    }
    return true;
}




var spModel = new ShiftPlanningModel();


//adding classes
spModel.addModel('schedule', SPModelSchedule);
spModel.addModel('requests', SPModelRequests);
spModel.addModel('admin', SPModelAdmin);
spModel.addModel('messaging', SPModelMessaging);
spModel.addModel('timeclock', SPModelTimeClock);
spModel.addModel('staff', SPModelStaff);
spModel.addModel('payroll', SPModelPayroll);