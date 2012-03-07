ShiftPlanningReports.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.allReportsEvents();
    });
}

ShiftPlanningReports.prototype.allReportsEvents = function(){
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
}

ShiftPlanningReports.prototype.allReportsSubEvents = function(){
    $('#reports .timeSelector').html(spView.timeRanges());
    $('#reports .timeSelector').val(3);
    
    
    $('#reports .employeeSelector').html(spView.staffFilter());
    $('#reports .positionsSelector').html(spView.scheduleFilter());
    $('#reports .skillsSelector').html(spView.skillsFilter());
    
    
    var s = Date.parse('today at 9am');
    var e = Date.parse('today at 5pm');
    
    $('#reports .timeFromSelector').scroller('destroy');
    $('#reports .timeFromSelector').val(s.toString(cal.dformat));
    $('#reports .timeFromSelector').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    $('#reports .timeToSelector').scroller('destroy');
    $('#reports .timeToSelector').val(e.toString(cal.dformat));
    $('#reports .timeToSelector').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
}

ShiftPlanningReports.prototype.displayReports = function(){
    var page = this.page;

    var data = {
        type : page.toLowerCase()
    }
    
    if (page == 'confirmedTimeSheets'){
        data.type = 'timesheets'; 
    }
    
    data.start_date = $('#reports .' + page +' .timeFromSelector').val();
    data.end_date = $('#reports .' + page +' .timeToSelector').val();
    data.schedule = $('#reports .' + page + ' .positionsSelector').val();
    data.employee = $('#reports .' + page + ' .employeeSelector').val();
    data.skill = $('#reports .' + page + ' .skillsSelector').val();
    
    if ($('#reports .' + page + ' .re_deductBreaks').hasClass('check')){
        data.deduct_breaks = 1;
    } else {
        data.deduct_breaks = 0;
    }
    
    if ($('#reports .' + page + ' .re_groupResults').hasClass('check')){
        data.group_results = 1;
    } else {
        data.group_results = 0;
    }
    
    if ($('#reports .' + page + ' .re_showEmpty').hasClass('check')){
        data.show_empty = 1;
    } else {
        data.show_empty = 0;
    }
    
    spModel.payroll.get('report', data, function(response){
        var total = {
            colspan : 5,
            regular : 0,
            special : 0,
            overtime : 0,
            total : 0,
            cost : 0
        }
        //        if (data.group_results == "1"){
        //            $('#re_' + page + ' table.re_groupedResults').show();
        //            $('#re_' + page + ' table.re_groupedResults .re_table_data').html($('#templateReportsPayrollG').tmpl(response.data));
        //        } else {
        //            if (data.type == 'timesheets'){
        //                total.colspan = 4;
        //                $('#re_' + page + ' table.re_ungroupedResults .re_table_data').html($('#templateReportsPayrollCTS').tmpl(response.data));
        //            } else {
        //                total.colspan = 9;
        //                $('#re_' + page + ' table.re_ungroupedResults .re_table_data').html($('#templateReportsPayroll').tmpl(response.data));
        //            }
        //            $('#re_' + page + ' table.re_ungroupedResults').show();         
        //        }    
        $.each(response.data, function(i, item){
            total.regular = total.regular + Number(item.hours.regular);
            total.special = total.special + Number(item.hours.special);
            total.overtime = total.overtime + Number(item.hours.overtime);
            total.total = total.total + Number(item.hours.total);
            total.cost = total.cost + Number(item.hours.cost);
        });
    //$('#re_' + page + ' table .re_table_footer').html($('#templateReportsPayrollT').tmpl(total));
    });
}

ShiftPlanningReports.prototype.loadSubPageEvents = function(subpage){
    var self = this;
    this.page = subpage;
    setTimeout(function(){
        self.displayReports();
    }, 100);
}

ShiftPlanningReports.prototype.loadPage = function(){
    this.allReportsSubEvents();
}
