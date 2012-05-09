function ShiftPlanningTimeClock(){
    this.initialize();
    this.timeSheetsData = {};
    this.actco = false;
    this.current = {};
    this.edit = false;
    return true;
}

ShiftPlanningTimeClock.prototype = {
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
            end_time : strtotime('now +1 day')
        },
        3 : {
            start_time : Date.parse('monday').getTime()/1000,
            end_time : Date.parse('next sunday').getTime()/1000
        },
        4 : {
            start_time : ((Date.parse('monday').getTime()/1000) - 604800),
            end_time : Date.parse('sunday').getTime()/1000
        }
    }
}