ShiftPlanningTraining.prototype.initialize = function(){
	var self = this ;
	$(document).ready(function(){
		self.overviewEvents();
	})
}
ShiftPlanningTraining.prototype.loadSubPageEvents = function(subpage){
	    this[subpage + 'SubEvents']();
}
ShiftPlanningTraining.prototype.overviewEvents = function(){
	$('.training_sections').delegate('a.fr',clickEvent,function(e){
		e.preventDefault();
		sp.training.tmp_section=$(this).attr('rel');
		sp.loadSubPage('', 'training', 'singleSection');
	})
	$('#tr_si_se .backMenu').bind(clickEvent,function(e){
		e.preventDefault();
		$('.subNavigation .training li.active a').trigger(clickEvent);
	})
	$('.training_modules').delegate('a.fr',clickEvent,function(e){
		e.preventDefault();
		$(this).parent().next().slideToggle();
	})
}
ShiftPlanningTraining.prototype.overviewSubEvents = function(){
	$('.subNavigation').show();
	$('.training_sections').html(spView.ulLoader());
	spModel.training.get('sections',{}, function(response){
		var data=[];
		$.each(response.data,function(k,v){
			v.created_by=sp.staff.data.employees[v.created_by].name;
			data.push(v);
		})
		$('.training_sections').html($.tmpl($('#te_tr_sections'),data));
	})
}
ShiftPlanningTraining.prototype.singleSectionSubEvents = function(){
	$('#wrapper > .subNavigation').hide();
	$('.training_modules').html(spView.ulLoader());
	spModel.training.get('modules', {section:sp.training.tmp_section,detailed:1}, function(response){
		$('.training_modules').html($.tmpl($('#te_tr_module'),response.data));
	})
}
//dumy function
ShiftPlanningTraining.prototype.loadPage = function(){
	
}