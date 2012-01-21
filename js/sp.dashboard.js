function ShiftPlanningDashboard(){
    this.initialize();
    this.messages = {};
    this.cache = new hash();
    this.pagePO = 6;
    this.pageSK = 6;
    return true;
}

ShiftPlanningDashboard.prototype = {
    templates: {},
    initialize: function(){
        
    },
    loadPage: function(){
        console.log('test');
        console.log('Implement loadPage for this device.');
    }
    
}



