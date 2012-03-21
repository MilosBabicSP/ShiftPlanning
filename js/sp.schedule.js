function ShiftPlanningSchedule(){
    this.initialize();
    this.raw = {};
    this.data = {};
    this.prepared = {};
    this.loaded = false;
    this.settings = {
        mode : 'employee',
        start_date : 'today',
        end_date : 'today'
    };
    return true;
}

ShiftPlanningSchedule.prototype = {
    initialize: function(){
        
    },
    loadPage : function(){
        
    }
    
}



