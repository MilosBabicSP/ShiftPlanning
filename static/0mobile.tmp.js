var SPModelAdmin = function(){
    this.model = 'admin';
}

SPModelAdmin.prototype.vacations = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}

 var SPModelLocation = function(){
    this.model = 'location';
}


SPModelLocation.prototype.locationsList = function(r){
    if (typeof r != 'undefined' && r == true){
        spModel.location.get('locations', {}, function(response){
            sp.staff.raw.locations = response.data;
            sp.staff.data.locations = sp.map(response.data);
        });
    } else {
        return sp.staff.data.locations;
    }
}

 var SPModelMessaging = function(){
    this.model = 'messaging';
}

SPModelMessaging.prototype.wall = function(module, method, data, success, error){
    var self = this;
    sp.api(this.model + '.' + module, method, data, function(response){
        if(typeof success == 'function'){
            if (method == 'get'){
                response.data = self.prepareWallMessages(response.data);
            }
            success.call(this, response);
        }
    }, error);
}


SPModelMessaging.prototype.prepareWallMessages = function(response){
    var data = [];
               
    $.each(response,function(){
        var comments = [];
        if(typeof this.comments != 'undefined'){
            $.each(this.comments,function(){
                comments.push({
                    id: this.id,
                    avatar: sp.getAvatar(this.user.id),
                    userName: this.user.name,
                    userId : this.user.id,
                    time: $.timeago(new Date(this.date*1000)),
                    comment: this.comment_formatted,
                    full : true,
                    owner : (parseInt(sp.staff.admin.info.group) <= 3 || this.user.id == sp.staff.admin.info.id) ? 1 : 0
                });
            });
        }
        data.push({
            id: this.id,
            avatar: sp.getAvatar(this.user.id),
            userName: this.user.name,
            userId : this.user.id,
            time: $.timeago(new Date(this.date*1000)),
            sticky: parseInt(this.sticky),
            title: this.title_formatted,
            post: this.post_formatted,
            comments: comments,
            owner : (parseInt(sp.staff.admin.info.group) <= 3 || this.user.id == sp.staff.admin.info.id) ? 1 : 0
        });
    });
    return data;
}

 var SPModelPayroll = function(){
    this.model = 'payroll';
}


 var SPModelRequests = function(){
    this.model = 'requests';
}

SPModelRequests.prototype.vacations = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}

 var SPModelSchedule = function(){
    this.model = 'schedule';
}

SPModelSchedule.prototype.vacation = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}

SPModelSchedule.prototype.vacations = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}



//Prepare data
SPModelSchedule.prototype.schedulesByUser = function(id, locations){
    if (typeof locations == 'undefined'){
	locations = false;
    }
    if (typeof sp.staff.data.employees[id] != 'undefined'){
	if (!locations){
	    return (typeof sp.staff.data.employees[id].schedules == 'undefined') ? {} : sp.staff.data.employees[id].schedules;
	} else {
	    var loc = (typeof sp.staff.data.employees[id].schedules == 'undefined') ? {} : sp.staff.data.employees[id].schedules;
	    var locs = {};
	    $.each(sp.schedule.raw.schedules, function(i, item){
		if (typeof loc[item.id] != 'undefined'){
		    if (typeof item.location == 'undefined'){
			item.location  = {
			    name : _('Schedules')
			} 
		    }
		    if (typeof locs[item.location.name] == 'undefined'){
			locs[item.location.name] = {
			    name : item.location.name,
			    data : []
			}
		    }
		    locs[item.location.name].data.push(item);
		}
	    });
	    
	    return locs;
	}
    } else {
	return {};
    }
}

SPModelSchedule.prototype.allSchedules = function(r){
    if (typeof r == 'undefined'){
        return sp.schedule.data.schedules;
    } else {
        spModel.schedule.get('schedules', {}, function(response){
            sp.schedule.raw.schedules = response.data;
            sp.schedule.data.schedules = sp.map(response.data);
            return sp.schedule.data.schedules;
        }, function(response){
            Log.log('implement');
            return {};
        })
    }
}


 var SPModelStaff = function(){
    this.model = 'staff';
}

SPModelStaff.prototype.allStaff = function(scheduleId){
    if (typeof scheduleId == 'undefined'){
        return sp.staff.raw.employees;
    } else {
        spModel.staff.get('employees', {schedule : scheduleId}, function(response){
            return response.data;
        }, function(response){
            Log.log('implement');
            return {};
        });
    }
}

SPModelStaff.prototype.allSkills = function(r){
    if (typeof r == 'undefined'){
        return (sp.staff.raw.skills == null) ? [] : sp.staff.raw.skills;
    } else {
        spModel.schedule.get('schedules', {}, function(response){
            sp.staff.raw.skills = response.data;
            sp.staff.data.skills = sp.map(response.data);
            return sp.staff.raw.skills;
        }, function(response){
            Log.log('implement');
            return {};
        });
    }
}

SPModelStaff.prototype.reset = function(){
    spModel.staff.get('employees', {}, function(response){
        sp.staff.raw.employees = response.data;
        sp.staff.data.employees = sp.map(response.data);
    });
}

SPModelStaff.prototype.getEmployeeById = function(id){
    if (typeof sp.staff.data.employees[id] == 'undefined'){
        sp.showError('Employee doesn\'t exists');
        return sp.staff.admin.info;
    }
    return sp.staff.data.employees[id];
}

SPModelStaff.prototype.addEmployee = function(data){
    sp.staff.raw.employees.push(data);
    sp.staff.data.employees['' + data.id] = data
}

 var SPModelTimeClock = function(){
    this.model = 'timeclock';
}


SPModelTimeClock.prototype.dtc = function(id, callback){
    spModel.timeclock.del('timeclock', {id : id}, function(response){
        callback(response);
    });
}

 var SPModelTraining = function() {
	this.model='training';
}

 /**
 * @version: 1.0 Alpha-1
 */

(function () {
    var $D = Date,
        $P = $D.prototype,
        $C = $D.CultureInfo,
        $f = [],
        p = function (s, l) {
            if (!l) {
                l = 2;
            }
            return ("000" + s).slice(l * -1);
        };

    /**
     * Converts a PHP format string to Java/.NET format string.
     * A PHP format string can be used with .$format or .format.
     * A Java/.NET format string can be used with .toString().
     * The .parseExact function will only accept a Java/.NET format string
     *
     * Example
     <pre>
     var f1 = "%m/%d/%y"
     var f2 = Date.normalizeFormat(f1); // "MM/dd/yy"

     new Date().format(f1);    // "04/13/08"
     new Date().$format(f1);   // "04/13/08"
     new Date().toString(f2);  // "04/13/08"

     var date = Date.parseExact("04/13/08", f2); // Sun Apr 13 2008
     </pre>
     * @param {String}   A PHP format string consisting of one or more format spcifiers.
     * @return {String}  The PHP format converted to a Java/.NET format string.
     */
    $D.normalizeFormat = function (format) {
        $f = [];
        var t = new Date().$format(format);
        return $f.join("");
    };

    /**
     * Format a local Unix timestamp according to locale settings
     *
     * Example
     <pre>
     Date.strftime("%m/%d/%y", new Date());       // "04/13/08"
     Date.strftime("c", "2008-04-13T17:52:03Z");  // "04/13/08"
     </pre>
     * @param {String}   A format string consisting of one or more format spcifiers [Optional].
     * @param {Number}   The number representing the number of seconds that have elapsed since January 1, 1970 (local time).
     * @return {String}  A string representation of the current Date object.
     */
    $D.strftime = function (format, time) {
        return new Date(time * 1000).$format(format);
    };

    /**
     * Parse any textual datetime description into a Unix timestamp.
     * A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).
     *
     * Example
     <pre>
     Date.strtotime("04/13/08");              // 1208044800
     Date.strtotime("1970-01-01T00:00:00Z");  // 0
     </pre>
     * @param {String}   A format string consisting of one or more format spcifiers [Optional].
     * @param {Object}   A string or date object.
     * @return {String}  A string representation of the current Date object.
     */
    $D.strtotime = function (time) {
        var d = $D.parse(time);
        d.addMinutes(d.getTimezoneOffset() * -1);
        return Math.round($D.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()) / 1000);
    };

    /**
     * Converts the value of the current Date object to its equivalent string representation using a PHP/Unix style of date format specifiers.
     *
     * The following descriptions are from http://www.php.net/strftime and http://www.php.net/manual/en/function.date.php.
     * Copyright © 2001-2008 The PHP Group
     *
     * Format Specifiers
     <pre>
    Format  Description                                                                  Example
    ------  ---------------------------------------------------------------------------  -----------------------
     %a     abbreviated weekday name according to the current localed                    "Mon" through "Sun"
     %A     full weekday name according to the current locale                            "Sunday" through "Saturday"
     %b     abbreviated month name according to the current locale                       "Jan" through "Dec"
     %B     full month name according to the current locale                              "January" through "December"
     %c     preferred date and time representation for the current locale                "4/13/2008 12:33 PM"
     %C     century number (the year divided by 100 and truncated to an integer)         "00" to "99"
     %d     day of the month as a decimal number                                         "01" to "31"
     %D     same as %m/%d/%y                                                             "04/13/08"
     %e     day of the month as a decimal number, a single digit is preceded by a space  "1" to "31"
     %g     like %G, but without the century                                             "08"
     %G     The 4-digit year corresponding to the ISO week number (see %V).              "2008"
            This has the same format and value as %Y, except that if the ISO week number
            belongs to the previous or next year, that year is used instead.
     %h     same as %b                                                                   "Jan" through "Dec"
     %H     hour as a decimal number using a 24-hour clock                               "00" to "23"
     %I     hour as a decimal number using a 12-hour clock                               "01" to "12"
     %j     day of the year as a decimal number                                          "001" to "366"
     %m     month as a decimal number                                                    "01" to "12"
     %M     minute as a decimal number                                                   "00" to "59"
     %n     newline character                                                            "\n"
     %p     either "am" or "pm" according to the given time value, or the                "am" or "pm"
            corresponding strings for the current locale
     %r     time in a.m. and p.m. notation                                               "8:44 PM"
     %R     time in 24 hour notation                                                     "20:44"
     %S     second as a decimal number                                                   "00" to "59"
     %t     tab character                                                                "\t"
     %T     current time, equal to %H:%M:%S                                              "12:49:11"
     %u     weekday as a decimal number ["1", "7"], with "1" representing Monday         "1" to "7"
     %U     week number of the current year as a decimal number, starting with the       "0" to ("52" or "53")
            first Sunday as the first day of the first week
     %V     The ISO 8601:1988 week number of the current year as a decimal number,       "00" to ("52" or "53")
            range 01 to 53, where week 1 is the first week that has at least 4 days
            in the current year, and with Monday as the first day of the week.
            (Use %G or %g for the year component that corresponds to the week number
            for the specified timestamp.)
     %W     week number of the current year as a decimal number, starting with the       "00" to ("52" or "53")
            first Monday as the first day of the first week
     %w     day of the week as a decimal, Sunday being "0"                               "0" to "6"
     %x     preferred date representation for the current locale without the time        "4/13/2008"
     %X     preferred time representation for the current locale without the date        "12:53:05"
     %y     year as a decimal number without a century                                   "00" "99"
     %Y     year as a decimal number including the century                               "2008"
     %Z     time zone or name or abbreviation                                            "UTC", "EST", "PST"
     %z     same as %Z
     %%     a literal "%" character                                                      "%"

     d      Day of the month, 2 digits with leading zeros                                "01" to "31"
     D      A textual representation of a day, three letters                             "Mon" through "Sun"
     j      Day of the month without leading zeros                                       "1" to "31"
     l      A full textual representation of the day of the week (lowercase "L")         "Sunday" through "Saturday"
     N      ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)  "1" (for Monday) through "7" (for Sunday)
     S      English ordinal suffix for the day of the month, 2 characters                "st", "nd", "rd" or "th". Works well with j
     w      Numeric representation of the day of the week                                "0" (for Sunday) through "6" (for Saturday)
     z      The day of the year (starting from "0")                                      "0" through "365"
     W      ISO-8601 week number of year, weeks starting on Monday                       "00" to ("52" or "53")
     F      A full textual representation of a month, such as January or March           "January" through "December"
     m      Numeric representation of a month, with leading zeros                        "01" through "12"
     M      A short textual representation of a month, three letters                     "Jan" through "Dec"
     n      Numeric representation of a month, without leading zeros                     "1" through "12"
     t      Number of days in the given month                                            "28" through "31"
     L      Whether it's a leap year                                                     "1" if it is a leap year, "0" otherwise
     o      ISO-8601 year number. This has the same value as Y, except that if the       "2008"
            ISO week number (W) belongs to the previous or next year, that year
            is used instead.
     Y      A full numeric representation of a year, 4 digits                            "2008"
     y      A two digit representation of a year                                         "08"
     a      Lowercase Ante meridiem and Post meridiem                                    "am" or "pm"
     A      Uppercase Ante meridiem and Post meridiem                                    "AM" or "PM"
     B      Swatch Internet time                                                         "000" through "999"
     g      12-hour format of an hour without leading zeros                              "1" through "12"
     G      24-hour format of an hour without leading zeros                              "0" through "23"
     h      12-hour format of an hour with leading zeros                                 "01" through "12"
     H      24-hour format of an hour with leading zeros                                 "00" through "23"
     i      Minutes with leading zeros                                                   "00" to "59"
     s      Seconds, with leading zeros                                                  "00" through "59"
     u      Milliseconds                                                                 "54321"
     e      Timezone identifier                                                          "UTC", "EST", "PST"
     I      Whether or not the date is in daylight saving time (uppercase i)             "1" if Daylight Saving Time, "0" otherwise
     O      Difference to Greenwich time (GMT) in hours                                  "+0200", "-0600"
     P      Difference to Greenwich time (GMT) with colon between hours and minutes      "+02:00", "-06:00"
     T      Timezone abbreviation                                                        "UTC", "EST", "PST"
     Z      Timezone offset in seconds. The offset for timezones west of UTC is          "-43200" through "50400"
            always negative, and for those east of UTC is always positive.
     c      ISO 8601 date                                                                "2004-02-12T15:19:21+00:00"
     r      RFC 2822 formatted date                                                      "Thu, 21 Dec 2000 16:01:07 +0200"
     U      Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)                   "0"
     </pre>
     * @param {String}   A format string consisting of one or more format spcifiers [Optional].
     * @return {String}  A string representation of the current Date object.
     */
    $P.$format = function (format) {
        var x = this,
            y,
            t = function (v) {
                $f.push(v);
                return x.toString(v);
            };

        return format ? format.replace(/(%|\\)?.|%%/g,
        function (m) {
            if (m.charAt(0) === "\\" || m.substring(0, 2) === "%%") {
                return m.replace("\\", "").replace("%%", "%");
            }
            switch (m) {
            case "d":
            case "%d":
                return t("dd");
            case "D":
            case "%a":
                return t("ddd");
            case "j":
            case "%e":
                return t("d");
            case "l":
            case "%A":
                return t("dddd");
            case "N":
            case "%u":
                return x.getDay() + 1;
            case "S":
                return t("S");
            case "w":
            case "%w":
                return x.getDay();
            case "z":
                return x.getOrdinalNumber();
            case "%j":
                return p(x.getOrdinalNumber(), 3);
            case "%U":
                var d1 = x.clone().set({month: 0, day: 1}).addDays(-1).moveToDayOfWeek(0),
                    d2 = x.clone().addDays(1).moveToDayOfWeek(0, -1);
                return (d2 < d1) ? "00" : p((d2.getOrdinalNumber() - d1.getOrdinalNumber()) / 7 + 1);
            case "W":
            case "%V":
                return x.getISOWeek();
            case "%W":
                return p(x.getWeek());
            case "F":
            case "%B":
                return t("MMMM");
            case "m":
            case "%m":
                return t("MM");
            case "M":
            case "%b":
            case "%h":
                return t("MMM");
            case "n":
                return t("M");
            case "t":
                return $D.getDaysInMonth(x.getFullYear(), x.getMonth());
            case "L":
                return ($D.isLeapYear(x.getFullYear())) ? 1 : 0;
            case "o":
            case "%G":
                return x.setWeek(x.getISOWeek()).toString("yyyy");
            case "%g":
                return x.$format("%G").slice(-2);
            case "Y":
            case "%Y":
                return t("yyyy");
            case "y":
            case "%y":
                return t("yy");
            case "a":
            case "%p":
                return t("tt").toLowerCase();
            case "A":
                return t("tt").toUpperCase();
            case "g":
            case "%I":
                return t("h");
            case "G":
                return t("H");
            case "h":
                return t("hh");
            case "H":
            case "%H":
                return t("HH");
            case "i":
            case "%M":
                return t("mm");
            case "s":
            case "%S":
                return t("ss");
            case "u":
                return p(x.getMilliseconds(), 3);
            case "I":
                return (x.isDaylightSavingTime()) ? 1 : 0;
            case "O":
                return x.getUTCOffset();
            case "P":
                y = x.getUTCOffset();
                return y.substring(0, y.length - 2) + ":" + y.substring(y.length - 2);
            case "e":
            case "T":
            case "%z":
            case "%Z":
                return x.getTimezone();
            case "Z":
                return x.getTimezoneOffset() * -60;
            case "B":
                var now = new Date();
                return Math.floor(((now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds() + (now.getTimezoneOffset() + 60) * 60) / 86.4);
            case "c":
                return x.toISOString().replace(/\"/g, "");
            case "U":
                return $D.strtotime("now");
            case "%c":
                return t("d") + " " + t("t");
            case "%C":
                return Math.floor(x.getFullYear() / 100 + 1);
            case "%D":
                return t("MM/dd/yy");
            case "%n":
                return "\\n";
            case "%t":
                return "\\t";
            case "%r":
                return t("hh:mm tt");
            case "%R":
                return t("H:mm");
            case "%T":
                return t("H:mm:ss");
            case "%x":
                return t("d");
            case "%X":
                return t("t");
            default:
                $f.push(m);
			    return m;
            }
        }
        ) : this._toString();
    };

    if (!$P.format) {
        $P.format = $P.$format;
    }
}());

 /**
 * @version: 1.0 Alpha-1
 */

if(!Date || !Date.CultureInfo || Date.CultureInfo.name==''){
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|aft(er)?|from|hence)/i,subtract:/^(\-|bef(ore)?|ago)/i,yesterday:/^yes(terday)?/i,today:/^t(od(ay)?)?/i,tomorrow:/^tom(orrow)?/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^mn|min(ute)?s?/i,hour:/^h(our)?s?/i,week:/^w(eek)?s?/i,month:/^m(onth)?s?/i,day:/^d(ay)?s?/i,year:/^y(ear)?s?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a(?!u|p)|p)/i},timezones:[{name:"UTC",offset:"-000"},{name:"GMT",offset:"-000"},{name:"EST",offset:"-0500"},{name:"EDT",offset:"-0400"},{name:"CST",offset:"-0600"},{name:"CDT",offset:"-0500"},{name:"MST",offset:"-0700"},{name:"MDT",offset:"-0600"},{name:"PST",offset:"-0800"},{name:"PDT",offset:"-0700"}]};
}
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,p=function(s,l){if(!l){l=2;}
return("000"+s).slice(l*-1);};$P.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};$P.setTimeToNow=function(){var n=new Date();this.setHours(n.getHours());this.setMinutes(n.getMinutes());this.setSeconds(n.getSeconds());this.setMilliseconds(n.getMilliseconds());return this;};$D.today=function(){return new Date().clearTime();};$D.compare=function(date1,date2){if(isNaN(date1)||isNaN(date2)){throw new Error(date1+" - "+date2);}else if(date1 instanceof Date&&date2 instanceof Date){return(date1<date2)?-1:(date1>date2)?1:0;}else{throw new TypeError(date1+" - "+date2);}};$D.equals=function(date1,date2){return(date1.compareTo(date2)===0);};$D.getDayNumberFromName=function(name){var n=$C.dayNames,m=$C.abbreviatedDayNames,o=$C.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s||o[i].toLowerCase()==s){return i;}}
return-1;};$D.getMonthNumberFromName=function(name){var n=$C.monthNames,m=$C.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};$D.isLeapYear=function(year){return((year%4===0&&year%100!==0)||year%400===0);};$D.getDaysInMonth=function(year,month){return[31,($D.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};$D.getTimezoneAbbreviation=function(offset){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].offset===offset){return z[i].name;}}
return null;};$D.getTimezoneOffset=function(name){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].name===name.toUpperCase()){return z[i].offset;}}
return null;};$P.clone=function(){return new Date(this.getTime());};$P.compareTo=function(date){return Date.compare(this,date);};$P.equals=function(date){return Date.equals(this,date||new Date());};$P.between=function(start,end){return this.getTime()>=start.getTime()&&this.getTime()<=end.getTime();};$P.isAfter=function(date){return this.compareTo(date||new Date())===1;};$P.isBefore=function(date){return(this.compareTo(date||new Date())===-1);};$P.isToday=function(){return this.isSameDay(new Date());};$P.isSameDay=function(date){return this.clone().clearTime().equals(date.clone().clearTime());};$P.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};$P.addSeconds=function(value){return this.addMilliseconds(value*1000);};$P.addMinutes=function(value){return this.addMilliseconds(value*60000);};$P.addHours=function(value){return this.addMilliseconds(value*3600000);};$P.addDays=function(value){this.setDate(this.getDate()+value);return this;};$P.addWeeks=function(value){return this.addDays(value*7);};$P.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,$D.getDaysInMonth(this.getFullYear(),this.getMonth())));return this;};$P.addYears=function(value){return this.addMonths(value*12);};$P.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.milliseconds){this.addMilliseconds(x.milliseconds);}
if(x.seconds){this.addSeconds(x.seconds);}
if(x.minutes){this.addMinutes(x.minutes);}
if(x.hours){this.addHours(x.hours);}
if(x.weeks){this.addWeeks(x.weeks);}
if(x.months){this.addMonths(x.months);}
if(x.years){this.addYears(x.years);}
if(x.days){this.addDays(x.days);}
return this;};var $y,$m,$d;$P.getWeek=function(){var a,b,c,d,e,f,g,n,s,w;$y=(!$y)?this.getFullYear():$y;$m=(!$m)?this.getMonth()+1:$m;$d=(!$d)?this.getDate():$d;if($m<=2){a=$y-1;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=0;f=$d-1+(31*($m-1));}else{a=$y;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=s+1;f=$d+((153*($m-3)+2)/5)+58+s;}
g=(a+b)%7;d=(f+g-e)%7;n=(f+3-d)|0;if(n<0){w=53-((g-s)/5|0);}else if(n>364+s){w=1;}else{w=(n/7|0)+1;}
$y=$m=$d=null;return w;};$P.getISOWeek=function(){$y=this.getUTCFullYear();$m=this.getUTCMonth()+1;$d=this.getUTCDate();return p(this.getWeek());};$P.setWeek=function(n){return this.moveToDayOfWeek(1).addWeeks(n-this.getWeek());};$D._validate=function(n,min,max,name){if(typeof n=="undefined"){return false;}else if(typeof n!="number"){throw new TypeError(n+" is not a Number.");}else if(n<min||n>max){throw new RangeError(n+" is not a valid value for "+name+".");}
return true;};$D.validateMillisecond=function(value){return $D._validate(value,0,999,"millisecond");};$D.validateSecond=function(value){return $D._validate(value,0,59,"second");};$D.validateMinute=function(value){return $D._validate(value,0,59,"minute");};$D.validateHour=function(value){return $D._validate(value,0,23,"hour");};$D.validateDay=function(value,year,month){return $D._validate(value,1,$D.getDaysInMonth(year,month),"day");};$D.validateMonth=function(value){return $D._validate(value,0,11,"month");};$D.validateYear=function(value){return $D._validate(value,0,9999,"year");};$P.set=function(config){if($D.validateMillisecond(config.millisecond)){this.addMilliseconds(config.millisecond-this.getMilliseconds());}
if($D.validateSecond(config.second)){this.addSeconds(config.second-this.getSeconds());}
if($D.validateMinute(config.minute)){this.addMinutes(config.minute-this.getMinutes());}
if($D.validateHour(config.hour)){this.addHours(config.hour-this.getHours());}
if($D.validateMonth(config.month)){this.addMonths(config.month-this.getMonth());}
if($D.validateYear(config.year)){this.addYears(config.year-this.getFullYear());}
if($D.validateDay(config.day,this.getFullYear(),this.getMonth())){this.addDays(config.day-this.getDate());}
if(config.timezone){this.setTimezone(config.timezone);}
if(config.timezoneOffset){this.setTimezoneOffset(config.timezoneOffset);}
if(config.week&&$D._validate(config.week,0,53,"week")){this.setWeek(config.week);}
return this;};$P.moveToFirstDayOfMonth=function(){return this.set({day:1});};$P.moveToLastDayOfMonth=function(){return this.set({day:$D.getDaysInMonth(this.getFullYear(),this.getMonth())});};$P.moveToNthOccurrence=function(dayOfWeek,occurrence){var shift=0;if(occurrence>0){shift=occurrence-1;}
else if(occurrence===-1){this.moveToLastDayOfMonth();if(this.getDay()!==dayOfWeek){this.moveToDayOfWeek(dayOfWeek,-1);}
return this;}
return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek,+1).addWeeks(shift);};$P.moveToDayOfWeek=function(dayOfWeek,orient){var diff=(dayOfWeek-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};$P.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};$P.getOrdinalNumber=function(){return Math.ceil((this.clone().clearTime()-new Date(this.getFullYear(),0,1))/86400000)+1;};$P.getTimezone=function(){return $D.getTimezoneAbbreviation(this.getUTCOffset());};$P.setTimezoneOffset=function(offset){var here=this.getTimezoneOffset(),there=Number(offset)*-6/10;return this.addMinutes(there-here);};$P.setTimezone=function(offset){return this.setTimezoneOffset($D.getTimezoneOffset(offset));};$P.hasDaylightSavingTime=function(){return(Date.today().set({month:0,day:1}).getTimezoneOffset()!==Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.isDaylightSavingTime=function(){return(this.hasDaylightSavingTime()&&new Date().getTimezoneOffset()===Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r.charAt(0)+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};$P.getElapsed=function(date){return(date||new Date())-this;};if(!$P.toISOString){$P.toISOString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z"';};}
$P._toString=$P.toString;$P.toString=function(format){var x=this;if(format&&format.length==1){var c=$C.formatPatterns;x.t=x.toString;switch(format){case"d":return x.t(c.shortDate);case"D":return x.t(c.longDate);case"F":return x.t(c.fullDateTime);case"m":return x.t(c.monthDay);case"r":return x.t(c.rfc1123);case"s":return x.t(c.sortableDateTime);case"t":return x.t(c.shortTime);case"T":return x.t(c.longTime);case"u":return x.t(c.universalSortableDateTime);case"y":return x.t(c.yearMonth);}}
var ord=function(n){switch(n*1){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};return format?format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g,function(m){if(m.charAt(0)==="\\"){return m.replace("\\","");}
x.h=x.getHours;switch(m){case"hh":return p(x.h()<13?(x.h()===0?12:x.h()):(x.h()-12));case"h":return x.h()<13?(x.h()===0?12:x.h()):(x.h()-12);case"HH":return p(x.h());case"H":return x.h();case"mm":return p(x.getMinutes());case"m":return x.getMinutes();case"ss":return p(x.getSeconds());case"s":return x.getSeconds();case"yyyy":return p(x.getFullYear(),4);case"yy":return p(x.getFullYear());case"dddd":return $C.dayNames[x.getDay()];case"ddd":return $C.abbreviatedDayNames[x.getDay()];case"dd":return p(x.getDate());case"d":return x.getDate();case"MMMM":return $C.monthNames[x.getMonth()];case"MMM":return $C.abbreviatedMonthNames[x.getMonth()];case"MM":return p((x.getMonth()+1));case"M":return x.getMonth()+1;case"t":return x.h()<12?$C.amDesignator.substring(0,1):$C.pmDesignator.substring(0,1);case"tt":return x.h()<12?$C.amDesignator:$C.pmDesignator;case"S":return ord(x.getDate());default:return m;}}):this._toString();};}());
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,$N=Number.prototype;$P._orient=+1;$P._nth=null;$P._is=false;$P._same=false;$P._isSecond=false;$N._dateElement="day";$P.next=function(){this._orient=+1;return this;};$D.next=function(){return $D.today().next();};$P.last=$P.prev=$P.previous=function(){this._orient=-1;return this;};$D.last=$D.prev=$D.previous=function(){return $D.today().last();};$P.is=function(){this._is=true;return this;};$P.same=function(){this._same=true;this._isSecond=false;return this;};$P.today=function(){return this.same().day();};$P.weekday=function(){if(this._is){this._is=false;return(!this.is().sat()&&!this.is().sun());}
return false;};$P.at=function(time){return(typeof time==="string")?$D.parse(this.toString("d")+" "+time):this.set(time);};$N.fromNow=$N.after=function(date){var c={};c[this._dateElement]=this;return((!date)?new Date():date.clone()).add(c);};$N.ago=$N.before=function(date){var c={};c[this._dateElement]=this*-1;return((!date)?new Date():date.clone()).add(c);};var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),pxf=("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/),nth=("final first second third fourth fifth").split(/\s/),de;$P.toObject=function(){var o={};for(var i=0;i<px.length;i++){o[px[i].toLowerCase()]=this["get"+pxf[i]]();}
return o;};$D.fromObject=function(config){config.week=null;return Date.today().set(config);};var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
if(this._nth!==null){if(this._isSecond){this.addSeconds(this._orient*-1);}
this._isSecond=false;var ntemp=this._nth;this._nth=null;var temp=this.clone().moveToLastDayOfMonth();this.moveToNthOccurrence(n,ntemp);if(this>temp){throw new RangeError($D.getDayName(n)+" does not occur "+ntemp+" times in the month of "+$D.getMonthName(temp.getMonth())+" "+temp.getFullYear()+".");}
return this;}
return this.moveToDayOfWeek(n,this._orient);};};var sdf=function(n){return function(){var t=$D.today(),shift=n-t.getDay();if(n===0&&$C.firstDayOfWeek===1&&t.getDay()!==0){shift=shift+7;}
return t.addDays(shift);};};for(var i=0;i<dx.length;i++){$D[dx[i].toUpperCase()]=$D[dx[i].toUpperCase().substring(0,3)]=i;$D[dx[i]]=$D[dx[i].substring(0,3)]=sdf(i);$P[dx[i]]=$P[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};var smf=function(n){return function(){return $D.today().set({month:n,day:1});};};for(var j=0;j<mx.length;j++){$D[mx[j].toUpperCase()]=$D[mx[j].toUpperCase().substring(0,3)]=j;$D[mx[j]]=$D[mx[j].substring(0,3)]=smf(j);$P[mx[j]]=$P[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(this._isSecond){this._isSecond=false;return this;}
if(this._same){this._same=this._is=false;var o1=this.toObject(),o2=(arguments[0]||new Date()).toObject(),v="",k=j.toLowerCase();for(var m=(px.length-1);m>-1;m--){v=px[m].toLowerCase();if(o1[v]!=o2[v]){return false;}
if(k==v){break;}}
return true;}
if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$P[de]=$P[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}
$P._ss=ef("Second");var nthfn=function(n){return function(dayOfWeek){if(this._same){return this._ss(arguments[0]);}
if(dayOfWeek||dayOfWeek===0){return this.moveToNthOccurrence(dayOfWeek,n);}
this._nth=n;if(n===2&&(dayOfWeek===undefined||dayOfWeek===null)){this._isSecond=true;return this.addSeconds(this._orient);}
return this;};};for(var l=0;l<nth.length;l++){$P[nth[l]]=(l===0)?nthfn(-1):nthfn(l);}}());
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo;var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};$D.Grammar={};$D.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=(s.length==3)?"jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s)/4:Number(s)-1;};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<$C.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
var now=new Date();if((this.hour||this.minute)&&(!this.month&&!this.year&&!this.day)){this.day=now.getDate();}
if(!this.year){this.year=now.getFullYear();}
if(!this.month&&this.month!==0){this.month=now.getMonth();}
if(!this.day){this.day=1;}
if(!this.hour){this.hour=0;}
if(!this.minute){this.minute=0;}
if(!this.second){this.second=0;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.day>$D.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
var today=$D.today();if(this.now&&!this.unit&&!this.operator){return new Date();}else if(this.now){today=new Date();}
var expression=!!(this.days&&this.days!==null||this.orient||this.operator);var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(!this.now&&"hour minute second".indexOf(this.unit)!=-1){today.setTimeToNow();}
if(this.month||this.month===0){if("year day hour minute second".indexOf(this.unit)!=-1){this.value=this.month+1;this.month=null;expression=true;}}
if(!expression&&this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(!this.month){this.month=temp.getMonth();}
this.year=temp.getFullYear();}
if(expression&&this.weekday&&this.unit!="month"){this.unit="day";gap=($D.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month&&this.unit=="day"&&this.operator){this.value=(this.month+1);this.month=null;}
if(this.value!=null&&this.month!=null&&this.year!=null){this.day=this.value*1;}
if(this.month&&!this.day&&this.value){today.set({day:this.value*1});if(!expression){this.day=this.value*1;}}
if(!this.month&&this.value&&this.unit=="month"&&!this.now){this.month=this.value;expression=true;}
if(expression&&(this.month||this.month===0)&&this.unit!="year"){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(!this.value&&this.operator&&this.operator!==null&&this[this.unit+"s"]&&this[this.unit+"s"]!==null){this[this.unit+"s"]=this[this.unit+"s"]+((this.operator=="add")?1:-1)+(this.value||0)*orient;}else if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
this[this.unit+"s"]=this.value*orient;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(temp.getMonth()!==today.getMonth()){this.month=temp.getMonth();}}
if((this.month||this.month===0)&&!this.day){this.day=1;}
if(!this.orient&&!this.operator&&this.unit=="week"&&this.value&&!this.day&&!this.month){return Date.today().setWeek(this.value);}
if(expression&&this.timezone&&this.day&&this.days){this.day=this.days;}
return(expression)?today.add(this):today.set(this);}};var _=$D.Parsing.Operators,g=$D.Grammar,t=$D.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|@|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=$C.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken($C.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.m,g.s],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("second minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[$C.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw $D.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"","yyyy-MM-ddTHH:mm:ssZ","yyyy-MM-ddTHH:mm:ssz","yyyy-MM-ddTHH:mm:ss","yyyy-MM-ddTHH:mmZ","yyyy-MM-ddTHH:mmz","yyyy-MM-ddTHH:mm","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","MMddyyyy","ddMMyyyy","Mddyyyy","ddMyyyy","Mdyyyy","dMyyyy","yyyy","Mdyy","dMyy","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};$D._parse=$D.parse;$D.parse=function(s){var r=null;if(!s){return null;}
if(s instanceof Date){return s;}
try{r=$D.Grammar.start.call({},s.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1"));}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};$D.getParseFunction=function(fx){var fn=$D.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};$D.parseExact=function(s,fx){return $D.getParseFunction(fx)(s);};}());

 function ShiftPlanningAdmin(){
    this.initialize();
    return true;
}

ShiftPlanningAdmin.prototype = {
    initialize: function(){
        
    }
    
}





 function ShiftPlanning(){
    this.raw = {};
    //api cals
    this.apiCalls = {};
    this.successMessage = '';
    var self = this;
    this.initialize();
    this.hashChange = true;
    return true;
}

ShiftPlanning.prototype = {
    multiApi: function(calls, callback){
        var data = [];
        $.each(calls,function(index,item){

            var call = {
                module: item[0],
                method: item[1]
            };
            $.each(item[2],function(argIndex, argItem){
                call[argIndex] = argItem;
            });
            data.push(call);
        });
        
        var xhr = $.ajax({
            url: 'api.php',
            dataType: 'json',
            type: 'post',
            data: 'multi=1&data=' + JSON.stringify(data),
            cache: false,
            success: function(response){
                $.each(response, function(i, item){
                    if (item.status == 3){
                        sp.hash('logout');
                        user.loggedIn = 0;
                        user.name = '';
                        user.company = '';
                        sp.staff.data.employees = {};
                        window.location.reload();
                        return false;
                    }
                });
                if(typeof callback == 'function'){
                    callback.call(this,response);
                }
            }
        });
    },
    api: function(module, method, arguments, callback, errorCallback){
        var self = this;
        //check is same api call runing and if it's running don't alow new one
        var a = module + '.' + method + '.' + JSON.stringify(arguments);
        if (typeof this.apiCalls[a] != 'undefined' && this.apiCalls[a] != null) {
            return false;
        }
        var data = {
            module: module,
            method: method
        };
        $.each(arguments,function(index, item) {
            data[index] = item;
        });
//        if (method.toLowerCase() == 'get') {
//            this.globalLoader();
//        }
        this.apiCalls[a] = $.ajax({
            url: 'api.php',
            dataType: 'json',
            type: 'post',
            data: data,
            cache: false,
            success: function(response){
                self.apiCalls[a] = null;
                var closeLoader = true;
                $.each(self.apiCalls, function(i, item){
                    if (item != null){
                        closeLoader = false;
                    }
                });
                if (closeLoader){
                    $('.bigLoader').hide();
                    self.apiCalls = {};
                }
                if(response.status == 3){
                    //We are not logged in!
//                    sp.hash('logout');
                    user.loggedIn = 0;
                    user.name = '';
                    user.company = '';
                    self.staff.data.employees = {};
                    $('.applicationContainer').fadeOut(500,function(){
			window.location.reload();
                        $('body').addClass('login');
                        $('html').css('height','100%');
                        $('.loginContainer').fadeIn(500);
                    });
                } else if(response.status == 1){
                    if(typeof callback == 'function'){
                        if (response.data == false || response.data == null){
                            response.data = [];
                        }
                        callback.call(this,response);
//                        if (method.toLowerCase() == 'get') {
//                            $(window).scrollTop(0);
//                        }
                    }
                } else {
                    if(typeof errorCallback == 'function'){
                        errorCallback.call(this,response);
                    }
                }
            }

        });
    },
    loadPage: function(page){
        //Load the page from the module, handle this a little better
        if(user.loggedIn){
            if(typeof this[page] != 'undefined'){
                $('#pages #' + page + ' > div').hide();
                $('#pages #' + page).show();
                $('.subNavigation > div').hide();
                $('.subNavigation > div.' + page).show();
                $('.subNavigation > div.' + page + ' li:first a').trigger(clickEvent);
                this[page].loadPage();
            } else {
//                console.log(page+ ' page does not exist.');
            }
        }
    },
    nl2br: function(str){
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
    },
    map: function(data){
        if (data == null){
            return {};
        }
        var obj = {};
        $.each(data,function(){
            obj[''+this.id] = this;
        });
        return obj;
    },
    hash: function(newHash){
        if (newHash == window.location.hash.substring(1)){
            return window.location.hash.substring(1);
        }
        if(typeof newHash != 'undefined'){
            window.location.hash = newHash;
        }
        return window.location.hash.substring(1);
    },
    outerHtml: function(obj){
        return $('<div>').append(obj.clone()).remove().html();
    },
    hasPermission: function(needed){
        var perm = this.staff.admin.info.group;
        if (perm <= needed){
            return true;
        } else {
            return false;
        }
    },
    currentTime: function(){
        var currentTime = new Date();
        return months[currentTime.getMonth()] + ' ' + currentTime.getDate() + ', ' + currentTime.getFullYear() + ' - ' + currentTime.getHours() + ':' + ((currentTime.getMinutes().length == 1) ? '0'+currentTime.getMinutes() : currentTime.getMinutes());
    },
    currentUnixTime : function(){
        var foo = new Date; // Generic JS date object
        var unixtime_ms = foo.getTime(); // Returns milliseconds since the epoch
        var unixtime = parseInt(unixtime_ms / 1000);
        return unixtime;
    },
    date : function(timestamp){
        var d = new Date(timestamp);
        return d.getDate();
    },
    correctTime : function(time){
        if (time < 10){
            return '0' + time;
        } else {
            return time;
        }
    },
    strReplace: function(search, replace, subject, count) {
        var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
        s = [].concat(s);
        if (count) {
            this.window[count] = 0;
        }

        for (i = 0, sl = s.length; i < sl; i++) {
            if (s[i] === '') {
                continue;
            }
            for (j = 0, fl = f.length; j < fl; j++) {
                temp = s[i] + '';
                repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
                s[i] = (temp).split(f[j]).join(repl);
                if (count && s[i] !== temp) {
                    this.window[count] += (temp.length - s[i].length) / f[j].length;
                }
            }
        }
        return sa ? s : s[0];
    },
    getAvatar : function(id){
        if (typeof id == 'undefined'){
            id = sp.staff.admin.info.id;
        }
        return (typeof sp.staff.data.employees[id] != 'undefined' && typeof sp.staff.data.employees[id].avatar != 'undefined' && sp.staff.data.employees[id].avatar != '' && typeof sp.staff.data.employees[id].avatar.small != 'undefined') ? sp.staff.data.employees[id].avatar.small : 'images/no-avatar.png';
    },
    isL : function(data){
	if ($.trim(data).length > 0){
	    return true;
	} else {
	    return false;
	}
    },
    isC : function(sel){
	return $(sel).hasClass('check');
    },
    countObject : function( obj ){
        var c = 0;
        for ( var p in obj ) {
            if ( obj.hasOwnProperty( p ) ) { c++; }
        }
        return c;
    },
    countResponse : function( res ) {
        if ( typeof res.length == 'undefined' ){
            return this.countObject( res );
        } else {
            return res.length;
        }
    },
    objToArray : function( res ) {
        if ( typeof res == 'object' ) {
            var r = [];
            $.each(res, function(i, item){
                r.push(item);
            })
            res = r;
        }
        
        return res;
    }
}




 //creation of touchmove event used for tablet/mobile devices
var cal;
var lastTouch;
var clickEvent = 'click';
var deviceAgent = navigator.userAgent.toLowerCase();
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);

var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

if (agentID) {
    clickEvent = 'click';
}

jQuery.event.special.touch = {
    setup: function(data,namespaces){
        var elem = this, $elem = jQuery(elem);
        if (window.Touch) {
            $elem.bind('touchstart', jQuery.event.special.touch.onTouchStart);
            $elem.bind('touchmove', jQuery.event.special.touch.onTouchMove);
            $elem.bind('touchend', jQuery.event.special.touch.onTouchEnd);
        } else {
            $elem.bind('click', jQuery.event.special.touch.click);
        }
    },
    click: function (event) {
        event.type = "touch";
        jQuery.event.handle.apply(this, arguments);
    },

    teardown: function (namespaces) {
        var elem = this, $elem = jQuery(elem);
        if (window.Touch) {
            $elem.unbind('touchstart', jQuery.event.special.touch.onTouchStart);
            $elem.unbind('touchmove', jQuery.event.special.touch.onTouchMove);
            $elem.unbind('touchend', jQuery.event.special.touch.onTouchEnd);
        } else {
            $elem.unbind('click', jQuery.event.special.touch.click);
        }
    },

    onTouchStart: function (e) {
        this.moved = false;
        lastTouch = e.originalEvent.targetTouches[0];
    },

    onTouchMove: function (e) {
        this.moved = true;
    },

    onTouchEnd: function (event) {
        if (!this.moved) {
            event.type = "touch";
            jQuery.event.handle.apply(this, arguments)
        }
    }
}

ShiftPlanning.prototype.toggleMenu = function(){
    $('#menu').toggleClass('hidden');
    $('#wrapper').toggleClass('extended');
    
    if ($('#wrapper').hasClass('extended')){
        $('#wrapper').css('margin-left', 190);
        $('#menu').css('margin-left', 0);
        $('.blackMask').css('display','block');
        $('.blackMask').css('opacity','0.5');
    } else {
        $('#wrapper').css('margin-left', 0);
        $('#menu').css('margin-left', -190);
        $('.blackMask').css('display','none');
        $('.blackMask').css('opacity','0');
    }
}

ShiftPlanning.prototype.loadSubPage = function(obj, page, subpage) {
    if (subpage == 'logout'){
        this.staff.logout();
        return false;
    }
	
	$('.subNavigation').show();
	
	if($.trim(subpage)==''){
		subpage = $('.subNav[page=' + page + '] li:first a').attr('subpage');
	}
	
	// dirty fix for profile page, which is not in hashchange system
	if(page == 'staff' && subpage == 'details'){
		subpage = 'list';
	}
	
    if (obj != ''){
        obj.parent().parent().find('li').removeClass('active');
        obj.parent().addClass('active');
    }
    
    $('.subNavigation > div').hide();
    $('.subNavigation > div.' + page).show();
    
    $('#pages > div').hide();
    $('#pages #' + page + ' .main').hide();
    $('#pages #' + page + ' .mainSub').hide();
    $('#pages #' + page).show();
    $('#pages #' + page + ' .main.' + subpage).show();
    $('#pages #' + page + ' .mainSub.' + subpage).show();
    
    $('#menu .mainNav > li').removeClass('active');
    $('#menu_' + page).addClass('active');
    
	if($('.subNav[page=' + page + '] li a[subpage=' + subpage + ']' ).length > 0){
		$('.subNav[page=' + page + '] li').removeClass('active');
		$('.subNav[page=' + page + '] li a[subpage=' + subpage + ']').parent().addClass('active');
		
		sp.hash(page+'/'+subpage);
	}
    
    if (typeof this[page] != 'undefined' && 'loadSubPageEvents' in this[page]){
        this[page].loadSubPageEvents(subpage);
    }
    
    sp.fixCheckboxes();
    if (page == 'schedule' && subpage == 'addShift') {
    } else {
        $(window).scrollTop(0);
    }
}

ShiftPlanning.prototype.initialize = function(){
    var self = this;
    $(window).hashchange(function(){
        if (sp.hashChange == false){
            sp.hashChange = true;
            return false;
        }
		
        if (sp.hash().length > 0) {
			var page = sp.hash();
			var subpage = false;
			// Check if the hash contains subpage
			var subpagePosition = sp.hash().search("/");
			
			if(subpagePosition >= 0){
				page = sp.hash().substring(0, subpagePosition);
				subpage = sp.hash().substring(subpagePosition+1);
			}
			
            if(page == 'logout')
            {
                self.staff.logout();
                return false;
            }

			
            if ($('#menu [page=' + page + ']').length > 0)
			{
                 $('#pages > div').hide();
                 setTimeout(function(){

                    $('#menu [page=' + page + ']').parent().parent().find('li').removeClass('active');
                    $('#menu [page=' + page + ']').parent().addClass('active');
					
					if(subpage){
						self.loadSubPage('', page, subpage);
					}
					else{
						self.loadPage(page);
					}
                    
                 }, 50);
			}
            else
            {
                if(page != 'login' && page != 'logout')
                {
                        user.loggedIn ? self.hash('dashboard') : self.hash('login') ;
                }
                else
                {
                    if(self.hash() == 'logout' && user.loggedIn)
                    {
                            self.staff.logout();
                    }
                    if(self.hash() == 'login' && user.loggedIn)
                    {
                            self.hash('dashboard');
                    }
                }
            }
        }
    });  
    $(document).ready(function(){
        init();
        $('.toggleMenu').bind(clickEvent, function(e){
            e.stopPropagation();
            e.preventDefault();
            self.toggleMenu();
        });
        
        
        if(user.loggedIn){
            $('.loginContainer').hide();
            $('body').removeClass('login');
            $('html').css('height','auto');
            $('.applicationContainer').show();
            if (sp.hash().length == 0 || sp.hash() == 'login'){
                sp.hash('dashboard');
            }
        } else {
            $('.loginContainer').show();
            $('body').addClass('login');
            sp.hash('login');
            $('#lo_u').focus();
        }
        
        $('#wrapper .subNavigation .subNav:not(.notMain) a').bind(clickEvent, function(e){
            e.preventDefault();
            self.loadSubPage($(this), $(this).parent().parent().attr('page'), $(this).attr('subpage'));
        });
        
        $('#menu .mainNav > li > a').bind(clickEvent, function(e){
            if ($(this).hasClass('exit')) return true;
            e.preventDefault();
			
			var page = sp.hash();
			// Check if the hash contains subpage
			var subpagePosition = sp.hash().search("/");
			if(subpagePosition >= 0){
				page = sp.hash().substring(0, subpagePosition);
			}
			
            if ( $(this).attr('page') == page ) {
                self.toggleMenu();
                return false;
            }
            if ( $('#wrapper').hasClass('extended') ) {
                self.toggleMenu();
            }
            sp.hashChange = true;
			
			page = $(this).attr('page');
			var subpage = $('.subNav[page=' + page + '] li:first a').attr('subpage');
            sp.hash(page + '/' + subpage);
        });
        $(window).hashchange();
        
        setInterval(function() {
            $('#menu').css('height', self.calculateMenuHeight() );
            var h = self.calculateMenuHeight();
            $('#wrapper').css('min-height', (h > self.calculateWrapperHeight() ? h : self.calculateWrapperHeight()));
            if ( $('.blackMask').css('opacity') == '0' ) {
                $('.blackMask').hide();
            }
        }, 1000);
        $('#wrapper').width($(window).width());
        $('body').width($(window).width());

        //all mainUser names to lead to settings 
        $('.userName').bind(clickEvent, function(){
            sp.loadSubPage('', 'settings', 'overview');
        });
        
        if (isAndroid){
            $('#da_up_fi_hide').hide();
        }
        
//        $('.wrapper').bind('swipe', function(e) {
//            var m = $('.wrapper').hasClass('extended');
//            if (e.direction == 'right' && !m) {
//                $('#menu').removeClass('hidden');
//                $('#wrapper').addClass('extended');
//                $('#wrapper').css('margin-left', 190);
//                $('#menu').css('margin-left', 0);
//                $('.blackMask').css('display','block');
//                $('.blackMask').css('opacity','0.5');
//            } else if (e.direction == 'left' && m) {
//                $('#menu').addClass('hidden');
//                $('#wrapper').removeClass('extended');
//                $('#wrapper').css('margin-left', 0);
//                $('#menu').css('margin-left', -190);
//                $('.blackMask').css('display','none');
//                $('.blackMask').css('opacity','0');
//            }
//        });
//        //dragstart drag dragend
//        var start = false;
//        var element = 
//        $('.wrapper').bind('dragstart', function(e){
//            e.preventDefault();
//            e.stopPropagation();
//            $('.blackMask').css('display','block');
//            $('.blackMask').css('opacity','0');
//        });
//        $('.wrapper').bind('drag', function(e){
//            e.preventDefault();
//            e.stopPropagation();
//            var m = $('.wrapper').hasClass('extended');
//            if (e.direction == 'left') {
//                e.distanceX = 190 + parseInt(e.distanceX);
//                if (Math.abs(parseInt(e.distanceX)) > 50 && m){
//                    start = true;
//                }
//            } else {
//                if (parseInt(e.distanceX) > 50 && !m){
//                    start = true;
//                }
//            }
//            element = 'wrapper';
//            if (!start){
//                return false;
//            }
//            if (e.distanceX <= 0){
//                e.distanceX = 0;
//            }
//            if (e.distanceX >= 190){
//                e.distanceX = 190;
//            }
//            if (start) {
//                $('#wrapper').css('margin-left', parseInt(e.distanceX));
//                $('#menu').css('margin-left',(-190 + parseInt(e.distanceX)) );   
//                $('.blackMask').css('opacity',((0.5*parseInt(e.distanceX))/190).toFixed(1));
//            }
//        });
//        
//        $('.wrapper').bind('dragend', function(e){
//            start = false;
//            var len = parseInt($('#wrapper').css('margin-left'));
//            if ( len > 90 ) {
//                $('#menu').removeClass('hidden');
//                $('#wrapper').addClass('extended');
//                $('#wrapper').css('margin-left', 190);
//                $('#menu').css('margin-left', 0);
//                $('.blackMask').css('display','block');
//                $('.blackMask').css('opacity','0.5');
//            } else {
//                $('#menu').addClass('hidden');
//                $('#wrapper').removeClass('extended');
//                $('#wrapper').css('margin-left', 0);
//                $('#menu').css('margin-left', -190);
//                $('.blackMask').css('display','none');
//                $('.blackMask').css('opacity','0');
//            }
//        });
    });
    
    $(window).bind('resize', function() {
        $('#wrapper').width($(window).width());
        $('body').width($(window).width());
    });
}

ShiftPlanning.prototype.calculateWrapperHeight = function() {
    var wrapperHeight = $('#pages').height() + $('.subNavigation').height() + 20; 
    return ($(window).height() > wrapperHeight) ? $(window).height() : wrapperHeight; 
}

ShiftPlanning.prototype.calculateMenuHeight = function () {
    var h = this.calculateWrapperHeight();
    if ( $('#menu .mainNav').height() + 150 > h) {
        return $('#menu .mainNav').height() + 150;
    } else {
        return h;
    }
}

ShiftPlanning.prototype.globalLoader = function(){
    //$('.bigLoader').show();
}

ShiftPlanning.prototype.fixCheckboxes = function(){
    $('#pages .checkbox:visible').removeClass('failsafe');
    $('#pages .checkbox:visible').each(function(i, item){
	if ($(this).outerHeight(true) > 45){
	    $(this).addClass('failsafe');
	}
    });
}

ShiftPlanning.prototype.showSuccess = function(text){
    $('body').append('<div class="notification success hidden">' + text + '</div>');
    $('body > .notification').css('top', $(document).scrollTop());
    $('body > .notification').fadeIn('fast', function(){
        setTimeout(function(){
            $('body > .notification').fadeOut('fast', function(){
                $('body > .notification').remove();
            });
        }, 2000);
    });
}

ShiftPlanning.prototype.showError = function(text){
    $('body').append('<div class="notification error hidden">' + text + '</div>');
    $('body > .notification').css('top', $(document).scrollTop());
    $('body > .notification').fadeIn('fast', function(){
        setTimeout(function(){
            $('body > .notification').fadeOut('fast', function(){
                $('body > .notification').remove();
            });
        }, 2000);
    });
}

function callAndroid(func, callback){
    if (typeof Android != 'undefined'){
	if (typeof func != 'undefined'){
	    func = 'showToast';
	}
	return Android[func](function(res){
	    if (typeof callback != 'undefined'){
		callback(res);
	    } else {
		return res;
	    }
	});
    }
    
    return false;
}

//Initalizing javascript library
var sp = new ShiftPlanning();
ShiftPlanning.prototype.staff = new ShiftPlanningStaff();
ShiftPlanning.prototype.schedule = new ShiftPlanningSchedule();
ShiftPlanning.prototype.dashboard = new ShiftPlanningDashboard();
ShiftPlanning.prototype.timeClock = new ShiftPlanningTimeClock();
ShiftPlanning.prototype.reports = new ShiftPlanningReports();
ShiftPlanning.prototype.requests = new ShiftPlanningRequests();
ShiftPlanning.prototype.location = new ShiftPlanningLocation();
ShiftPlanning.prototype.permissions = new ShiftPlanningPermissions();
ShiftPlanning.prototype.training = new ShiftPlanningTraining();
ShiftPlanning.prototype.settings = new ShiftPlanningSettings();


 var sp = new ShiftPlanning();
ShiftPlanning.prototype.staff = new ShiftPlanningStaff();
ShiftPlanning.prototype.schedule = new ShiftPlanningSchedule();
ShiftPlanning.prototype.dashboard = new ShiftPlanningDashboard();
ShiftPlanning.prototype.timeClock = new ShiftPlanningTimeClock();
ShiftPlanning.prototype.reports = new ShiftPlanningReports();
ShiftPlanning.prototype.requests = new ShiftPlanningRequests();
ShiftPlanning.prototype.location = new ShiftPlanningLocation();
ShiftPlanning.prototype.permissions = new ShiftPlanningPermissions();
ShiftPlanning.prototype.training = new ShiftPlanningTraining();
$(document).ready(function() {
    $.ajax({
        url: 'load.php',
        success : function(res) {
            $('#prepLoadFiles').after(res);
            sp.initialize();
        }
    })
});


 function ShiftPlanningDashboard(){
    this.initialize();
}

ShiftPlanningDashboard.prototype = {
    templates: {},
    initialize: function(){
        
    },
    loadPage: function(){

    }
    
}





 ShiftPlanningDashboard.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.dashboardEvents();
	self.wallEvents();
	self.inboxEvents();
	self.settingsEvents();
	self.upcomingShiftsEvents();
	self.whosonnowEvents();
	self.filesEvents();
    self.fixes();
    });
}

ShiftPlanningDashboard.prototype.loadSubPageEvents = function(subpage){
    switch(subpage){
	case 'wall':
	    this.wallSubEvents();
	    break;
	case 'upcomingShifts':
	    this.upcomingShiftsSubEvents();
	    break;
	case 'files':
            this.filesSubEvents();
            break;
	case 'inbox':
	    this.inboxSubEvents();
	    break;
	case 'settings':
	    this.settingsSubEvents();
	    break;
	case 'whosonnow':
	    this.whosonnowSubEvents();
	    break;
	case 'dashboard':
            this.dashboardSubEvents();
            break;
	case 'logout':
	    sp.staff.logout();
	    break;
	case 'pingUser':
	    this.pingUser();
	    break;
    }
}

ShiftPlanningDashboard.prototype.dashboardEvents = function(){
    $('#da_widgets').delegate('.timeClock a',clickEvent, function(e){
        e.preventDefault();
        sp.loadSubPage('', 'timeClock', 'overview');
    });
    
    $('#da_widgets').delegate('.tradePage',clickEvent, function(e){
        e.preventDefault();
        sp.loadSubPage('', 'requests', 'available');
    });
    
    
    $('#da_widgets').delegate('ul.shifts a', clickEvent, function(e){
	e.preventDefault();
	$(this).addClass('loading');
	spModel.schedule.get('shift', {
	    id : $(this).attr('rel'), 
	    detailed : 1
	}, function(response){
	    sp.schedule.fromDashboard = true;
	    sp.schedule.shift = response.data;
	    sp.loadSubPage('', 'schedule', 'shiftDisplay');
	});
    });
    
    $('#da_widgets').delegate('.schedule a',clickEvent, function(e){
        e.preventDefault();
        $('#menu_schedule a').trigger(clickEvent);
    });
    
    $('#da_widgets').delegate('.user a',clickEvent, function(e){
        e.preventDefault(); 
        $('#menu_settings a').trigger(clickEvent);
    });
}

ShiftPlanningDashboard.prototype.wallEvents = function(){
    var self = this;
    $('#da_wa_nm_b').bind(clickEvent, function(e){
	e.preventDefault();
	$('#da_wa_nm_f').toggleClass('hidden');
	$('#da_wa_nm_ti').val('');
	$('#da_wa_nm_me').val('');
    });
    
    $('#da_wa_nm_st').bind(clickEvent, function(e){
	e.preventDefault();
	$(this).toggleClass('check');
    });
    
    $('#da_wa_nm_ca').bind(clickEvent, function(e){
	e.preventDefault();
	$('#da_wa_nm_b').trigger(clickEvent);
    });
    
    $('#da_wa_nm_sa').bind(clickEvent, function(e){
	e.preventDefault();
	var obj = $(this);
	obj.addClass('loading');
	var data = {};
	if (sp.isL($('#da_wa_nm_ti').val())){
	    data.title = $.trim($('#da_wa_nm_ti').val());
	} else {
	    data.title = '';
	}
	
	if (!sp.isL($('#da_wa_nm_me').val())){
	    sp.showError(_s('Message must be entered'));
	    return false;
	}
	data.post = $.trim($('#da_wa_nm_me').val());
	spModel.messaging.create('wall', data, function(response){
	    obj.removeClass('loading');
	    $('#da_wa_nm_f').toggleClass('hidden');
	    $('#da_wa_nm_ti').val('');
	    $('#da_wa_nm_me').val('');
	    self.wallSubEvents();
	}, function(){
	    obj.removeClass('loading');
	});
    })
    
    $('#da_wa_li').delegate('.msgRpl, .cmtCount', clickEvent, function(e){
	e.preventDefault();
	var id = $(this).attr('rel');
	if (!$('#da_wa_msg_' + id).find('.cmts').is(':visible')){
	    $('#da_wa_msg_' + id).find('.cmtCount').hide();
	    $('#da_wa_msg_' + id).find('.cmts').show();
	    if ($(this).hasClass('msgRpl')){
		$('#da_wa_msg_' + id).find('input[type=text]').focus();
	    }
	} else {
	    if ($(this).hasClass('msgRpl')){
		$('#da_wa_msg_' + id).find('input[type=text]').val($('#da_wa_msg_' + id).find('input[type=text]').attr('origin'));
	    }
	    $('#da_wa_msg_' + id).find('.cmtCount').show();
	    $('#da_wa_msg_' + id).find('.cmts').hide();
	}
    });
    
    $('#da_wa_li').delegate('.msgDel', clickEvent, function(e){
	e.preventDefault();
	var obj = $(this);
	var c = confirm(_s('Do you want to delete this message?'));
	if (c){
	    var id = $(this).attr('rel');
	    var del = 'message';
	    if ($(this).hasClass('comment')){
		del = 'comment';
	    }
	    spModel.messaging.del('wall', {
		id : id, 
		'delete' : del
	    }, function(response){
		obj.parent().fadeOut('fast', function(){
		    $(this).remove();
		});
	    });
	}
    });

    $('#da_wa_li').delegate('input[type=text]', 'focus', function(){
	$(this).attr('origin',$(this).val());
	$(this).val('');
    });
    
    $('#da_wa_li').delegate('input[type=submit]', clickEvent, function(){
	var obj = $(this);
	var id = $(this).attr('rel');
	var post = $.trim($('#da_wa_msg_' + id + ' input[type=text]').val());
	if (post.length == 0 || post == 'Write a comment...'){
	    alert(_s('Please write your message'));
	    return false;
	}
	spModel.messaging.create('wall', {
	    post: post, 
	    id: id
	}, function(response) {
	    var d = {
		avatar : sp.staff.admin.info.dfAvatar,
		id : id,
		userName : sp.staff.admin.info.name,
		comment: post,
		time : 'Now',
		full : false
	    }
	    obj.parent().before($.tmpl($('#te_da_wa_me_co'), d));
	    $('#da_wa_msg_' + id + ' input[type=text]').val('Write a comment...');
	});
        
	return true;
    });
    
    $('#da_wa_li').delegate('input[type=text]', 'keyup', function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $(this).parent().parent().find('input[type=submit]').trigger(clickEvent);
        }
    });
}

ShiftPlanningDashboard.prototype.filesEvents = function(){

}

ShiftPlanningDashboard.prototype.upcomingShiftsEvents = function(){
    $('#da_up .shifts a').bind(clickEvent, function(e){
        e.preventDefault();
        sp.loadSubPage('', 'schedule', 'today');
    });
    
    $('#da_up_li').delegate('li a', clickEvent, function(e){
	e.preventDefault();
	$(this).addClass('loading');
	spModel.schedule.get('shift', {
	    id : $(this).attr('rel'), 
	    detailed : 1
	}, function(response){
	    sp.schedule.fromDashboardUpcoming = true;
	    sp.schedule.shift = response.data;
	    sp.loadSubPage('', 'schedule', 'shiftDisplay');
	});
    });
}

ShiftPlanningDashboard.prototype.inboxEvents = function(){
    var self = this;
    $('#da_in_me').delegate('.msgHead', clickEvent, function(e){
	e.preventDefault();
	var id = $(this).attr('messageId');
	var obj = $(this);
	if (obj.hasClass('extended')){
	    obj.parent().toggleClass('extended');
	} else {
	    $(obj).addClass('loading');
	    spModel.messaging.update('message', {
		id : id, 
		read : 1
	    }, function(response){
		obj.parent().toggleClass('extended');
		obj.parent().removeClass('unread');
		$(obj).removeClass('loading');
	    });
	}
    });
    
    $('#da_in_nm_b, #da_in_nm_ca').bind(clickEvent, function(e){
	e.preventDefault();
	$('#da_in_nm_f').toggleClass('hidden');
	$('#da_in_nm_ti').val('');
	$('#da_in_nm_me').val('');
	$('#da_in_nm_to').val(0);
    });
    
    $('#da_in_nm_sa').bind(clickEvent, function(e){
	self.sendMessage();
    });
    
    $('#da_in_me').delegate('a.butRpl', clickEvent, function(e){
	e.preventDefault();
	var id = $(this).attr('rel');
	$('#da_in_msg_' + id).find('.newMsg').show(function(){
	    var obj = $(this);
	    obj.find('input[type=text]').val('re: ' + $('#da_in_msg_' + id).find('.msgHead h5').html());
	});
    });
    
    $('#da_in_me').delegate('a.butDel', clickEvent, function(e){
	e.preventDefault();
	var c = confirm(_s('Are you sure you want to delete this messaage?'));
	if (!c){
	    return false;
	}
	var id = $(this).attr('rel');
	spModel.messaging.del('message', {
	    id : id
	}, function(response){
	    $('#da_in_msg_' + id).fadeOut('fast', function(){
		$(this).remove();
	    });
	});
        
    });
    
    $('#da_in_me').delegate('.msgBody .newMsg .title .fr', clickEvent, function(e){
	e.preventDefault();
	var obj = $(this).parents('.newMsg');
	var curr = $(this).find('a');
	curr.addClass('loading');
	var data = {
	    subject : obj.find('input[type=text]').val(),
	    message : obj.find('textarea').val(),
	    to : obj.find('input[type=hidden]').val()
	};
        
	spModel.messaging.create('message', data, function(resonse){
	    self.inboxSubEvents();
	}, function(){
	    curr.removeClass('loading');
	});
    });
    
    $('#da_in_me').delegate('.msgBody .newMsg .title .fl', clickEvent, function(e){
	e.preventDefault();
	var obj = $(this).parents('.newMsg');
	obj.find('input[type=text]').val('');
	obj.find('textarea').val('');
	obj.hide('fast');
    });
}

ShiftPlanningDashboard.prototype.settingsEvents = function(){
//    var self = this;
//    $('#dashboard .search.settings.mainSub li a').bind(clickEvent, function(e){
//	e.preventDefault();
//	$('#da_se > div').hide();
//	$('#dashboard .search.settings.mainSub li').removeClass('active');
//	switch ($(this).attr('subpage')){
//	    case 'overview':
//		self.prefillOverview(sp.staff.data.employees[$('#da_se_cur_us_id').val()]);
//		break;
//	    case 'edit':
//		self.prepareEditDetails(sp.staff.data.employees[$('#da_se_cur_us_id').val()]);
//		break;
//	    case 'recentShifts':
//		self.displayShifts(sp.staff.data.employees[$('#da_se_cur_us_id').val()],'recentShifts');
//		break;
//	    case 'upcomingShifts':
//		self.displayShifts(sp.staff.data.employees[$('#da_se_cur_us_id').val()],'upcomingShifts');
//		break;                
//	}
//	$('#da_se_' + $(this).attr('subpage')).show();
//	$(this).parent().addClass('active');
//	sp.fixCheckboxes();
//    });
//    
//    $('#da_se_ed_cu').delegate('.checkbox', clickEvent, function(){
//        var obj = this;
//        var checked = ($(this).hasClass('check')) ? true : false;
//           if (checked) {
//		$(obj).removeClass('check');
//	    } else {
//		$(obj).addClass('check');
//	    }
//    });
//    
//    $('#da_se_ed_po, #da_se_ov_po, #da_se_ed_sk, #da_se_ov_sk').delegate('.checkbox', clickEvent, function(){
//	var sid = $(this).attr('itemId');
//	var skills = ($(this).parents('.skills').length > 0) ? true : false;
//	var checked = ($(this).hasClass('check')) ? true : false;
//	var obj = this;
//	$(obj).parent().addClass('loading');
//	var data = {
//	    id : $('#da_se_cur_us_id').val()
//	}
//	if (skills){
//	    if (checked) {
//		data.removeskill = sid;
//	    } else {
//		data.addskill = sid;
//	    }
//	} else {
//	    if (checked) {
//		data.removeschedule = sid;
//	    } else {
//		data.addschedule = sid;
//	    }
//	}
//	spModel.staff.update('employee', data, function(response){
//	    if (checked) {
//		$(obj).removeClass('check');
//	    } else {
//		$(obj).addClass('check');
//	    }
//	    $(obj).parent().removeClass('loading');
//	    self.updateUser($('#da_se_cur_us_id').val(), response, false);
//	});
//    });
//    
//    $('#da_se_ed_ue').bind(clickEvent, function(e){
//	$(this).addClass('loading');
//	e.preventDefault();
//	self.saveEditForm($(this));
//    });
//    
//    $('textarea#da_se_ov_no, textarea#da_se_ed_no').bind('blur', function(){
//	self.updateNotes($(this).val());
//    });
//    
//    $('#da_se_pa_up').bind(clickEvent, function(e){
//	e.preventDefault();
//	self.changePassword();
//    });
//    
//    $('#da_se_ov_aa a').bind(clickEvent, function(e){
//	e.preventDefault();
//	var c = confirm(_s('Are you sure?'));
//	if (c){
//	    self.adminActions(this);
//	}
//    })
//    $('#da_se_rs_li').delegate('.fr',clickEvent,function(e){
//	e.preventDefault()
//	switch($('#menu .mainNav .active').attr('id')){
//	    case 'menu_staff':
//		sp.schedule.fromStaff =true;
//		break;
//	    case 'menu_dashboard':
//		sp.schedule.fromStaff =false;
//	}
//	spModel.schedule.get('shift', {
//	    id : $(this).attr('shiftId'), 
//	    detailed : 1
//	}, function(response){
//	    sp.schedule.fromRecent = true ;
//	    sp.schedule.shift = response.data;
//	    sp.loadSubPage('', 'schedule', 'shiftDisplay');
//	});
//
//    })
//    $('#da_se_us_li').delegate('.fr',clickEvent,function(e){
//	e.preventDefault()
//	switch($('#menu .mainNav .active').attr('id')){
//	    case 'menu_staff':
//		sp.schedule.fromStaff =true;
//		break;
//	    case 'menu_dashboard':
//		sp.schedule.fromStaff =false;
//	}
//	spModel.schedule.get('shift', {
//	    id : $(this).attr('shiftId'), 
//	    detailed : 1
//	}, function(response){
//	    sp.schedule.fromUpcoming = true ;
//	    sp.schedule.shift = response.data;
//	    sp.loadSubPage('', 'schedule', 'shiftDisplay');
//	});
//
//    })
}

ShiftPlanningDashboard.prototype.whosonnowEvents = function(){
    var self=this;
    
    $('#da_wo .timeSheet').delegate('a.fr',clickEvent,function(e){
	e.preventDefault();
	self.pingID = $(this).attr('userID')
	var employee=sp.staff.data.employees[self.pingID];
	if(employee.cell_phone.length==0 && employee.email==null || employee.email.length == 0){
	    sp.showError("This user haven't set cell phone or email");
	}else{
	    sp.loadSubPage('', 'dashboard', 'pingUser');
	}
        
    })
    $('#pingUser .backMenu').bind(clickEvent,function(e){
	e.preventDefault();
	$('#da_who_tmpl div').unbind(clickEvent);
	$('#da_who_send').unbind(clickEvent);
	$('.subNavigation .dashboard li.active a').trigger('click');
    })
}

//sub page events
ShiftPlanningDashboard.prototype.wallSubEvents = function(){
    if (parseInt(sp.staff.admin.settings.message_wall_on) != 0){
	$('#da_wa_li').html(spView.ulLoader());
	spModel.messaging.get('wall', {}, function(response){
	    if (response.data.length > 0){
		$('#da_wa_li').html($.tmpl($('#te_da_wa_me'), response.data));
	    } else {
		$('#da_wa_li').html(spView.emptyResult(_s('No wall messages'), 'li'));
	    }
	}, function(){
	    $('#da_wa_li').html(spView.emptyResult(_s('Something went wrong'), 'li'));
	});
    
}
}

ShiftPlanningDashboard.prototype.filesSubEvents = function(){
    $('#da_fi_list').html(spView.ulLoader());
    spModel.admin.get('files', {}, function(response){
            $.each(response.data,function(){
                    var str = this.secureurl;
                    switch(this.extension){
                            case 'jpg':
                            case 'jpeg':
                            case 'png':
                            case 'bmp':
                                    this.extraclass = 'image';
                                    break;
                            case 'txt':
                            case 'doc':
                                    this.extraclass = 'txt';
                                    break;
                            case 'xls':
                            case 'csv':
                                    this.extraclass = 'doc'
                                    break;
                            case 'pdf':
                                    this.extraclass= 'pdf';
                                    break;
                            default:
                                    this.extraclass= 'other'
                                    break;		
                    }
//			this.secureurl=str.substring((str.indexOf("fid=")+4), str.length);
                    this.file_size=spView.friendly_filesize(this.file_size);
            });
            if ( response.data.length == 0 ) {
                $('#da_fi_list').html( spView.emptyResult( _s('Currently no files for download'), 'li') );
            } else {
                $('#da_fi_list').html($.tmpl($('#te_da_fi_list'),response.data));
            }
            

            $('#da_fi_list li:even').addClass('regular');
    });
}

ShiftPlanningDashboard.prototype.upcomingShiftsSubEvents = function(){
    $('#da_up_li').html(spView.ulLoader());
    var send = {
	start_date: 'today', 
	end_date: 'today +2 months', 
	mode: 'employee'
    };
    send.employees = sp.staff.admin.info.id;
    spModel.schedule.get('shifts', send, function(response){
	var data = [];
	if(typeof response.data != 'undefined' && response.data.length > 0){
	    data = response.data;
	}
	if (data.length > 0){
	    $('#da_up_li').html($.tmpl($('#te_da_widget_shift'), data));
        } else {
            $('#da_up_li').html(spView.emptyResult(_s('No upcoming shifts'), 'li'));
        }
    });
}

ShiftPlanningDashboard.prototype.inboxSubEvents = function(){
    $('#da_in_me').html(spView.ulLoader());
    spModel.messaging.get('messages', {
	mode : 'to'
    }, function(response){
	if (response.data.length > 0){
	    $('#da_in_me').html($.tmpl($('#te_da_wa_in'), response.data));
	} else {
	    $('#da_in_me').html(spView.emptyResult(_s('No messages in your inbox'), 'li'));
	}
    }, function(response){
	$('#da_in_me').html(spView.emptyResult(_s('Something went wrong'), 'li'));
    });
    
    $('#da_in_nm_to').html(spView.staffOption());
}

//ShiftPlanningDashboard.prototype.settingsSubEvents = function(employee){
//    var self = this;
//
//    if (typeof employee == 'undefined'){
//	employee = sp.staff.admin.info;
//    }
//    
//    if (employee.id == sp.staff.admin.info.id){
//	$('#dashboard .search').show();
//	if (!sp.permissions.hasPermission('edit_profile')){
//	    $('#dashboard .filters a[subpage=edit]').hide();
//	} else {
//	    $('#dashboard .filters a[subpage=edit]').show();
//	}
//    } else {
//	if (sp.staff.admin.info.group > 4){
//	    $('#dashboard .search').hide();
//	} else {
//	    $('#dashboard .filters a[subpage=edit]').show();
//	    $('#dashboard .search').show();
//	}
//    }
//    
//    if (employee.group <= 2){
//	$('#da_se_ov_aa .button').hide();
//    } else {
//	$('#da_se_ov_aa .button').show();
//    }
//    
//    
//    
//    if (sp.staff.admin.info.group > 3){
//	$('#da_se_ov_wa').parent().hide();
//    } else {
//	$('#da_se_ov_wa').parent().show();
//    }
//
//    
//    
//    //prefill
//    self.prefillOverview(employee);
//    self.prepareEditDetails(employee);
//    self.preparePasswordField(employee);
//    
//    $('#dashboard .search.settings.mainSub li a:first').trigger(clickEvent);
//    
//    sp.fixCheckboxes();
//}

ShiftPlanningDashboard.prototype.whosonnowSubEvents = function() {
    $('#wrapper > .subNavigation').show();
    this.getWhosOn();        
}

ShiftPlanningDashboard.prototype.dashboardSubEvents = function() {
    //$('.bigLoader').show();
    $('#da_widgets .widgets').html(spView.ulLoader());
    $('#da_widgets ul.shifts.listing').hide();
    var calls = [
        ['timeclock.status','GET', {details : 1}],
        ['schedule.shifts','GET', {
            'mode': 'open'
        }],
        ['schedule.trades','GET', {}],
        ['schedule.shifts', 'GET', {
            start_date: 'today', 
            end_date: 'today +2 months', 
            mode: 'employee'
        }],
        ['schedule.trades', 'get', {'mode' : 'swap'}]
    ]
    sp.multiApi(calls, function(response) {
        $('#da_widgets .widgets').html('');
        $('#da_widgets .widgets').append($.tmpl($('#te_da_widget_profile'), { avatar: sp.getAvatar(), name: user.name, company:  user.company} ));
        if (parseInt(sp.staff.admin.settings.timeclock) != 0) {
            if (response[0].data != 'out') {
                $('#da_widgets .widgets').append($.tmpl($('#te_da_widget_timeclock_in'), {time: response[0].data.current_length.hours + _s('h') + ' ' + response[0].data.current_length.mins + _('mins')}));
            } else {
                $('#da_widgets .widgets').append($.tmpl($('#te_da_widget_timeclock_out')));
            }
        }
        $('#da_widgets .widgets').append($.tmpl($('#te_da_widget_tradePage'), { count: (sp.countResponse(response[1].data) + sp.countResponse(response[2].data) + sp.countResponse(response[4].data))}));
        
        var br = 0;
        $.each(response[3].data, function(i, item) {
            if (item.start_date.id == sp.raw.config.today.id) {
                br++;
            }
            if (item.start_date.id > sp.raw.config.today) {
                return false;
            }
        });
        
        $('#da_widgets .widgets').append($.tmpl($('#te_da_widget_schedule'), { month: sp.raw.config.today.mname.toUpperCase(), day: sp.raw.config.today.day, count: br } ));
        
        if ( response[3].data.length > 0 ) {
            $('#da_widgets ul.shifts.listing').show();
            $('#da_widgets ul.shifts.listing').html($.tmpl($('#te_da_widget_shift'), response[3].data));
        } else {
            $('#da_widgets ul.shifts.listing').hide();
        }
        
        
        //$('.bigLoader').hide();
        $('.applicationContainer').fadeIn(500);
    });
}

//functions
//ShiftPlanningDashboard.prototype.displayShifts = function (employee,from){
//    var element;
//    var notify;
//	var desc=false;
//    switch (from){
//	case 'recentShifts':
//	    $('#da_se_rs_li').html(spView.ulLoader());
//	    var params={
//		start_date: 'today -2 months', 
//		end_date: 'yesterday', 
//		mode: 'employee', 
//		employees: employee.id
//	    }
//		desc = true ;
//	    element=$('#da_se_rs_li');
//	    notify='No recent shifts'
//	    break;
//	case 'upcomingShifts':
//	    $('#da_se_us_li').html(spView.ulLoader());
//	    var params={
//		start_date: 'today ', 
//		end_date: 'today +2 months', 
//		mode: 'employee', 
//		employees: employee.id
//	    }
//	    element=$('#da_se_us_li');
//	    notify='No upcoming shifts'
//	    break;
//    }
//    spModel.schedule.get('shifts',params,function(response){
//	if(response.data == ""){
//	    $(element).html(spView.emptyResult(notify))   
//	}else{
//		if(desc){
//		desc = false ;
//		var data =[];
//		var j =response.data.length-1;
//		for(var count=0;count<response.data.length;count++){
//			data.push(response.data[j--]);
//			}
//			$(element).html($.tmpl($('#te_da_se_rs'),data));
//		}else{
//			$(element).html($.tmpl($('#te_da_se_rs'),response.data));   
//		}
//	}
//    }) 
//  
//}

//ShiftPlanningDashboard.prototype.prefillOverview = function(employee){
//    var p = {};
//    
//    $.each(employee, function(i, item){
//	if (item == null || item.length == 0){
//	    item = '&nbsp;';
//	}
//	p[i] = item;
//    });
//    
//    employee = p;
//    //this page needs to be cached after first load and to be reprepared if data are changed - DONE
//    $('#da_se_cur_us_id').val(employee.id);
//    
//    $('#da_se_ov_fn').html(employee.name);
//    $('#da_se_ov_id').html(employee.eid);
//    $('#da_se_ov_un').html(employee.username);
//    $('#da_se_ov_mo').html(employee.cell_phone);
//    $('#da_se_ov_ho').html(employee.home_phone);
//	$('#da_se_ov_em').html(employee.email);
//    if ($.trim(employee.wage).length != 0){
//	$('#da_se_ov_wa').html(spView.fixCurrency(sp.staff.admin.settings.currency, true) + employee.wage);
//    }
//    
//    var status_name = _s('Administrative accounts cannot be de-activated.');
//    var status = _s('User has actived his/her account.');
//    
//    if (parseInt(employee.status) == 1 && parseInt(employee.group) > 2){
//	status_name = _s('User Account is Enabled.');
//    } else if (parseInt(employee.status) == 0 && parseInt(employee.group) > 2){
//	status_name = _s('User Account is Enabled.');
//	status = _s('User account is not activated.');
//    }
//    
//    if (sp.staff.admin.info.group > 3){
//	$('#da_se_ov_aa').hide();
//	$('#da_se_ov_aa').prev().hide();
//    } else {
//	$('#da_se_ov_aa').prev().show();
//	$('#da_se_ov_aa').show();
//    }
//    if (employee.status == 0){
//	$('#da_se_ov_aa a[type=activate]').show();
//	$('#da_se_ov_aa a[type=manualyActivate]').show();
//    } else {
//	$('#da_se_ov_aa a[type=activate]').hide();
//	$('#da_se_ov_aa a[type=manualyActivate]').hide();
//    }
//    $('#da_se_ov_st').html(status);
//    $('#da_se_ov_ac').html(status_name);
//    
//    //transfer month number into month name
//    if (employee.birth_month != 0 && employee.birth_day != 0) {
//	$('#da_se_ov_bd').html(months[employee.birth_month-1] + ' ' + employee.birth_day);
//    } else {
//	$('#da_se_ov_bd').html('&nbsp;');
//    }
//        
//    
//
//    $('#da_se_ov_cu').html(spView.customFields(employee));
//    $('#da_se_ov_po').html(spView.editableSchedules(employee));
//
//    $('#da_se_ov_sk').html(spView.editableSkills(employee));
//    $('#da_se_ov_no').html((employee.notes.length > 0) ? employee.notes : '');
//    $('#da_se_ov_pos').html('');
//    if (typeof employee.schedules != 'undefined'){
//	var pos = '';
//	$.each(employee.schedules, function(i, item){
//	    pos += item + ', ';
//	});
//	$('#da_se_ov_pos').html(pos.substr(0,pos.length - 2));
//    }
////approvers missing
//}

//ShiftPlanningDashboard.prototype.prepareEditDetails = function(employee){
//    var p = {};
//    $.each(employee, function(i, item){
//	if (item == null || item.length == 0){
//	    item = '';
//	}
//	p[i] = item;
//    });
//    
//    employee = p;
//    this.listLanguages();
//    //this page needs to be cached after first load and to be reprepared if data are changed
//    $('#da_se_ed_na').val(employee.name);
//    $('#da_se_ed_em').val(employee.email);
//    $('#da_se_ed_nn').val(employee.nick_name);
//    $('#da_se_ed_us').val(employee.username);
//    //mobile phone
//    var mphone = (employee.cell_phone == null) ? '---'.split('-') : employee.cell_phone.split('-');
//    $('#da_se_ed_mph_0').val(mphone[0]);
//    $('#da_se_ed_mph_1').val(mphone[1]);
//    $('#da_se_ed_mph_2').val(mphone[2]);
//    //home phone
//    var hphone = (employee.home_phone == null) ? '---'.split('-') : employee.home_phone.split('-');
//    $('#da_se_ed_hph_0').val(hphone[0]);
//    $('#da_se_ed_hph_1').val(hphone[1]);
//    $('#da_se_ed_hph_2').val(hphone[2]);
//    
//    $('#da_se_ed_ad').val(employee.address);
//    $('#da_se_ed_ci').val(employee.city);
//    $('#da_se_ed_sp').val(employee.state);
//    $('#da_se_ed_pz').val(employee.zip);
//    
//    $('#da_se_ed_bday_m').val(employee.birth_month);
//    $('#da_se_ed_bday_d').val(employee.birth_day);
//    $('#da_se_ed_no').val(employee.notes);
//    
//    //custome fields have to create divs
//    $('#da_se_ed_cu').html(spView.editableCustomFields(employee));
//    
//    $('#da_se_ed_po').html(spView.editableSchedules(employee));
//    $('#da_se_ed_sk').html(spView.editableSkills(employee));
//    $('#da_se_ed_no').html((employee.notes != null && employee.notes.length > 0) ? employee.notes : '');
//    
//    $('#da_se_ed_lang').val(employee.language);
//    
//}

ShiftPlanningDashboard.prototype.preparePasswordField = function(){
    $('#da_se_pa_np').val('');
    $('#da_se_pa_cp').val('');
}

ShiftPlanningDashboard.prototype.getWhosOn = function () {
    var data = [];
    $('#da_wo_li').html(spView.ulLoader());
    spModel.schedule.get('shifts', {
	mode:'onnow'
    }, function(response){
	var count=0;
	$.each(response.data, function(key,value){
	    if( typeof value.employees != 'undefined' && value.employees != null){
		$.each(value.employees, function(i,item){
		    var d={
			userID:item.id,
			avatar:sp.getAvatar(item.id),
			name:item.name,
			position:value.schedule_name,
			start_time:value.start_time.time,
			end_time:value.end_time.time
		    }
		    count++;
		    data.push(d)                        
		})

	    }
	})
	if(count==0){
	    $('#da_wo_li').html(spView.emptyResult('No one is scheduled to work right now.','li'))
	}else{
	    $('#da_wo_li').html($.tmpl($('#te_da_onnow'),data));
	}
    })    
}
//
ShiftPlanningDashboard.prototype.pingUser = function(data) {
    var self=this;
    var employee=sp.staff.data.employees[self.pingID];
    employee.company=user.company;
    employee.company_phone=user.phone;
    $('#wrapper > .subNavigation').hide();
    $('#da_who_ping').html($.tmpl($('#te_da_ping'),employee));
    
    //binding ping actions
    $('#da_who_tmpl div.title1').bind(clickEvent,function(){
	$('#da_who_txt').val($(this).find('span').html())
    })
    $('#da_who_send').bind(clickEvent,function(e){
	e.preventDefault();
	self.sendPingMessage()
    })          
}

ShiftPlanningDashboard.prototype.sendPingMessage = function(){
    var txt=$('#da_who_txt').val();
    spModel.staff.create('ping',{
	to:this.pingID,
	message:txt
    },function(response){
	sp.showSuccess('Ping sent to user');
	setTimeout(function(){
	    $('#pingUser .backMenu').trigger('click')
	},3000)
    })
}

ShiftPlanningDashboard.prototype.sendMessage = function(){
    var self = this;
    var data = {
	subject : $('#da_in_nm_ti').val(),
	message : $('#da_in_nm_me').val(),
	to  : $('#da_in_nm_to').val()
    }
    
    spModel.messaging.create('message', data, function(response){
	$('#da_in_nm_b').trigger(clickEvent);
	self.inboxSubEvents();
    });
}

//ShiftPlanningDashboard.prototype.changePassword = function (){
//    var self = this;
//    var eId = $('#da_se_cur_us_id').val();
//    if ($('#da_se_pa_np').val().length >= 6 && $('#da_se_pa_np').val() == $('#da_se_pa_cp').val()){
//	spModel.staff.update('employee', {
//	    id : eId, 
//	    password: $('#da_se_pa_np').val()
//	}, function(response){
//	    self.updateUser(eId, response);
//	});
//    } else {
//	//add other error type
//	sp.showError(_s('Password length must 6 or more chars and passwords must match.'));
//    }
//}

//ShiftPlanningDashboard.prototype.saveEditForm = function(obj){
//    //missing wage
//    //missing location, mininum weekly hours, maximum weekly hours, auto approve shift requests
//    // mising calendar size
//    //privacy settings
//    var eId = $('#da_se_cur_us_id').val();
//    var self = this;
//    var data = {};
//    var employee = spModel.staff.getEmployeeById($('#da_se_cur_us_id').val());
//   
//    data.id = eId;
//    data.name = $('#da_se_ed_na').val();
//    data.email = $('#da_se_ed_em').val();
//    
//    if ($('#da_se_ed_nn').val().length > 0){
//	data.nick_name = $('#da_se_ed_nn').val();
//    }
//    
//    if ($('#da_se_ed_us').val().length > 3){
//	data.username = $('#da_se_ed_us').val();
//    }
//    
//    if ($('#da_se_ed_ad').val().length > 0){
//	data.address = $('#da_se_ed_ad').val();
//    }
//    
//    if ($('#da_se_ed_ci').val().length > 0){
//	data.city = $('#da_se_ed_ci').val();
//    }
//
//    if ($('#da_se_ed_sp').val().length > 0){
//	data.state = $('#da_se_ed_sp').val();
//    }
//    if ($('#da_se_ed_pz').val().length > 0){
//	data.zip = $('#da_se_ed_pz').val();
//    }
//    
//    data.language= ($('#da_se_ed_lang').val() == 'none') ? '' : $('#da_se_ed_lang').val();//adding lanuage to staff details
//    
//    data.birth_day = $('#da_se_ed_bday_d').val();
//    data.birth_month = $('#da_se_ed_bday_m').val();
//    
//    if ($('#da_se_ed_mph_0').val().length > 0 && $('#da_se_ed_mph_1').val().length > 0 && $('#da_se_ed_mph_2').val().length > 0){
//	data.cell_phone = $('#da_se_ed_mph_0').val() + '-' + $('#da_se_ed_mph_1').val() + '-' + $('#da_se_ed_mph_2').val();
//    }
//    
//    if ($('#da_se_ed_hph_0').val().length > 0 && $('#da_se_ed_hph_1').val().length > 0 && $('#da_se_ed_hph_2').val().length > 0){
//	data.home_phone = $('#da_se_ed_hph_0').val() + '-' + $('#da_se_ed_hph_1').val() + '-' + $('#da_se_ed_hph_2').val();
//    }
//    
//    var customFields = {};   
//    var value="";
//    $('#da_se_ed_cu li [item="edit"]').each(function(i,field) {
//        
//        value = $(field).val();
//        
//        if (value.lenght == 0){
//            value = "";
//        }
//        
//        if ($(field).hasClass('checkbox check')){    
//            value = 1;
//            }
//        
//        else if ($(field).hasClass('checkbox')){
//            value = 0;
//            }
// 
//        customFields[$(field).attr('id')] = value;
//    });
//
//    customFields = JSON.stringify(customFields);
//    data.custom = customFields;
//    
//    spModel.staff.update('employee', data, function(response){
//	if (employee.id == sp.staff.admin.info.id && employee.language != response.data.language){
//	    setCookie('shiftplanning_mobile_lang', response.data.language, cookieExpire);
//	    window.location.reload();
//	}
//	obj.removeClass('loading');
//	self.updateUser(eId, response);
//    }, function(){
//	obj.removeClass('loading');
//    });
//}

//ShiftPlanningDashboard.prototype.adminActions = function(obj){
//    var eId = $('#da_se_cur_us_id').val();
//    var type = $(obj).attr('type');
//    var method = 'update';
//    var data = {
//	id : eId
//    }
//    if (type == 'deactivate'){
//	data.status = -1
//    } else if (type == 'delete'){
//	method = 'delete'
//    } else if (type == 'activate'){
//	data.send_activation = 1;
//    } else {
//	data.status = 1;
//    }
//    sp.api('staff.employee',method,data,function(response){
//	sp.staff.getStaff(function(){
//	    if (type == 'deactivate'){
//		sp.showSuccess(_s('User deactivated!'));
//		$('.subNavigation .staff .subWrapp a[subpage=list]').trigger(clickEvent);
//	    } else if (type == 'delete'){
//		sp.showSuccess(_s('User deleted!'));
//		$('.subNavigation .staff .subWrapp a[subpage=list]').trigger(clickEvent);
//	    } else if (type == 'activate'){
//		sp.showSuccess(_s('Activation successfully sent.'));
//		$(obj).hide();
//	    } else {
//		sp.showSuccess(_s('Employee activated successfully.'));
//		$('#da_se_ov_aa a[type=activate]').hide();
//		$(obj).hide();
//		$('#da_se_ov_st').html(_s('User Account is Enabled.'));
//	    }
//	});
//    }, function(response){
//	sp.showError(response.error);
//    });
//}

//ShiftPlanningDashboard.prototype.updateUser = function(id, res, over){
//    if (typeof over == 'undefined'){
//	over = true;
//    }
//    
//    if (id == sp.staff.admin.info.id){
//	sp.staff.admin.info = res.data;
//    }
//    sp.staff.data.employees['' + id] = res.data;
//    
//    if (over){
//	this.settingsSubEvents(sp.staff.data.employees['' + id]);
//    }
//    
//    
//    
//    sp.showSuccess(_s('Selected user updated.'));
//}

//Render select box
//ShiftPlanningDashboard.prototype.listLanguages = function (){
//    var result='<option  value="none">' + _s('Company default') + '</option>'
//    $.each(sp.raw.config.languages,function(key,value){
//	result+='<option value="'+value['code']+'">'+value['name']+' ' + ((value.machine == 1) ? '(machine)' : '') + '</option>'
//    });
//    $('#da_se_ed_lang').html(result);
//}

//ShiftPlanningDashboard.prototype.updateNotes = function(text){
//    if (sp.hasPermission(4) || parseInt($('#da_se_cur_us_id').val()) == sp.staff.admin.info.id){
//	var self = this;
//	var eId = $('#da_se_cur_us_id').val();
//	spModel.staff.update('employee', {
//	    id : eId, 
//	    notes : text
//	}, function(response){
//	    self.updateUser(eId, response);
//	});
//    }
//}
ShiftPlanningDashboard.prototype.fixes = function(){
    $('#dashboard .mainSub ul li a[subpage]').shorten();
    $('.mainNav a[page]').shorten();
}
//get all staff and add it to main variables
ShiftPlanningStaff.prototype.getStaff = function(callback){
    sp.api('staff.employees','get',{},function(response){
	sp.staff.raw.employees = response.data;
	sp.staff.data.employees = sp.map(response.data);
	if (typeof callback != 'undefined'){
	    callback();
	}
    }, function(response){
	sp.showError(response.error);
    });   
}

ShiftPlanningDashboard.prototype.loadPage = function(){
    
    }





 function ShiftPlanningLocation(){
    this.initialize();
    return true;
}

ShiftPlanningLocation.prototype = {
    data: {},
    raw: {},
    initialize: function(){
        $(document).ready(function(){
            $('#wrapper').delegate('select.locations', 'change', function(){
                var obj = $(this);
                if ($(this).val() == 'add'){
                    var loc = prompt (_s("Enter location name."),"");
                    if (loc != null){
                        spModel.location.create('location', {name : loc, type : $(this).find('option:last').attr('type')}, function(response){
                            obj.find('optgroup:first').append('<option value="' + response.data.id + '">' + response.data.name + '</option>');
                            obj.val(obj.find('optgroup:first option:last').val());
                            spModel.location.locationsList(true);
                        });
                    }
                }
            });
        });
    }
    
}



 function ShiftPlanningLogout(){
    this.initialize();
    return true;
}

ShiftPlanningLogout.prototype = {
    initialize: function(){
        
    },
    loadPage: function(){
        sp.staff.logout();
    }
}


 function ShiftPlanningMessaging(){
    this.initialize();
    return true;
}

ShiftPlanningMessaging.prototype = {
    initialize: function(){
        
    }
    
}





 var ShiftPlanningModal = function(){
    this.data = null;
    this.page = 9;
    this.right = true;
    this.left = false;
    //initalize after load events
    this.initialize();
}

ShiftPlanningModal.prototype = {
    initialize: function(){
        //some event
    }
}

 var ShiftPlanningModel = function(){
    //do we run initialize
    this.cache = {};
    //current diff
    this.diff = '';
}

ShiftPlanningModel.prototype.addModel = function(model, addClass){
    //we extends add class with base methods and initalize it into model object
    $.extend(addClass.prototype, spModel);
    if (typeof this[model] == 'undefined'){
        this[model] = new addClass;
    }
}

ShiftPlanningModel.prototype.get = function(module, data, success, error){
    var self = this;
//    self.cacheDiff(data);
//    if (self.isSetCache(module)){
//        success(self.getCache(module));
//    } else {
        if (typeof this[module] == 'undefined'){
            sp.api(this.model + '.' + module, 'get', data, function(response) {
                //self.setCache(module, sp.map(response.data));
                if(typeof success == 'function'){
                    success.call(this, response);
                }
            }, function(response){
                //self.clearCache(module);
                sp.showError(response.error);
                if(typeof error == 'function'){
                    error.call(this, error);
                }
            });
        } else {
            this[module](module, 'get', data, function(response){
                //self.setCache(module, sp.map(response.data));
                if(typeof success == 'function'){
                    success.call(this, response);
                }
            }, function(response){
                //self.clearCache(module);
                sp.showError(response.error);
                if(typeof error == 'function'){
                    error.call(this, response);
                }
            });
        }
    //}
}

ShiftPlanningModel.prototype.update = function(module, data, success, error){
    var self = this;
    //    self.cacheDiff(data);
    //    if (self.isSetCache(module)){
    //        success(self.getCache(module));
    //    } else {
    if (typeof this[module] == 'undefined'){
        sp.api(this.model + '.' + module, 'update', data, function(response) {
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    } else {
        this[module](module, 'update', data, function(response){
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, response);
            }
        });
    }
//}
}

ShiftPlanningModel.prototype.create = function(module, data, success, error){
    var self = this;
    //    self.cacheDiff(data);
    //    if (self.isSetCache(module)){
    //        success(self.getCache(module));
    //    } else {
    if (typeof this[module] == 'undefined'){
        sp.api(this.model + '.' + module, 'create', data, function(response) {
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    } else {
        this[module](module, 'create', data, function(response){
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, response);
            }
        });
    }
//}
}

ShiftPlanningModel.prototype.del = function(module, data, success, error){
    var self = this;
    //    self.cacheDiff(data);
    //    if (self.isSetCache(module)){
    //        success(self.getCache(module));
    //    } else {
    if (typeof this[module] == 'undefined'){
        sp.api(this.model + '.' + module, 'delete', data, function(response) {
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    } else {
        this[module](module, 'delete', data, function(response){
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    }
//}
}

ShiftPlanningModel.prototype.set = function(module){
    
}

ShiftPlanningModel.prototype.setCache = function(field, data){
    if (typeof this.cache[field] == 'unfedined'){
        this.cache[field] = {};
    }
    this.cache[field][this.diff] = data;
}

ShiftPlanningModel.prototype.clearCache = function(field){
    this.cache[field] = {};
}

ShiftPlanningModel.prototype.getCache = function(field){
    return this.cache[field];
}

ShiftPlanningModel.prototype.isSetCache = function(field){
    if (typeof this.cache[field] != 'undefined' && this.cache[field].length > 0){
        return true;
    } else {
        return false;
    }
}

//different data for same modul
ShiftPlanningModel.prototype.cacheDiff = function(diff){
    if (typeof diff != 'undefined'){
        this.diff = JSON.stringify(diff);
    } else {
        if (this.diff.length == 0){
            Log.log('Please set diff');
        } else {
            return this.diff;
        }
    }
    return true;
}




var spModel = new ShiftPlanningModel();


//adding classes
spModel.addModel('schedule', SPModelSchedule);
spModel.addModel('requests', SPModelRequests);
spModel.addModel('admin', SPModelAdmin);
spModel.addModel('messaging', SPModelMessaging);
spModel.addModel('timeclock', SPModelTimeClock);
spModel.addModel('staff', SPModelStaff);
spModel.addModel('payroll', SPModelPayroll);
spModel.addModel('location', SPModelLocation);
spModel.addModel('training', SPModelTraining);

 var ShiftPlanningPermissions = function(){
    this.superUser = 1;
    this.manager = 2;
    this.supervisor = 3;
    this.scheduler = 4;
    this.employee = 5;
    this.employees = {};
    this.initialize();
}

ShiftPlanningPermissions.prototype = {
    initialize : function(){
        
    }
}

 ShiftPlanningPermissions.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        if (user.loggedIn == 1){
            self.preparePermissions();
        }
    });
}


//hide all html parts of system wich permissions i don't have
ShiftPlanningPermissions.prototype.preparePermissions = function(){
    //missing view reports
    //missing edit profile
    
    var perms = sp.staff.admin.settings;
    var group = sp.staff.admin.info.group
 
     //Message Wall (is vissible)
    if (parseInt(perms.message_wall_on) == 0){
        $('#da_wa_nm_b').remove();
        $('#da_wa_nm_f').remove();
        $('#da_wa_li').html(spView.emptyResult(_s('Message wall is off. Please contact your manager for more info.'), 'li'));
    }
    
    //remove button for writing new wall message
    if (group > this.supervisor && parseInt(perms.message_wall_emp) == 0){
        $('#da_wa_nm_b').remove();
        $('#da_wa_nm_f').remove();
    }
    
    //Add class to ul to hide wall comments
    if (parseInt(perms.message_wall_comments) == 0){
        $('#da_wa_li').addClass('permMsgCommentOff');
    }
    
    //remove button for inbox if perms aren't met'
    if (group >= this.scheduler && parseInt(perms.pm) == 0){
        $('#da_in_nm_b').unbind(clickEvent);
        $('#da_in_nm_b').remove();
	

    }
    
    if (perms.shift_confirm == 0){
	$('.subNavigation .reports a[subpage=confirmedHours]').remove();
    }
    
    //fix employee only perms
    if (group >= this.employee){        
        $('#da_se_ov_no, #da_se_ed_no').parents('.detailsGrid').remove();
	
	//remove manage timeclock
	$('#tc_mts_sub_button').remove();
        $('#tc_mts').remove();
	
	$('.subNavigation .requests a[subpage=shiftApprovals]').remove();
	$('#rq_sa').remove();
    }
    
    if (group >= this.scheduler){

        $('#menu_reports').remove();
        $('#reports').remove();
	
	$('#settings .aPerm').remove();
	
	//remove staff fast assignment and add staff for employee
        $('.subNavigation .staff a[subpage=addStaff]').remove();
        $('.subNavigation .staff a[subpage=fastAssignment]').remove();
        $('#staff .addStaff').remove();
        $('#st_fa').remove();
    }
   
    if (group > this.supervisor){
//        $('#da_se_ov_aa').prev().remove();
//        $('#da_se_ov_aa').remove();
    }
    
    //Employees can manually add time clocks
    if (group >= this.scheduler && parseInt(perms.tc_empl_addtime) == 0){
        $('#tc_act_sub_button').remove();
    }
    
    //Time Clock Module is on
    if (parseInt(perms.timeclock) == 0){
        $('#menu #menu_timeClock').unbind(clickEvent);
        $('#da_widgets .timeClock').remove();
        $('#menu #menu_timeClock').remove();
        $('#timeClock').remove();
        $('.subNavigation div.timeClock').remove();
	$('.subNavigation .reports a[subpage=confirmedTimeSheets]').remove();
    }

    //Employees can view staff gallery
    if (group >= this.employee && parseInt(perms.visible_staff) == 0){
        $('#menu #menu_staff').unbind(clickEvent);
        $('#menu #menu_staff').remove();
        $('#staff').remove();
        $('.subNavigation div.staff').remove();
    }
    
    if ( group >= this.scheduler && parseInt( perms.edit_profile ) == 0 ) {
        $('.subNavigation .settings .subNav a[subpage=edit]').hide();
    }
    
/*    
    //Employee can send private messages
    if (group >= this.employee && parseInt(perms.pm) == 0){
        $('#da_in_nm_b').unbind(clickEvent);
        $('#da_in_nm_b').remove();
    }
    
//    //Employee can view Who's on now
//    if (group >= this.employee && parseInt(perms.on_now) == 0){
//        $('#da_who').remove();
//    }
//      This doesn't exists on mobile version for now
    

    
    //Employees can manually add time clocks
    if (group >= this.employee && parseInt(perms.tc_empl_addtime) == 0){
        $('#tc_mts_sub_button').parent().remove();
        $('#tc_act_sub_button').remove();
    }
    
    //Message Wall
    if (parseInt(perms.message_wall_on) == 0){
        $('#da_w').remove();
        $('#da_nm_f').remove();
        $('#da_w_title').remove();
    }
    
    
    if (group > this.manager && parseInt(perms.message_wall_emp) == 0){
        $('#da_nmb').remove();
        $('#da_nm_f').remove();
    }
    
    if (group > this.supervisor){
        $('#footer_manageTimeSheets').parent().remove();
        $('#tc_manageTimeSheets').remove();
        $('#footer_addEmployee').parent().remove();
        $('#st_ae').remove();
        $('#footer_fastAssignment').parent().remove();
        $('#st_fa').remove();
        $('#da_se_ov_p .aPerm').remove();
        $('#menu_reports').remove();
        $('#reports').remove();
        $('#rq_rl_va, #rq_rl_sp, #rq_rl_sr, #rq_rl_ast').parent().hide();
        $('#rq_rl .breaker').hide();
        $('#rq_rl .breaker:last, #rq_rl .breaker:first,').show();
    }
    
    if (group > this.scheduler){
        $('#rq_va_rq').remove();
        $('ul.requests a[subPage=shiftApprovals]').parent().remove();
    }
*/
}

ShiftPlanningPermissions.prototype.hasPermission = function(type){
    var perms = sp.staff.admin.settings;
    var group = sp.staff.admin.info.group;
    switch (type){
        case 'visible_staff_details':
            //Employees can view staff contact details (staff gallery must be checked)
            if (group >= this.employee && parseInt(perms.visible_staff_details) == 0){
                return false;
            }
            break;
        case 'edit_profile':
            if (group > this.scheduler && parseInt(perms.edit_profile) == 0){
                return false;
            }
            break;
        case 'message_wall_comments':
            if (group > this.manager && parseInt(perms.message_wall_comments) == 0){
                return false;
            }
            break;

    }
    return true;
}

ShiftPlanningPermissions.prototype.fixStaffListing = function(){
    var st = sp.staff.data.employees;
    var sc = sp.schedule.clearSchedules();
    var employees = {};
    
    $.each(sc, function(i, item){
	$.each(st, function(eI, eItem){
	    if (eItem.schedules != null && typeof eItem.schedules[item.id] != 'undefined'){
		employees[eItem.id +''] = eItem;
	    }
	});
    });
    
    return employees;
}


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
	    end_time : strtotime('tomorrow')*1000
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
        start_time : Date.parse('sunday').add(sp.staff.admin.settings.startday - 1).days().getTime(),
        end_time : Date.parse('next saturday').add(sp.staff.admin.settings.startday - 1).days().getTime()
    }
    self.times[4] = {
        title : 'Last Week',
        start_time : Date.parse('today').moveToDayOfWeek(0).addWeeks(-2).add(sp.staff.admin.settings.startday - 1).days().getTime(),
        end_time : Date.parse('previous saturday').add(sp.staff.admin.settings.startday - 1).days().getTime()
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

 ShiftPlanningReports.prototype.initialize = function(){
    var self = this;
    this.reports = [];
    $(document).ready(function(){
        self.allReportsEvents();
		if(user.loggedIn){
			self.allReportsSubEvents(); // S.T. 18.02.2013. Transfered from loadPage
		}
    });
}

ShiftPlanningReports.prototype.allReportsEvents = function(){
    var self = this;
	
    $('#reports .advancedButton').bind(clickEvent, function(e){
        e.preventDefault();
        if ($(this).hasClass('advancedOpened')){
            $(this).removeClass('advancedOpened');
            $(this).html('Advanced');
            $(this).parents('.main').find('li.advancedMenu').toggleClass('hidden');
        } else {
            $(this).addClass('advancedOpened');
            $(this).html('Simple');
            $(this).parents('.main').find('li.advancedMenu').toggleClass('hidden');
        }
    });
    
    $('#reports .timeSelector').bind('change', function(ep){
        var val = $(this).val();
        if (val != '-1' && val != '99'){
            var times = spRanges.getRange('times', val);
            var s = new Date(times.start_time);
            var e = new Date(times.end_time);
            $('#reports .' + self.page +' .timeFromSelector').val(s.toString(cal.dformat));
            $('#reports .' + self.page +' .timeToSelector').val(e.toString(cal.dformat));
            self.displayReports();
        }
    });
    
    $('#reports .checkbox').bind(clickEvent, function(){
        $(this).toggleClass('check');
        self.displayReports();
    });
    
    $('#reports .employeeSelector, #reports .advancedMenu select').bind('change', function(){
        self.displayReports();
    });
    
    $('#reports .listReports').delegate('a.fr', clickEvent, function(e){
        e.preventDefault();
        self.cId = $(this).attr('rel');
        sp.loadSubPage('', 'reports', 'singleViewDisplay');
    });
    
    $('#re_si_inf').bind(clickEvent, function(e){
        e.preventDefault();
        $('#wrapper > .subNavigation').show();
        $('#wrapper > .subNavigation .reports li.active a').trigger(clickEvent);
    });
}

ShiftPlanningReports.prototype.allReportsSubEvents = function(){
    var self = this;
    spView.fixCurrency(sp.staff.admin.settings.currency);
    $('#reports .timeSelector').html(spView.timeRanges());
    $('#reports .timeSelector').val(3);
    $('#reports .employeeSelector').html(spView.staffFilter());
    $('#reports .positionsSelector').html(spView.scheduleFilter());
    $('#reports .skillsSelector').html(spView.skillsFilter());
    var times = spRanges.getRange('times', $('#reports .timeSelector').first().val());
    var s = new Date(times.start_time);
    var e = new Date(times.end_time);
    $('#reports .timeFromSelector').scroller('destroy');
    $('#reports .timeFromSelector').val(s.toString(cal.dformat));
    $('#reports .timeFromSelector').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
        onSelect : function(){
            $('#reports .' + self.page +' .timeSelector').val(-1);
            self.displayReports();
        }
    });
    
    $('#reports .timeToSelector').scroller('destroy');
    $('#reports .timeToSelector').val(e.toString(cal.dformat));
    $('#reports .timeToSelector').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
        onSelect : function(){
            $('#reports .' + self.page +' .timeSelector').val(-1);
            self.displayReports();
        }
    });
}

ShiftPlanningReports.prototype.displayReports = function(){
    if (this.page == 'singleViewDisplay'){
        return false;
    }
    
    sp.globalLoader();
    
    var self = this;
    var page = this.page;
    var origin = this.page;
    
    $('#reports .' + origin + ' .totals').hide();
    $('#reports .' + origin + ' .noResults').hide();
    $('#reports .' + origin + ' .notif').hide();
    $('#reports .' + origin + ' .listReports').html(spView.ulLoader());
    var data = {
        type : page.toLowerCase()
    }
    
    if (page == 'confirmedTimeSheets'){
        data.type = 'timesheets'; 
    }
    
    data.start_date = $('#reports .' + origin +' .timeFromSelector').val();
    data.end_date = $('#reports .' + origin +' .timeToSelector').val();
    $('#reports .' + origin +' time.from').html($('#reports .' + origin +' .timeFromSelector').val());
    $('#reports .' + origin +' time.to').html($('#reports .' + origin +' .timeToSelector').val());
    data.schedule = $('#reports .' + origin + ' .positionsSelector').val();
    data.employee = $('#reports .' + origin + ' .employeeSelector').val();
    data.skill = $('#reports .' + origin + ' .skillsSelector').val();
    
    if ($('#reports .' + origin + ' .re_deductBreaks').hasClass('check')){
        data.deduct_breaks = 1;
    } else {
        data.deduct_breaks = 0;
    }
    
    if ($('#reports .' + origin + ' .re_groupResults').hasClass('check')){
        data.group_results = 1;
    } else {
        data.group_results = 0;
    }
    
    if ($('#reports .' + origin + ' .re_showEmpty').hasClass('check')){
        data.show_empty = 1;
    } else {
        data.show_empty = 0;
    }
    spModel.payroll.get('report', data, function(response){
        if (response.data.length == 0){
            $('#reports .' + origin + ' .totals').hide();
            $('#reports .' + origin + ' .notif').show();
        } else {
            $('#reports .' + origin + ' .totals').show();
        }
        var total = {colspan : 5, regular : 0, special : 0, overtime : 0, total : 0, cost : 0}
        var d = []
        $.each(response.data, function(i, item){
            total.regular = total.regular + Number(item.hours.regular);
            total.special = total.special + Number(item.hours.special);
            total.overtime = total.overtime + Number(item.hours.overtime);
            total.total = total.total + Number(item.hours.total);
            total.cost = total.cost + Number(item.hours.cost);
            d[i] = item;
            d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
            d[i].rId = i;
        });
        self.reports = d;
        $('#reports .' + origin + ' .listReports').html($.tmpl($('#te_re_info'), d));
        $('#reports .' + origin + ' .TSregular > span > span').html(total.regular.toFixed(2));
        $('#reports .' + origin + ' .TSspecial > span > span').html(total.special.toFixed(2));
        $('#reports .' + origin + ' .TSovertime > span > span').html(total.overtime.toFixed(2));
        $('#reports .' + origin + ' .TStotal > span > span').html(total.total.toFixed(2) + ' Hours');
        $('#reports .' + origin + ' .TScost > span > span:not(.currency)').html(total.cost.toFixed(2));
    });
}

ShiftPlanningReports.prototype.singleViewDisplay = function(id){
    $('#wrapper > .subNavigation').hide();
    try{
        //console.log('before this.reports. for id=' + id);
        var item = this.reports[id];
        //console.log('item setted successully');
        //console.log(item);
        
        $('#re_di_item').html($.tmpl($('#te_re_' + this.page + '_' + (($('#reports .' + this.page + ' .re_groupResults').hasClass('check')) ? '1' : '0')), item));
        spView.fixCurrency(sp.staff.admin.settings.currency);
    } catch( err ){
        console.log("Greska");
        console.log(err);
    }
}

ShiftPlanningReports.prototype.loadSubPageEvents = function(subpage){
    if (subpage == 'singleViewDisplay'){
        this.singleViewDisplay(this.cId);
    } else {
		this.allReportsSubEvents();
        var self = this;
        this.page = subpage;
        var origin = this.page;
        $('#reports .' + origin + ' .totals').hide();
        $('#reports .' + origin + ' .noResults').hide();
        $('#reports .' + origin + ' .notif').hide();
        $('#reports .' + origin + ' .listReports').html(spView.ulLoader());
        setTimeout(function(){
            self.displayReports();
        }, 100);
    }
}

ShiftPlanningReports.prototype.loadPage = function(){
}


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

 ShiftPlanningRequests.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.overviewEvents();
        self.vacationEvents();
        self.availableEvents();
        self.openShiftsEvents();
        self.shiftTradesEvents();
        self.shiftApprovalsEvents();
    });
}


ShiftPlanningRequests.prototype.loadSubPageEvents = function(subpage){
    $('.subNavigation').show();
    switch (subpage){
        case 'overview':
            this.overviewSubEvents();
            break;
        case 'vacation':
            this.vacationSubEvents();
            break;
        case 'available':
            this.availableSubEvents();
            break;
        case 'shiftTrades':
            this.shiftTradesSubEvents();
            break;
        case 'shiftApprovals':
            this.shiftApprovalsSubEvents();
            break;
        case 'openShifts':
            this.openShiftsSubEvents();
            break;
        case 'vacationRequestManage':
            $('.subNavigation').hide();
            this.displayVacationRequest();
            break;
        case 'shiftTradeManager':
            $('.subNavigation').hide();
            this.displayShiftTradeManager();
            break;
        case 'shiftTradeManagerAP':
            $('.subNavigation').hide();
            this.displayShiftTradeManagerAP();
            break; 
        case 'shiftSwapRequest':
            $('.subNavigation').hide();
            this.shiftSwapRequestSubEvents();
            break;
        case 'shiftTradeManagerIM':
            $('.subNavigation').hide();
            this.displayShiftTradeManagerIM();
            break;
        case 'openShiftsOpen':
            $('.subNavigation').hide();
            this.displayOpenShifts();
            break;
        case 'openShiftsRequest':
            $('.subNavigation').hide();
            this.displayOpenRequests();
            break;
        case 'shiftApprovalsSingle':
            $('.subNavigation').hide();
            this.shiftApprovalsSingle();
            break;
    }
}


//initialize events
ShiftPlanningRequests.prototype.overviewEvents = function(){
    //we open page based on subpage found in a tag
    $('#requests #rq_ov a').bind(clickEvent, function(e){
        e.preventDefault();
        $('.subNavigation .requests li a[subpage=' + $(this).attr('subpage') + ']').trigger(clickEvent);
    });
    
    $('#requests .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        $('.subNavigation .requests li a[subpage=' + $(this).attr('subpage') + ']').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.vacationEvents = function(){
    var self = this;
    var p = $('#requests #rq_va');
    var t = $('#rq_va table');
    
    $('#rq_va_sr').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).addClass('loading');
        self.addVacationRequest($(this));
    });
    
    $('#rq_va_fr').scroller();
    $('#rq_va_to').scroller();
    
    
    $('#rq_va_rq').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.vacations[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'vacationRequestManage');
    });
    
    
    $('#rq_va_ma_acp').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).addClass('loading');
        self.approveVacationRequest($(this));
    });
    
    $('#rq_va_ma_dec').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).addClass('loading');
        self.declineVacationRequest($(this));
    });
    
    $('#rq_va_spd').bind(clickEvent, function(e){
        e.preventDefault();
        $('#rq_va_up .pastDate').toggleClass('hidden');
        if ($('#rq_va_spd').html() == 'Show past dates') {
            $('#rq_va_spd').html('Hide past dates');
        } else if ($('#rq_va_spd').html() == 'Hide past dates') {
            $('#rq_va_spd').html('Show past dates');
        }
    });
    
    $('#rq_va').delegate('a.deleteVacation', clickEvent, function(e){
        e.preventDefault();
        self.cancelVacationRequest($(this).attr('rel'));
    });
}

ShiftPlanningRequests.prototype.availableEvents = function() {
    var self= this;
    $('#rq_av_pu').bind(clickEvent, function(e){
        e.preventDefault();
        sp.loadSubPage('', 'requests', 'openShifts');
    });
    
    $('#rq_av_sw, #rq_av_tr').bind(clickEvent, function(e) {
        e.preventDefault();
        sp.loadSubPage('', 'requests', 'shiftTrades');
    });
    
    /*open shifts */
    $('#rq_av_pu_li').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.available.pickup[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'openShiftsOpen');
    });

    /*shift swap*/
    $('#rq_av_sw_li').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.available.swap[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftSwapRequest');
    });
    
    /*shift trades*/
    $('#rq_av_tr_li').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.available.trade[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManagerAP');
    });
    
}

ShiftPlanningRequests.prototype.openShiftsEvents = function(){
    var self = this;
    $('#rq_os_os').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.shifts[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'openShiftsOpen');
    });
    
    $('#rq_os_spr').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.shiftsR[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'openShiftsRequest');
    });
    
    $('#rq_os_os_s').delegate('#rq_os_rtw.green', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        spModel.schedule.create('shiftrequests', {
            shift : $(this).attr('rel') 
        }, function(response){
            obj.removeClass('loading').removeClass('green').addClass('grey').html(_s('<span>Cancel pending request</span>'));
        });
    });
    
    $('#rq_os_os_s').delegate('#rq_os_rtw.grey', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        spModel.schedule.update('shift', {
            id : $(this).attr('rel'), 
            remove : sp.staff.admin.info.id
        }, function(response){
            obj.removeClass('loading').removeClass('grey').removeClass('green').html(_s('Request Removed'));
        });
    });
    
    $('#rq_os_spr_s').delegate('.step a', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        var data = {
            id : $(this).attr('rel'),
            type : 'openshifts'
        }
        
        if ($(this).hasClass('accept')){
            data.mode = 'approve';
        } else {
            data.mode = 'reject';
        }
        spModel.schedule.update('requests', data, function(response){
            obj.removeClass('loading');
            $('.subNavigation .requests li a[subpage=openShifts]').trigger(clickEvent);
        }, function(response){
            obj.removeClass('loading');
        });
    });
}

ShiftPlanningRequests.prototype.shiftTradesEvents = function(){
    var self = this;
    $('#rq_st_mst').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.trades['manage'][$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManager');
    });
    
    $('#rq_st_ap').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.trades['avaiting'][$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManagerAP');
    });
    
    $('#rq_st_im').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.trades['requested'][$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManagerIM');
    });
    $('#rq_st_swap').delegate('a',clickEvent,function(e){
            e.preventDefault();
            self.current = self.swaps[$(this).attr('rel')];
            sp.loadSubPage('', 'requests', 'shiftSwapRequest');
    });
    $('#rq_st_sh_swap').delegate('.traders a', clickEvent, function(){
            var swapId = $(this).attr('swapId');
            var shift = $(this).attr('shiftId');
            var action = $(this).attr('class');
            var obj = $(this);
            obj.addClass('loading');		
            var message = action == 'accept' ? 'You have accepted this shift trade.' : 'You have rejected this shift trade.' ;
            spModel.schedule.update('tradeswap',{shift_for_swap:shift,trade:swapId,action:action},function(response){
                obj.removeClass('loading');
                sp.showSuccess(message);
                $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
            });
    });
    $('#rq_st_mst_s').delegate('.traders a', clickEvent, function(e){
        var obj = $(this);
        obj.addClass('loading');
        e.preventDefault();
        var id = $(this).attr('tradeId');
        var uId = $(this).attr('userId');
        var data = {
            trade: id,
            user: uId
        }
        
        if ($(this).hasClass('accept')){
            data.action = 'accept';
        } else {
            data.action = 'reject';
        }
        
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        }, function(response){
            sp.showError(response.error);
        });
    });
    
    $('#rq_st_mts_sub ul a').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        var id = $(this).attr('rel');
        var data = {
            trade : id
        }
        
        if ($(this).hasClass('activate')){
            data.action = 'activate';
        }
        
        if ($(this).hasClass('cancel')){
            data.action = 'cancel';
            var c = confirm(_s('Are you sure you want to cancel this request?'));
            if (!c){
                obj.removeClass('loading');
                return false;
            }
        }
        
        if ($(this).hasClass('deactivate')){
            data.action = 'deactivate';
        }
        obj.addClass('loading');
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            if (data.action == 'activate'){
                sp.showSuccess(_s('Shift trade accepted, waiting for potentional acceptors to accept.'));
            } else if (data.action == 'deactivate'){
                sp.showSuccess(_s('Shift trade rejected.'));
            } else {
                sp.showSuccess(_s('Shift trade canceled.'));
            }
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        }, function(response){
            sp.showError(response.error);
        });
    });
    
    $('#rq_st_ap_sub ul a').bind(clickEvent, function(e){
        var obj = $(this);
        obj.addClass('loading');
        e.preventDefault();
        var id = $(this).attr('rel');
        var data = {
            trade : id
        }
        
        if ($(this).hasClass('accept')){
            data.action = 'accept';
        } else {
            data.action = 'reject';
        }
        
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            sp.showSuccess(i18n.format(_s("Shift trade pick up {action}"), {action:data.action}));
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        }, function(response){
            sp.showError(response.error);
        });
    });
    
    $('#rq_st_im_sm a').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        var id = $(this).attr('rel');
        var data = {
            trade : id
        }
        
        if ($(this).hasClass('cancel')){
            var c = confirm(_s('Are you sure you want to cancel this request?'));
            if (!c){
                obj.removeClass('loading');
                return false;
            }
            data.action = 'cancel';
        }
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        });
    });
}

ShiftPlanningRequests.prototype.shiftApprovalsEvents = function(){
    var self = this;
    $('#rq_sa select').bind('change', function(){
        self.shiftApproveList();
    });
    
    $('#rq_sa_ho').delegate('.checkbox', clickEvent, function(){
        var obj = $(this);
        if (!obj.hasClass('check')){
            var id = obj.attr('shiftId');
            spModel.schedule.update('shiftapprove', {
                id: id
            }, function(response){
                obj.addClass('check');
                self.addShift(id, response.data);
            }, function(response){
                sp.showError(response.error);
            });
        }
    });
    
    $('#rq_sa_ho').delegate('span.names, span.time', clickEvent, function(){
        var main = $(this).parent();
        main.addClass('loading');
        var id = main.find('.checkbox').attr('shiftId');
        var check = main.find('.checkbox').hasClass('check');
        if (check){
            spModel.schedule.get('shiftapprove', {
                id : id
            }, function(response){
                var shift = self.getShift(id);
                if (shift.employees != null){
                    $.each(response.data, function(i, item){
                        $.each(shift.employees, function(i2, item2){
                            if (item2.id == item.employee){
                                shift.employees[i2].shift = item
                            }
                        });
                    });
                }
                self.current = self.fixShiftsApproval(shift);
                sp.loadSubPage('', 'requests', 'shiftApprovalsSingle');
            }, function(response){
                main.removeClass('loading');
                sp.showError(response.data);
            });
        } else {
            spModel.schedule.update('shiftapprove', {
                id : id
            }, function(response){
                main.find('.checkbox').addClass('check');
                self.addShift(id, response.data);
                self.current = self.fixShiftsApproval(response.data);
                sp.loadSubPage('', 'requests', 'shiftApprovalsSingle');
            }, function(response){
                main.removeClass('loading');
                sp.showError(response.data);
            });
        }
    });
    
    $('#rq_sa_s').delegate('.checkbox', clickEvent, function(){
        $(this).toggleClass('check');
    });
    
    $('#rq_sa_sub .approve').bind(clickEvent, function(e){
        e.preventDefault();
        self.saveShiftApprove();
    })
}

//sub events
ShiftPlanningRequests.prototype.overviewSubEvents = function(){
    $('#rq_ov_loader').show();
    $('#rq_ov_widgets').hide();
    $('#rq_ov_hd').hide();
    $('#rq_ov_loader').html(spView.ulLoader());
    spModel.admin.get('nrequests', {}, function(response){
        if (typeof response.data.vacation == 'undefined'){
            response.data.vacation = 0;
        }
        if (typeof response.data.shift_approval == 'undefined'){
            response.data.shift_approval = 0;
        }
        if (typeof response.data.shift_request_waiting == 'undefined'){
            response.data.shift_request_waiting = 0;
        }
        if (typeof response.data.trade_approval == 'undefined'){
            response.data.trade_approval = 0;
        }
        if (typeof response.data.trade_approval == 'undefined'){
            response.data.trade_approval = 0;
        }
        if (typeof response.data.shift_available == 'undefined'){
            response.data.shift_available = 0;
        }
        
        if (response.data.vacation == 0){
            $('#rq_rl_va').hide();
        } else {
            $('#rq_rl_va').show();
        }
        
        if (response.data.shift_approval == 0){
            $('#rq_rl_sp').hide();
        } else {
            $('#rq_rl_sp').show();
        }
        
        if (response.data.shift_request_waiting == 0){
            $('#rq_rl_sr').hide();
        } else {
            $('#rq_rl_sr').show();
        }
        
        if (response.data.trade_approval == 0){
            $('#rq_rl_ast').hide();
        } else {
            $('#rq_rl_ast').show();
        }
        
        if (response.data.shift_available == 0){
            $('#rq_rl_sv').hide();
        } else {
            $('#rq_rl_sv').show();
        }
        
        $('#rq_rl_va .icon b').html(response.data.vacation);
        $('#rq_rl_sp .icon b').html(response.data.shift_approval);
        $('#rq_rl_sr .icon b').html(response.data.shift_request_waiting);
        $('#rq_rl_ast .icon b').html(response.data.trade_approval);
        $('#rq_rl_sv .icon b').html(response.data.shift_available);
        $('#rq_ov_widgets').show();
        $('#rq_ov .widgets li:visible').attr('style','');
        $('#rq_ov .widgets li:visible:first').css('border-top', 'none');
        if ($('#rq_ov .widgets li:visible').length == 0){
            $('#rq_ov_hd').show();
            $('#rq_ov_widgets').hide();
        } else {
            $('#rq_ov_hd').hide();
        }
        $('#rq_ov_loader').hide();
        
    }, function(response){
        sp.showError(response.error);
    });
}

ShiftPlanningRequests.prototype.vacationSubEvents = function(){
    var self = this;
    $('#rq_va_wc').val('');
    $('#rq_va_fr').val('');
    $('#rq_va_to').val('');
    
    if (sp.staff.admin.settings.book_days_off == 1){
        $('#rq_va .newMsg').show();
        $('#rq_va .newMsg').next().show();
    } else {
	$('#rq_va .newMsg').hide();
        $('#rq_va .newMsg').next().hide();
    }
    
    $('#rq_va_en').html(spView.staffOption((sp.staff.admin.info.group <= 4) ? false : true));
    $('#rq_va_spd').hide()


    $('#rq_va_rq').html(spView.ulLoader());
    $('#rq_va_aa').html(spView.ulLoader());
    $('#rq_va_up').html(spView.ulLoader());

    $('#rq_va_rq').show();
    $('#rq_va_aa').show();
    $('#rq_va_up').show();

    $('#rq_va_rq').next().hide();
    $('#rq_va_aa').next().hide();
    $('#rq_va_up').next().hide();
    
    
    $('#rq_va_ma_acp, #rq_va_ma_dec').removeClass('loading');
    
    
    if (sp.staff.admin.info.group <= 4){
        spModel.schedule.get('vacations', {
            mode: 'manage'
        }, function(response){
            if (response.data.length == 0){
                $('#rq_va_rq').hide();
                $('#rq_va_rq').next().show();
            } else {
                $('#rq_va_rq').show();
                $('#rq_va_rq').next().hide();
                var d = [];
                $.each(response.data, function(i, item){
                    d[i] = item;
                    d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                    d[i].rId = i;
                });
                self.vacations = d;
                $('#rq_va_rq').html($.tmpl($('#te_rq_va_ma'), d));
            }
        });
    } else {
	$('#rq_va_rq').hide();
	$('#rq_va_rq').next().show();
    }

    spModel.schedule.get('vacations', {
        mode: 'requested'
    }, function(response){
        if (response.data.length == 0){
            $('#rq_va_aa').hide();
            $('#rq_va_aa').next().show();
        } else {
            $('#rq_va_aa').show();
            $('#rq_va_aa').next().hide();
            $('#rq_va_aa').html($.tmpl($('#te_rq_va_aa'), response.data));
        }
    }, function(response){
        sp.showError(response.error);
    });
    
    //    
    //    //getting upcoming confirmed vacations
    spModel.schedule.get('vacations', {start_date : 'last year', end_date : 'next year'}, function(response){
	response.data = self.clearVacations(response.data);
        if (response.data.length == 0){
            $('#rq_va_up').hide();
            $('#rq_va_up').next().show();
        } else {
            $('#rq_va_up').show();
            $('#rq_va_up').next().hide();
            $('#rq_va_up').html($.tmpl($('#te_rq_va_up'), response.data));
	    if ($('#rq_va_up .pastDate').length > 0){
		$('#rq_va_spd').show();
	    } else {
		$('#rq_va_spd').hide();
	    }
        }
    }, function(response){
        sp.showError(response.error);
    });
//    
//    $('#rq_va_up').addClass('appHidden');
}

ShiftPlanningRequests.prototype.availableSubEvents = function() {
    $('#rq_av_pu .icon b').html('');
    $('#rq_av_sw .icon b').html('');
    $('#rq_av_tr .icon b').html('');
    $('#rq_av_pu_li').html(spView.ulLoader());
    $('#rq_av_sw_li').html(spView.ulLoader());
    $('#rq_av_tr_li').html(spView.ulLoader());
    var calls = [
        ['schedule.shifts','GET', {
            'mode': 'open'
        }],
        ['schedule.trades','GET', {}],
        ['schedule.trades', 'get', {'mode' : 'swap'}]
    ]
    var self = this;
    sp.multiApi(calls, function(response){
        self.available.pickup = sp.map(response[0].data);
        self.available.swap = sp.map(response[2].data);
        self.available.trade = sp.map(response[1].data);
        $('#rq_av_pu .icon b').html( sp.countResponse( response[0].data ) );
        $('#rq_av_pu_li').html($.tmpl($('#te_da_all_shiftV2'), sp.objToArray(response[0].data)));
        
        if ( sp.countResponse( response[0].data ) > 0 ) {
            $('#rq_av_pu_li').show();
        } else {
            $('#rq_av_pu_li').hide();
        }
        
        $('#rq_av_sw .icon b').html( sp.countResponse( response[2].data ) );
        var swap = [];
        $.each(response[2].data,function(key,item){
                item.avatar = sp.getAvatar(item.user);
                swap.push(item);
        });
        
        if ( sp.countResponse( response[2].data ) > 0 ) {
            $('#rq_av_sw_li').show();
        } else {
            $('#rq_av_sw_li').hide();
        }
        
        $('#rq_av_sw_li').html($.tmpl($('#te_da_all_shiftV2'), swap ));
        $('#rq_av_tr .icon b').html( sp.countResponse( response[1].data ) );
        
        if ( sp.countResponse( response[1].data ) > 0 ) {
            $('#rq_av_tr_li').show();
        } else {
            $('#rq_av_tr_li').hide();
        }
        $('#rq_av_tr_li').html($.tmpl($('#te_da_all_shiftV2'), sp.objToArray(response[1].data)));
    });
}

ShiftPlanningRequests.prototype.openShiftsSubEvents = function() {
    var self = this;
    
    $('#rq_os_os').html(spView.ulLoader());
    
    $('#rq_os_os').next().hide();
    
    $('#rq_os_spr').prev().show();
    $('#rq_os_spr').html(spView.ulLoader());
    $('#rq_os_spr').next().hide();
    
    
    
    spModel.schedule.get('shifts', {
        mode: 'open', 
        detailed : 1
    }, function(response){
        if (response.data.length == 0){
            $('#rq_os_os').hide();
            $('#rq_os_os').next().show();
        } else {
            $('#rq_os_os').show();
            $('#rq_os_os').next().hide();
            var d = [];
            $.each(response.data, function(i, item){
                d[i] = item;
                d[i].rId = i;
            });
            self.shifts = d;
            $('#rq_os_os').html($.tmpl($('#te_da_all_shift'), response.data));
        }
    }, function(response){
        sp.showError(response.error);
    });
    
    
    if (sp.staff.admin.info.group < 4){
        spModel.schedule.get('shifts', {
            mode: 'openapproval'
        }, function(response){
            if (response.data.length == 0){
                $('#rq_os_spr').hide();
                $('#rq_os_spr').next().show();
            } else {
                $('#rq_os_spr').show();
                $('#rq_os_spr').next().hide();
                response.data = self.prepareOpenShiftsNA(response.data);
                var d = [];
                $.each(response.data, function(i, item){
                    d[i] = item;
                    d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                    d[i].rId = i;
                });
                self.shiftsR = d;
                $('#rq_os_spr').html($.tmpl($('#te_da_all_shift'), response.data));
            }
        }, function(response){
            sp.showError(response.error);
        });
    } else {
        $('#rq_os_spr').prev().hide();
        $('#rq_os_spr').hide();
        $('#rq_os_spr').next().hide();
    }
}

ShiftPlanningRequests.prototype.shiftTradesSubEvents = function(){
    var self = this;
    $('#rq_st_mst').html(spView.ulLoader());
    $('#rq_st_ap').html(spView.ulLoader());
    $('#rq_st_swap').html(spView.ulLoader());
    $('#rq_st_im').html(spView.ulLoader());
    
    $('#rq_st_mst').show();
    $('#rq_st_ap').show();
    $('#rq_st_im').show();
    
    $('#rq_st_mst').next().hide();
    $('#rq_st_ap').next().hide();
    $('#rq_st_im').next().hide();
    $('#rq_st_swap').next().hide();
    if (sp.staff.admin.info.group <= 4){
        spModel.schedule.get('trades', {
            mode : 'manage'
        }, function(response){
            if (response.data.length == 0){
                $('#rq_st_mst').hide();
                $('#rq_st_mst').next().show();
            } else {
                $('#rq_st_mst').show();
                $('#rq_st_mst').next().hide();
                var d = [];
                $.each(response.data, function(i, item){
                    d[i] = item;
                    d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                    d[i].rId = i;
                });
                self.trades['manage'] = d;
                $('#rq_st_mst').html($.tmpl($('#te_rq_st_mst'), d));
            }
        }, function(response){
            sp.showError(response.error);
        });
    } else {
        $('#rq_st_mst').hide();
        $('#rq_st_mst').next().show();
    }
    //    
    spModel.schedule.get('trades', {}, function(response){
        if (response.data.length == 0){
            $('#rq_st_ap').hide();
            $('#rq_st_ap').next().show();
        } else {
            $('#rq_st_ap').show();
            $('#rq_st_ap').next().hide();
            var d = [];
            $.each(response.data, function(i, item){
                d[i] = item;
                d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                d[i].rId = i;
            });
            self.trades['avaiting'] = d;
            $('#rq_st_ap').html($.tmpl($('#te_rq_st_ap'), d));
        }
    }, function(response){
        sp.showError(response.error);
    });
        
    spModel.schedule.get('trades', {
        mode : 'requested'
    }, function(response){
        if (response.data.length == 0){
            $('#rq_st_im').hide();
            $('#rq_st_im').next().show();
        } else {
            $('#rq_st_im').show();
            $('#rq_st_im').next().hide();
            var d = [];
            $.each(response.data, function(i, item){
                d[i] = item;
                d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                d[i].rId = i;
            });
            self.trades['requested'] = d;
            $('#rq_st_im').html($.tmpl($('#te_rq_st_ap'), d));
        }
    }, function(response){
        sp.showError(response.error);
    });
	
    spModel.schedule.get('trades',{
            mode : 'swap'
    },function(response){
            if(response.data != ''){
                    self.swaps= response.data;
                    var swap = [];
                    $('#rq_st_swap').show();
                    $.each(response.data,function(key,item){
                            item.avatar = sp.getAvatar(item.user);
                            swap.push(item);
                    });
                    $('#rq_st_swap').html($.tmpl($('#te_rq_swap_single'),swap));
            }else{
                    $('#rq_st_swap').hide();
                    $('#rq_st_swap_empty').show();
            }
    });
}

ShiftPlanningRequests.prototype.clearVacations = function(data){
    var vacations = [];
    if (data.length == 0){
	return vacations;
    }
    $.each(data, function(i, item){
	if (item.employee == sp.staff.admin.info.id){
	    vacations.push(item);
	}
    });
    
    return vacations;
}

ShiftPlanningRequests.prototype.shiftApprovalsSubEvents = function(){
    $('#rq_sa_po').html(spView.scheduleFilter());
    $('#rq_sa_em').html(spView.staffFilter());
    $('#rq_sa_ho').html(spView.divLoader());
    this.shiftApproveList();
}

//functions

ShiftPlanningRequests.prototype.shiftApproveList = function(){
    this.shifts = [];
    $('#rq_sa_ho').html(spView.divLoader());
    var self = this;
    var data = {
        mode: 'confirm'
    }
    
    if ($('#rq_sa_po').val() != 0){
        data.schedule = $('#rq_sa_po').val();
    }
    
    if ($('#rq_sa_em').val() != 0){
        data.employees = $('#rq_sa_em').val();
    }
    
    spModel.schedule.get('shifts', data, function(response){
        if (response.data.length > 0){
            $('#rq_sa_ho').html($.tmpl($('#te_rq_sa'), self.prepareShiftApprovals(response.data)));
        } else {
            $('#rq_sa_ho').html(spView.emptyResult());
        }
    }, function(response){
        sp.showError(response.error);
    });
}

ShiftPlanningRequests.prototype.prepareShiftApprovals = function(data){
    var res = {};
    $.each(data, function(i, item){
        var t = item.start_date.formatted + '';
        if (typeof res[t] == 'undefined'){
            res[t] = {
                shiftDate : item.start_date.formatted,
                shifts : [item]
            }
        } else {
            res[t].shifts.push(item);
        }
    });
    var a = [];
    
    $.each(res, function(i, item){
        a.push(item);
    });
    
    return a;
}

ShiftPlanningRequests.prototype.addVacationRequest = function(obj){
    var self = this;
    if ($.trim($('#rq_va_fr').val()).length == 0){
        sp.showError(_s('Please select FROM time'));
        obj.removeClass('loading');
        return false;
    }
    
    if ($.trim($('#rq_va_to').val()).length == 0){
        sp.showError(_s('Please select TO time'));
        obj.removeClass('loading');
        return false;
    }
    
    var data = {
        start_date : $('#rq_va_fr').val(),
        end_date : $('#rq_va_to').val(),
        employee : $('#rq_va_en').val(),
        comments : $('#rq_va_wc').val()
    };
    
    spModel.schedule.create('vacation', data, function(response){
        self.vacationSubEvents();
        obj.removeClass('loading');
        $('#rq_va_wc').val('');
        $('#rq_va_fr').val('');
        $('#rq_va_to').val('');
    });
}

ShiftPlanningRequests.prototype.displayVacationRequest = function(){
    $('#rq_va_ma_s').html($.tmpl($('#te_rq_va_ma_s'), this.current));   
}

ShiftPlanningRequests.prototype.displayShiftTradeManager = function(){
    $('#rq_st_mst_s').html($.tmpl($('#te_rq_st_mst_s'), this.prepareSingleViewTrade(this.current)));
    $('#rq_st_mts_sub ul a').attr('rel', this.current.id);
    
    if (parseInt(this.current.confirm_before) == 0){
        $('#rq_st_mts_fm').show();
        $('#rq_st_mts_sm').hide();
    } else {
        $('#rq_st_mts_sm').show();
        $('#rq_st_mts_fm').hide();
    }
}

ShiftPlanningRequests.prototype.displayShiftTradeManagerIM = function(){
    
    $('#rq_st_im_s').html($.tmpl($('#te_rq_st_im_s'), this.current));
    
    $('#rq_st_im_sm a').attr('rel', this.current.id);
}

ShiftPlanningRequests.prototype.shiftSwapRequestSubEvents = function(){
    $('#rq_st_sh_swap').html($.tmpl($('#te_rq_st_swap_single'),this.current));
}

ShiftPlanningRequests.prototype.displayShiftTradeManagerAP = function(){
    
    $('#rq_st_ap_s').html($.tmpl($('#te_rq_st_ap_s'), this.current));
    
    $('#rq_st_ap_sub ul a').attr('rel', this.current.trade_id);
    
    if (parseInt(this.current.confirmed) == 1){
        $('#rq_st_ap_sub ul').hide();
    } else {
        $('#rq_st_ap_sub ul').show();
    }
}

ShiftPlanningRequests.prototype.displayOpenShifts = function(){
    $('#rq_os_os_s').html($.tmpl($('#te_rq_os_os_s'), this.current));
    
    var h = '';
    var una = '<p>' + _s('You are un-available') + '</p>';
    var s = this.current.status;
    if (typeof sp.staff.admin.settings.open_overtime == 'undefined'){
        sp.staff.admin.settings.open_overtime = false;
    }
    switch (s){
        case 0 :
            h = '<a class="grey" href="#" id="rq_os_rtw" rel="' + this.current.id + _s('"><span>Cancel pending request</span>');
            if (!this.current.available) {
                h += una;
            }
            break;
        case 1 : 
            h = '<p>' + _s('Management rejected your request for this shift') + '</p>';
            break;
        case 2 :
            h = '<p>' + _s('Already on this shift') + '</p>';
            break;
        case 3 :
            h = '<p>' + _s('Booked Off') + '</p>';
            break;
        case 5 :
        case 6 :
            if (!sp.staff.admin.settings.open_overtime) {
                if (s == 5) {
                    h = '<p>' + _s('Will put you into weekly overtime') + '</p>';
                } else {
                    h = '<p>' + _s('Will put you into daily overtime') + '</p>';
                }
            } else {
                h = '<a class="green" href="#" id="rq_os_rtw" rel="' + this.current.id + _s('"><span>Request to work</span>') + '</a>';
            }
            break;
        case 7 :
            h = '<p>' + _s('Max Days in a Row Breached') + '</p>';
            break;
        case 8 :
            h = '<p>' + _s('Scheduled during this time') + '</p>';
            break;
        case 9 :
            h = '<p>' + _s('Invalid time between shifts') + '</p>';
            break;
        case 10 :
            h = '<a class="green" href="#" id="rq_os_rtw" rel="' + this.current.id + _s('"><span>Request to work</span>') + '</a>';
            if (!this.current.available) {
                h += una;
            }
            break;
    }
    $('#rq_os_pickup_req_button').html(h);
}

ShiftPlanningRequests.prototype.displayOpenRequests = function(){
    if (typeof this.current.full == 'undefined'){
        this.current.full = this.current;
    }
    $('#rq_os_spr_s').html($.tmpl($('#te_rq_os_spr_s'), this.current));
    
    $('#rq_os_spr_sub a').attr('rel',this.current.full.request_id);
}

ShiftPlanningRequests.prototype.shiftApprovalsSingle = function(){
    $('#rq_sa_s').html($.tmpl($('#te_rq_sa_s'), this.current));
    $('#rq_sa_s .shiftStartInput').scroller('destroy');
    $('#rq_sa_s .shiftEndInput').scroller('destroy');
    
    $('#rq_sa_s .shiftStartInput').scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    $('#rq_sa_s .shiftEndInput').scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
}

ShiftPlanningRequests.prototype.approveVacationRequest = function(obj){
    var self = this;
    spModel.schedule.update('vacation', {
        id: self.current.id, 
        status : 1
    }, function(){
        $('.subNavigation .requests li a[subpage=vacation]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.declineVacationRequest = function(obj){
    var self = this;
    spModel.schedule.update('vacation', {
        id: self.current.id, 
        status : -1
    }, function(){
        $('.subNavigation .requests li a[subpage=vacation]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.cancelVacationRequest = function(id){
    spModel.schedule.update('vacation', {
        id: id, 
        status : -2
    }, function(){
        $('.subNavigation .requests li a[subpage=vacation]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.prepareSingleViewTrade = function (data){
    if (data.traders.count == 0){
        data.traders.data = [];
    }
    var d = [];
    $.each(data.traders.data, function(i, item){
        var p = item;
        p.avatar = (typeof sp.staff.data.employees[item.user] != 'undefined' && typeof sp.staff.data.employees[item.user].avatar != 'undefined' && sp.staff.data.employees[item.user].avatar != '' && typeof sp.staff.data.employees[item.user].avatar.small != 'undefined') ? sp.staff.data.employees[item.user].avatar.small : 'images/no-avatar.png';
        d.push(p);
    });
    
    data.traders.data = d;
    return data;
}
ShiftPlanningRequests.prototype.prepareSingleViewSwap = function(data){
	
}

ShiftPlanningRequests.prototype.prepareOpenShiftsNA = function(data){
    var res = {};
    $.each(data, function(i, item){
        $.each(item.requests, function(iV2, itemV2){
            item.user_name = itemV2.name;
            item.user_id = itemV2.id;
            item.avatar = sp.getAvatar(itemV2.id);
            res[item.user_id + item.start_date.formatted + item.start_time.time + item.end_time.time + item.schedule_name] = {
                user_name : itemV2.name,
                user_id : itemV2.id,
                start_date : {
                    formatted: item.start_date.formatted
                },
                start_time : {
                    time : item.start_time.time
                },
                end_time : {
                    time : item.end_time.time
                },
                schedule_name : item.schedule_name,
                notes : item.notes,
                id : item.id,
                rId : item.request_id,
                full : item
            };
        });
    });
    var p = [];
    $.each(res, function(i, item){
        p.push(item);
    });
    return p;
}

ShiftPlanningRequests.prototype.saveShiftApprove = function(){
    var self = this;
    var data = [];
    $.each($('#rq_sa_s .save'), function(){
        var t = {
            employee: $(this).attr('userId'),
            id : $(this).attr('shiftId'),
            start_time : $(this).find('.shiftStartInput').val(),
            end_time : $(this).find('.shiftEndInput').val()
        }
        if (!$(this).find('.checkbox').hasClass('check')){
            t.absent = 1
        }
        var tmp = ['schedule.shiftapprove', 'update', t];
        data.push(tmp);
    });
    
    sp.multiApi(data, function(response){
        $('.subNavigation .requests li a[subpage=shiftApprovals]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.addShift = function(id, data, field){
    if (typeof field != 'undefined'){
        this.shifts[parseInt(id) + ''][field] = data;
    } else {
        this.shifts[parseInt(id) + ''] = data;
    }
}

ShiftPlanningRequests.prototype.getShift = function(id){
    return this.shifts[id];
}

ShiftPlanningRequests.prototype.fixShiftsApproval = function(data){
    if (data.employees != null){
        $.each(data.employees, function(i, item){
            if (typeof data.employees[i].shift == 'undefined'){
                data.employees[i].shift = data;
                data.employees[i].shift.absent = 0;
            }
        });
    }
    return data;
}

ShiftPlanningRequests.prototype.loadPage = function(){
    
    }


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
	this.state =1;
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





 ShiftPlanningSchedule.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.allPageEvents();
    });
}

ShiftPlanningSchedule.prototype.allPageEvents = function(){
    var self = this;
    $('#sc_fl').bind('change', function(e){
        var val = $(this).val();
        if (parseInt(val) != val){
            self.settings.mode = val;
        } else {
            self.settings.mode = 'schedule';
            self.settings.schedule = val;
        }
        self.displayShifts();
    });

    $('#sc_prev_day').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_to_sub').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).add(-1).day().toString(cal.dformat));
        self.nextPrevPrepare('prev');
    });
    
    $('#sc_next_day').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_to_sub').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).add(1).day().toString(cal.dformat));
        self.nextPrevPrepare('next');
    });
    
    $('#sc_prev_month').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_mo_di').html(Date.parse($.trim($('#sc_mo_di').html())).addMonths(-1).toString('MMMM yyyy'));
        $('#sc_days_m').hide();
        self.displayShifts();
    });
    
    $('#sc_next_month').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_mo_di').html(Date.parse($.trim($('#sc_mo_di').html())).addMonths(1).toString('MMMM yyyy'));
        $('#sc_days_m').hide();
        self.displayShifts();
    });   
    
    $('#sc_ca_bo').delegate('td:not(.notM)', clickEvent, function(){
        $('#sc_ca_bo td').removeClass('today');
        $(this).addClass('today');
        var i = $(this).attr('time');
        if (typeof self.shifts[i] != 'undefined'){
            $('#sc_td_list').show();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').hide();
            $('#sc_td_list').html('<ul class="shifts moved"></ul>');
            $('#sc_td_list ul').html($.tmpl($('#te_sc_shifts_new'), self.shifts[i].shifts));
            $('#sc_td_list .isShift > p').each(function() {
                $(this).html($(this).html().substring(0, $(this).html().length - 1));
            });
        } else {
            $('#sc_td_list').hide();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').show();
        }
        $('#sc_to_sub').html(Date.parse(i + ' ' + $.trim($('#sc_mo_di').html())).toString(cal.dformat));
        $('#sc_days_m').show();
    });
    
    $('#sc_td_list').delegate('a', clickEvent, function(e){
        e.preventDefault()
        if (!$(this).hasClass('isShift')){
            return false;
        }
        $(this).parent().addClass('loading');
        spModel.schedule.get('shift', {
            id : $(this).attr('rel'), 
            detailed : 1
        }, function(response){
            self.shift = response.data;
            sp.loadSubPage('', 'schedule', 'shiftDisplay');
        });
    });
    
    $('#schedule .shiftDisplay .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        e.stopPropagation();
        if(self.fromUpcoming){
            self.fromUpcoming = false;
            $('.subNavigation').show();
                    if(self.fromStaff){
                self.fromStaff = false;
                $('.subNavigation .schedule').hide()
                $('.staff .subWrapp ul li a[subpage=list]').trigger(clickEvent);
                sp.staff.displayEmployee($('#da_se_cur_us_id').val());
                $('#settings .search.settings.mainSub li a[subpage=upcomingShifts]').trigger(clickEvent);
            }else{
            $('.subNavigation .settings li a[subpage=upcomingShifts]').trigger(clickEvent);
//            $('#settings .search.settings.mainSub li a[subpage=upcomingShifts]').trigger(clickEvent);
            }
        }else{
        if(self.fromRecent) {
            self.fromRecent = false;
            $('.subNavigation').show();
                    if(self.fromStaff) {
                self.fromStaff = false;
                $('.subNavigation .schedule').hide()
                $('.staff .subWrapp ul li a[subpage=list]').trigger(clickEvent);
                sp.staff.displayEmployee($('#da_se_cur_us_id').val());
                $('#settings .search.settings.mainSub li a[subpage=recentShifts]').trigger(clickEvent);
            } else {
                $('.subNavigation .settings li a[subpage=recentShifts]').trigger(clickEvent);
//                $('#settings .search.settings.mainSub li a[subpage=recentShifts]').trigger(clickEvent);
            }
        }else{
            if (self.fromDashboard){
                self.fromDashboard = false;
                $('.subNavigation').show();
                $('.subNavigation .dashboard li a[subpage=dashboard]').trigger(clickEvent);
            }if (self.fromDashboardUpcoming) { 
                self.fromDashboardUpcoming = false;
                $('.subNavigation').show();
                $('.subNavigation .dashboard li a[subpage=upcomingShifts]').trigger(clickEvent);
            }else {
                if ($('#sc_sub_shift_display ul a.publish').attr('first') == 'false'){
                    self.resetPublishFields(true);
                } else {
                    $('.subNavigation .schedule .schedule li.active a').trigger(clickEvent);
                }
              }
            }
          }
    });
	
	$('.shiftDisplay ').delegate('#get_directions', clickEvent, function(e){
		var that = this;
		var msg = _s("There is no default address in your profile.Enter starting point address.");
		if (self.shift.user_location == null){
			var done =  false;
			var errorCallback = function(response){
				done = true;
				msg = _s("Application didn't get GPS coordinates.Enter starting point address.");
				promptLocation();
			};
			
			var promptLocation =  function(){
				var address = prompt (msg,"");
				self.shift.user_location = address;
				var href = 'http://'+googleIp+'/maps/?f=d&hl=en&geocode=&saddr='+address+'&daddr='+self.shift.location.address+'&ie=UTF8&z=7&output=embed';
				$(that).attr('href',href);
				if (address != null){
//					$(that)[0].click();
					window.open(href, "_blank");
				}else{
					e.preventDefault();
				}				
			}
			if(typeof navigator.geolocation != 'undefined' ){
				e.preventDefault();
				setTimeout(function(){
					if(!done){
						errorCallback();
					}
				},10000);
				sp.showSuccess('Getting coordinates . . .');
				navigator.geolocation.getCurrentPosition(
					//success
					function(response){
						if (typeof response != 'function' ){
							var address = ''+response.coords.latitude + ','+ response.coords.longitude+'';
							self.shift.user_location = address;
							var href = 'http://'+googleIp+'/maps/?f=d&hl=en&geocode=&saddr='+self.shift.user_location+'&daddr='+self.shift.location.address+'&ie=UTF8&z=7&output=embed';						
							$(that).attr('href',href);
							done = true;
//							$(that)[0].click();
							window.open(href, "_blank");
						}
					},
					//error
					errorCallback
				);
			} else {
				promptLocation();				
			}

		}
		
	}); 
    
    $('#schedule .addShift .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        if ($(this).attr('bck') == 'edit'){
            spModel.schedule.get('shift', {
                id : $('#sc_edit_id').val(), 
                detailed : 1
            }, function(response){
                self.shift = response.data;
                sp.loadSubPage('', 'schedule', 'shiftDisplay');
            });
        } else {
            $('.subNavigation .schedule .schedule li.active a').trigger(clickEvent);
        }
    });
    
    $('#sc_sub_shift_display ul a.edit').bind(clickEvent, function(e){
        e.preventDefault();
        var o = $(this);
        o.addClass('loading');
        spModel.schedule.get('shift', {
            id : $(this).attr('rel'), 
            detailed:  1
        }, function(response){
            o.removeClass('loading');
            self.shift = response.data;
            self.edit = true;
            sp.loadSubPage('', 'schedule', 'addShift');
        }, function(){
            o.removeClass('loading');
        });
    });
    $('#sc_sub_shift_display ul a.delete').bind(clickEvent,function(e){
        e.preventDefault();
        var shiftId = $(this).attr('rel');  
        var obj = $(this);        
        if($(this).attr('first') == 'true'){
                spModel.schedule.del('shift',{id:shiftId,rule:$('#te_sc_shift_display_delete .radio.check').attr('value')},function(response){
                    sp.showSuccess(response.data);
                    setTimeout(function(){
                        $('#schedule .shiftDisplay .backMenu').trigger(clickEvent)
                    },3000);
                }) 
                obj.attr('first','false');
        }else{
        spModel.schedule.get('shift',{id:shiftId,detailed:1},function(response){
            self.shift=response.data;
            if(typeof self.shift.repeats == 'undefined' || self.shift.repeats == 0){
                spModel.schedule.del('shift',{id:shiftId},function(response){
                    sp.showSuccess(response.data);
                    setTimeout(function(){
                        $('#schedule .shiftDisplay .backMenu').trigger(clickEvent)
                    },3000);
                })
            }else{
                $('#te_sc_shift_display_info').hide();
                $('#te_sc_shift_display_delete').show();
                obj.attr('first','true');
            }
        })
        }
    });
	$('#sc_sub_trade a.backMenu').bind(clickEvent,function(e){
		e.preventDefault();
		sp.loadSubPage('','schedule','shiftDisplay');	
		self.state = 1;
	});
	$('#cs_sh_trade').delegate('.chk',clickEvent, function(e){
		e.preventDefault();
		if($(this).hasClass('all')){
			if(!$(this).hasClass('check')){
				$('#empList0 .chk').addClass('check');
			}else{
				$('#empList0 .chk').removeClass('check');
			}
		}else{
			$(this).toggleClass('check');
		}
	})
	$('#empList1').delegate('.checkbox',clickEvent,function(e){
		e.preventDefault();
		var that = this;
		var shiftId=$(this).attr('rel');
		$(this).parent().addClass('loading');
		if(!$(this).hasClass('check') && !$(this).hasClass('disabled')){
			spModel.schedule.get('shift',{id:shiftId,detailed:1},function(response){
				var isAvail = false ;
				if( response.data.length && response.data.staff.available.length > 0){
					$.each(response.data.staff.available,function(key,item){
						isAvail = item[0] == sp.staff.admin.info.id ? true : isAvail;
					});
				}
				if( sp.staff.admin.business.pref_same_day_trades == '1' && ( response.data.length && response.data.staff.sameday.length > 0) ){
					$.each(response.data.staff.sameday,function(key,item){
						isAvail = item[0] == sp.staff.admin.info.id ? true : isAvail;
					});
				}
				if (isAvail){
					$(that).addClass('check');
					$(that).parent().removeClass('loading');
				}else{
					$(that).addClass('disabled');
					$(that).parent().removeClass('loading');
					sp.showError('You aren\'t available for this shift!')
				}
			});
		}else{
			$(this).removeClass('check');
			$(this).parent().removeClass('loading');
		}
	});
	$('#sc_sub_shift_display ul a.trade').bind(clickEvent, function(e){
		e.preventDefault();
		sp.loadSubPage('','schedule','trade');
	});
	$('#schedule .trade').delegate('.tradepick a',clickEvent,function(e){
		e.preventDefault();
		var type = $(this).attr('id');
		var that = this;
		$(this).addClass('loading');
		setTimeout(function(){
			$('#cs_sh_trade .steps').show();
			$('#schedule .trade>div').hide();
			$('#te_sc_shift_display_trade_'+type).show();	
			$('#schedule .trade>div [step^="step"]').hide();
			$('#schedule .trade>div [step=step_'+self.state+']').show();	
			$('span[rel=self_state]').html(self.state)						
			$(that).removeClass('loading');
		},400);
		
	});
	$('#te_sc_shift_display_trade_swap,#te_sc_shift_display_trade_release').delegate('.steps a',clickEvent,function(e){
		e.preventDefault();
		var move = $(this).attr('id');
		var type = $(this).attr('swap');
		var that = this;
		$(this).addClass('loading');
		if(move == '_back'){
			self.state = self.state - 1;
		}else if(move == '_next'){
			self.state = self.state + 1;
		}
		switch(self.state){
			case  0:
			case -1:
					setTimeout(function(){
						$('#schedule .trade>div').hide();
						$('#schedule .trade>div:first').show();
						self.state = 1;
						$('span[rel=self_state]').html(self.state);
						$(that).removeClass('loading');
					},400);
				break;
			case 2:
				spModel.schedule.get('tradelist',{id:self.shift.id,swap:type},function(response){
					var data = [];
					$.each(response.data,function(key,item){
						var d = {};
						d.id = key;
						d.avatar = sp.getAvatar(key);
						d.name = item.name;
						if(typeof item.shifts != 'undefined'){
							d.shifts = [];
							$.each(item.shifts,function(i,it){
								var shifts = {};
								shifts.id = i;
                                shifts.user_shift_id = it.user_shift_id;
								shifts.start = it.start;
								d.shifts.push(shifts);
							});
							data.push(d);
						}else if(type == 0){							
							data.push(d);
						}
					});
					$('#empList'+type).html('');
					if(type == 0 && data.length > 0){
						$('#empList'+type).append('<li><span class="chk all"></span> <span class="name">'+_s('Select All')+'</span></li>');
					}
					if(type == 1 && data.length == 0){
						$('#empList'+type).append('<li>'+_s('There are no available shifts to trade')+'</li>');
					}
					$('#empList'+type).append($.tmpl($('#te_sc_shift_release'+type),data));
					$('#schedule .trade>div [step^="step"]').hide();
					$('#schedule .trade>div [step=step_'+self.state+']').show();	
					$('span[rel=self_state]').html(self.state);
					$(that).removeClass('loading');					
				});
				break;
			case 3:
				var selected =  $('#empList'+type+' .check:not(.all)');
				var call = type == '0' ? 'trade' : 'tradeswap' ;
				var field = type == '0' ? 'tradewith' : 'swap' ;
				if(!selected.length){
					sp.showError(_s('You need to select at least one item'));
					$(that).removeClass('loading');
					self.state = self.state -1;
					return false;
				}
				var packedItems = []
				selected.each(function(i,j){
                    if (field == 'swap' ) {
                        packedItems.push($(j).attr('user_shift_id'));
                    } else {
                        packedItems.push($(j).attr('rel'));
                    }
				});
				var params = {};
				params[field]=packedItems.join(',');
				params['shift']=self.shift.id;
				params['reason']=$('textarea[name=reason_trade'+type+']').val();
				spModel.schedule.create(call,params,function(response){
					self.state = 3;
					$('#schedule .trade>div [step^="step"]').hide();
					$('#schedule .trade>div [step=step_'+self.state+']').show();
					$('span[rel=self_state]').html(self.state);
					$(that).removeClass('loading');
					$('#cs_sh_trade .steps').hide();
					$('#sc_sub_shift_display a.trade').hide();
					self.state = 1;
				});
				self.state = 2;
				break;
			default:
				setTimeout(function(){
					self.state = self.state > 3 ? 3 : self.state ;
					self.state = self.state < 0 ? 1 : self.state ;
					$('#schedule .trade>div [step^="step"]').hide();
					$('#schedule .trade>div [step=step_'+self.state+']').show();
					$('span[rel=self_state]').html(self.state);
					$(that).removeClass('loading');
				},400);
			break;			
		}
	});
    $('#sc_sub_shift_display ul a.publish').bind(clickEvent, function(e){
	e.preventDefault();
	if ($(this).attr('first') == 'true'){
	    $('#te_sc_shift_display_info').hide();
	    $('#te_sc_shift_display_publish').show();
	    $(this).attr('first', 'false');
	    return false;
	}
	var obj = $(this);
	obj.addClass('loading');
	if (typeof self.conflicts[obj.attr('rel')] != 'undefined'){
	    var c = confirm(self.conflicts[obj.attr('rel')].title);
	    if (c){
		spModel.schedule.get('publish', {shifts: obj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response){
		    sp.showSuccess(response.data);
		    obj.removeClass('loading');
		    obj.hide();
		    self.resetPublishFields(true);
		});
	    } else {
		obj.removeClass('loading');
	    }
	} else {
	    spModel.schedule.get('conflicts', {schedule : $(this).attr('rel')}, function(response) {
		self.setConflicts(response.data);
		if (typeof self.conflicts[obj.attr('rel')] != 'undefined'){
		    var c = confirm(_s('This shift has conflicts, but you can\'t fix them from mobile app. Force publish?'));
		    if (c) {
			spModel.schedule.get('publish', {shifts: obj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response){
			    sp.showSuccess(response.data);
			    obj.removeClass('loading');
			    obj.hide();
			    self.resetPublishFields(true);
			});
		    } else {
			obj.removeClass('loading');
		    }
		} else {
		    spModel.schedule.get('publish', {shifts: obj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response){
			sp.showSuccess(response.data);
			obj.removeClass('loading');
			obj.hide();
			self.resetPublishFields(true);
		    });
		}
	    });
	}
    });
    
    $('#sc_shift_display').delegate('#te_sc_shift_display_publish .radio', clickEvent, function(){
	$('#te_sc_shift_display_publish .radio').removeClass('check');
	$(this).addClass('check');
    });
    
    $('#sc_shift_display').delegate('#te_sc_shift_display_delete .radio', clickEvent, function(){
	$('#te_sc_shift_display_delete .radio').removeClass('check');
	$(this).addClass('check');
    });    
    
    $('#sc_shift_display').delegate('#te_sc_shift_display_publish .checkbox', clickEvent, function(){
	$(this).toggleClass('check');
	$('#tc_sc_shift_display_publish_textarea').toggle();
    });
    
    $('#sc_refresh').bind(clickEvent, function(e){
        $(this).parent().removeClass('active');
        e.preventDefault();
        self.displayShifts();
    });
    
    $('#sc_add').bind(clickEvent, function(e){
        e.preventDefault();
        sp.loadSubPage('', 'schedule', 'addShift');
    });
    
    $('#sc_add_add').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        var isEdit = ($('#sc_edit_id').val() != 0) ? true : false;
        obj.addClass('loading');
        var data = {
            schedule : $('#sc_add_sc').val(),
            location : $('#sc_add_lo').val(),
            title : $('#sc_add_ti').val(),
            start_time : $('#sc_date_st').val(),
            end_time : $('#sc_date_et').val(),
            start_date : $('#sc_date_sd').val(),
            end_date : $('#sc_date_ed').val(),
            notes : $('#sc_add_no').val()
        }
        
        var method = 'create';
        if (isEdit){
            method = 'update';
            data.id = $('#sc_edit_id').val();
        }

        spModel.schedule[method]('shift', data, function(response){
            spModel.schedule.get('shift', {
                id : response.data.id, 
                detailed : 1
            }, function(r1){
                if (!isEdit){
                    obj.removeClass('loading');
                    self.shift = r1.data;
                    self.edit = true;
                    sp.loadSubPage('', 'schedule', 'addShift');
                } else {
                    spModel.schedule.get('shift', {
                        id : $('#sc_edit_id').val(), 
                        detailed : 1
                    }, function(response){
                        self.shift = response.data;
                        sp.loadSubPage('', 'schedule', 'shiftDisplay');
                        sp.showSuccess(_s('Shift Updated'));
                    });
                }
            });
        }, function(){
            obj.removeClass('loading');
        });
    });
    
    $('#sc_add_user').delegate('.checkbox', clickEvent, function(){
        
        var data = {
            id : $('#sc_edit_id').val()
        }
        var obj = $(this);
        //add loader
        obj.parent().addClass('loading');
        
        if (obj.hasClass('check')){
            data.remove = obj.attr('user');
        } else {
            data.add = obj.attr('user');
        }
        spModel.schedule.update('shift', data, function(response){
            spModel.schedule.get('shift', {
                id : response.data.id, 
                detailed : 1
            }, function(r1){
                obj.parent().removeClass('loading');
                self.shift = r1.data;
                self.edit = true;
                sp.loadSubPage('', 'schedule', 'addShift');
            }, function(){
                obj.parent().removeClass('loading');
            });
        }, function(){
            obj.parent().removeClass('loading');
        });
    });
    
    $('#sc_edit_submenu .subNav a').bind(clickEvent, function(e){
        var obj = $(this);
        e.preventDefault();
        obj.addClass('loading');
        spModel.schedule.update('shiftapprove', {
            id : $('#sc_edit_id').val()
        }, function(response){
            sp.showSuccess(_s('Shift approved'));
            obj.removeClass('loading');
            obj.hide();
        }, function(){
            obj.removeClass('loading');
        })
    });
}

ShiftPlanningSchedule.prototype.loadSubPageEvents = function(subpage){
    $('#sc_edit_id').val(0);
    $('.subNavigation').show();
    $('#sc_additional_menu').show();
	$('#sc_to_sub').html(sp.raw.config.today.formatted);
	
	var opt = '';
    opt += _s('<option value="employee">My Schedules</option>');
    if ( parseInt( sp.staff.admin.settings.visible_overview ) == 1 || parseInt( sp.staff.admin.info.group ) < 5 ) {
        opt += _s('<option value="overview">Schedule Overview</option>');
    }
    opt += spView.schedulerFilter();
    $('#sc_fl').html(opt);
	
	
    if (subpage == 'shiftDisplay' || subpage == 'addShift' || subpage == 'trade'){
        $('.subNavigation').hide();
    }
    if (subpage == 'addShift'){
        $('#sc_additional_menu').hide();
    }
    this[subpage + 'SubEvents']();
}

//sub events
ShiftPlanningSchedule.prototype.todaySubEvents = function(){
//    $('#sc_to_sub').html(sp.raw.config.today.formatted);
    $('#sc_to_sub').prev().html('Today');
    this.page = 'today';
    this.displayShifts();
}

ShiftPlanningSchedule.prototype.tradeSubEvents = function (){
	$('#schedule .trade>div').hide();
	$('#schedule .trade>div:first').show();
	$('#cs_sh_trade ul.shifts').html($.tmpl($('#te_cs_sh'),this.shift));
	$('.tradepick li').show();
	if(sp.staff.admin.settings.trade_shifts != '1'){
		$('#release').parent().parent().hide();
	}
	if(sp.staff.admin.business.pref_swap_shifts != '1'){
		$('#swap').parent().parent().hide();
	}
}

ShiftPlanningSchedule.prototype.daySubEvents = function(){
    this.page = 'day';
    $('#sc_to_sub').prev().html('Current Day');
    this.displayShifts();
}

ShiftPlanningSchedule.prototype.monthSubEvents = function(){
    this.page = 'month';
    $('#sc_to_sub').prev().html('Selected Day');
    $('#sc_mo_di').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).add(1).day().toString('MMMM yyyy'));
    this.displayShifts();
}

ShiftPlanningSchedule.prototype.shiftDisplaySubEvents = function(){
    this.shift = this.cleanPerm(this.shift);
	$('#sc_sub_shift_display a.trade').hide();	
    if (this.fromDashboard || this.fromRecent || this.fromUpcoming){
        $('#sc_sub_shift_display a.delete').hide();
        $('#sc_sub_shift_display a.edit').hide();
	$('#sc_sub_shift_display a.publish').hide();
    } else {
        if (this.shift.perms == 0){
            $('#sc_sub_shift_display a.delete').hide();
            $('#sc_sub_shift_display a.edit').hide();
	    $('#sc_sub_shift_display a.publish').hide();
		$('#sc_sub_shift_display a.trade').hide();
        } else if (this.shift.perms == 1){
            $('#sc_sub_shift_display a.delete').hide();
            $('#sc_sub_shift_display a.edit').hide();
	    $('#sc_sub_shift_display a.publish').hide();
		$('#sc_sub_shift_display a.trade').hide();
        } else {
	    if (this.shift.published == 0){
		$('#sc_sub_shift_display a.publish').show();
		$('#sc_sub_shift_display a.publish span').html('<img width="16" height="17" src="images/approve.png">');
	    } else if (this.shift.published < this.shift.edited && this.shift.published != 0) {
		$('#sc_sub_shift_display a.publish').show();
		$('#sc_sub_shift_display a.publish span').html();
	    } else {
		$('#sc_sub_shift_display a.publish').hide();
	    }
	    if (sp.staff.admin.settings.draft == 0){
		$('#sc_sub_shift_display a.publish').hide();
	    }
	    $('#sc_sub_shift_display a.delete').show();
            $('#sc_sub_shift_display a.edit').show();
        }
	$('#sc_sub_shift_display a.publish').attr('first','true');
    }
    var e = [];
    if (typeof this.shift.employees != 'undefined' && this.shift.employees != null){
        $.each(this.shift.employees, function(i, item){
            e[i] = item;
            e[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png';
        });
        this.shift.employees = e;
    } else {
        this.shift.employees = [];
    }
	this.shift.user_location=this.getLocation();
    $('#sc_shift_display').html($.tmpl($('#te_sc_shift_display'), this.shift));
    
    
    this.resetPublishFields(true);
    
	if( (this.shift.trades != null && this.shift.trades != '') || (sp.staff.admin.settings.trade_shifts != '1' && sp.staff.admin.business.pref_swap_shifts != '1' ) ){
		$('#sc_sub_shift_display a.trade').hide();
	}else{
		$.each(this.shift.employees, function(i,j){
			if(j.id == sp.staff.admin.info.id){
				$('#sc_sub_shift_display a.trade').show();
			}		
		});	
	}
	
    $('#sc_sub_shift_display ul a').attr('rel', this.shift.id);
    
    if (this.shift.location != 0){
        $('#sc_location_iframe').html('<iframe  id="map" width="100%" height="220" frameborder="0" scrolling="no" src="http://' + googleIp + '/maps/?f=d&source=s_d&saddr=' + this.shift.location.address + '&hl=en&z=15&output=embed"></iframe>');
    }
}

ShiftPlanningSchedule.prototype.resetPublishFields = function(f){
    if (typeof f == 'undefined'){
	f = false;
    }
    
    if (f){
        $('#te_sc_shift_display_publish').hide();
        $('#te_sc_shift_display_info').show();
    }
    
    $('#te_sc_shift_display_publish .radio').removeClass('check');
    $('#te_sc_shift_display_publish .checkbox').removeClass('check');
    $('#te_sc_shift_display_publish .radio[value=1]').addClass('check');
    $('#tc_sc_shift_display_publish_textarea').hide();
    $('#tc_sc_shift_display_publish_textarea textarea').val('');
    $('#sc_sub_shift_display ul a.publish').attr('first', 'true');
}

ShiftPlanningSchedule.prototype.addShiftSubEvents = function(){
    var self = this;
    $('#sc_add_user').hide();
    $('#sc_add_sc').html(spView.schedulerFilter(0, true));
    $('#sc_add_lo').html(spView.locationSelector());
    $('#sc_add_add').removeClass('loading');
    var emp = {};
    if (this.edit != false){
        emp = this.shift;
        emp.start_date.formatted = Date.parse(emp.start_date.formatted + ' ' + emp.start_time.time).getTime()/1000;
        emp.end_date.formatted = Date.parse(emp.end_date.formatted + ' ' + emp.end_time.time).getTime()/1000;
        if (emp.schedule != null) $('#sc_add_sc').val(emp.schedule);
        if (emp.schedule != null) $('#sc_add_sc').val(emp.schedule);
    } else {
        emp.start_date = {};
        emp.end_date = {};
        emp.start_date.formatted = Date.parse('today at 9am').getTime()/1000;
        emp.end_date.formatted = Date.parse('today at 5pm').getTime()/1000;
    }
    
    var s = new Date(emp.start_date.formatted*1000);
    var e = new Date(emp.end_date.formatted*1000);
    
    var tf = (cal.tmode == 24)? 'HH:mm' : 'hh:mm tt';
    
    $('#sc_date_st').scroller('destroy');
    $('#sc_date_st').val(s.toString(tf));
    $("#sc_date_st").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    
    
    $('#sc_date_et').scroller('destroy');
    $('#sc_date_et').val(e.toString(tf));
    $("#sc_date_et").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    
    $('#sc_date_sd').scroller('destroy');
    $('#sc_date_sd').val(s.toString(cal.dformat));
    $('#sc_date_sd').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    $('#sc_date_ed').scroller('destroy');
    $('#sc_date_ed').val(e.toString(cal.dformat));
    $('#sc_date_ed').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    
    $('#sc_add_no').val((this.edit) ? emp.notes : '');
    $('#sc_add_ti').val((this.edit) ? emp.title : '');
    $('#sc_add_lo').val((this.edit) ? (emp.location != 0) ? emp.location.id : 0 : 0);
    
    if (this.edit){
        $('#sc_add_add span').html(_s('Save Shift'));
        $('#sc_edit_id').val(emp.id);
        $('#sc_edit_submenu .backMenu').attr('bck', 'edit');
        if (emp.confirmed == 0 && emp.end_date.id < sp.raw.config.today.id && sp.staff.admin.settings.shift_confirm == 1){
            $('#sc_edit_submenu .subNav').show();
        } else {
            $('#sc_edit_submenu .subNav').hide();
        }
    } else {
        $('#sc_edit_submenu .subNav').hide();
        $('#sc_edit_submenu .backMenu').attr('bck', 'add');
        $('#sc_add_add span').html(_s('Add Shift And Set Users'));
    }
    //prepare users
    if (this.edit){
        $('#sc_add_user .working ul').html((emp.staff.scheduled == null) ? spView.emptyResult(_s('No scheduled employees for selected shift'), 'li') : $.tmpl($('#te_sc_usersW'), this.prepareStaff(emp.staff.scheduled)));
        delete emp.staff.scheduled;
        
        $.each(emp.staff, function(i, item){
            if ( item == null || item.length == 0 ){
                $('#sc_add_user div[type=' + i + ']').hide();
            } else {
                $('#sc_add_user div[type=' + i + '] ul.detailsGrid li ul').html($.tmpl($('#te_sc_users'), self.prepareStaff(item)));
				$('#sc_add_user div[type=' + i + ']').show();
            }
        });		
        $.each($('#sc_add_user .detailsGrid ul'), function(i, item){
            $.each($(item).find('li'), function(iV2, itemV2){
                if (iV2 % 2 == 0){
                    $(this).addClass('even');
                } else {
                    $(this).addClass('odd');
                }
            });
        });
        $('#sc_add_user').show();
    }

    this.edit = false;
}

ShiftPlanningSchedule.prototype.getLocation = function(){
	var loc = [];
	var fields = ['city','state','address'];
	if( sp.staff.admin.info.city ||  sp.staff.admin.info.state || sp.staff.admin.info.address ){
		$.each(fields,function(i,f){
			if ( sp.staff.admin.info[f] != '' ){
				loc.push(sp.staff.admin.info[f])
			}
		});
		return loc.join(',');
	}else{
		return null;
	}
}

ShiftPlanningSchedule.prototype.prepareStaff = function(staff){
    var l = staff.length;
    var res = [];
    while (l--){
        res.push(sp.staff.data.employees[staff[l][0]]);
    }
    return res;
}

ShiftPlanningSchedule.prototype.nextPrevPrepare = function(type){
    var self = this;
    $('#sc_mo_di').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).toString('MMMM yyyy'));
    if (this.page == 'today'){
        $('.subNavigation .schedule li a[subpage=day]').trigger(clickEvent);
    } else if (this.page == 'day'){
        this.displayShifts();
    } else if (this.page == 'month'){
        var i = parseInt($('#sc_ca_bo .today').attr('time'));
        // get 
        var cD = $.trim($('#sc_mo_di').html());
        
        var sD = Date.parse(cD).moveToFirstDayOfMonth().getDate();

        //end of month
        var eD = Date.parse(cD).moveToLastDayOfMonth().getDate();
        if (type == 'prev'){
            if (i == 1){
                self.displayShifts(eD);
            } else {
                i--; 
                $('#sc_ca_fi_' + i).trigger(clickEvent)
            }
        } else {
            i++;
            if ($('#sc_ca_fi_' + i).length == 0){
                self.displayShifts(1);
            } else {
                $('#sc_ca_fi_' + i).trigger(clickEvent)
            }
        }
    }
}

ShiftPlanningSchedule.prototype.displayShifts = function(sDay){
    var self = this;
    if (this.page == 'month'){
        this.generateCalendar();
    }
    $('#sc_td_list').hide();
    $('#sc_td .loading').show();
    $('#sc_td .additional').hide();
    $('#sc_ca_bo').parent().addClass('loading');
    $('#schedule').show();
    $('.subNavigation .schedule').show();    
    var data = this.getSettings();
    
    spModel.schedule.get('shifts', data, function(response){
        $('#sc_ca_bo').parent().removeClass('loading');
        if (response.data.length > 0){
            response.data = self.cleanPerms(response.data);
            if (self.page == 'month'){
                self.fillCalendar(response.data);
                $('#sc_td_list').html($.tmpl($('#te_sc_shifts_months'), self.shifts));
                if (typeof sDay != 'undefined'){
                    $('#sc_ca_fi_' + sDay).trigger(clickEvent);
                }
            } else {
                $('#sc_td_list').html('<ul class="shifts moved"></ul>');
                $('#sc_td_list ul').html($.tmpl($('#te_sc_shifts_new'), response.data));
            }
            $('#sc_td_list').show();
            $('#sc_td .loading').hide();
            $('#sc_td_list .dTitle  span').each(function(){
                var o = $(this).find('t:last');
                if ($(o).html() != null){
                    $(o).html($(o).html().substr(0,($(o).html().length -2 )));
                }
            });
        } else {
            if (self.page == 'month') {
                if (typeof sDay != 'undefined') {
                    $('#sc_ca_fi_' + sDay).trigger(clickEvent);
                }
            }
            $('#sc_td_list').hide();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').show();
        }
        $('#sc_td_list .isShift > p').each(function() {
            $(this).html($(this).html().substring(0, $(this).html().length - 1));
        });
    });
}

ShiftPlanningSchedule.prototype.cleanPerms = function(data){
    var self = this;
    $.each(data, function(i, item){
	data[i] = self.cleanPerm(item);
    });
    
    return data;
}

ShiftPlanningSchedule.prototype.cleanPerm = function(data){
    if (data.employees != null){
	if (data.perms < 2 && sp.staff.admin.settings.visible_coworkers == 0){
	    var e = [];
	    $.each(data.employees, function(i, item){
		if (item.id == sp.staff.admin.info.id){
		    e.push(item);
		}
	    });
	    data.employees = e;
	}
    }
    
    return data;
}

ShiftPlanningSchedule.prototype.clearSchedules = function(){
    var schedules = {};
    $.each(sp.schedule.data.schedules, function(i, item){
	if (spView.checkPerm(item, true)){
	    schedules[i +''] = item;
	}
    });
    
    return schedules;
}

ShiftPlanningSchedule.prototype.checkSchedulePerm = function(scheduleID) {
    if (typeof sp.schedule.data.schedules[scheduleID] == 'undefined') {
	return 0;
    } else {
	return sp.schedule.data.schedules[scheduleID].perms;
    }
}

ShiftPlanningSchedule.prototype.fillCalendar = function(data) {
    var res = {};
    $.each(data, function(i, item){
        if (typeof res[item.start_date.day + ''] == 'undefined') {
            res[item.start_date.day + ''] = {
                dateToday : item.start_date.formatted,
                shifts : []
            };
        }
        res[item.start_date.day+ ''].shifts.push(item);
    });
    $('#sc_ca_bo td').removeClass('hasAny');
    
    var fin = []
    $.each(res, function(i, item){
        fin[i] = item;
        $('#sc_ca_fi_' + i).addClass('hasAny');
    });
    
    
    
    this.shifts = fin;
}

ShiftPlanningSchedule.prototype.getColorsBySchedule = function(id, color_id){
    if (typeof sp.schedule.data.schedules[id] != 'undefined') {
        if (typeof color_id != 'undefined'){
            return sp.raw.config.newcolorsets[sp.schedule.data.schedules[id].color][color_id];
        } else {
            return sp.raw.config.newcolorsets[sp.schedule.data.schedules[id].color];
        }
    } else {
        return ['000', 'aaa', 'fff', 'fff', '000'];
    }
}

ShiftPlanningSchedule.prototype.getSettings = function(){
    if (this.page != 'month'){
        this.settings.start_date = Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).toString(cal.dformat);
        this.settings.end_date = Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).toString(cal.dformat);
    } else {
        this.settings.start_date = Date.parse($.trim($('#sc_mo_di').html())).moveToFirstDayOfMonth().toString(cal.dformat);
        this.settings.end_date = Date.parse($.trim($('#sc_mo_di').html())).moveToLastDayOfMonth().toString(cal.dformat);
    }
    
    return this.settings;
}

ShiftPlanningSchedule.prototype.setSettings = function(){
    $('#sc_start_day').val(this.settings.start_date);
    $('#sc_end_day').val(this.settings.end_day);
    $('#sc_mode').val(this.settings.end_day);
    $('#sc_schedule').val(this.settings.end_day);
}

ShiftPlanningSchedule.prototype.generateCalendar = function(){
    var month = '';
    
    
    //now attach selection
    $('#sc_ca_he').html(this.generateTop());
    $('#sc_ca_bo').html(this.generateMiddle());
}




ShiftPlanningSchedule.prototype.generateTop = function(){
    var b = cal.startday - 1;
    var res = '';
    if (b>0){
        for (var i = b; i<7; i++){
            res += '<th>' + daysOfWeekS[i] + '</th>';
        }
        for (var i = 0; i<b; i++){
            res += '<th>' + daysOfWeekS[i] + '</th>';
        }
    } else {
        for (var i = 0; i<7; i++){
            res += '<th>' + daysOfWeekS[i] + '</th>';
        }
    }
    
    return res;
}

ShiftPlanningSchedule.prototype.generateMiddle = function(currentDate){
    //definig rows
    var rows;
    
    //define days from old month
    var bm;
    
    //define current day full date
    var cD = (typeof currentDate == 'undefined') ? $.trim($('#sc_mo_di').html()) : currentDate;
    
    //
    
    //start of month
    var s = Date.parse(cD).moveToFirstDayOfMonth().getDate();
    
    //end of month
    var e = Date.parse(cD).moveToLastDayOfMonth().getDate();
    
    //position from which we start calendar
    var startPosition = Date.parse(cD).moveToFirstDayOfMonth().getDay() - (cal.startday - 1);
    
    //how much days had last month
    var lM = Date.parse($.trim($('#sc_to_sub').html())).addMonths(-1).moveToLastDayOfMonth().getDate();
    
    //calculate how much days to display from old month
    if (startPosition >= 0){
        bm = startPosition;
    } else {
        bm = 7 + startPosition;
    }
   
    
    //calculate last month
    var startDayLastMonth = (lM - bm) + 1;
    
    //number of displayed days in this month;
    
    var res = '';
    
    var daysArray = new Array();
    
    for (var i = startDayLastMonth; i <= lM; i++){
        daysArray.push('<td class="notM">' + i + '</td>');
    }
    
    for (var i = s; i <= e; i++){
        daysArray.push('<td id="sc_ca_fi_' + i + '" time="' + i + '">' + i + '</td>');
    }
    
    var cp = 7 - (daysArray.length % 7);
    
    for (var i = 1; i<= cp; i++){
        daysArray.push('<td class="notM">' + i + '</td>');
    }
    
    for (var c = 0; c < daysArray.length / 7; c++){
        res += '<tr>' + daysArray.slice(c * 7, (c+1) * 7).join('') + '</tr>';
    }
    //class "today" is for selecting today
    return res;
}


ShiftPlanningSchedule.prototype.loadPage = function(){

    
    var addButton = false;
    $.each(this.data.schedules, function( i, item ) {
        if ( item.perms == 2 ) {
            addButton = true;
            return true;
        }
    });
    
    if (!addButton) {
        $('#sc_add').parent().hide();
    }
    
    this.generateCalendar();
}


 function ShiftPlanningSettings (){
	this.initialize();
}


 ShiftPlanningSettings.prototype.initialize = function(){
	var self= this ;
	$(document).ready(function(){
		self.overviewEvents();
	})
}
ShiftPlanningSettings.prototype.loadSubPageEvents = function(subpage){
	var self = this ;
	//self.overviewSubEvents();
	    if(subpage == 'recentShifts' || subpage == 'upcomingShifts'){
			this.displayShifts(sp.staff.data.employees[$('#da_se_cur_us_id').val()],subpage);
		}else{
			this[subpage + 'SubEvents']();
		}
}
ShiftPlanningSettings.prototype.loadPage = function(){
    
}
ShiftPlanningSettings.prototype.overviewEvents = function(){
    var self = this;
    
    $('#da_se_ed_cu').delegate('.checkbox', clickEvent, function(){
        var obj = this;
        var checked = ($(this).hasClass('check')) ? true : false;
           if (checked) {
		$(obj).removeClass('check');
	    } else {
		$(obj).addClass('check');
	    }
    });
    
    $('#da_se_ed_po, #da_se_ov_po, #da_se_ed_sk, #da_se_ov_sk').delegate('.checkbox', clickEvent, function(){
	var sid = $(this).attr('itemId');
	var skills = ($(this).parents('.skills').length > 0) ? true : false;
	var checked = ($(this).hasClass('check')) ? true : false;
	var obj = this;
	$(obj).parent().addClass('loading');
	var data = {
	    id : $('#da_se_cur_us_id').val()
	}
	if (skills){
	    if (checked) {
		data.removeskill = sid;
	    } else {
		data.addskill = sid;
	    }
	} else {
	    if (checked) {
		data.removeschedule = sid;
	    } else {
		data.addschedule = sid;
	    }
	}
	spModel.staff.update('employee', data, function(response){
	    if (checked) {
		$(obj).removeClass('check');
	    } else {
		$(obj).addClass('check');
	    }
	    $(obj).parent().removeClass('loading');
	    self.updateUser($('#da_se_cur_us_id').val(), response, false);
	});
    });
    
    $('#da_se_ed_ue').bind(clickEvent, function(e){
	$(this).addClass('loading');
	e.preventDefault();
	self.saveEditForm($(this));
    });
    
    $('textarea#da_se_ov_no, textarea#da_se_ed_no').bind('blur', function(){
	self.updateNotes($(this).val());
    });
    
    $('#da_se_pa_up').bind(clickEvent, function(e){
	e.preventDefault();
	self.changePassword();
    });
    
    $('#da_se_ov_aa a').bind(clickEvent, function(e){
	e.preventDefault();
	var c = confirm(_s('Are you sure?'));
	if (c){
	    self.adminActions(this);
	}
    });
    $('#da_se_rs_li').delegate('.fr',clickEvent,function(e){
	e.preventDefault()
	switch($('#menu .mainNav .active').attr('id')){
	    case 'menu_staff':
		sp.schedule.fromStaff =true;
		break;
	    case 'menu_dashboard':
		sp.schedule.fromStaff =false;
	}
	spModel.schedule.get('shift', {
	    id : $(this).attr('shiftId'), 
	    detailed : 1
	}, function(response){
	    sp.schedule.fromRecent = true ;
	    sp.schedule.shift = response.data;
	    sp.loadSubPage('', 'schedule', 'shiftDisplay');
	});

    })
    $('#da_se_us_li').delegate('.fr',clickEvent,function(e){
	e.preventDefault()
	switch($('#menu .mainNav .active').attr('id')){
	    case 'menu_staff':
		sp.schedule.fromStaff =true;
		break;
	    case 'menu_dashboard':
		sp.schedule.fromStaff =false;
	}
	spModel.schedule.get('shift', {
	    id : $(this).attr('shiftId'), 
	    detailed : 1
	}, function(response){
			sp.schedule.fromUpcoming = true ;
			sp.schedule.shift = response.data;
			sp.loadSubPage('', 'schedule', 'shiftDisplay');
		});
    });
	$('.settings .backMenu').bind(clickEvent, function(e){
		e.preventDefault();
		sp.hashChange = false;
		sp.loadPage('staff');
		$('.subNavigation').show();
	});	
	$('#settings .mainSub.settings .subNav').delegate('a', clickEvent, function(e){
		e.preventDefault();
		var subpage = $(this).attr('subpage');
		var id = $('#da_se_cur_us_id').val();
		if(subpage == 'overview'){
			self.overviewSubEvents(sp.staff.data.employees[id]);
		}else{
			self.loadSubPageEvents(subpage);			
		}
		$('#settings .mainSub.settings .subNav li').removeClass('active');
		$('#settings .mainSub.settings .subNav a[subpage='+subpage+']').parent().addClass('active');
		$('#settings .main').hide();
		$('#settings .main.'+subpage).show();
		$('#settings .mainSub.settings').show();
        sp.fixCheckboxes();
	});	
}
ShiftPlanningSettings.prototype.overviewSubEvents = function(employee){
    var self = this;

    if (typeof employee == 'undefined'){
	employee = sp.staff.admin.info;
    }
    
    if (employee.id == sp.staff.admin.info.id){
	$('#settings .search').show();
	if (!sp.permissions.hasPermission('edit_profile')){
	    $('#settings .subNav a[subpage=edit]').hide();
	} else {
	    $('#settings .subNav a[subpage=edit]').show();
	}
    } else {
	if (sp.staff.admin.info.group > 4){
	    $('#settings .search').hide();
	} else {
	    $('#settings .subNav a[subpage=edit]').show();
	    $('#settings .search').show();
	}
        if ( sp.staff.admin.info.group >= 4 ) {
            $('.settings .subNav .hideEm').hide();
        }
    }
    
    if (employee.group <= 2){
	$('#da_se_ov_aa .button').hide();
    } else {
	$('#da_se_ov_aa .button').show();
    }
    
    
    
    if (sp.staff.admin.info.group > 3){
	$('#da_se_ov_wa').parent().hide();
    } else {
	$('#da_se_ov_wa').parent().show();
    }

    
    
    //prefill
    self.prefillOverview(employee);
    self.prepareEditDetails(employee);
    self.preparePasswordField(employee);
    
    $('#settings .search.settings.mainSub ').hide();
    
    sp.fixCheckboxes();
}
ShiftPlanningSettings.prototype.editSubEvents = function(){
	//console.log('EDITsubevents');
}
ShiftPlanningSettings.prototype.upcomingShiftsSubEvents = function(){
	//console.log('Upcomingsubevents');
}
ShiftPlanningSettings.prototype.recentShiftsSubEvents = function(){
	//console.log('RECENTsubevents');
}
ShiftPlanningSettings.prototype.passwordSubEvents = function(){
	//console.log('PASORDsubevents');
}
ShiftPlanningSettings.prototype.prefillOverview = function(employee){
    var p = {};
    
    $.each(employee, function(i, item){
	if (item == null || item.length == 0){
	    item = '&nbsp;';
	}
	p[i] = item;
    });
    
    employee = p;
    //this page needs to be cached after first load and to be reprepared if data are changed - DONE
    $('#da_se_cur_us_id').val(employee.id);
    
    $('#da_se_ov_fn').html(employee.name);
    $('#da_se_ov_id').html(employee.eid);
    $('#da_se_ov_un').html(employee.username);
    $('#da_se_ov_mo').html(employee.cell_phone);
    $('#da_se_ov_ho').html(employee.home_phone);
    $('#da_se_ov_em').html(employee.email);
    if ($.trim(employee.wage).length != 0){
	$('#da_se_ov_wa').html(spView.fixCurrency(sp.staff.admin.settings.currency, true) + employee.wage);
    }
    
    var status_name = _s('Administrative accounts cannot be de-activated.');
    var status = _s('User has actived his/her account.');
    
    if (parseInt(employee.status) == 1 && parseInt(employee.group) > 2){
	status_name = _s('User Account is Enabled.');
    } else if (parseInt(employee.status) == 0 && parseInt(employee.group) > 2){
	status_name = _s('User Account is Enabled.');
	status = _s('User account is not activated.');
    }
    
    if (sp.staff.admin.info.group > 3){
	$('#da_se_ov_aa').hide();
	$('#da_se_ov_aa').prev().hide();
    } else {
	$('#da_se_ov_aa').prev().show();
	$('#da_se_ov_aa').show();
    }
    if (employee.status == 0){
	$('#da_se_ov_aa a[type=activate]').show();
	$('#da_se_ov_aa a[type=manualyActivate]').show();
    } else {
	$('#da_se_ov_aa a[type=activate]').hide();
	$('#da_se_ov_aa a[type=manualyActivate]').hide();
    }
    $('#da_se_ov_st').html(status);
    $('#da_se_ov_ac').html(status_name);
    
    //transfer month number into month name
    if (employee.birth_month != 0 && employee.birth_day != 0) {
	$('#da_se_ov_bd').html(months[employee.birth_month-1] + ' ' + employee.birth_day);
    } else {
	$('#da_se_ov_bd').html('&nbsp;');
    }
        
    

    $('#da_se_ov_cu').html(spView.customFields(employee));
    $('#da_se_ov_po').html(spView.editableSchedules(employee));

    $('#da_se_ov_sk').html(spView.editableSkills(employee));
    $('#da_se_ov_no').html((employee.notes.length > 0) ? employee.notes : '');
    $('#da_se_ov_pos').html('');
    if (typeof employee.schedules != 'undefined'){
	var pos = '';
	$.each(employee.schedules, function(i, item){
	    pos += item + ', ';
	});
	$('#da_se_ov_pos').html(pos.substr(0,pos.length - 2));
    }
//approvers missing
}
ShiftPlanningSettings.prototype.prepareEditDetails = function(employee){
    var p = {};
    $.each(employee, function(i, item){
	if (item == null || item.length == 0){
	    item = '';
	}
	p[i] = item;
    });
    
    employee = p;
    this.listLanguages();
    //this page needs to be cached after first load and to be reprepared if data are changed
    $('#da_se_ed_na').val(employee.name);
    $('#da_se_ed_em').val(employee.email);
    $('#da_se_ed_nn').val(employee.nick_name);
    $('#da_se_ed_us').val(employee.username);
    //mobile phone
    var mphone = (employee.cell_phone == null) ? '---'.split('-') : employee.cell_phone.split('-');
    $('#da_se_ed_mph_0').val(mphone[0]);
    $('#da_se_ed_mph_1').val(mphone[1]);
    $('#da_se_ed_mph_2').val(mphone[2]);
    //home phone
    var hphone = (employee.home_phone == null) ? '---'.split('-') : employee.home_phone.split('-');
    $('#da_se_ed_hph_0').val(hphone[0]);
    $('#da_se_ed_hph_1').val(hphone[1]);
    $('#da_se_ed_hph_2').val(hphone[2]);
    
    $('#da_se_ed_ad').val(employee.address);
    $('#da_se_ed_ci').val(employee.city);
    $('#da_se_ed_sp').val(employee.state);
    $('#da_se_ed_pz').val(employee.zip);
    
    $('#da_se_ed_bday_m').val(employee.birth_month);
    $('#da_se_ed_bday_d').val(employee.birth_day);
    $('#da_se_ed_no').val(employee.notes);
    
    //custome fields have to create divs
    $('#da_se_ed_cu').html(spView.editableCustomFields(employee));
    
    $('#da_se_ed_po').html(spView.editableSchedules(employee));
    $('#da_se_ed_sk').html(spView.editableSkills(employee));
    $('#da_se_ed_no').html((employee.notes != null && employee.notes.length > 0) ? employee.notes : '');
    
    $('#da_se_ed_lang').val(employee.language);
    
}
ShiftPlanningSettings.prototype.listLanguages = function (){
    var result='<option  value="none">' + _s('Company default') + '</option>'
    $.each(sp.raw.config.languages,function(key,value){
	result+='<option value="'+value['code']+'">'+value['name']+' ' + ((value.machine == 1) ? '(machine)' : '') + '</option>'
    });
    $('#da_se_ed_lang').html(result);
}
ShiftPlanningSettings.prototype.preparePasswordField = function(){
    $('#da_se_pa_np').val('');
    $('#da_se_pa_cp').val('');
}
ShiftPlanningSettings.prototype.displayShifts = function (employee,from){
    var element;
    var notify;
	var desc=false;
    switch (from){
	case 'recentShifts':
	    $('#da_se_rs_li').html(spView.ulLoader());
	    var params={
		start_date: 'today -2 months', 
		end_date: 'yesterday', 
		mode: 'employee', 
		employees: employee.id
	    }
		desc = true ;
	    element=$('#da_se_rs_li');
	    notify='No recent shifts'
	    break;
	case 'upcomingShifts':
	    $('#da_se_us_li').html(spView.ulLoader());
	    var params={
		start_date: 'today ', 
		end_date: 'today +2 months', 
		mode: 'employee', 
		employees: employee.id
	    }
	    element=$('#da_se_us_li');
	    notify='No upcoming shifts'
	    break;
    }
    spModel.schedule.get('shifts',params,function(response){
	if(response.data == ""){
	    $(element).html(spView.emptyResult(notify))   
	}else{
		if(desc){
		desc = false ;
		var data =[];
		var j =response.data.length-1;
		for(var count=0;count<response.data.length;count++){
			data.push(response.data[j--]);
			}
			$(element).html($.tmpl($('#te_da_se_rs'),data));
		}else{
			$(element).html($.tmpl($('#te_da_se_rs'),response.data));   
		}
	}
    }) 
  
}
ShiftPlanningSettings.prototype.updateUser = function(id, res, over){
    if (typeof over == 'undefined'){
	over = true;
    }
    
    if (id == sp.staff.admin.info.id){
	sp.staff.admin.info = res.data;
    }
    sp.staff.data.employees['' + id] = res.data;
    
    if (over){
	this.overviewSubEvents(sp.staff.data.employees['' + id]);
    }
    
    if(sp.hash() == 'staff'){
		$('#pages #settings .mainSub.settings').show();
	}
    
    sp.showSuccess(_s('Selected user updated.'));
}
ShiftPlanningSettings.prototype.updateNotes = function(text){
    if (sp.hasPermission(4) || parseInt($('#da_se_cur_us_id').val()) == sp.staff.admin.info.id){
	var self = this;
	var eId = $('#da_se_cur_us_id').val();
	spModel.staff.update('employee', {
	    id : eId, 
	    notes : text
	}, function(response){
	    self.updateUser(eId, response);
	});
    }
}
ShiftPlanningSettings.prototype.saveEditForm = function(obj){
    //missing wage
    //missing location, mininum weekly hours, maximum weekly hours, auto approve shift requests
    // mising calendar size
    //privacy settings
    var eId = $('#da_se_cur_us_id').val();
    var self = this;
    var data = {};
    var employee = spModel.staff.getEmployeeById($('#da_se_cur_us_id').val());
   
    data.id = eId;
    data.name = $('#da_se_ed_na').val();
    data.email = $('#da_se_ed_em').val();
    
    if ($('#da_se_ed_nn').val().length > 0){
	data.nick_name = $('#da_se_ed_nn').val();
    }
    
    if ($('#da_se_ed_us').val().length > 3){
	data.username = $('#da_se_ed_us').val();
    }
    
    if ($('#da_se_ed_ad').val().length > 0){
	data.address = $('#da_se_ed_ad').val();
    }
    
    if ($('#da_se_ed_ci').val().length > 0){
	data.city = $('#da_se_ed_ci').val();
    }

    if ($('#da_se_ed_sp').val().length > 0){
	data.state = $('#da_se_ed_sp').val();
    }
    if ($('#da_se_ed_pz').val().length > 0){
	data.zip = $('#da_se_ed_pz').val();
    }
    
    data.language= ($('#da_se_ed_lang').val() == 'none') ? '' : $('#da_se_ed_lang').val();//adding lanuage to staff details
    
    data.birth_day = $('#da_se_ed_bday_d').val();
    data.birth_month = $('#da_se_ed_bday_m').val();
    
    if ($('#da_se_ed_mph_0').val().length > 0 && $('#da_se_ed_mph_1').val().length > 0 && $('#da_se_ed_mph_2').val().length > 0){
	data.cell_phone = $('#da_se_ed_mph_0').val() + '-' + $('#da_se_ed_mph_1').val() + '-' + $('#da_se_ed_mph_2').val();
    }
    
    if ($('#da_se_ed_hph_0').val().length > 0 && $('#da_se_ed_hph_1').val().length > 0 && $('#da_se_ed_hph_2').val().length > 0){
	data.home_phone = $('#da_se_ed_hph_0').val() + '-' + $('#da_se_ed_hph_1').val() + '-' + $('#da_se_ed_hph_2').val();
    }
    
    var customFields = {};   
    var value="";
    $('#da_se_ed_cu li [item="edit"]').each(function(i,field) {
        
        value = $(field).val();
        
        if (value.lenght == 0){
            value = "";
        }
        
        if ($(field).hasClass('checkbox check')){    
            value = 1;
            }
        
        else if ($(field).hasClass('checkbox')){
            value = 0;
            }
 
        customFields[$(field).attr('id')] = value;
    });

    customFields = JSON.stringify(customFields);
    data.custom = customFields;
    
    spModel.staff.update('employee', data, function(response){
	if (employee.id == sp.staff.admin.info.id && employee.language != response.data.language){
	    setCookie('shiftplanning_mobile_lang', response.data.language, cookieExpire);
	    window.location.reload();
	}
	obj.removeClass('loading');
	self.updateUser(eId, response);
    }, function(){
	obj.removeClass('loading');
    });
}
ShiftPlanningSettings.prototype.changePassword = function (){
    var self = this;
    var eId = $('#da_se_cur_us_id').val();
    if ($('#da_se_pa_np').val().length >= 6 && $('#da_se_pa_np').val() == $('#da_se_pa_cp').val()){
	spModel.staff.update('employee', {
	    id : eId, 
	    password: $('#da_se_pa_np').val()
	}, function(response){
	    self.updateUser(eId, response);
	});
    } else {
	//add other error type
	sp.showError(_s('Password length must 6 or more chars and passwords must match.'));
    }
}
ShiftPlanningSettings.prototype.adminActions = function(obj){
    var eId = $('#da_se_cur_us_id').val();
    var type = $(obj).attr('type');
    var method = 'update';
    var data = {
        id : eId
    }
    if (type == 'deactivate'){
        data.status = -1
    } else if (type == 'delete'){
        method = 'delete'
    } else if (type == 'activate'){
        data.send_activation = 1;
    } else {
        data.status = 1;
    }
    sp.api('staff.employee',method,data,function(response){
        sp.staff.getStaff(function(){
            if (type == 'deactivate'){
                sp.showSuccess(_s('User deactivated!'));
                $('.search.settings.mainSub .backMenu').trigger(clickEvent);
            } else if (type == 'delete'){
                sp.showSuccess(_s('User deleted!'));
                $('.search.settings.mainSub .backMenu').trigger(clickEvent);
            } else if (type == 'activate'){
                sp.showSuccess(_s('Activation successfully sent.'));
                $(obj).hide();
            } else {
                sp.showSuccess(_s('Employee activated successfully.'));
                $('#da_se_ov_aa a[type=activate]').hide();
                $(obj).hide();
                $('#da_se_ov_st').html(_s('User Account is Enabled.'));
            }
        });
    }, function(response){
        sp.showError(response.error);
    });
}

 function ShiftPlanningShift(){
    this.initialize();

    return true;
}

ShiftPlanningShift.prototype = {
    initialize: function(){
        
    }
    
}





 function ShiftPlanningStaff(){
    this.changed = true;
    this.page = 6;
    this.initialize();
    return true;
}

ShiftPlanningStaff.prototype = {
    data: {},
    raw: {},
    fixed : {},
    admin: {},
    initialize: function(){
        
    },
    login: function(username, password){

    },
    loadPage : function(){
        
    }
    
}





 ShiftPlanningStaff.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        if (user.loggedIn == 1){
            self.prepareConfig();
        }
        $('#lo_b').bind(clickEvent, function(){
            self.login(); 
        });
	
	$('#lo_f .checkbox').bind(clickEvent, function(){
	    $(this).toggleClass('check');
	});
        
        self.listEvents();
        self.addStaffEvents();
        self.fastAssignmentEvents();
        
    });
}


ShiftPlanningStaff.prototype.loadSubPageEvents = function(subpage){
    $('#st_tp_menu').hide();
    this[subpage + 'SubEvents']();
}

ShiftPlanningStaff.prototype.listEvents = function(){
    var self = this;
    $('#st_sn_ga').bind(clickEvent, function(){
        if ($(this).hasClass('active')){
            return false;
        }
        $('#st_sn_ga').addClass('active');
        $('#st_sn_li').removeClass('active');
        $('#st_li_ga').removeClass('small').addClass('big');
    });
    
    $('#st_sn_li').bind(clickEvent, function(e){
        if ($(this).hasClass('active')){
            return false;
        }
        $('#st_sn_li').addClass('active');
        $('#st_sn_ga').removeClass('active');
        $('#st_li_ga').removeClass('big').addClass('small');
    });
    
    $('#st_li_se_b').bind(clickEvent, function(e){
        e.preventDefault();
        var s = $('#st_li_se_te').val();
        if (s.length == 0 || s == 'Search...'){
            $('#st_li_ga li').show();
            $('#st_li_ga').show();
            $('#st_li .noResults').hide();
        } else {
            $('#st_li_ga li').hide();
            $('#st_li_ga').show();
            $('#st_li .noResults').hide();
            $('#st_li_ga li').find('span:Contains("'+s+'")').parents('li').show();
            if ($('#st_li_ga li').find('span:Contains("'+s+'")').parents('li').length == 0){
                $('#st_li .noResults').show();
                $('#st_li_ga').hide();
            }
        }
    });
    
    $('#st_li_se_te').bind('keyup', function(e) {
        $('#st_li_se_b').trigger(clickEvent);
    })
    $('#st_li_ga').delegate('li', clickEvent, function(){
        var id = $(this).attr('staffId');
        if (sp.permissions.hasPermission('visible_staff_details')){
            window.scrollTo( 0, 1 );
            self.displayEmployee(id);
        }
    });
}

ShiftPlanningStaff.prototype.addStaffEvents = function(){
    var self = this;
    $('#st_ae_sa').bind(clickEvent, function(){
        $(this).toggleClass('check');
    });
    
    $('#st_ae_ce_b').bind(clickEvent, function(e){
        e.preventDefault();
        self.createEmployee($(this));
    });
}

ShiftPlanningStaff.prototype.fastAssignmentEvents = function(){
    var self = this;
    $('#st_fa_el').bind('change', function(){
        self.loadFastAssignment($(this).val());
    });
    
    $('#st_fa ul.detailsGrid ul').delegate('.checkbox', clickEvent, function(e){
        var sid = $(this).attr('itemId');
        var skills = ($(this).parents('.skills').length > 0) ? true : false;
        var checked = ($(this).hasClass('check')) ? true : false;
        var obj = this;
	$(obj).parent().addClass('loading');
        var data = {
            id : $('#st_fa_cu').val()
        }
        if (skills){
            if (checked) {
                data.removeskill = sid;
            } else {
                data.addskill = sid;
            }
        } else {
            if (checked) {
                data.removeschedule = sid;
            } else {
                data.addschedule = sid;
            }
        }
        spModel.staff.update('employee', data, function(response){
            if (checked) {
                $(obj).removeClass('check');
            } else {
                $(obj).addClass('check');
            }
	    $(obj).parent().removeClass('loading');
            sp.settings.updateUser($('#st_fa_cu').val(), response, false);
        });
    });
}

ShiftPlanningStaff.prototype.listSubEvents = function(){
    $('#st_tp_menu').show();
    $('#st_li_ga').html($.tmpl($('#te_st_list'), spModel.staff.allStaff()));
    $('#st_li_ga li').show();
    $('#st_li_se_te').val('').trigger('blur');
}

ShiftPlanningStaff.prototype.addStaffSubEvents = function(){
    this.resetAddEmployee();
}

ShiftPlanningStaff.prototype.fastAssignmentSubEvents = function(){
    $('#st_fa_el').html(spView.staffOption());
    $('#st_fa_po').hide();
    $('#st_fa_sk').hide();
}

//Functions
ShiftPlanningStaff.prototype.displayEmployee = function(id){
	sp.hashChange = false;
	sp.hash('staff/details');
	
    $('#st_tp_menu').hide();
    $('#pages > div').hide();
    $('#pages #settings .main').hide();
    $('#pages #settings .mainSub').hide();
    $('#pages #settings').show();
    $('#da_se_overview').show();
    sp.settings.overviewSubEvents(spModel.staff.getEmployeeById(id));
    $('#settings .mainSub.settings .subNav li:first a').trigger(clickEvent);
    $('.subNavigation').hide();	
    $('#pages #settings .mainSub.settings').show();
}


//Get all fast assignment info.
ShiftPlanningStaff.prototype.loadFastAssignment = function(id){
    var employee = spModel.staff.getEmployeeById(id);
    $('#st_fa_cu').val(id);
    $('#st_fa_po ul.detailsGrid ul').html(spView.editableSchedules(employee));
    $('#st_fa_sk ul.detailsGrid ul').html(spView.editableSkills(employee));
    
    $('#st_fa_po').show();
    $('#st_fa_sk').show();
    sp.fixCheckboxes();
}

ShiftPlanningStaff.prototype.createEmployee = function(c){
    $(c).addClass('loading');
    var self = this;
    var data = {};
    data.name = $('#st_ae_i_n').val();
    //if ($.trim($('#st_ae_i_nn').val()).length > 0){
        data.nick_name = $('#st_ae_i_nn').val();
    //}
    //if ($.trim($('#st_ae_i_e').val()).length > 0){
        data.email = $('#st_ae_i_e').val();
    //}
    
    //if ($.trim($('#st_ae_i_eid').val()).length > 0){
        data.eid = $('#st_ae_i_eid').val();
    //}
    
    //if ($.trim($('#st_ae_i_eid').val()).length > 0){
        data.username = $('#st_ae_i_un').val();
    //}
    
    //if ($.trim($('#st_ae_i_hw').val()).length > 0){
        data.wage = $('#st_ae_i_hw').val();
    //}
    
    //if ($.trim($('#st_ae_i_no').val()).length > 0){
        data.notes = $('#st_ae_i_no').val();
    //}
    
    if ($('#st_ae_sa').hasClass('check')){
        data.send_activation = 1;
    }
    
    spModel.staff.create('employee', data, function(response){
        $(c).removeClass('loading');
        spModel.staff.addEmployee(response.data);
        self.displayEmployee(response.data.id);
        sp.showSuccess(_s('Employee successfully created!'));
    }, function(){
        $(c).removeClass('loading');
    });
}


ShiftPlanningStaff.prototype.resetAddEmployee = function(){
    $('#st_ae_i_n').val('');
    $('#st_ae_i_nn').val('');
    $('#st_ae_i_e').val('');
    $('#st_ae_i_eid').val('');
    $('#st_ae_i_un').val('');
    $('#st_ae_i_hw').val('');
    $('#st_ae_i_no').val('');
    $('#st_ae_sa').removeClass('check');
}

//Rest
ShiftPlanningStaff.prototype.login = function(){
    var u = $('#lo_u').val();
    var p = $('#lo_p').val();
    var self = this;
    $('#lo_b').addClass('loading');
    sp.api('staff.login', 'GET', {
        username: u, 
        password: p
    }, function(loginResponse){
        sp.staff.admin.info = loginResponse.data.employee;
	if (loginResponse.data.employee.language == null){
	    loginResponse.data.employee.language = loginResponse.data.business.language;
	}
	setCookie('shiftplanning_mobile_lang', loginResponse.data.employee.language, cookieExpire);
	if (loginResponse.data.employee.language != 'en_US'){
	    window.location.reload();
	}
        var calls = [
        ['staff.employees','GET', {}],
        ['schedule.schedules','GET', {
            'perms':1
        }],
        ['admin.settings', 'GET', {}],
        ['staff.skills', 'GET', {}],
        ['location.locations', 'GET', {}]
        ]
        sp.multiApi(calls, function(response){
            sp.api('api.config', 'GET', {}, function(config){
                    sp.api('admin.business', 'GET', {},function(business){
                            //was hitting the 5 request limit for multi api so we needed to send a separate call
                            $('.loginContainer').fadeOut(500, function(){
                                    $('#lo_b').removeClass('loading');
                                    user.loggedIn = 1;
                                    user.name = loginResponse.data.employee.name;
                                    user.company = loginResponse.data.business.name;
                                    user.phone = loginResponse.data.business.phone;
                                    sp.staff.raw.employees = response[0].data;
                                    sp.staff.data.employees = sp.map(response[0].data);
                                    sp.schedule.raw.schedules = response[1].data;
                                    sp.schedule.data.schedules = sp.map(response[1].data);
                                    sp.staff.admin.settings = response[2].data;
                                    sp.staff.raw.skills = response[3].data;
                                    sp.staff.data.skills = sp.map(response[3].data);
                                    sp.staff.raw.locations = response[4].data;
                                    sp.staff.data.locations = sp.map(response[4].data);
                                    sp.staff.admin.info.dfAvatar = sp.getAvatar(sp.staff.admin.info.id);
                                    sp.raw.config = config.data;
                                    sp.schedule.dateId = sp.raw.config.today.id;
                                    sp.staff.admin.business = business.data;
                                    $('body').removeClass('login');
                                    $('.notification').remove();
                                    $('html').css('height','auto');
                                    sp.hash('dashboard');
                                    self.prepareConfig();
                                    sp.permissions.preparePermissions();
                                    spRanges.fixRanges();
                                    sp.staff.fixed.employees = sp.permissions.fixStaffListing();
                                    sp.raw.config.today.formatted = Date.parse(sp.raw.config.today.formatted).toString(cal.dformat);
                                    if ($('#lo_f .checkbox').hasClass('check')){
                                        setCookie('shiftplanning_mobile_rememberme', 1, cookieExpire);
                                        setCookie('shiftplanning_mobile_usertoken', loginResponse.token, cookieExpire);
                                        setCookie('shiftplanning_mobile_userid', loginResponse.data.employee.id, cookieExpire);
                                        setCookie('shiftplanning_mobile_username', user.name, cookieExpire);
                                        setCookie('shiftplanning_mobile_usercompany', user.company, cookieExpire);
                                        setCookie('shiftplanning_mobile_userphone', user.phone, cookieExpire);
                                    }
                            });
                    });
            });
        });

    }, function(response){
        $('#lo_b').removeClass('loading');
        $('.login .error').html(response.error);
        $('.login .error').slideDown(500);
        $('.login input:first').focus();
        
    });
}


ShiftPlanningStaff.prototype.logout = function(){
    var c = confirm(_s('Are you sure you want to logout?'));
    if (!c){
		var h = $('#menu .mainNav .active').attr('id').split('_');
		sp.hash(h[1]);		
        return false;
    }
    sp.api('staff.logout', 'GET', {}, function(response){
	setCookie('shiftplanning_mobile_rememberme', 0, cookieExpire);
        window.location.reload();
    }, function(response){
        sp.showError(response.error);
    });
}


ShiftPlanningStaff.prototype.prepareConfig = function(){
    var currency = {
        1: '$',
        2: '&#163;',
        3: '&#8364;',
        4: '&#8360;',
        5: '&#165;',
        6: '&#8361;',
        7: 'R',
        8: 'kr',
        9: '&#8369;',
        10: 'RM'
    }
    var tmpDate = new Date();
    var def = {
        month: tmpDate.getMonth(), 
        year: tmpDate.getFullYear(), 
        day: tmpDate.getDate()
    };
    cal = {
        startday: sp.staff.admin.settings.startday,
        currency: currency[sp.staff.admin.settings.currency],
        tmode: (sp.staff.admin.settings['24hr'] == "1"? 24 : 12),
        tstring: (parseInt(sp.staff.admin.settings['24hr']) == 1) ? 'HH:mm' : 'h:mm tt',
        dformat: sp.strReplace(['M','d', 'm', 'Y', 'j'], ['MMM', 'dd', 'MM', 'yyyy', 'd'], sp.staff.admin.settings.date),
        dpformat: sp.strReplace(['d', 'm', 'Y', 'M', 'j'], ['dd', 'mm', 'yy', 'M', 'd'], sp.staff.admin.settings.date),
        user: sp.staff.admin.info.id,
        view: 'week',
        mode: 'overview',
        schedule: '',
        lastlength: 8,
        focus: 'employee',
        today: tmpDate.getMonth()+'/'+tmpDate.getDate()+'/'+tmpDate.getFullYear(),
        month: def.month,
        year: def.year,
        day: def.day,
        firstday: '',
        lastday: '' ,
        cache: {},
        lastcall: '',
        firsttime: 0,
        height: 960,
        timeline: {},
        shifts: {},
        schedules: {},
        locations: {},
        skills: {},
        employees: {},
        total: {},
        conflicts: {},
        locked: 0
    };    
}


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
            start_time : strtotime('now -1 day'),
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

 ShiftPlanningTimeClock.prototype.initialize = function(){
	var self = this;
	$(document).ready(function(){
		self.overviewEvents();
		self.addClockTimeEvents();
		self.manageTimeSheetsEvents();
		self.displayTimeSheetsEvents();
	});
}

ShiftPlanningTimeClock.prototype.loadSubPageEvents = function(subpage){
	$('.subNavigation').show();
	if (subpage == 'displayTimeClock'){
		$('.subNavigation').hide();
	}
	this[subpage + 'SubEvents']();
}

ShiftPlanningTimeClock.prototype.overviewEvents = function(){
	var self = this;
	$('#tc_ov_ci').bind(clickEvent, function(e){
		e.preventDefault();
		var data = {};
		var done = false;
		var apiCall = function(){
			spModel.timeclock.get('clockin', data, function(response){
				$('#tc_ov_cb span.fr a').hide();
				$('#tc_ov_way_msg').hide();
				$('#tc_ov_cf').show();
				$('#tc_ov_co').show();
				$('#tc_ov_ca').attr('rel', response.data.id);
				$('#tc_ov_no').val('');
				$('#tc_ov_ss').val(0);
			});
		}
		var errorCallback = function(){
			done = true;
			sp.showError(_s('Coordinates not available'));
			setTimeout(apiCall, 2000);
		}
		
		if (sp.staff.admin.business.pref_tc_gps == '1' && navigator.geolocation){
			
			setTimeout(function(){
				if(!done){
					errorCallback();
				}
			},10000);
			
			sp.showSuccess(_s('Getting Coordinates'));
			
			navigator.geolocation.getCurrentPosition(
				//success
				function(response){
					if(typeof response != 'function'){
						done = true;
						data.latitude = response.coords.latitude;
						data.longitude = response.coords.longitude;
						setTimeout(apiCall,2000);
					}
				},
				//errorCallback
				errorCallback
				);
			
		}else{
			apiCall();
		}
        
	});
	
	$('#tc_ov_way').bind(clickEvent, function(e){
		e.preventDefault();
		
		var data = {
			employee : sp.staff.admin.info.id
		};
		
		spModel.timeclock.create('preclockin', data, function(response){
			$('#tc_ov_way_msg .sc_way_time_since').html(response.data.formatted);
			$('#tc_ov_way_msg').show();
			$('#tc_ov_way').hide();
			$('#tc_ov_ci').show();
		});
	});
	
	$('#tc_ov_co').bind(clickEvent, function(e){
		e.preventDefault();
		var data = {}
		var notes = $.trim($('#tc_ov_no').val());
		if ($('#tc_ov_ss').val() != 0){
			data.schedule = $('#tc_ov_ss').val();
		}
		var done = false;
		var apiCall = function(){
			spModel.timeclock.get('clockout', data, function(response){
				$('#tc_ov_cb span.fr a').hide();
				$('#tc_ov_cf').hide();
				
				if(sp.staff.admin.business.pref_pre_time_clock == '1'){
					$('#tc_ov_way').show();
					$('#tc_ov_ci').show();
				}
				if(sp.staff.admin.business.pref_mandatory_pre_time_clock == '1'){
					$('#tc_ov_way').show();
					$('#tc_ov_ci').hide();
				}
			});		
		};
		var errorCallback = function(){
			done = true;
			sp.showError(_s('Coordinates not available'));
			setTimeout(function(){
				apiCall();				
			}, 2000);
		}
		if(sp.staff.admin.business.pref_tc_require_pos && $('#tc_ov_ss').val() == 0){
			sp.showError(_s('Please choose schedule first'));
			return false;
		}

		if (notes.length != 0 ){
			data.notes = $('#tc_ov_no').val();
		}
	
		if(sp.staff.admin.business.pref_tc_require_notes && notes.length == 0){
			sp.showError(_s('Please provide some notes'));
			return false;
		}
	
		if (sp.staff.admin.business.pref_tc_gps == '1' && navigator.geolocation){
			setTimeout(function(){
				if(!done){
					errorCallback();
				}
			},10000);

			sp.showSuccess(_s('Getting Coordinates'));		
		
			navigator.geolocation.getCurrentPosition(
				//success
				function(response){
					if(typeof response != 'function'){
						done = true;
						data.latitude = response.coords.latitude;
						data.longitude = response.coords.longitude;
						setTimeout(apiCall,2000);					
					}
				},
				errorCallback
				);
		
		} else {
			apiCall()
		}

	});
	
	$('#tc_ov_ss').bind('change', function(){
		self.saveClockInChanges();
	});
    
	//    $('#tc_ov_no').bind('blur', function(){
	//        self.saveClockInChanges();
	//    });
    
	$('#tc_ov_sa').bind(clickEvent, function(e){
		e.preventDefault();
		self.saveClockInChanges();
	});
    
	$('#tc_ov_ca').bind(clickEvent, function(e){
		e.preventDefault();
		spModel.timeclock.dtc($(this).attr('rel'), function(){
			$('#tc_ov_cb span.fr a').hide();
			$('#tc_ov_cf').hide();
			
			if(sp.staff.admin.business.pref_pre_time_clock == '1'){
				$('#tc_ov_way').show();
				$('#tc_ov_ci').show();
			}
			if(sp.staff.admin.business.pref_mandatory_pre_time_clock == '1'){
				$('#tc_ov_way').show();
				$('#tc_ov_ci').hide();
			}
		});
	})
}

ShiftPlanningTimeClock.prototype.manageTimeSheetsEvents = function(){
	var self = this;
	$('#tc_mts_adv').bind(clickEvent, function(e){
		e.preventDefault();
		if ($('#tc_mts_hiin').hasClass('hidden')){
			$(this).html('Simple');
		} else {
			$(this).html('Advanced');
		}
		$('#tc_mts_hiin').toggleClass('hidden');
	});
    
	$('#tc_mts_tr').bind('change', function(){
		if ($(this).val() != '-1'){
			self.getTimeSheets();
		}
	});
    
	$('#tc_mts_sh').delegate('li', clickEvent, function(e){
		if (e.target.className != 'tPending'){
			$(this).addClass('loading');
			spModel.timeclock.get('timeclock', {
				id : $(this).attr('timeclockId')
			}, function(response){
				self.current = response.data;
				sp.loadSubPage('', 'timeClock', 'displayTimeClock');
			});
		}
	});
    
	$('#timeClock .displayTimeClock .backMenu').bind(clickEvent, function(e){
		e.preventDefault();
		$('.subNavigation .timeClock li.active a').trigger(clickEvent);
	});
    
	$('#tc_mts_hiin select, #tc_mts_au').bind('change', function(){
		self.showHideTimeSheets();
	});
    
	$('#tc_dtc_buttons a').bind(clickEvent, function(e){
		e.preventDefault();
		var id = $(this).attr('rel');
		switch ($(this).attr('class')){
			case 'approve':
				spModel.timeclock.update('timeclock', {
					id : id, 
					approved : 1
				}, function(){
					sp.showSuccess(_s('Timeclock updated'));
					$('.subNavigation .timeClock li.active a').trigger(clickEvent);
				});
				break;
			case 'unapprove':
				spModel.timeclock.update('timeclock', {
					id : id, 
					approved : 0
				}, function(){
					sp.showSuccess(_s('Timeclock updated'));
					$('.subNavigation .timeClock li.active a').trigger(clickEvent);
				});
				break;
			case 'edit':
				self.edit = true;
				$('#tc_act_onci').hide();
				sp.loadSubPage('', 'timeClock', 'addClockTime');
				break;
			case 'delete':
				var c = confirm(_s('Are you sure?'));
				if (c){
					spModel.timeclock.del('timeclock', {
						id : id
					}, function(){
						$('.subNavigation .timeClock li.active a').trigger(clickEvent);
					});
				}
				break;
		}
	});
    
	$('#tc_mts_sh').delegate('li span.tPending', clickEvent, function(e){
		$(this).parent('li').addClass('loading');
		spModel.timeclock.get('clockout', {
			employee : $(this).attr('user')
		}, function(){
			sp.showSuccess(_s('User clocked out'));
			self.getTimeSheets();
		});
	});
}

ShiftPlanningTimeClock.prototype.addClockTimeEvents = function(){
	var self = this;
	$('#tc_act_onci').bind(clickEvent, function(){
		$(this).toggleClass('check');
		$('#tc_act .detailsGrid .odd').toggleClass('nonVisible');
	});
    
	$('#tc_act_sa_b').bind(clickEvent, function(e){
		e.preventDefault();
		self.saveClockTime(false);
	});
}

ShiftPlanningTimeClock.prototype.displayTimeSheetsEvents = function(){
	var self=this;
	$('#tc_dts_au').bind('change',function(){
		self.showHideTimeSheetsPro();
	})
	$('#tc_dts_tr').bind('change',function(){
		if($(this).val() != '-1'){
			self.getMyTimeSheets();
		}
	})
}

ShiftPlanningTimeClock.prototype.displayTimeSheetsSubEvents = function (){
	var self=this;
	$('#tc_dts_tr').html(spView.timeRanges());
	$('#tc_dts_tr').val(3);
	this.getMyTimeSheets();
//    spModel.timeclock.get('timeclocks',{},function(response){
//        $('#tc_dts_ul').html($.tmpl($('#te_tc_dts_li'), response.data));
//        
//    })
}

ShiftPlanningTimeClock.prototype.overviewSubEvents = function(){
	$('#tc_ov_cf').hide();
	$('#tc_ov_cb span.fr a').hide();
	$('#tc_ov_ss').html(spView.optionSchedules(sp.staff.admin.info.id));
	$('#tc_ov_cb .icoClock').html('<time style="height:35px;display:block;">' + sp.raw.config.today.formatted + '</time>');
    
	$.ajax({
		url: 'index.php?timezone=false&id=' + sp.staff.admin.info.id,
		type: 'get',
		success: function(response){
			$('#tc_ov_cb .icoClock').html(response);
		}
	});
    
    
    
	if (parseInt(sp.staff.admin.settings.tc_terminal_lock) == 0){
		$('#tc_ov_cb').show();
		$('#tc_ov_ad').hide();
		spModel.timeclock.get('status', {
			details : 1
		}, function(response){
			$('#tc_ov_cb span.fr a').hide();
			if (response.data != 'out'){
				$('#tc_ov_cf').show();
				$('#tc_ov_co').show();
				$('#tc_ov_ca').attr('rel', response.data.id);
				if (response.data.schedule != null){
					$('#tc_ov_ss').val(response.data.schedule.id)
				}
				if (response.data.notes != null){
					$('#tc_ov_no').val(response.data.notes);
				}
			} else {
				$('#tc_ov_cf').hide();
				
				var data = {
					employee : sp.staff.admin.info.id
				};
				spModel.timeclock.get('preclockin', data, function(response){
					if(response.data.status == '0'){
						$('#tc_ov_way_msg .sc_way_time_since').html(response.data.formatted);
						$('#tc_ov_way_msg').show();
						$('#tc_ov_ci').show();
					}
					else{
						if(sp.staff.admin.business.pref_pre_time_clock == '1'){
							$('#tc_ov_way').show();
							$('#tc_ov_ci').show();
						}
						if(sp.staff.admin.business.pref_mandatory_pre_time_clock == '1'){
							$('#tc_ov_way').show();
							$('#tc_ov_ci').hide();
						}
					}
				});
			}
		});
	} else {
		$('#tc_ov_cb').hide();
		$('#tc_ov_cf').hide();
		$('#tc_ov_ad').show();
	}
    

    
	$('#tc_ov_cb .icoClock time').html(sp.raw.config.today.formatted);
	$('#tc_ov_cb .icoClock span').html(formatted('nowT'));
}

ShiftPlanningTimeClock.prototype.manageTimeSheetsSubEvents = function(){
	var self = this;
	var s = Date.parse('today at 9am');
	var e = Date.parse('today at 5pm');
    
	var tf = (cal.tmode == 24)? 'HH:mm' : 'hh:mm tt';
    
	$('#tc_mts_sd_i').scroller('destroy');
	$('#tc_mts_sd_i').val(s.toString(cal.dformat));
	$('#tc_mts_sd_i').scroller({
		preset : 'date',
		dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
		dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
		onSelect : function(){
			$('#tc_mts_tr').val(-1);
			self.getTimeSheets();
		}
	});
    
	$('#tc_mts_ed_i').scroller('destroy');
	$('#tc_mts_ed_i').val(e.toString(cal.dformat));
	$('#tc_mts_ed_i').scroller({
		preset : 'date',
		dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
		dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
		onSelect : function(){
			$('#tc_mts_tr').val(-1);
			self.getTimeSheets();
		}
	});
    
    
	$('#tc_mts_tr').html(spView.timeRanges());
	$('#tc_mts_tr').val(3);
    
    
	$('#tc_mts_scl').html(spView.scheduleFilter(0, true));
	$('#tc_mts_eml').html(spView.staffFilter());
	self.getTimeSheets();
}

ShiftPlanningTimeClock.prototype.addClockTimeSubEvents = function(){
	var emp = {};
	if (this.edit != false){
		emp = this.current;
		$('#tc_act .title h3').html(_s('Edit Clock Time'));
		$('#tc_act_tc_id').removeClass('editOn').addClass('editOn');
		$('#tc_act_tc_id').val(emp.id);
		$('.addClockTime .odd').removeClass('nonVisible');
		$('#tc_act_onci').removeClass('check');
		emp.in_time.time = sp.strReplace(['am','pm'],[' AM',' PM'],emp.in_time.time);
		emp.out_time.time = sp.strReplace(['am','pm'],[' AM',' PM'],emp.out_time.time);
		emp.in_time.day = Date.parse(emp.in_time.day).toString(cal.dformat);
		emp.out_time.day = Date.parse(emp.out_time.day).toString(cal.dformat);
	} else {
		$('#tc_act .title h3').html(_s('Add Clock Time'));
		$('#tc_act_tc_id').removeClass('editOn');
		$('#tc_act_onci').show();
		emp.in_timestamp = Date.parse('today at 9am').getTime()/1000;
		emp.out_timestamp = Date.parse('today at 5pm').getTime()/1000;
	}
    
	$('#tc_act_sc').html(spView.optionSchedules(sp.staff.admin.info.group > 4 ? sp.staff.admin.info.id : 0));
	$('#tc_act_em').html(spView.staffOption(sp.staff.admin.info.group > 4 ? true : false));
    
	var s = new Date(emp.in_timestamp*1000);
	var e = new Date(emp.out_timestamp*1000);
    
	var tf = (cal.tmode == 24)? 'HH:mm' : 'hh:mm tt';
    
	$('#tc_act_tclin').scroller('destroy');
	$('#tc_act_tclin').val((this.edit) ? emp.in_time.time : s.toString(tf));
	$("#tc_act_tclin").scroller({
		preset : 'time',
		ampm: (cal.tmode==24?false:true),
		stepMinute: 15,
		timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
	});
    

    
	//$('#tc_act_c_co_dp_i').val(outD.toString(cal.dformat));
    
	$('#tc_act_tclou').scroller('destroy');
	$('#tc_act_tclou').val((this.edit) ? emp.out_time.time : e.toString(tf));
	$("#tc_act_tclou").scroller({
		preset : 'time',
		ampm: (cal.tmode==24?false:true),
		stepMinute: 15,
		timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
	});
    
	$('#tc_act_c_cl_dp_i').scroller('destroy');
	$('#tc_act_c_cl_dp_i').val((this.edit) ? emp.in_time.day : s.toString(cal.dformat));
	$('#tc_act_c_cl_dp_i').scroller({
		preset : 'date',
		dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
		dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
	});
    
	$('#tc_act_c_co_dp_i').scroller('destroy');
	$('#tc_act_c_co_dp_i').val((this.edit) ? emp.out_time.day : e.toString(cal.dformat));
	$('#tc_act_c_co_dp_i').scroller({
		preset : 'date',
		dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
		dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
	});
    
    
	$('#tc_act_no').val((this.edit) ? emp.notes : '');
	$('#tc_act_em').val((this.edit) ? emp.employee.id : 0);
	$('#tc_act_sc').val((this.edit) ? (emp.schedule != null) ? emp.schedule.id : 0 : 0);
    
	this.edit = false;
}

ShiftPlanningTimeClock.prototype.displayTimeClockSubEvents = function(){
	this.current.employee.avatar = sp.getAvatar(this.current.employee.id);
	$('#tc_dtc').html($.tmpl($('#te_tc_dtc'), this.current));
	$('#tc_dtc_buttons a').attr('rel', this.current.id);
    
	if (parseInt(this.current.approved_by) != 0){
		$('#tc_dtc_buttons a#tc_dtc_ap').removeClass('approve').removeClass('unapprove').addClass('unapprove');
	} else {
		$('#tc_dtc_buttons a#tc_dtc_ap').removeClass('approve').removeClass('unapprove').addClass('approve');
	}
}















// Functions
ShiftPlanningTimeClock.prototype.getTimeSheets = function(){
	$('#tc_mts_sh').html(spView.divLoader());
	var self = this;
	var d = {};
    
	var period = $('#tc_mts_tr').val();
	var times = {};
	if (period != "-1"){
		times = spRanges.getRange('times', period);
	} else {
		times = {
			start_time : Date.parse($('#tc_mts_sd_i').val()).getTime(),
			end_time : Date.parse($('#tc_mts_ed_i').val()).getTime()
		}
	}
	
	var p = new Date(times.start_time);
	var e = new Date(times.end_time);
	$('#tc_mts_sd_i').val(p.toString(cal.dformat));
	$('#tc_mts_ed_i').val(e.toString(cal.dformat));
    
	d.start_date = p.toString(cal.dformat);
	d.end_date = e.toString(cal.dformat);

	spModel.timeclock.get('timeclocks', d, function(response){
		self.renderManageTimeSheets(response.data); 
	});
}

ShiftPlanningTimeClock.prototype.getMyTimeSheets = function(){
	$('#tc_dts_ul').html(spView.ulLoader());
	var self=this;
	var interval=$('#tc_dts_tr').val();
	var times={}
	var params={}
  
	times=spRanges.getRange('times', interval);
    
	var startT = new Date(times.start_time);
	var endT = new Date(times.end_time);
    
	params.start_date=startT.toString(cal.dformat);
	params.end_date=endT.toString(cal.dformat);
	params.employee=sp.staff.admin.info.id;
    
	spModel.timeclock.get('timeclocks',params,function(response){
		$('#tc_dts_ul').html($.tmpl($('#te_tc_dts_li'), response.data));
		self.showHideTimeSheetsPro();
	} 
	)
}
ShiftPlanningTimeClock.prototype.renderManageTimeSheets = function(data){
	var l = data.length;
	var res = {};
	while (l--){
		var item = data[l];
		var ident = (Date.parse(item.in_time.day).getTime()/1000) + '';
		if (typeof res[ident] == 'undefined'){
			res[ident] = {
				month : item.in_time.day,
				rest : [],
				ident : parseInt(ident)
			}
		}
		var obj = this.rItem(item);
		res[ident].rest.push(obj); 
	}
    
	$.each(res, function(i, item){
		res[i].rest.reverse();
	});
	var r = [];
	var counter = 0;
	$.each(res, function(i, item){
		r[counter] = item;
		counter++;
	});
	r.objSort('ident');
	r.reverse();
    
    
    
	$('#tc_mts_sh').html('');
	$('#tc_mts_sh').html($.tmpl($('#te_tc_mts_li'), r));
    
	this.showHideTimeSheets();
}

ShiftPlanningTimeClock.prototype.rItem = function(item){
	var o = {};
	var status = 2;
	if (parseInt(item.approved_by) > 0){
		status = 1;
	}
	var dl = (item.in_location == item.out_location) ? '0' : '1';
	var sc = (item.schedule != null && typeof item.schedule.id != 'undefined') ? item.schedule.id : item.schedule;
	var scn = (item.schedule != null && typeof item.schedule.name != 'undefined') ? item.schedule.name : '';
	o = {
		id : item.id,
		name : item.employee.name,    
		user : item.employee.id,
		st : item.in_time,
		out : item.out_time,
		dl : dl,
		length : item.length,
		schedule : sc,
		scn : scn,
		status : status,
		approved_by : item.approved_by
	};
    
	return o;
}

ShiftPlanningTimeClock.prototype.showHideTimeSheetsPro = function (){
	var sel=$('#tc_dts_au').val();
	switch(sel){
		case '2':
			$('#tc_dts_ul li').hide();
			$('#tc_dts_ul').find('li.app_0').show();
			break;
		case '1':
			$('#tc_dts_ul li').show();
			$('#tc_dts_ul').find('li.app_0').hide();
			break;
		case '0':
			$('#tc_dts_ul li').show();
			break;
	}
	var elm=$('#tc_dts_ul li:visible')
	if(elm.length == 0){
		$('#tc_dts_ul_msg').html(spView.emptyResult('No timesheets for selected filters'))  
	}else{
		$('#tc_dts_ul_msg').html('')
	}
}

ShiftPlanningTimeClock.prototype.showHideTimeSheets = function(){
	//$('#tc_mts_slist tr').removeClass('odd');
	var s = parseInt($('#tc_mts_au').val());
	var e = parseInt($('#tc_mts_eml').val());
	var sc = parseInt($('#tc_mts_scl').val());
	var search = '';
	if (s != 0){
		search += '.s_' + s;
	}
    
	if (e != 0){
		search += '.e_' + e;
	}
    
	if (sc != 0){
		search += '.sc_' + sc;
	}
    
	$('#tc_mts_sh').find('li').hide();
	$('#tc_mts_sh').find('li'+search).show();
    
	$('#tc_mts_sh div.title').hide();
	$('#tc_mts_sh ul li:visible').parents('.timeSheet').prev().show();
    
	if ($('#tc_mts_sh ul li:visible').length > 0){
		$('#tc_mts_sh').next().hide();
	} else {
		$('#tc_mts_sh').next().show();
	}
    
//    $('#tc_mts_slist tr').each(function(i, item){
//        if (i % 2 == 0){
//            $(this).addClass('odd');
//        }
//    })
}

ShiftPlanningTimeClock.prototype.saveClockInChanges = function(){
	var data = {
		id : $('#tc_ov_ca').attr('rel')
	}
    
	if ($('#tc_ov_ss').val() != 0){
		data.schedule = $('#tc_ov_ss').val();
	}
    
	if ($('#tc_ov_no').val() != 0){
		data.notes = $('#tc_ov_no').val();
	}
    
	spModel.timeclock.update('timeclock', data, function(){
		sp.showSuccess(_s('Timeclock updated'));
	});
}

ShiftPlanningTimeClock.prototype.saveClockTime = function(){
	var data = {};
	var f = 'get';
	var module = 'timeclock.addclocktime';
	var success = _s('Clock Time added');
	if ($('#tc_act_tc_id').hasClass('editOn') == true){
		f = 'update';
		module = 'timeclock.timeclock'
		data.id = $('#tc_act_tc_id').val();
		success = _s('Clock time edited');
		data.start_date = $('#tc_act_c_cl_dp_i').val() +' '+ $('#tc_act_tclin').val();
		data.start_time = $('#tc_act_c_cl_dp_i').val() +' '+ $('#tc_act_tclin').val();  
		data.end_date = $('#tc_act_c_co_dp_i').val() + ' ' + $('#tc_act_tclou').val();
		data.end_time = $('#tc_act_c_co_dp_i').val() + ' ' + $('#tc_act_tclou').val();
	} else {
		data.datein = $('#tc_act_c_cl_dp_i').val() +' '+ $('#tc_act_tclin').val();    
		data.dateout = $('#tc_act_c_co_dp_i').val() + ' ' + $('#tc_act_tclou').val();		
	}
    
	data.schedule = $('#tc_act_sc').val();
	data.employee = $('#tc_act_em').val();
    	
	if ( $('#tc_act_onci').hasClass('check') ) {
		data.onlyin = 1;
	}
    
	data.notes = $('#tc_act_no').val();
    
	sp.api(module, f, data, function(response){
		sp.showSuccess(success);
		setTimeout(function() {
			var subpage = 'displayTimeSheets'
			if(sp.staff.admin.info.group <=2){
				subpage = 'manageTimeSheets';
			}
			$('.subNavigation div.timeClock ul.timeClock a[subpage='+subpage+']').trigger(clickEvent);
		},400);        
	}, function(response){
		sp.showError(response.error);
	});
}


ShiftPlanningTimeClock.prototype.loadPage = function(){
    
	}


 function ShiftPlanningTraining (){
	this.initialize();
	this.tmp_module = 0 ;
	this.tmp_section = 0 ;
	this.top = 0;
	this.scrollWindow = false ;
	this.trainings = {} ;
	this.statistic = [] ;
}

 ShiftPlanningTraining.prototype.initialize = function(){
	var self= this ;
	$(document).ready(function(){
		self.overviewEvents();
	})
}
ShiftPlanningTraining.prototype.loadSubPageEvents = function(subpage){
	    this[subpage + 'SubEvents']();
}
ShiftPlanningTraining.prototype.overviewEvents = function(){
		var self = this ;
		$('#training .training .filters li a').bind(clickEvent,function(e){
			e.preventDefault();
			e.stopPropagation();
			var subpage = $(this).attr('subpage');
			$('#training .training .filters li').removeClass('active');
			$(this).parent().addClass('active');
			sp.loadSubPage('','training', subpage);
		});
		$('#training .training_sections').delegate('div[rel]',clickEvent,function(e){
			sp.training.tmp_section = $(this).attr('rel');
			sp.loadSubPage('', 'training', 'singleSection');
		});
		$('#training .training_singleSection').delegate('div[rel]',clickEvent,function(e){
			sp.training.tmp_module = $(this).attr('rel');
			sp.loadSubPage('', 'training', 'singleModule');
		});
		$('.training_module').delegate('a.confirm',clickEvent,function(e){
		var module_id = $(this).attr('rel');
		spModel.training.update('complete', {id:module_id},function(response){
			sp.showSuccess('Finished');
			setTimeout(function(){
					$('.singleSection .backMenu').trigger(clickEvent)
				},2500);			
			});
		});
		$('.training_module').delegate('a#tr_send_signature',clickEvent, function(){
			var module_id = $(this).attr('rel');
			var signature = $('#digi_text').val();
			$(this).addClass('loading');
			var self = $(this);
			spModel.training.update('complete', {id:module_id,signature:signature},function(response){
			sp.showSuccess(response.data);
			if(response.data === 'Signed'){
				setTimeout(function(){
						$('.singleSection .backMenu').trigger(clickEvent)
					},2500);			
				}else{
					self.removeClass('loading');
				}
			});
		});
		$('.training_module').delegate('#show_all',clickEvent,function(){
			$('.training_module div[sign=sign]').show();
			$('#show_all').parent().remove();
		})
		$('.singleSection .backMenu').bind(clickEvent,function(e){
			e.preventDefault();
			e.stopPropagation();
			$('.subNavigation .training li.active a').trigger(clickEvent);			
		});
		$('.singleModule .backMenu').bind(clickEvent,function(e){
			e.preventDefault();
			e.stopPropagation();
			sp.loadSubPage('', 'training', 'singleSection');
		});
		$('.topicstatistic .backMenu').bind(clickEvent,function(e){
			e.preventDefault();
			e.stopPropagation();
			sp.loadSubPage('', 'training', 'singleModule');
		});
		$('.singleModule .subMenu .topic_stat').bind(clickEvent,function(e){
			e.preventDefault();
			e.stopPropagation();
			sp.loadSubPage('', 'training', 'topicstatistic');
		});
		$('.singleModule').delegate('#tr_send_comment',clickEvent,function(e){
			e.preventDefault();
			e.stopPropagation();
			var text=$.trim($('#tr_comment').val());			
			if(text.length > 0){
				$(this).addClass('loading');
				spModel.training.update('comments', {module_id:sp.training.tmp_module,text:text,type:1}, function(reponse){
					sp.showSuccess('Comment added');
					setTimeout(function(){
							$('.singleModule .backMenu').trigger(clickEvent)
						},2500);
				});
			}else{
				sp.showError('Empty comment');
			}
		})
}
ShiftPlanningTraining.prototype.overviewSubEvents = function(){
	$('.subNavigation').show();
	$('.training').show();
	if(sp.staff.admin.info.group <= 2){
		$('.training  a[subpage=statistic]').parent().removeClass('hidden');
	}
}
ShiftPlanningTraining.prototype.sectionsSubEvents = function (){
	$('.subNavigation').show();
	$('.training').show();
	if(sp.staff.admin.info.group <= 2){
		$('.training  a[subpage=statistic]').parent().removeClass('hidden');
		$('.training .singleModule .subMenu').removeClass('hidden');		
	}else{
		//$('.trainingBar').css('margin','0 60px 0 0 ');
	}
	$('.training_sections').html(spView.ulLoader());
	var s=[];
	var m=[];
	spModel.training.get('progress', {}, function(response){
		if(typeof response.data[sp.staff.admin.info.id] != 'undefined'){
			var percent = Math.round((response.data[sp.staff.admin.info.id].completed/response.data[sp.staff.admin.info.id].total)*100);
			$('#user_progress').html(percent);
			$('.progress').css('width',percent+'%');
		}
		sp.training.statistic = response.data;
		spModel.training.get('sections', {}, function(response){
			s = response.data;		
			spModel.training.get('modules', {detailed:1}, function(response){
				m = response.data;
				var data = [];
				for (var i=0;i<s.length;i++){
					var mod=[];
					s[i].notfinished_count = 0 ;
					for(var j=0;j<m.length;j++){
						if(s[i].id == m[j].section){
							if(m[j].comment_type != 2){
							mod.push(m[j]);
							}
							if(typeof m[j].employees != 'undefined' && typeof m[j].employees[sp.staff.admin.info.id] != 'undefined'){
								m[j].finished_flag = m[j].employees[sp.staff.admin.info.id].finished ? '1' : '0' ;
								if(m[j].finished_flag == '0'){s[i].notfinished_count ++ ;}
								if(typeof m[j].employees[sp.staff.admin.info.id].outdated != 'undefined'){
									m[j].finished_flag = '99' ;
									s[i].notfinished_count ++ ;
								}						
							}
						}
					}
					s[i].modules=mod;
					if(s[i].modules.length > 0){
						data.push(s[i]);
						sp.training.trainings[s[i].id]=s[i];
					}					
				}
				$('.training_sections').html($.tmpl($('#te_tr_sections'),data));
				$('.training div.oneLine b').shorten();	
                                
                                if ( $('.training_sections > *').length == 0 ) {
                                    $('.training_sections').html( spView.emptyResult( _s('No training topics.'), 'li') );
                                }
			})			
		})		
	})
	
}

ShiftPlanningTraining.prototype.statisticSubEvents = function(){
	$('.subNavigation').show();
	$('.training').show();
	$('.training_statistic').html(spView.divLoader());
	if(sp.staff.admin.info.group > 2){
		sp.showError('You have no permission');
		setTimeout(function(){
			sp.loadSubPage('', 'training', 'sections');
		},1500);
		return false;
	}
	setTimeout(function(){
	var data = []
	$.each(sp.training.statistic,function(){
		if(this.completed == 0){
			this.stat = 0
		}else{
			this.stat=Math.round((this.completed/this.total)*100);
		}
		this.avatar=sp.getAvatar(this.id)
		data.push(this);
	})
	$('.training_statistic').html($.tmpl($('#te_tr_statistic'),data));		
	},500);
	
}

ShiftPlanningTraining.prototype.singleSectionSubEvents = function (){
	$('.training_singleSection').html(spView.ulLoader());
	$('#section_name').html(sp.training.trainings[sp.training.tmp_section].title)
	setTimeout(function(){
	var data = sp.training.trainings[sp.training.tmp_section].modules;
	for (var i=0;i<sp.training.trainings[sp.training.tmp_section].modules.length;i++){
		if( typeof sp.training.trainings[sp.training.tmp_section].modules[i].finished_flag == 'undefined'){
			sp.training.trainings[sp.training.tmp_section].modules[i].finished_flag = -99 ;
		}
		if( sp.training.trainings[sp.training.tmp_section].modules[i].duedate != 0){
			var today = new Date ();
			var d= new Date(sp.training.trainings[sp.training.tmp_section].modules[i].duedate*1000);
			var month = d.getMonth()>9?(d.getMonth()+1):'0'+(d.getMonth()+1);
			sp.training.trainings[sp.training.tmp_section].modules[i].color = today > d ?'#8C1919':'green';
			sp.training.trainings[sp.training.tmp_section].modules[i].duedate_formated = d.getDate()+'-'+month+'-'+d.getFullYear();
		}
	}
	$('.training_singleSection').html($.tmpl($('#te_tr_singleSection'),sp.training.trainings[sp.training.tmp_section].modules));
	$('.training div.oneLine b').shorten();
	},500);
	
}

ShiftPlanningTraining.prototype.singleModuleSubEvents = function () {
	$('.training .training_module').html(spView.divLoader());
	setTimeout(function(){
	var data = {} ;
	for (var i=0;i<sp.training.trainings[sp.training.tmp_section].modules.length;i++){
		if(sp.training.tmp_module == sp.training.trainings[sp.training.tmp_section].modules[i].id){
			data = sp.training.trainings[sp.training.tmp_section].modules[i] ;
		}
	}
	
	if(data.contents != null){
		data.contents = data.contents.replace(/\n/g, '</p><br/><p>');	
		data.contents=spView.bbc2HTML(data.contents);
	}else{
		data.contents = '';
	}	
	if(data.files.length > 0){
		$.each(data.files,function(i,j){
			this.file_size=spView.friendly_filesize(this.file_size);
		})
	}
	//if it's comment training fetch comments  or signatures
	if(data.comment_type == 1 || data.digital_signature == 1){
	
		if(data.comment_type == 1){
				spModel.training.get('comments', {module_id:sp.training.tmp_module,type:1}, function(response){
				var comments=[];
				$.each(response.data,function(){
					if(sp.staff.admin.info.group <= data.can_see_comment){
						this.avatar=sp.getAvatar(this.user);					
						comments.push(this);
					}
				});
				data.comments=comments;
				if(data.digital_signature == 1){
					spModel.training.get('digital_signature', {module_id:data.id}, function(response){					
					var signatures = [];
					$.each(response.data,function(){
						if(sp.staff.admin.info.group <=2){
							this.avatar=sp.getAvatar(this.user);
							signatures.push(this);
						}else{
							if(this.user == sp.staff.admin.info.id){
								this.avatar=sp.getAvatar(this.user);
								signatures.push(this);								
							}
						}
					});
					data.signatures=signatures;
					$('.training_module').html($.tmpl($('#te_tr_module'),data));
					var html = $('.training_module .wys');
					html.html(html.text());
					$.each(html.find('p'),function(){
						if($(this).html().length == 0){
							$(this).remove();
						}
					});
					$('.confirm').remove();
					$('div[sign=sign]:gt(5)').hide();
					$('<div>',{'class':'title1 wide'}).html($('<a>',{text:'show more',id:'show_all',onclick:'void(0)'})).insertAfter($('div[sign=sign]:eq(5)'));
					});
				}else{
					$('.training_module').html($.tmpl($('#te_tr_module'),data));
					var html = $('.training_module .wys');
					html.html(html.text());
					$.each(html.find('p'),function(){
						if($(this).html().length == 0){
							$(this).remove();
						}
					});
				}
			});
		}
		if(data.digital_signature == 1 && data.comment_type == 0){
				spModel.training.get('digital_signature', {module_id:data.id}, function(response){
					var signatures = [];
					$.each(response.data,function(){
						if(sp.staff.admin.info.group <=2){
							this.avatar=sp.getAvatar(this.user);
							signatures.push(this);
						}else{
							if(this.user == sp.staff.admin.info.id){
								this.avatar=sp.getAvatar(this.user);
								signatures.push(this);								
							}
						}
					});
					data.signatures=signatures;
					$('.training_module').html($.tmpl($('#te_tr_module'),data));
					var html = $('.training_module .wys');
					html.html(html.text());
					$.each(html.find('p'),function(){
						if($(this).html().length == 0){
							$(this).remove();
						}
					});
					$('.confirm').remove();
					$('div[sign=sign]:gt(5)').hide();
					$('<div>',{'class':'title1 wide'}).html($('<a>',{text:'show more',id:'show_all',onclick:'void(0)'})).insertAfter($('div[sign=sign]:eq(5)'));
				});
			}
			
			
		}else{
			$('.training_module').html($.tmpl($('#te_tr_module'),data));
						var html = $('.training_module .wys');
						html.html(html.text());
						$.each(html.find('p'),function(){
							if($(this).html().length == 0){
								$(this).remove();
							}
						});					
		}	
	},500);
		
}

ShiftPlanningTraining.prototype.topicstatisticSubEvents = function () {
	$('.training_topic_stat').html(spView.divLoader());
	if(sp.staff.admin.info.group > 2){
		sp.showError('You have no permission');
		setTimeout(function(){
			sp.loadSubPage('', 'training', 'sections');
		},1500);
		return false;
	}	
	setTimeout(function(){
	var data ={}
	for (var i=0;i<sp.training.trainings[sp.training.tmp_section].modules.length;i++){
		if(sp.training.tmp_module == sp.training.trainings[sp.training.tmp_section].modules[i].id){
			data = sp.training.trainings[sp.training.tmp_section].modules[i] ;
		}
	}	
	if(typeof data.employees != 'undefined' && typeof data.employees != null){
		var emp = [];
		$.each(data.employees,function(){
			this.avatar = sp.getAvatar(this.id);
			emp.push(this);
		})
		$('.training_topic_stat').html($.tmpl($('#te_tr_topic_statistic'),emp));
	}else{
		$('.training_topic_stat').html('No employees on assigned on this topic')
	}	
	},500);
	
}

ShiftPlanningTraining.prototype.loadPage = function(){
	
}

 var user = {
    loggedIn: 0,
    name: '',
    business: ''
};

 var ShiftPlanningView = function(){
    
}

ShiftPlanningView.prototype.optionSchedules = function(id, m, loc){
    if (typeof m == 'undefined'){
        m = false;
    }
    if (typeof loc == 'undefined'){
        loc = false;
    }
    var opt;
    var self = this;
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id, loc);
    }
    if (!m){
        opt = '<option disabled="disabled" selected="selected" value="0">' + _('Select Schedule') + '</option>';
    } else {
        opt = '<option disabled="disabled" selected="selected" value="0">' + _('Select Schedule') + '</option>';
    }
    
    if (!loc){
        $.each(data, function(i, item){
            if (self.checkPerm(item)){
                opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
            }
        });	
    } else {
        $.each(data, function(i, item){
            opt += '<optgroup label="' + item.name + '">';
            $.each(item.data, function(iL2, itemL2){
                opt += '<option value="' + itemL2.id + '">' + itemL2.name +'</option>';
            });
            opt += '</optgroup>';
        });
    }

    
    return opt;
}

ShiftPlanningView.prototype.staffOption = function(notAdmin){
    if (typeof notAdmin == 'undefined'){
        notAdmin = false;
    }
    var opt;
    if (notAdmin == false){
        opt = '<option disabled="disabled" selected="selected" value="0">Select Employee</option>';
        var l;
        if (sp.staff.admin.info.group == 4){
            l = sp.staff.fixed.employees;
        } else {
            l = spModel.staff.allStaff();
        }
        $.each(l, function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.staffFilter = function(notAdmin){
    if (typeof notAdmin == 'undefined'){
        notAdmin = false;
    }
    var opt = '';
    if (notAdmin == false){
        if (sp.staff.admin.info.group <= 3){
            opt = '<option value="0">All Employees</option>';
        }
        var l;
	
        if (sp.staff.admin.info.group == 4){
            l = sp.staff.fixed.employees;
        } else {
            l = spModel.staff.allStaff();
        }
        $.each(l, function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.scheduleFilter = function(id, deep){
    if (typeof deep == 'undefined'){
        deep = false;
    }
    var self = this;
    var opt = '';
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    if (sp.staff.admin.info.group <= 3){
        opt = '<option value="0">All Positions</option>';
    }
    
    $.each(data, function(i, item){
        if (self.checkPerm(item, deep)){
            opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        }
    });
    
    return opt;
}

ShiftPlanningView.prototype.schedulerFilter = function(id, deep){
    if (typeof deep == 'undefined'){
        deep = false;
    }
    var self = this;
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    var opt = '';
    $.each(data, function(i, item){
        if (self.checkPerm(item, deep)){
            opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        }
    });
    
    return opt;
}

ShiftPlanningView.prototype.skillsFilter = function(notAdmin){
    if (typeof notAdmin == 'undefined'){
        notAdmin = false;
    }
    var opt;
    if (notAdmin == false){
        opt = '<option value="0">All Skills</option>';
        $.each(spModel.staff.allSkills(), function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.locationSelector = function(type){
    if (typeof type == 'undefined'){
        type = 2;
    }
    var opt = '<option value="0" selected="selected">' + ((type == 1) ? 'Select Location' : 'Select Work Site') + '</option>';
    opt += '<optgroup lable="locations">';
    $.each(spModel.location.locationsList(), function(i, item){
        if (item.type == type){
            opt += '<option value="' + item.id + '">' + item.name + '</option>';
        }
    });
    opt += '</optgroup><optgroup><option value="add" type="' + type + '">' + ((type == 1) ? 'New Location?' : 'New Work Site?') + '</option></optgroup>';
    return opt;
}

ShiftPlanningView.prototype.timeRanges = function(){
    var times = spRanges.createSelector('times');
    var res = '<option value="-1">Select</option>';
    $.each(times, function(i, item){
        res += '<option value="' + i + '" >' + item + '</option>'; 
    });
    
    return res;
}

ShiftPlanningView.prototype.customFields = function(employee){ //gets employees custom fields and sends it to #da_se_ov_cu
    var l = '';
    var ch = '';
    var res = '';
    var br = 2;
    var c = ''; 
    if (typeof employee.custom != 'undefined'){
        $.each(employee.custom, function(i, item){
            if (item.toggle ==1) {
                        c = 'check';
                    }
            
        if (item.type != 4){
            l += '<li>';
            l += '<div>';
            switch(item.type){
                case '1':
                    item.value = item.value == null ? '' : item.value ;
                    l += '<label>' + item.name + ': <h4>' + item.value + '</h4></label>';
                    break;
                case '2':
                    item.text = item.text == null ? '' : item.text ;
                    l += '<label>' + item.name + ': <h4>' + item.text + '</h4></label>';
                    break;
                case '3':
                    item.value = item.value == null ? '' : item.value ;
                    l += '<label>' + item.name + ': <h4>' + item.value + '</h4></label>';
                    break;
            }
            l += '</div>';
            l += '</li>';
        } else {
            ch += '<li>'
//            class="' + ((br % 2 == 0) ? 'even' : 'odd') + '">';
            ch += '<span item="edit" class="checkbox ' + c + '" id=' + item.id + '>' + item.name + '</span>';
            ch += '</li>';
            br++; c='';
    
        }
        
        });
    }
      res = l +  ch ;
     return (res.length > 0) ? res : this.emptyResult(_s('No custom fields to display'), 'li', 'noBorder');
}

ShiftPlanningView.prototype.editableCustomFields = function(employee){ //makes custom fields editable
    var l = '', ch = '';
    var res = '';
    var br = 2;
    var c = '';
    if (typeof employee.custom != 'undefined'){
        $.each (employee.custom, function (i, item) {
            if (item.toggle ==1) {
                c = 'check';
            }
             if (item.type != 4){
                l += '<li>';
                l += '<div>';
                switch(item.type){
                    case '1':
                        l += '<label>' + item.name + ':</label><span class="input"><input item="edit" id="' + item.id + '" type="text" value="' + item.value + '" name=""></span>';
                        break;
                    case '2':
                        l += '<label>' + item.name + ':</label><span class="input"><input item="edit" id="' + item.id + '" type="text" value="' + item.text + '" name=""></span>';
                        break;
                    case '3':
                        l += '<label>' + item.name + ':</label>';
                        l += '<span class="input"><select item="edit" id="' + item.id + '">';
                        l += '<option>' + item.value + '</option>';
                        var option = new Array();  // this will return an array with options from item.values
                        option = item.values.split(",");
                        $.each(option, function(a, opt){
                            l += '<option>' + opt + '</option>';
                        });
                        l += '</select></span>';
                        break;    
                }
                
                l += '</div>';
                l += '</li>';
            } else {
                 ch += '<li class="' + ((br % 2 == 0) ? 'even' : 'odd') + '">';
                 ch += '<span item="edit" class="checkbox ' + c + '" id=' + item.id + '>' + item.name + '</span>';
                 ch += '</li>';
                 br++; c='';
            }
        }); 
        res = l + '<li><ul>' + ch + '</ul></li>';
    }
   
    return (res.length > 0) ? res : this.emptyResult(_s('No custom fields to display'), 'li', 'noBorder');
}

ShiftPlanningView.prototype.editableSchedules = function(employee){
    var l = '';
    var i = 2;
    $.each(spModel.schedule.allSchedules(), function(i2, item){
        var c = (typeof employee.schedules != 'undefined' && typeof employee.schedules[item.id] != 'undefined') ? 'check"' : '';
        l += '<li class="' + ((i % 2 == 0) ? 'even' : 'odd') + '">';
        l += '  <div>';
        l += '      <span class="checkbox ' + c + '" itemId=' + item.id + '>' + item.name + '</span>';
        l += '  </div>';
        l += '</li>';
        i++;
    });
    
    return (l.length > 0) ? l : this.emptyResult(_s('No positions to display'), 'li', 'noBorder');
}

ShiftPlanningView.prototype.editableSkills = function(employee){
    var l = '';
    var i = 2;
    $.each(spModel.staff.allSkills(), function(i2, item){
        var c = (typeof employee.skills != 'undefined' && typeof employee.skills[item.id] != 'undefined') ? 'check' : '';
        l += '<li class="' + ((i % 2 == 0) ? 'even' : 'odd') + '">';
        l += '  <div>';
        l += '      <span class="checkbox ' + c + '" itemId=' + item.id + '>' + item.name + '</span>';
        l += '  </div>';
        l += '</li>';
        i++;
    });
    
    return (l.length > 0) ? l : this.emptyResult(_s('No skills to display'), 'li', 'noBorder');
}

ShiftPlanningView.prototype.ulLoader = function(){
    return '<li class="loading"></li>';
}

ShiftPlanningView.prototype.divLoader = function(){
    return '<div class="loading"></div>';
}

ShiftPlanningView.prototype.emptyResult = function(text, tag, cl){
    if (typeof cl == 'undefined'){
        cl = '';
    }
    if (typeof tag == 'undefined'){
        tag = 'div'
    }
    if (typeof text == 'undefined'){
        text = _s('Na data for selected criteria!');
    }
    return '<' + tag + ' class="additional ' + cl + '"><p>' + text + '</p></' + tag + '>'
}

ShiftPlanningView.prototype.checkPerm = function(item, deep){
    if (typeof deep == 'undefined'){
        deep = false;
    }
    var c = 1;
    if (deep){
        c = 2;
    }
    var perm = true;
    if (typeof item.perms != 'undefined'){
        if (item.perms >= c){
            perm = true;
        } else {
            perm = false;
        }
    }
    return perm;
}

ShiftPlanningView.prototype.fixCurrency = function(cId, r){
    if (typeof r == 'undefined'){
        r = false;
    }
    var c = spRanges.currencies[cId];
    
    if (!r){
        $('span.currency').html(c);
    } else {
        return c;
    }
    
}

ShiftPlanningView.prototype.bbc2HTML = function(S) {
    if (S.indexOf('[') < 0) return S;

    function X(p, f) {
        return new RegExp(p, f)
    }
    function D(s) {
        return rD.exec(s)
    }
    function R(s) {
        return s.replace(rB, P)
    }
    function A(s, p) {
        for (var i in p) s = s.replace(X(i, 'g'), p[i]); return s;
    }

    function P($0, $1, $2, $3) {
        if ($3 && $3.indexOf('[') > -1) $3 = R($3);
        switch ($1) {
            case 'url':case 'anchor':case 'email':
                return '<a '+ L[$1] + ($2||$3) +'">'+ $3 +'</a>';
            case 'img':
                var d = D($2);
                return '<img src="'+ $3 +'"'+ (d ? ' width="'+ d[1] +'" height="'+ d[2] +'"' : '') +' alt="'+ (d ? '' : $2) +'" />';
            case 'flash':case 'youtube':
                var d = D($2)||[0, 425, 366];
                return '<object type="application/x-shockwave-flash" data="'+ Y[$1] + $3 +'" width="'+ d[1] +'" height="'+ d[2] +'"><param name="movie" value="'+ Y[$1] + $3 +'" /></object>';
            case 'float':
                return '<span style="float: '+ $2 +'">'+ $3 +'</span>';
            case 'left':case 'right':case 'center':case 'justify':
                return '<div style="text-align: '+ $1 +'">'+ $3 +'</div>';
            case 'google':case 'wikipedia':
                return '<a href="'+ G[$1] + $3 +'">'+ $3 +'</a>';
            case 'b':case 'i':case 'u':case 's':case 'sup':case 'sub':case 'h1':case 'h2':case 'h3':case 'h4':case 'h5':case 'h6':case 'table':case 'tr':case 'th':case 'td':
                return '<'+ $1 +'>'+ $3 +'</'+ $1 +'>';
            case 'row': case 'r':case 'header':case 'head':case 'h':case 'col':case 'c':
                return '<'+ T[$1] +'>'+ $3 +'</'+ T[$1] +'>';
            case 'acronym':case 'abbr':
                return '<'+ $1 +' title="'+ $2 +'">'+ $3 +'</'+ $1 +'>';
        }
        return '['+ $1 + ($2 ? '='+ $2 : '') +']'+ $3 +'[/'+ $1 +']';
    }

    var rB = X('\\[([a-z][a-z0-9]*)(?:=([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]', 'g'), rD = X('^(\\d+)x(\\d+)$');
    var L = {
        url: 'href="', 
        'anchor': 'name="', 
        email: 'href="mailto: '
    };
    var G = {
        google: 'http://www.google.com/search?q=', 
        wikipedia: 'http://www.wikipedia.org/wiki/'
    };
    var Y = {
        youtube: 'http://www.youtube.com/v/', 
        flash: ''
    };
    var T = {
        row: 'tr', 
        r: 'tr', 
        header: 'th', 
        head: 'th', 
        h: 'th', 
        col: 'td', 
        c: 'td'
    };
    var C = {
        notag: [{
            '\\[': '&#91;', 
            ']': '&#93;'
        }, '', ''], 
        code: [{
            '<': '&lt;'
        }, '<code><pre>', '</pre></code>']
    };
    C.php = [C.code[0], C.code[1]+ '&lt;?php ', '?>'+ C.code[2]];
    var F = {
        font: 'font-family:$1', 
        size: 'font-size:$1px', 
        color: 'color:$1'
    };
    var U = {
        c: 'circle', 
        d: 'disc', 
        s: 'square', 
        '1': 'decimal', 
        a: 'lower-alpha', 
        A: 'upper-alpha', 
        i: 'lower-roman', 
        I: 'upper-roman'
    };
    var I = {}, B = {};

    for (var i in C) I['\\[('+ i +')]((?:.|[\r\n])*?)\\[/\\1]'] = function($0, $1, $2) {
        return C[$1][1] + A($2, C[$1][0]) + C[$1][2]
    };
    for (var i in F) {
        B['\\['+ i +'=([^\\]]+)]'] = '<span style="'+ F[i] +'">';
        B['\\[/'+ i +']'] = '</span>';
    }
    B['\\[list]'] = '<ul>';
    B['\\[list=(\\w)]'] = function($0, $1) {
        return '<ul style="list-style-type: '+ (U[$1]||'disc') +'">'
    };		
    B['\\[/list]'] = '</ul>';
    B['\\[\\*]'] = '<li>';
	B['\\[/\\*]'] = '</li>';
    B['\\[quote(?:=([^\\]]+))?]'] = function($0, $1) {
        return '<div class="bb-quote">'+ ($1 ? $1 +' wrote' : 'Quote') +':<blockquote>'
    };		
    B['\\[/quote]'] = '</blockquote></div>';
    B['\\[(hr|br)]'] = '<$1 />';
    B['\\[sp]'] = '&nbsp;';
    return R(A(A(S, I), B));
}

ShiftPlanningView.prototype.friendly_filesize = function(bytes) {
    var labels = new Array('TB', 'GB', 'MB', 'kB', 'b');
    var measurements = new Array(1099511627776, 1073741824, 1048576, 1024, 1);
    for(var i=0; i<measurements.length; i++) {
        var conv = bytes/measurements[i];
        if(conv > 1) {
            return Math.round(conv*10)/10+' '+labels[i];
        }
    }
}

var spView = new ShiftPlanningView();

