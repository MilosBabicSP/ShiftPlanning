function ShiftPlanningSchedule(){
    this.initialize();
    this.fix = 86000;
    this.raw = {};
    this.data = {};
    this.prepared = {};
    this.shifts = {};
    this.shift = {};
    this.loaded = false;
    this.edit = false;
    this.fromDashboard = false;
    this.settings = {
        mode : 'employee',
        start_date : 'yesterday',
        end_date : 'yesterday'
    };
    this.page = 'today';
    return true;
}

ShiftPlanningSchedule.prototype = {
    initialize: function(){
        
    },
    loadPage : function(){
        
    }
    
}



