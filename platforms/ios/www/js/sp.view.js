var ShiftPlanningView = function() {

}

ShiftPlanningView.prototype.optionSchedules = function(id, m, loc) {
	if (typeof m == 'undefined') {
		m = false;
	}
	if (typeof loc == 'undefined') {
		loc = false;
	}
	var opt;
	var self = this;
	var data;
	if (typeof id == 'undefined' || id == 0) {
		data = spModel.schedule.allSchedules();
	} else {
		data = spModel.schedule.schedulesByUser(id, loc);
	}
	if (!m) {
		opt = '<option disabled="disabled" selected="selected" value="0">' + _('Select Schedule') + '</option>';
	} else {
		opt = '<option disabled="disabled" selected="selected" value="0">' + _('Select Schedule') + '</option>';
	}
    var loc2 = "";
	if (!loc) {
		$.each(data, function(i, item) {
            loc2 = parseInt(i);
            if( isNaN(loc2) ){
                loc2 = "";
            }else{
                loc2 = sp.schedule.getLocationName(loc2);
            }
			if (self.checkPerm(item)) {
				opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + " " + loc2 + '</option>';
			}
		});
	} else {
		$.each(data, function(i, item) {
			opt += '<optgroup label="' + item.name + '">';
			$.each(item.data, function(iL2, itemL2) {
				opt += '<option value="' + itemL2.id + '">' + itemL2.name + '</option>';
			});
			opt += '</optgroup>';
		});
	}


	return opt;
}

ShiftPlanningView.prototype.getEmployeeData = function(employee) {
    var newItem;

    if (typeof employee !== 'object') {
        newItem = {
            id: 0,
            name: employee
        };
    } else {
        newItem = employee;
    }

    return newItem;
};

ShiftPlanningView.prototype.generateList = function(event, notAdmin, list) {
    var opt, item;

    $('#tc_act_em').html('');

    if (!notAdmin) {
        $.each(list, function(i, employee) {
            item = spView.getEmployeeData(employee);

            $('<option />', {
                value: item.id,
                html: item.name
            }).appendTo('#tc_act_em');
        }.bind(this));
    } else {
        item = {
            id: sp.staff.admin.info.id,
            name: sp.staff.admin.info.name
        };

        $('<option />', {
            value: item.id,
            html: item.name
        }).appendTo('#tc_act_em');
    }

    setTimeout(function() {
        $('#tc_act_em:visible option[value="' + user.id + '"]').attr('selected', true);
    }, 10);
};

ShiftPlanningView.prototype._staffOption = function(notAdmin) {
    if (sp.staff.admin.info.group == 4) {
        $.event.trigger('staff_list_load', [notAdmin, sp.staff.fixed.employees]);
    } else {
        $.event.trigger('staff_list_load', [notAdmin, sp.staff.raw.employees]);
    }
};


ShiftPlanningView.prototype.staffOption = function(notAdmin) {
	if (typeof notAdmin == 'undefined') {
		notAdmin = false;
	}
	var opt;
	if (notAdmin == false) {
		opt = '<option disabled="disabled" selected="selected" value="0">Select Employee</option>';
		var l;
		if (sp.staff.admin.info.group == 4) {
			l = sp.staff.fixed.employees;
		} else {
			l = spModel.staff.allStaff();
		}
		$.each(l, function(i, item) {
			opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
		});
	} else {
		opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
	}
	return opt;
}

ShiftPlanningView.prototype.staffMessagesOption = function(notAdmin){
    if (typeof notAdmin == 'undefined'){
        notAdmin = false;
    }
    var opt;
    if (notAdmin == false){
        opt = '<option disabled="disabled" selected="selected" value="0">Select Employee</option>';

        var l = sp.staff.pvtMsg;

        $.each(l, function(i, item){
            opt += '<option value="' + i + '">' + item + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.staffFilter = function(notAdmin) {
	if (typeof notAdmin == 'undefined') {
		notAdmin = false;
	}
	var opt = '';
	if (notAdmin == false) {
		if (sp.staff.admin.info.group <= 3) {
			opt = '<option value="0">All Employees</option>';
		}
		var l;

		if (sp.staff.admin.info.group == 4) {
			l = sp.staff.fixed.employees;
		} else {
			l = spModel.staff.allStaff();
		}
		$.each(l, function(i, item) {
			opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
		});
	} else {
		opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
	}
	return opt;
}

ShiftPlanningView.prototype.scheduleFilter = function(id, deep) {
	if (typeof deep == 'undefined') {
		deep = false;
	}
	var self = this;
	var opt = '';
	var data;
	if (typeof id == 'undefined' || id == 0) {
		data = spModel.schedule.allSchedules();
	} else {
		data = spModel.schedule.schedulesByUser(id);
	}
	if (sp.staff.admin.info.group <= 3) {
		opt = '<option value="0">All Positions</option>';
	}

    var loc = "";
	$.each(data, function(i, item) {
		if (self.checkPerm(item, deep)) {
            loc = parseInt(i);
            if( isNaN(loc) ){
                loc = "";
            }else{
                loc = sp.schedule.getLocationName(loc);
            }
			opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + " " + loc + '</option>';
		}
	});

	return opt;
}

ShiftPlanningView.prototype.schedulerFilter = function(id, deep) {
	if (typeof deep == 'undefined') {
		deep = false;
	}
	var self = this;
	var data;
	if (typeof id == 'undefined' || id == 0) {
		data = spModel.schedule.allSchedules();
	} else {
		data = spModel.schedule.schedulesByUser(id);
	}
	var opt = '';
    var loc = "";

	$.each(data, function(i, item) {
		if (self.checkPerm(item, deep)) {
            loc = parseInt(i);
            if( isNaN(loc) ){
                loc = "";
            }else{
                loc = sp.schedule.getLocationName(loc);
            }
			opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + " " + loc + '</option>';
		}
	});

	return opt;
}

ShiftPlanningView.prototype.skillsFilter = function(notAdmin) {
	if (typeof notAdmin == 'undefined') {
		notAdmin = false;
	}
	var opt;
	if (notAdmin == false) {
		opt = '<option value="0">All Skills</option>';
		$.each(spModel.staff.allSkills(), function(i, item) {
			opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
		});
	} else {
		opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
	}
	return opt;
}

ShiftPlanningView.prototype.locationSelector = function(type) {
	if (typeof type == 'undefined') {
		type = 2;
	}
	var opt = '<option value="0" selected="selected">' + ((type == 1) ? 'Select Location' : 'Select Work Site') + '</option>';
	opt += '<optgroup lable="locations">';
	$.each(spModel.location.locationsList(), function(i, item) {
		if (item.type == type) {
			opt += '<option value="' + item.id + '">' + item.name + '</option>';
		}
	});
	opt += '</optgroup><optgroup><option value="add" type="' + type + '">' + ((type == 1) ? 'New Location?' : 'New Work Site?') + '</option></optgroup>';
	return opt;
}

ShiftPlanningView.prototype.locationFields = function( type ){
  if (typeof type == 'undefined'){
    type = 2;
  }

  var html = '<option value="0" selected="selected"> ' + ((type == 1) ? 'Select Location' : 'Select Work Site') + ' </option>'
  $.each(spModel.location.locationsList(), function(i, item){
    if (item.type == type){
      html += '<option value="' + item.id + '">' + item.name + '</option>';
    }
  });
  return html;
} 
ShiftPlanningView.prototype.timeRanges = function() {
	var times = spRanges.createSelector('times');
	var res = '<option value="-1">Select</option>';
	$.each(times, function(i, item) {
		res += '<option value="' + i + '" >' + item + '</option>';
	});

	return res;
}

ShiftPlanningView.prototype.customFields = function(employee) { //gets employees custom fields and sends it to #da_se_ov_cu
	var l = '';
	var ch = '';
	var res = '';
	var br = 2;
	var c = '';
	if (typeof employee.custom != 'undefined') {
		$.each(employee.custom, function(i, item) {
			if (item.toggle == 1) {
				c = 'check';
			}

			if (item.type != 4) {
				l += '<li>';
				l += '<div>';
				switch (item.type) {
					case '1':
						item.value = item.value == null ? '' : item.value;
						l += '<label>' + item.name + ': <h4>' + item.value + '</h4></label>';
						break;
					case '2':
						item.text = item.text == null ? '' : item.text;
						l += '<label>' + item.name + ': <h4>' + item.text + '</h4></label>';
						break;
					case '3':
						item.value = item.value == null ? '' : item.value;
						l += '<label>' + item.name + ': <h4>' + item.value + '</h4></label>';
						break;
				}
				l += '</div>';
				l += '</li>';
			} else {
				ch += '<li>'
//            class="' + ((br % 2 == 0) ? 'even' : 'odd') + '">';
				ch += '<span item="edit" class="checkbox ' + c + '" id=' + item.id + '>' + item.name + '</span>';
				ch += '</li>';
				br++;
				c = '';

			}

		});
	}
	res = l + ch;
	return (res.length > 0) ? res : this.emptyResult(_s('No custom fields to display'), 'li', 'noBorder');
}

ShiftPlanningView.prototype.editableCustomFields = function(employee) { //makes custom fields editable
	var l = '', ch = '';
	var res = '';
	var br = 2;
	var c = '';
	if (typeof employee.custom != 'undefined') {
		$.each(employee.custom, function(i, item) {
			if (item.toggle == 1) {
				c = 'check';
			}
			if (item.type != 4) {
				l += '<li>';
				l += '<div>';
				switch (item.type) {
					case '1':
						l += '<label>' + item.name + ':</label><span class="input"><input item="edit" id="' + item.id + '" type="text" value="' + item.value + '" name=""></span>';
						break;
					case '2':
						l += '<label>' + item.name + ':</label><span class="input"><input item="edit" id="' + item.id + '" type="text" value="' + item.text + '" name=""></span>';
						break;
					case '3':
						l += '<label>' + item.name + ':</label>';
						l += '<span class="input"><select item="edit" id="' + item.id + '">';
						l += '<option>' + item.value + '</option>';
						var option = new Array();  // this will return an array with options from item.values
						option = item.values.split(",");
						$.each(option, function(a, opt) {
							l += '<option>' + opt + '</option>';
						});
						l += '</select></span>';
						break;
				}

				l += '</div>';
				l += '</li>';
			} else {
				ch += '<li class="' + ((br % 2 == 0) ? 'even' : 'odd') + '">';
				ch += '<span item="edit" class="checkbox ' + c + '" id=' + item.id + '>' + item.name + '</span>';
				ch += '</li>';
				br++;
				c = '';
			}
		});
		res = l + '<li><ul>' + ch + '</ul></li>';
	}

	return (res.length > 0) ? res : this.emptyResult(_s('No custom fields to display'), 'li', 'noBorder');
}

ShiftPlanningView.prototype.editableSchedules = function(employee) {
	var l = '';
	var i = 2;
	$.each(spModel.schedule.allSchedules(), function(i2, item) {
		var c = (typeof employee.schedules != 'undefined' && typeof employee.schedules[item.id] != 'undefined') ? 'check"' : '';
		l += '<li class="' + ((i % 2 == 0) ? 'even' : 'odd') + '">';
		l += '  <div>';
		l += '      <span class="checkbox ' + c + '" itemId=' + item.id + '>' + item.name + sp.schedule.getLocationName(item.id) + '</span>';
		l += '  </div>';
		l += '</li>';
		i++;
	});

	return (l.length > 0) ? l : this.emptyResult(_s('No positions to display'), 'li', 'noBorder');
}

ShiftPlanningView.prototype.editableSkills = function(employee) {
	var l = '';
	var i = 2;
	$.each(spModel.staff.allSkills(), function(i2, item) {
		var c = (typeof employee.skills != 'undefined' && typeof employee.skills[item.id] != 'undefined') ? 'check' : '';
		l += '<li class="' + ((i % 2 == 0) ? 'even' : 'odd') + '">';
		l += '  <div>';
		l += '      <span class="checkbox ' + c + '" itemId=' + item.id + '>' + item.name + '</span>';
		l += '  </div>';
		l += '</li>';
		i++;
	});
	sp.fixCheckboxes();
	return (l.length > 0) ? l : this.emptyResult(_s('No skills to display'), 'li', 'noBorder');
}

ShiftPlanningView.prototype.ulLoader = function() {
	return '<li class="loading"></li>';
}

ShiftPlanningView.prototype.divLoader = function() {
	return '<div class="loading"></div>';
}

ShiftPlanningView.prototype.emptyResult = function(text, tag, cl) {
	if (typeof cl == 'undefined') {
		cl = '';
	}
	if (typeof tag == 'undefined') {
		tag = 'div'
	}
	if (typeof text == 'undefined') {
		text = _s('Na data for selected criteria!');
	}
	
	return '<' + tag + ' class="additional ' + cl + '"><p>' + text + '</p></' + tag + '>'
}

ShiftPlanningView.prototype.checkPerm = function(item, deep) {
	if (typeof deep == 'undefined') {
		deep = false;
	}
	var c = 1;
	if (deep) {
		c = 2;
	}
	var perm = true;
	if (typeof item.perms != 'undefined') {
		if (item.perms >= c) {
			perm = true;
		} else {
			perm = false;
		}
	}
	return perm;
}

ShiftPlanningView.prototype.fixCurrency = function(cId, r) {
	if (typeof r == 'undefined') {
		r = false;
	}
	var c = spRanges.currencies[cId];

	if (!r) {
		$('span.currency').html(c);
	} else {
		return c;
	}

}

ShiftPlanningView.prototype.bbc2HTML = function(S) {
	if (S.indexOf('[') < 0)
		return S;

	function X(p, f) {
		return new RegExp(p, f)
	}
	function D(s) {
		return rD.exec(s)
	}
	function R(s) {
		return s.replace(rB, P)
	}
	function A(s, p) {
		for (var i in p)
			s = s.replace(X(i, 'g'), p[i]);
		return s;
	}

	function P($0, $1, $2, $3) {
		if ($3 && $3.indexOf('[') > -1)
			$3 = R($3);
		switch ($1) {
			case 'url':
			case 'anchor':
			case 'email':
				return '<a ' + L[$1] + ($2 || $3) + '">' + $3 + '</a>';
			case 'img':
				var d = D($2);
				return '<img src="' + $3 + '"' + (d ? ' width="' + d[1] + '" height="' + d[2] + '"' : '') + ' alt="' + (d ? '' : $2) + '" />';
			case 'flash':
			case 'youtube':
				var d = D($2) || [0, 425, 366];
				return '<object type="application/x-shockwave-flash" data="' + Y[$1] + $3 + '" width="' + d[1] + '" height="' + d[2] + '"><param name="movie" value="' + Y[$1] + $3 + '" /></object>';
			case 'float':
				return '<span style="float: ' + $2 + '">' + $3 + '</span>';
			case 'left':
			case 'right':
			case 'center':
			case 'justify':
				return '<div style="text-align: ' + $1 + '">' + $3 + '</div>';
			case 'google':
			case 'wikipedia':
				return '<a href="' + G[$1] + $3 + '">' + $3 + '</a>';
			case 'b':
			case 'i':
			case 'u':
			case 's':
			case 'sup':
			case 'sub':
			case 'h1':
			case 'h2':
			case 'h3':
			case 'h4':
			case 'h5':
			case 'h6':
			case 'table':
			case 'tr':
			case 'th':
			case 'td':
				return '<' + $1 + '>' + $3 + '</' + $1 + '>';
			case 'row':
			case 'r':
			case 'header':
			case 'head':
			case 'h':
			case 'col':
			case 'c':
				return '<' + T[$1] + '>' + $3 + '</' + T[$1] + '>';
			case 'acronym':
			case 'abbr':
				return '<' + $1 + ' title="' + $2 + '">' + $3 + '</' + $1 + '>';
		}
		return '[' + $1 + ($2 ? '=' + $2 : '') + ']' + $3 + '[/' + $1 + ']';
	}

	var rB = X('\\[([a-z][a-z0-9]*)(?:=([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]', 'g'), rD = X('^(\\d+)x(\\d+)$');
	var L = {
		url: 'href="',
		'anchor': 'name="',
		email: 'href="mailto: '
	};
	var G = {
		google: 'http://www.google.com/search?q=',
		wikipedia: 'http://www.wikipedia.org/wiki/'
	};
	var Y = {
		youtube: 'http://www.youtube.com/v/',
		flash: ''
	};
	var T = {
		row: 'tr',
		r: 'tr',
		header: 'th',
		head: 'th',
		h: 'th',
		col: 'td',
		c: 'td'
	};
	var C = {
		notag: [{
				'\\[': '&#91;',
				']': '&#93;'
			}, '', ''],
		code: [{
				'<': '&lt;'
			}, '<code><pre>', '</pre></code>']
	};
	C.php = [C.code[0], C.code[1] + '&lt;?php ', '?>' + C.code[2]];
	var F = {
		font: 'font-family:$1',
		size: 'font-size:$1px',
		color: 'color:$1'
	};
	var U = {
		c: 'circle',
		d: 'disc',
		s: 'square',
		'1': 'decimal',
		a: 'lower-alpha',
		A: 'upper-alpha',
		i: 'lower-roman',
		I: 'upper-roman'
	};
	var I = {}, B = {};

	for (var i in C)
		I['\\[(' + i + ')]((?:.|[\r\n])*?)\\[/\\1]'] = function($0, $1, $2) {
			return C[$1][1] + A($2, C[$1][0]) + C[$1][2]
		};
	for (var i in F) {
		B['\\[' + i + '=([^\\]]+)]'] = '<span style="' + F[i] + '">';
		B['\\[/' + i + ']'] = '</span>';
	}
	B['\\[list]'] = '<ul>';
	B['\\[list=(\\w)]'] = function($0, $1) {
		return '<ul style="list-style-type: ' + (U[$1] || 'disc') + '">'
	};
	B['\\[/list]'] = '</ul>';
	B['\\[/\\*]'] = '</li>';
	B['\\[quote(?:=([^\\]]+))?]'] = function($0, $1) {
		return '<div class="bb-quote">' + ($1 ? $1 + ' wrote' : 'Quote') + ':<blockquote>'
	};
	B['\\[/quote]'] = '</blockquote></div>';
	B['\\[(hr|br)]'] = '<$1 />';
	B['\\[sp]'] = '&nbsp;';
	return R(A(A(S, I), B));
}

ShiftPlanningView.prototype.friendly_filesize = function(bytes) {
	var labels = new Array('TB', 'GB', 'MB', 'kB', 'b');
	var measurements = new Array(1099511627776, 1073741824, 1048576, 1024, 1);
	for (var i = 0; i < measurements.length; i++) {
		var conv = bytes / measurements[i];
		if (conv > 1) {
			return Math.round(conv * 10) / 10 + ' ' + labels[i];
		}
	}
}

var spView = new ShiftPlanningView();
$(document).on('staff_list_load', spView.generateList);