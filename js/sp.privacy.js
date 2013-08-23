function ShiftPlanningPrivacy (){
}

ShiftPlanningPrivacy.prototype.loadPage = function(){
    console.log('loooad page');
	$('#pages>div').hide()
	$('#pages #privacy').show();
	$('#pages #privacy > div').show();
}