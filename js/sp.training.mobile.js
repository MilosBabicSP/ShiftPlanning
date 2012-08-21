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
		$('.trainingBar').css('margin','0 60px 0 0 ');
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