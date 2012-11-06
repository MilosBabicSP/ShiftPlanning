var ShiftPlanningRanges = function(){
    this.times = {
	0 : {
	    title : 'Today',
	    start_time : Date.parse('today').getTime(),
	    end_time : Date.parse('today').add(1).days().getTime()
	},
	1 : {
	    title : 'Yesterday',
	    start_time : Date.parse('yesterday').getTime(),
	    end_time : Date.parse('yesterday').add(1).days().getTime()
	},
	2 : {
	    title : 'Last 7 Days',
	    start_time : strtotime('now -7 day')*1000,
	    end_time : strtotime('now')*1000
	},
	3 : {
	    title : 'This Week',
	    start_time : Date.parse('sunday').getTime(),
	    end_time : Date.parse('next saturday').getTime()
	},
	4 : {
	    title : 'Last Week',
	    start_time : Date.parse('today').moveToDayOfWeek(0).addWeeks(-2).getTime(),
	    end_time : Date.parse('previous saturday').getTime()
	},
	5 : {
	    title : 'This Month',
	    start_time : strtotime('now -'+ (now().getDate() -1) + ' days')*1000,
	    end_time : Date.parse('today').moveToLastDayOfMonth().getTime()
	},
	6 : {
	    title : 'Last Month',
	    start_time : strtotime('now -'+ (now().getDate() +30) + ' days')*1000,
	    end_time : strtotime('now -'+ (now().getDate()) + ' days')*1000
	},
	7 : {
	    title : 'One Year',
	    start_time : strtotime('last year')*1000,
	    end_time : strtotime('now')*1000
	}
    };
    this.currencies = ['',
    '$', '&#163;', '&#8364;', '&#8360;', '&#165;', '&#8361;', 'R', 'kr', '&#8369;', 'RM'
    ]
	this.weekdays = {
		1:'Mon',
		2:'Tue',
		3:'Wed',
		4:'Thu',
		5:'Fri',
		6:'Sat',
		7:'Sun'
	}
	this.months = [
		'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
	]
}

ShiftPlanningRanges.prototype.fixRanges = function(){
    var self = this;
    var czm = Date.parse('now').getTimezoneOffset() * 60 * 1000;
    var tz = sp.staff.admin.settings.timezone;
    var tzf = tz.split(',');
    tzf = tzf[0].split(':');
    var h = parseInt(tzf[0]) * 60*60;
    var mp = (parseInt(tzf[0]) * 60*60)/Math.abs(parseInt(tzf[0]) * 60*60);
    var min = (tzf[1] * 60);
    $.each(this.times, function(i, item){
	self.times[i].start_date = item.start_date + czm + (mp * (Math.abs(h) + min)) * 1000;
	self.times[i].end_date = item.end_date + czm + (mp * (Math.abs(h) + min)) * 1000;
    });
    self.times[3] = {
	title : 'This Week',
	start_time : Date.parse(self.weekdays[sp.staff.admin.settings.startday]).addDays(-8).getTime(),
	end_time : Date.parse(self.weekdays[sp.staff.admin.settings.startday]).addDays(-1).getTime()
    }
    self.times[4] = {
	title : 'Last Week',
	start_time : Date.parse(self.weekdays[sp.staff.admin.settings.startday]).addDays(-15).getTime(),
	end_time : Date.parse(self.weekdays[sp.staff.admin.settings.startday]).addDays(-8).getTime()
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