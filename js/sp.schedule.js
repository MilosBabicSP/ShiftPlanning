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
    this.fromRecent = false ;
    this.fromUpcoming = false ;
    this.fromDashboardUpcoming = false;
    this.fromStaff=false;
    this.settings = {
        mode : 'employee',
        start_date : 'yesterday',
        end_date : 'yesterday'
    };
    this.page = 'today';
    this.conflicts = {};
    return true;
}

ShiftPlanningSchedule.prototype = {
    initialize: function(){
        
    },
    loadPage : function(){
        
    },
    setConflicts : function(conf){
	var self = this;
	$.each(conf, function(i, item){
	    self.conflicts[item.shift + ''] = item;
	});
    }
    
}



