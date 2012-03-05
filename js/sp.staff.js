function ShiftPlanningStaff(){
    this.changed = true;
    this.page = 6;
    this.initialize();
    return true;
}

ShiftPlanningStaff.prototype = {
    data: {},
    raw: {},
    admin: {},
    initialize: function(){
        
    },
    login: function(username, password){
        console.log('Implement staff.login for this device. ');
    },
    loadPage : function(){
        
    }
    
}



