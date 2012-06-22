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
	$('.training_sections').delegate('a.sub',clickEvent,function(e){
		e.preventDefault();
		sp.training.tmp_section=$(this).attr('rel');
		if($(this).parent().parent().hasClass('idle')){
			$(this).parent().parent().removeClass('idle').addClass('active');
			$('div [modules = modules_'+ sp.training.tmp_section +']').slideDown();
		}else{
			if($(this).parent().parent().hasClass('active')){
				$(this).parent().parent().removeClass('active').addClass('idle');
				$('div [modules = modules_'+ sp.training.tmp_section +']').slideUp();
			}
		}
	})
	$('#tr_si_se .backMenu').bind(clickEvent,function(e){
		e.preventDefault();
		$('.subNavigation .training li.active a').trigger(clickEvent);
		sp.training.scrollWindow = true ;
	})
	$('.training_sections').delegate('a.next',clickEvent,function(e){
		e.preventDefault();
		sp.training.top=$(this).offset().top;
		sp.training.tmp_module=$(this).attr('rel');
		sp.loadSubPage('', 'training', 'singleModule');		
	})
	$('.training_module').delegate('a.publish',clickEvent,function(e){
		var module_id = $(this).attr('rel');
		spModel.training.update('complete', {id:module_id},function(response){
			sp.showSuccess('Finished');
			setTimeout(function(){
				$('#tr_si_se .backMenu').trigger(clickEvent)
			},2500);			
		})
	})
}
ShiftPlanningTraining.prototype.overviewSubEvents = function(){
	$('.subNavigation').show();
	$('.training_sections').html(spView.ulLoader());
	var calls = [
		['training.sections','GET',{}],
		['training.modules','GET',{detailed:1}],
		['training.progress','GET',{}]
	]
	var data = [] ;
	sp.multiApi(calls,function(response){	
		$.each(response[0].data,function(k,v){
			var mod=[];
			$.each(response[1].data,function(i,item){
			if(sp.staff.admin.info.group < 3){
				item.statistic = item.stats.finished+'/'+item.stats.totalstaff;
			}
			if(typeof item.employees != 'undefined' && typeof item.employees[sp.staff.admin.info.id] != 'undefined'){
				item.finished_flag = item.employees[sp.staff.admin.info.id].finished ? 'done' : 'unread' ;
				if(typeof item.employees[sp.staff.admin.info.id].outdated != 'undefined'){
					item.finished_flag='unread';
				}
			}
			if(v.id == item.section){
				mod.push(item);
				}
			})
			v.modules=mod;
			if(v.modules.length > 0){
			data.push(v);	
			}	
		})
		if(typeof response[2].data[sp.staff.admin.info.id] != 'undefined'){
			var percent = Math.round((response[2].data[sp.staff.admin.info.id].completed/response[2].data[sp.staff.admin.info.id].total)*100);
			$('#user_progress').html(percent);
			$('.progress').css('width',percent+'%');
		}
		$('.training_sections').html($.tmpl($('#te_tr_sections'),data));
		if(sp.training.scrollWindow){
			$('.training_sections a.fr[rel='+sp.training.tmp_section+']:visible').trigger(clickEvent);
			$('body,html').animate({scrollTop: sp.training.top}, 800);
			sp.training.scrollWindow = false ;			
		}
	})
}
ShiftPlanningTraining.prototype.singleModuleSubEvents = function(){
	var self=this;
	$('#wrapper > .subNavigation').hide();
	$('.training_module').html(spView.ulLoader());
	spModel.training.get('module', {id:sp.training.tmp_module}, function(response){
		if(response.data.contents != null){
			response.data.contents = response.data.contents.replace(/\n/g, '</p><br/><p>');	
			response.data.contents=spView.bbc2HTML(response.data.contents);
		}else{
			response.data.contents = '';
		}
		if(typeof response.data.employees != 'undefined' && typeof response.data.employees[sp.staff.admin.info.id] != 'undefined'){
			response.data.finished_flag = response.data.employees[sp.staff.admin.info.id].finished ? 1 : 0 ;
			response.data.finished_time = response.data.employees[sp.staff.admin.info.id].finished ;
		}else{
				response.data.finished_flag = -99 ;
		}
		if(response.data.files.length > 0){
			$.each(response.data.files,function(i,j){
				this.file_size=spView.friendly_filesize(this.file_size);
			})
		}
		$('.training_module').html($.tmpl($('#te_tr_module'),response.data));
		var html=$('div [contents=content_'+response.data.id+']');
		html.html(html.text());		
		$.each(html.find('p'),function(){
			if($(this).html().length == 0){
				$(this).remove()
			}
		})
//			date=new Date(v.updated*1000);
//			minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
//			v.updated_formatted=spRanges.weekdays[date.getDay()]+','+spRanges.months[date.getMonth()]+' '+date.getDate()+' '+date.getFullYear()+' - '+date.getHours()+':'+minutes;

	})
}
//dumy function
ShiftPlanningTraining.prototype.loadPage = function(){
	
}