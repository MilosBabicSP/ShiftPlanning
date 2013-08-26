function ShiftPlanningPrivacy (){
}

ShiftPlanningPrivacy.prototype.loadPage = function(){
	$('#pages>div').hide()
	$('#pages #privacy').show();
	$('#pages #privacy > div').show();
}