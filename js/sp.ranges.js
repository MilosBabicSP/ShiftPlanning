var ShiftPlanningRanges = function(){
    this.times = {
        0 : {
            title : 'Today',
            start_time : strtotime('now'),
            end_time : strtotime('now +1 day')
        },
        1 : {
            title : 'Yesterday',
            start_time : strtotime('now -2 day'),
            end_time : strtotime('now')
        },
        2 : {
            title : 'Last 7 Days',
            start_time : strtotime('now -7 day'),
            end_time : strtotime('now')
        },
        3 : {
            title : 'This Week',
            start_time : Date.parse('monday').getTime()/1000,
            end_time : Date.parse('next sunday').getTime()/1000
        },
        4 : {
            title : 'Last Week',
            start_time : ((Date.parse('monday').getTime()/1000) - 604800),
            end_time : Date.parse('sunday').getTime()/1000
        },
        5 : {
            title : 'This Month',
            start_time : strtotime('now -'+ (now().getDate() -1) + ' days'),
            end_time : strtotime('now +1 day')
        },
        6 : {
            title : 'Last Month',
            start_time : strtotime('now -'+ (now().getDate() +30) + ' days'),
            end_time : strtotime('now -'+ (now().getDate() -1) + ' days')
        },
        7 : {
            title : 'All The Time',
            start_time : strtotime('last year'),
            end_time : strtotime('now +1 day')
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