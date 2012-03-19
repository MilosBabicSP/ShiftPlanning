var ShiftPlanningRequests = function(){
    this.initialize();
    this.positions = '';
    this.employees = '';
    this.shifts = [];
    this.shiftsR = [];
    this.vacations = [];
    this.current = {};
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