var ShiftPlanningRequests = function(){
    this.initialize();
    this.positions = '';
    this.employees = '';
    this.shifts = [];
    this.shiftsR = [];
    this.vacations = [];
	this.swaps = {};
    this.current = {};
    this.available = {};
    this.trades = {
        'manage': [],
        'requested' : [],
        'avaiting' : []
    };
}

ShiftPlanningRequests.prototype = {
    initialize: function(){
        //some event
    },
    loadPage : function(){
        
    }
}