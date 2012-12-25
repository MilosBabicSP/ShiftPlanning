var ShiftPlanningReports = function(){
    this.initialize();
    this.locations = '';
    this.positions = '';
    this.employees = '';
    this.skills = '';
    this.page = 'allReports';
    this.timeLine = '';
}

ShiftPlanningReports.prototype = {
    initialize: function(){
        //some event
    },
    loadPage : function(){
    },    
    times : {
        0 : {
            start_time : strtotime('now'),
            end_time : strtotime('now +1 day')
        },
        1 : {
            start_time : strtotime('now -2 day'),
            end_time : strtotime('now')
        },
        2 : {
            start_time : strtotime('now -7 day'),
            end_time : strtotime('now')
        },
        3 : {
            start_time : Date.parse('monday').getTime()/1000,
            end_time : Date.parse('next sunday').getTime()/1000
        },
        4 : {
            start_time : ((Date.parse('monday').getTime()/1000) - 604800),
            end_time : Date.parse('sunday').getTime()/1000
        },
        5 : {
            start_time : strtotime('now -'+ (now().getDate() -1) + ' days'),
            end_time : strtotime('now +1 day')
        },
        6 : {
            start_time : strtotime('now -'+ (now().getDate() +30) + ' days'),
            end_time : strtotime('now -'+ (now().getDate() -1) + ' days')
        },
        7 : {
            start_time : strtotime('last year'),
            end_time : strtotime('now +1 day')
        }
    }
}