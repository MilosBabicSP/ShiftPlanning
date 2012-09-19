var sp;
$(document).ready(function() {
    $.ajax({
        url: 'api.php',
        success : function(res){
            $('#prepLoadFiles').after(res);
            sp = new ShiftPlanning();
            ShiftPlanning.prototype.staff = new ShiftPlanningStaff();
            ShiftPlanning.prototype.schedule = new ShiftPlanningSchedule();
            ShiftPlanning.prototype.dashboard = new ShiftPlanningDashboard();
            ShiftPlanning.prototype.timeClock = new ShiftPlanningTimeClock();
            ShiftPlanning.prototype.reports = new ShiftPlanningReports();
            ShiftPlanning.prototype.requests = new ShiftPlanningRequests();
            ShiftPlanning.prototype.location = new ShiftPlanningLocation();
            ShiftPlanning.prototype.permissions = new ShiftPlanningPermissions();
            ShiftPlanning.prototype.training = new ShiftPlanningTraining();
        }
    })
});
