ShiftPlanningTraining.prototype.initialize = function() {
	var self = this;
	$(document).ready(function() {
		self.overviewEvents();
	})
}
ShiftPlanningTraining.prototype.loadSubPageEvents = function(subpage) {
	this[subpage + 'SubEvents']();
}

ShiftPlanningTraining.prototype.finishTopic = function(module_id){
    spModel.training.update('complete', {id: module_id}, function(response) {
        $('.confirmationNote').remove();
        sp.showSuccess('Finished');
        setTimeout(function() {
            $('.singleSection .backMenu').trigger(clickEvent)
        }, 2500);
    });
}


ShiftPlanningTraining.prototype.overviewEvents = function() {
    //console.log("overviewEvents");
	var self = this;
	$('#training .training .filters li a').bind(clickEvent, function(e) {
		//e.preventDefault();
		//e.stopPropagation();
		var subpage = $(this).attr('subpage');
		$('#training .training .filters li').removeClass('active');
		$(this).parent().addClass('active');
		sp.loadSubPage('', 'training', subpage);
	});
	$('#training .training_sections').delegate('div[rel]', clickEvent, function(e) {
		sp.training.tmp_section = $(this).attr('rel');
		sp.loadSubPage('', 'training', 'singleSection');
	});

	$('#training .training_singleSection').delegate('div[rel]', clickEvent, function(e) {
		sp.training.tmp_module = $(this).attr('rel');
		sp.loadSubPage('', 'training', 'singleModule');
	});

    /**
    * Removed, because it doesn't work on all phones
	$('.training_module').delegate('a.confirm', clickEvent, function(e) {
		var module_id = $(this).attr('rel');
		spModel.training.update('complete', {id: module_id}, function(response) {
			sp.showSuccess('Finished');
			setTimeout(function() {
				$('.singleSection .backMenu').trigger(clickEvent)
			}, 2500);
		});
	});
    */

	$('.training_module').delegate('a#tr_send_signature', clickEvent, function() {
		var module_id = $(this).attr('rel');
		var signature = $('#digi_text').val();
		$(this).addClass('loading');
		var self = $(this);
		spModel.training.update('complete', {id: module_id, signature: signature}, function(response) {
			sp.showSuccess(response.data);
			if (response.data === 'Signed') {
				setTimeout(function() {
					$('.singleSection .backMenu').trigger(clickEvent)
				}, 2500);
			} else {
				self.removeClass('loading');
			}
		});
	});
	$('.training_module').delegate('#show_all', clickEvent, function() {
		$('.training_module div[sign=sign]').show();
		$('#show_all').parent().remove();
	})
	$('.singleSection .backMenu').bind(clickEvent, function(e) {
		e.preventDefault();
		e.stopPropagation();
        $('.confirmationNote').remove();
		$('.subNavigation .training li.active a').trigger(clickEvent);
	});
	$('.singleModule .backMenu').bind(clickEvent, function(e) {
		e.preventDefault();
		e.stopPropagation();
        $('.confirmationNote').remove();
		sp.loadSubPage('', 'training', 'singleSection');
	});
	$('.topicstatistic .backMenu').bind(clickEvent, function(e) {
		e.preventDefault();
		e.stopPropagation();
        $('.confirmationNote').remove();
		sp.loadSubPage('', 'training', 'singleModule');
	});
	$('.singleModule .subMenu .topic_stat').bind(clickEvent, function(e) {
		//console.log("TOPIC STAT aaaaaaa");
		e.preventDefault();
		e.stopPropagation();
		sp.loadSubPage('', 'training', 'topicstatistic');
	});
	$('.singleModule').delegate('#tr_send_comment', clickEvent, function(e) {
		//console.log("DELEGATE aaaaaaa");
		//e.preventDefault();
		//e.stopPropagation();
		var text = $.trim($('#tr_comment').val());
		if (text.length > 0) {
			$(this).addClass('loading');
			spModel.training.update('comments', {module_id: sp.training.tmp_module, text: text, type: 1}, function(reponse) {
				sp.showSuccess('Comment added');
				setTimeout(function() {
					$('.singleModule .backMenu').trigger(clickEvent)
				}, 2500);
			});
		} else {
			sp.showError('Empty comment');
		}
	});
}
ShiftPlanningTraining.prototype.overviewSubEvents = function() {
	$('.subNavigation').show();
	$('.training').show();
	if (sp.staff.admin.info.group <= 2) {
		$('.training  a[subpage=statistic]').parent().removeClass('hidden');
	}
}
ShiftPlanningTraining.prototype.sectionsSubEvents = function() {
    //console.log("sectionsSubEvents");
	$('.subNavigation').show();
	$('.training').show();
	if (sp.staff.admin.info.group <= 2) {
		$('.training  a[subpage=statistic]').parent().removeClass('hidden');
		$('.training .singleModule .subMenu').removeClass('hidden');
	}
	$('.training_sections').html(spView.ulLoader());
	var s = [];
	var m = [];
	spModel.training.get('progress', {}, function(response) {
		if (typeof response.data[sp.staff.admin.info.id] != 'undefined') {
			var percent = Math.round((response.data[sp.staff.admin.info.id].completed / response.data[sp.staff.admin.info.id].total) * 100);
			$('#user_progress').html(percent);
			$('.progress').css('width', percent + '%');
		}
		sp.training.statistic = response.data;
		spModel.training.get('sections', {}, function(response) {
			s = response.data;
			spModel.training.get('modules', {detailed: 1}, function(response) {
				m = response.data;
				var data = [];
				for (var i = 0; i < s.length; i++) {
					var mod = [];
					s[i].notfinished_count = 0;
					for (var j = 0; j < m.length; j++) {
						if (s[i].id == m[j].section) {
							if (m[j].comment_type != 2) {
								mod.push(m[j]);
							}
							if (typeof m[j].employees != 'undefined' && typeof m[j].employees[sp.staff.admin.info.id] != 'undefined') {
								m[j].finished_flag = m[j].employees[sp.staff.admin.info.id].finished ? '1' : '0';
								if (m[j].finished_flag == '0') {
									s[i].notfinished_count++;
								}
								if (typeof m[j].employees[sp.staff.admin.info.id].outdated != 'undefined') {
									m[j].finished_flag = '99';
									s[i].notfinished_count++;
								}
							}
						}
					}
					s[i].modules = mod;
					if (s[i].modules.length > 0) {
						data.push(s[i]);
						sp.training.trainings[s[i].id] = s[i];
					}
				}
				$('.training_sections').html($.tmpl($('#te_tr_sections'), data));
				$('.training div.oneLine b').shorten();
				if ($('.training_sections > *').length == 0) {
					$('.training_sections').html(spView.emptyResult('No trainging topics.', 'li'));
				}
			})
		})
	})

}

ShiftPlanningTraining.prototype.statisticSubEvents = function() {
    //console.log("statisticSubEvents");
	$('.subNavigation').show();
	$('.training').show();
	$('.training_statistic').html(spView.divLoader());
	if (sp.staff.admin.info.group > 2) {
		sp.showError('You have no permission');
		setTimeout(function() {
			sp.loadSubPage('', 'training', 'sections');
		}, 1500);
		return false;
	}
	setTimeout(function() {
		var data = []
		$.each(sp.training.statistic, function() {
			if (this.completed == 0) {
				this.stat = 0
			} else {
				this.stat = Math.round((this.completed / this.total) * 100);
			}
			this.avatar = sp.getAvatar(this.id)
			data.push(this);
		})
		$('.training_statistic').html($.tmpl($('#te_tr_statistic'), data));
	}, 500);

}

ShiftPlanningTraining.prototype.singleSectionSubEvents = function() {
    //console.log("singleSectionSubEvents");
	$('.training_singleSection').html(spView.ulLoader());
	$('#section_name').html(sp.training.trainings[sp.training.tmp_section].title)
	setTimeout(function() {
		var data = sp.training.trainings[sp.training.tmp_section].modules;
		for (var i = 0; i < sp.training.trainings[sp.training.tmp_section].modules.length; i++) {
			if (typeof sp.training.trainings[sp.training.tmp_section].modules[i].finished_flag == 'undefined') {
				sp.training.trainings[sp.training.tmp_section].modules[i].finished_flag = -99;
			}
			if (sp.training.trainings[sp.training.tmp_section].modules[i].duedate != 0) {
				var today = new Date();
				var d = new Date(sp.training.trainings[sp.training.tmp_section].modules[i].duedate * 1000);
				var month = d.getMonth() > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
				sp.training.trainings[sp.training.tmp_section].modules[i].color = today > d ? '#8C1919' : 'green';
				sp.training.trainings[sp.training.tmp_section].modules[i].duedate_formated = d.getDate() + '-' + month + '-' + d.getFullYear();
			}
		}
		$('.training_singleSection').html($.tmpl($('#te_tr_singleSection'), sp.training.trainings[sp.training.tmp_section].modules));
		$('.training div.oneLine b').shorten();
	}, 500);

}
ShiftPlanningTraining.prototype.singleModuleSubEvents = function() {
	$('.training .training_module').html(spView.divLoader());
    console.log("singleModuleSubEvents");

	setTimeout(function() {
		var data = {};

		for (var i = 0; i < sp.training.trainings[sp.training.tmp_section].modules.length; i++) {
			if (sp.training.tmp_module == sp.training.trainings[sp.training.tmp_section].modules[i].id) {
				data = sp.training.trainings[sp.training.tmp_section].modules[i];
			}
		}

		if (data.contents != null) {
			data.contents = data.contents.replace(/\n/g, '<br/>');
			if (data.contents.indexOf('[youtube]') >= 0) {
				data.contents = data.contents.replace(/\[youtube\]/g, '<a target="_blank" href="http://www.youtube.com/embed/').replace(/\[\/youtube\]/g, '?rel=0">Youtube Video</a>');
			}
			data.contents = spView.bbc2HTML(data.contents);
		} else {
			data.contents = '';
		}
		if (data.files.length > 0) {
			$.each(data.files, function(i, j) {
				this.file_size = spView.friendly_filesize(this.file_size);
				this.pretty_url = _serverMob + 'api.php?module=admin.file&method=get&content=1&id=' + this.id + '&token=' + user.token;
			})
		}
		//if it's comment training fetch comments  or signatures
		if (data.comment_type == 1 || data.digital_signature == 1) {

			if (data.comment_type == 1) {
				spModel.training.get('comments', {module_id: sp.training.tmp_module, type: 1}, function(response) {
					var comments = [];
					$.each(response.data, function() {
						if (sp.staff.admin.info.group <= data.can_see_comment) {
							this.avatar = sp.getAvatar(this.user);
							comments.push(this);
						}
					});
					data.comments = comments;
					data.token = user.token;
					if (data.digital_signature == 1) {
						spModel.training.get('digital_signature', {module_id: data.id}, function(response) {
							var signatures = [];
							$.each(response.data, function() {
								if (sp.staff.admin.info.group <= 2) {
									this.avatar = sp.getAvatar(this.user);
									signatures.push(this);
								} else {
									if (this.user == sp.staff.admin.info.id) {
										this.avatar = sp.getAvatar(this.user);
										signatures.push(this);
									}
								}
							});
							data.signatures = signatures;
							$('.training_module').html($.tmpl($('#te_tr_module'), data));
							var html = $('.training_module .wys');
							html.html(html.text());
                            $('.training_module .wys').html(html.text());
							$.each(html.find('p'), function() {
								if ($(this).html().length == 0) {
									$(this).remove();
								}
							});
							$('.confirm').remove();
							$('div[sign=sign]:gt(5)').hide();
							$('<div>', {'class': 'title1 wide'}).html($('<a>', {text: 'show more', id: 'show_all', onclick: 'void(0)'})).insertAfter($('div[sign=sign]:eq(5)'));
						});
					} else {
						$('.training_module').html($.tmpl($('#te_tr_module'), data));

						var html = $('.training_module .wys');
						html.html(html.text());
                        $('.training_module .wys').html(html.text());
						$.each(html.find('p'), function() {
							if ($(this).html().length == 0) {
								$(this).remove();
							}
						});
					}
				});
			}
			if (data.digital_signature == 1 && data.comment_type == 0) {
				spModel.training.get('digital_signature', {module_id: data.id}, function(response) {
					var signatures = [];
					$.each(response.data, function() {
						if (sp.staff.admin.info.group <= 2) {
							this.avatar = sp.getAvatar(this.user);
							signatures.push(this);
						} else {
							if (this.user == sp.staff.admin.info.id) {
								this.avatar = sp.getAvatar(this.user);
								signatures.push(this);
							}
						}
					});
					data.signatures = signatures;
					$('.training_module').html($.tmpl($('#te_tr_module'), data));
					var html = $('.training_module .wys');
					html.html(html.text());
                    $('.training_module .wys').html(html.text());
					$.each(html.find('p'), function() {
						if ($(this).html().length == 0) {
							$(this).remove();
						}
					});
					$('.confirm').remove();
					$('div[sign=sign]:gt(5)').hide();
					$('<div>', {'class': 'title1 wide'}).html($('<a>', {text: 'show more', id: 'show_all', onclick: 'void(0)'})).insertAfter($('div[sign=sign]:eq(5)'));
				});
			}


		} else {
			$('.training_module').html($.tmpl($('#te_tr_module'), data));
			var html = $('.training_module .wys');
			html.html(html.text());
			$('.training_module .wys').html(html.text());
			$.each(html.find('p'), function() {
				if ($(this).html().length == 0) {
					$(this).remove();
				}
			});
		}
        setTimeout(function(){
            var html2 = $('.training_module .wys');
            //$('.training_module .wys').text( htmlUnescape( htmlUnescape( html2.text() ) ) );

            $('.training_module .wys').html( data.contents );

            if( data.video !== null && data.video.length > 0 ){
                data.videos = '<div class="codebox"><b> Video </b><br><a href="http://www.youtube.com/v/' + data.video + '" target="_blank"> Click to watch </a><br></div>';
                $('.training_module .wys').html( $('.training_module .wys').html() + data.videos );
            }

            if (data.files.length > 0) {
                data.attach = '<br/><div class="codebox">';

                $.each(data.files, function(i, j) {
                    data.attach += "&lt a onclick=\"getFile(" + this.id + ", \'" + this.filename + "\' );\" href='" + this.pretty_url + "' target='_blank' &gt " + this.filename + " &lt /a &gt(" + this.file_size + ")&lt br/ &gt &lt br/ &gt";
                });
                data.attach +="</div>";

                $('.training_module .wys').html( $('.training_module .wys').html() + data.attach );
            }

            var btnConfirm = "";
            if( data.finished_flag == 99 ){
                btnConfirm = "<a class='confirm confirmationNote' rel='" + data.id + "' onclick='sp.training.finishTopic(" + data.id + ");return false;'> I've Reviewed this </a>";
            }else if( data.finished_flag == 0 ){
                btnConfirm = "<a class='confirm confirmationNote' rel='" + data.id + "' onclick='sp.training.finishTopic(" + data.id + ");return false;'> I've Finished this </a>";
            }else if( data.finished_flag == -99 ){
                btnConfirm = "<b class='confirmationNote'> You are not required to complete this topic </b>";
            }else if( data.finished_flag == 1 ){
                btnConfirm = "<b class='confirmationNote'> You've completed this topic </b>";
            }

            if( typeof data.signatures !== 'undefined'){
                data.sigs = "";
                $.each(data.signatures, function(i, j) {
                    data.sigs += "<div class='title1 regular wide' sign='sign'><img width='40' height='40' src='"
                                    + this.avatar +
                                    "' /><span style='margin-left:10px;font-family: \"Qwigley\",cursive,Arial;font-size:24px;'>this.text</span></div>";
                });
                if( data.finished_flag == 99 || data.finished_flag == 0 ){
                    data.sigs += '<br/><div class="dig_signature"><p>Sign here:</p><input type="text" id="digi_text"><span>By entering your name into this box you are confirming that you have read and agreed to the above.</span></div><div class="title"><span class="fr"><a id="tr_send_signature" onclick = "void(0)" rel="' + data.id + '"><span>Sign</span></a></span></div>';
                }
                $('.training_module .wys').html( $('.training_module .wys').html() + data.sigs );
            }

            if( typeof data.comments !== 'undefined' ){
                data.comms = '<div class="title"><h4>Comments</h4></div>';
                $.each(data.comments, function(i, j) {
                    data.comms += '<div class="title1 regular wide"><img width="40" height="40" src="' + this.avatar + '" /><b style="margin-left:5px;">' + this.name + '</b></div><div class="title1 wide"><span style="padding-left:45px;">' + this.text + '</span></div>';
                });
                data.comms += '<br/><span class="input"><textarea id="tr_comment" style="width: 1243px; height: 44px;"></textarea></span><div class="title"><span class="fr"><a id="tr_send_comment" onclick = "void(0)"><span>Comment</span></a></span></div>';

                $('.training_module .wys').html( $('.training_module .wys').html() + data.comms );
            }
			fixHTML(btnConfirm);
        }, 10);
	}, 500);
}
function fixHTML(btnConfirm){
	setTimeout(function(){
		var tmp = $('.training_module .wys');
		if( typeof tmp.html() == "undefined" ){
			fixHTML(btnConfirm);
		}else{
			var tHtml = tmp.html();
			tHtml = tHtml.replace(/&lt; /g, '<');
			tHtml = tHtml.replace(/ &gt;/g, '>');
			tmp.html( tHtml );
			$('.training_module .wys').html( tmp.html() );
			$('.training_module .wys').parent().parent().append( btnConfirm );
		}
	}, 500 );
}
function test(){
    //console.log("daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
}
ShiftPlanningTraining.prototype.topicstatisticSubEvents = function() {
    //console.log("topicstatisticSubEvents");
	$('.training_topic_stat').html(spView.divLoader());
	if (sp.staff.admin.info.group > 2) {
		sp.showError('You have no permission');
		setTimeout(function() {
			sp.loadSubPage('', 'training', 'sections');
		}, 1500);
		return false;
	}
	setTimeout(function() {
		var data = {}
		for (var i = 0; i < sp.training.trainings[sp.training.tmp_section].modules.length; i++) {
			if (sp.training.tmp_module == sp.training.trainings[sp.training.tmp_section].modules[i].id) {
				data = sp.training.trainings[sp.training.tmp_section].modules[i];
			}
		}
		if (typeof data.employees != 'undefined' && typeof data.employees != null) {
			var emp = [];
			$.each(data.employees, function() {
				this.avatar = sp.getAvatar(this.id);
				emp.push(this);
			})
			$('.training_topic_stat').html($.tmpl($('#te_tr_topic_statistic'), emp));
		} else {
			$('.training_topic_stat').html('No employees on assigned on this topic')
		}
	}, 500);

}

ShiftPlanningTraining.prototype.loadPage = function() {

}