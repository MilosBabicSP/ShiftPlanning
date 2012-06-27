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
			var subpage = $(this).attr('subpage');
			$('#training .training .filters li').removeClass('active');
			$(this).parent().addClass('active');
			sp.loadSubPage('','training', subpage);
		});
		$('#training .training_sections').delegate('div[rel]',clickEvent,function(e){
			e.preventDefault();
			sp.training.tmp_section = $(this).attr('rel');
			sp.loadSubPage('', 'training', 'singleSection');
		});
		$('#training .training_singleSection').delegate('div[rel]',clickEvent,function(e){
			e.preventDefault();
			sp.training.tmp_module = $(this).attr('rel');
			sp.loadSubPage('', 'training', 'singleModule');
		});		
		$('.singleSection .backMenu').bind(clickEvent,function(e){
			e.preventDefault();
			$('.subNavigation .training li.active a').trigger(clickEvent);			
		})
		$('.singleModule .backMenu').bind(clickEvent,function(e){
			e.preventDefault();
			sp.loadSubPage('', 'training', 'singleSection');
		})
		$('.topicstatistic .backMenu').bind(clickEvent,function(e){
			e.preventDefault();
			sp.loadSubPage('', 'training', 'singleModule');
		})
		$('.singleModule .subMenu .topic_stat').bind(clickEvent,function(e){
			e.preventDefault();
			sp.loadSubPage('', 'training', 'topicstatistic');
		})		
}
ShiftPlanningTraining.prototype.overviewSubEvents = function(){
	$('.subNavigation').show();
	$('.training').show();
	if(sp.staff.admin.info.group <= 2){
		$('.training .filters a[subpage=statistic]').parent().removeClass('hidden');
	}
	$('.training .filters li.first a').trigger(clickEvent);
}
ShiftPlanningTraining.prototype.sectionsSubEvents = function (){
	$('.subNavigation').show();
	$('.training').show();
	if(sp.staff.admin.info.group <= 2){
		$('.training .filters a[subpage=statistic]').parent().removeClass('hidden');
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
							mod.push(m[j]);
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
			})			
		})		
	})
	
}

ShiftPlanningTraining.prototype.statisticSubEvents = function(){
	$('.subNavigation').show();
	$('.training').show();
	$('.training_statistic').html(spView.ulLoader());
	if(sp.staff.admin.info.group <= 2){
		$('.training .filters a[subpage=statistic]').parent().removeClass('hidden');
	}
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
}

ShiftPlanningTraining.prototype.singleSectionSubEvents = function (){
	$('.training_singleSection').html(spView.ulLoader());
	var data = sp.training.trainings[sp.training.tmp_section].modules;
	for (var i=0;i<sp.training.trainings[sp.training.tmp_section].modules.length;i++){
		if( typeof sp.training.trainings[sp.training.tmp_section].modules[i].finished_flag == 'undefined'){
			sp.training.trainings[sp.training.tmp_section].modules[i].finished_flag = -99 ;
		}
	}		
	$('.training_singleSection').html($.tmpl($('#te_tr_singleSection'),sp.training.trainings[sp.training.tmp_section].modules));
}

ShiftPlanningTraining.prototype.singleModuleSubEvents = function () {
	$('.training_singleModule').html(spView.divLoader());
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
	$('.training_module').html($.tmpl($('#te_tr_module'),data));
	var html = $('.training_module .wys');
	html.html(html.text());
	$.each(html.find('p'),function(){
		if($(this).html().length == 0){
			$(this).remove()
		}
	})	
}

ShiftPlanningTraining.prototype.topicstatisticSubEvents = function () {
	$('.training_topic_stat').html(spView.divLoader());
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
		console.log(emp);
		$('.training_topic_stat').html($.tmpl($('#te_tr_topic_statistic'),emp));
	}else{
		$('.training_topic_stat').html('No employees on assigned on this topic')
	}
}




//ShiftPlanningTraining.prototype.initialize = function(){
//	var self = this ;
//	$(document).ready(function(){
//		self.overviewEvents();
//	})
//}
//ShiftPlanningTraining.prototype.loadSubPageEvents = function(subpage){
//	    this[subpage + 'SubEvents']();
//}
//ShiftPlanningTraining.prototype.overviewEvents = function(){
//	$('.training_sections').delegate('a.sub',clickEvent,function(e){
//		e.preventDefault();
//		sp.training.tmp_section=$(this).attr('rel');
//		if($(this).parent().parent().hasClass('idle')){
//			$(this).parent().parent().removeClass('idle').addClass('active');
//			$('div [modules = modules_'+ sp.training.tmp_section +']').slideDown();
//		}else{
//			if($(this).parent().parent().hasClass('active')){
//				$(this).parent().parent().removeClass('active').addClass('idle');
//				$('div [modules = modules_'+ sp.training.tmp_section +']').slideUp();
//			}
//		}
//	})
//	$('#tr_si_se .backMenu').bind(clickEvent,function(e){
//		e.preventDefault();
//		$('.subNavigation .training li.active a').trigger(clickEvent);
//		sp.training.scrollWindow = true ;
//	})
//	$('.training_sections').delegate('a.next',clickEvent,function(e){
//		e.preventDefault();
//		sp.training.top=$(this).offset().top;
//		sp.training.tmp_module=$(this).attr('rel');
//		sp.loadSubPage('', 'training', 'singleModule');		
//	})
//	$('.training_module').delegate('a.publish',clickEvent,function(e){
//		var module_id = $(this).attr('rel');
//		spModel.training.update('complete', {id:module_id},function(response){
//			sp.showSuccess('Finished');
//			setTimeout(function(){
//				$('#tr_si_se .backMenu').trigger(clickEvent)
//			},2500);			
//		})
//	})
//	if (sp.staff.admin.info.group <= 2){
//		$('#training .training .filters li a').bind(clickEvent,function(e){
//			e.preventDefault();
//			var subpage = $(this).attr('subpage');
//			$('#training .training .filters li').removeClass('active');
//			$(this).parent().addClass('active');
//			if(subpage != 'overview'){
//				sp.loadSubPage('','training', subpage);
//			}
//		})
//	}
//}
//ShiftPlanningTraining.prototype.overviewSubEvents = function(){
//	$('.subNavigation').show();
//	$('.training').show();
//	if(sp.staff.admin.info.group <= 2){
//		$('.training .filters a[subpage=statistic]').parent().removeClass('hidden');
//		$('.training .filters li.first a').trigger(clickEvent);
//	}
//	$('.training_sections').html(spView.ulLoader());
//	var calls = [
//		['training.sections','GET',{}],
//		['training.modules','GET',{detailed:1}],
//		['training.progress','GET',{}]
//	]
//	var data = [] ;
//	sp.multiApi(calls,function(response){	
//		$.each(response[0].data,function(k,v){
//			var mod=[];
//			$.each(response[1].data,function(i,item){
//			if(sp.staff.admin.info.group < 3){
//				item.statistic = item.stats.finished+'/'+item.stats.totalstaff;
//			}
//			if(typeof item.employees != 'undefined' && typeof item.employees[sp.staff.admin.info.id] != 'undefined'){
//				item.finished_flag = item.employees[sp.staff.admin.info.id].finished ? 'done' : 'unread' ;
//				if(typeof item.employees[sp.staff.admin.info.id].outdated != 'undefined'){
//					item.finished_flag='unread';
//				}
//			}
//			if(v.id == item.section){
//				mod.push(item);
//				}
//			})
//			v.modules=mod;
//			if(v.modules.length > 0){
//			data.push(v);	
//			}	
//		})
//		if(typeof response[2].data[sp.staff.admin.info.id] != 'undefined'){
//			var percent = Math.round((response[2].data[sp.staff.admin.info.id].completed/response[2].data[sp.staff.admin.info.id].total)*100);
//			$('#user_progress').html(percent);
//			$('.progress').css('width',percent+'%');
//		}
//		$('.training_sections').html($.tmpl($('#te_tr_sections'),data));
//		if(sp.training.scrollWindow){
//			$('.training_sections a.fr[rel='+sp.training.tmp_section+']:visible').trigger(clickEvent);
//			$('body,html').animate({scrollTop: sp.training.top}, 800);
//			sp.training.scrollWindow = false ;			
//		}
//	})
//}
//ShiftPlanningTraining.prototype.singleModuleSubEvents = function(){
//	var self=this;
//	$('#wrapper > .subNavigation').hide();
//	$('.training_module').html(spView.ulLoader());
//	spModel.training.get('module', {id:sp.training.tmp_module}, function(response){
//		if(response.data.contents != null){
//			response.data.contents = response.data.contents.replace(/\n/g, '</p><br/><p>');	
//			response.data.contents=spView.bbc2HTML(response.data.contents);
//		}else{
//			response.data.contents = '';
//		}
//		if(typeof response.data.employees != 'undefined' && typeof response.data.employees[sp.staff.admin.info.id] != 'undefined'){
//			response.data.finished_flag = response.data.employees[sp.staff.admin.info.id].finished ? 1 : 0 ;
//			response.data.finished_time = response.data.employees[sp.staff.admin.info.id].finished ;
//		}else{
//				response.data.finished_flag = -99 ;
//		}
//		if(response.data.files.length > 0){
//			$.each(response.data.files,function(i,j){
//				this.file_size=spView.friendly_filesize(this.file_size);
//			})
//		}
//		$('.training_module').html($.tmpl($('#te_tr_module'),response.data));
//		var html=$('div [contents=content_'+response.data.id+']');
//		html.html(html.text());		
//		$.each(html.find('p'),function(){
//			if($(this).html().length == 0){
//				$(this).remove()
//			}
//		})
////			date=new Date(v.updated*1000);
////			minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
////			v.updated_formatted=spRanges.weekdays[date.getDay()]+','+spRanges.months[date.getMonth()]+' '+date.getDate()+' '+date.getFullYear()+' - '+date.getHours()+':'+minutes;
//
//	})
//}
//ShiftPlanningTraining.prototype.statisticSubEvents = function(){
//	$('.training').show();
//	if(sp.staff.admin.info.group <= 2){
//		$('.training .filters a[subpage=statistic]').parent().removeClass('hidden');
//	}	
//}
//ShiftPlanningTraining.prototype.sectionsSubEvents = function(){
//	$('.training').show();
//	if(sp.staff.admin.info.group <= 2){
//		$('.training .filters a[subpage=statistic]').parent().removeClass('hidden');
//	}	
//}
//dumy function
ShiftPlanningTraining.prototype.loadPage = function(){
	
}