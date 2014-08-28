function ShiftPlanningLogout(){
    this.initialize();
    return true;
}

ShiftPlanningLogout.prototype = {
    initialize: function(){
        
    },
    loadPage: function(){
        sp.staff.logout();
    }
}
