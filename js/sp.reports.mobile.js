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
