function ShiftPlanningSchedule(){
    this.initialize();
    this.fix = 86000;
    this.raw = {};
    this.data = {};
    this.prepared = {};
    this.shifts = {};
    this.loaded = false;
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



