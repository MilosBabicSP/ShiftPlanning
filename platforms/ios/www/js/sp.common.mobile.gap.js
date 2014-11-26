//alert("ovde");
console.log('sdadasdsadsa');
var sp = new ShiftPlanning();
sp.staff = new ShiftPlanningStaff();
sp.schedule = new ShiftPlanningSchedule();
sp.dashboard = new ShiftPlanningDashboard();
sp.timeClock = new ShiftPlanningTimeClock();
sp.reports = new ShiftPlanningReports();
sp.requests = new ShiftPlanningRequests();
sp.location = new ShiftPlanningLocation();
sp.permissions = new ShiftPlanningPermissions();
sp.training = new ShiftPlanningTraining();
sp.settings = new ShiftPlanningSettings();
$.ajax({
	url: _serverMob+'load.php',
	success : function(res) {
		$('#prepLoadFiles').after(res);
		sp.initialize();
	},
	error : function(err, t, m){
		console.log("Mobile GAP => " + JSON.stringify(err));
	}
})