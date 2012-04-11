var ShiftPlanningRanges = function(){
    this.times = {
        0 : {
            title : 'Today',
            start_time : Date.parse('today').getTime(),
            end_time : Date.parse('today').getTime()
        },
        1 : {
            title : 'Yesterday',
            start_time : Date.parse('yesterday').getTime(),
            end_time : Date.parse('yesterday').getTime()
        },
        2 : {
            title : 'Last 7 Days',
            start_time : strtotime('now -7 day')*1000,
            end_time : strtotime('now')*1000
        },
        3 : {
            title : 'This Week',
            start_time : Date.parse('monday').getTime(),
            end_time : Date.parse('next sunday').getTime()
        },
        4 : {
            title : 'Last Week',
            start_time : ((Date.parse('monday').getTime()) - 604800),
            end_time : Date.parse('sunday').getTime()
        },
        5 : {
            title : 'This Month',
            start_time : strtotime('now -'+ (now().getDate() -1) + ' days')*1000,
            end_time : strtotime('now +1 day')*1000
        },
        6 : {
            title : 'Last Month',
            start_time : strtotime('now -'+ (now().getDate() +30) + ' days')*1000,
            end_time : strtotime('now -'+ (now().getDate() -1) + ' days')*1000
        },
        7 : {
            title : 'All The Time',
            start_time : strtotime('last year')*1000,
            end_time : strtotime('now +1 day')*1000
        }
    }
}


ShiftPlanningRanges.prototype.getRange = function(range, id){
    return this[range][id];
}

ShiftPlanningRanges.prototype.createSelector = function(range){
    var res = [];
    $.each(this[range], function(i, item){
        res.push(item.title);
    });
    
    return res;
}

var spRanges = new ShiftPlanningRanges();