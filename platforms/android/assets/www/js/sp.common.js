function ShiftPlanning() {
	this.raw = {};
	//api cals
	this.apiCalls = {};
	this.successMessage = '';
	this.hashChange = true;
	if (typeof gap == 'undefined') {
		this.initialize();
	}
	this.appendToken = false;
	return this;
}

ShiftPlanning.prototype = {
	multiApi: function(calls, callback) {
		console.log("MULTI API: calls => " + JSON.stringify(calls) + ( new Date ) );
		var data = {};
		var reqs = [];

        var tmpToken = "";
        if (user.token != "") {
            tmpToken = user.token;
        }

		$.each(calls, function(index, item) {

			var call = {
				module: item[0],
				method: item[1]
			};

            if ( tmpToken != "") {
                call.token = tmpToken;
            }

			$.each(item[2], function(argIndex, argItem) {
				call[argIndex] = argItem;
			});

			reqs.push(call);
		});

		/** apiKey is defined in gapConfig.js */
        data.key = apiKey;
        data.request = reqs;

		var tmp22 = 'key=' + apiKey + '&multi=1&data=' + encodeURIComponent(JSON.stringify(data));

		if ( tmpToken != "") {
			tmp22 += '&token=' + tmpToken;
		}
		
		
		console.log("MULTI API: calls => " + JSON.stringify(tmp22) );
		
		
		var xhr = $.ajax({
			url: _server + 'index.php',
			dataType: 'json',
			type: 'post',
			data: tmp22,
			cache: false,
			success: function(response) {
                console.log("MULTI RESPONSE => " + JSON.stringify(response));
				$.each(response, function(i, item) {
                    //console.log("MULTI RESPONSE TOKEN=> " + item.token );

					if (item.status == 3) {
                        window.localStorage.removeItem('shiftplanning_mobile_usertoken');
						setCookie('shiftplanning_mobile_usertoken', "", cookieExpire);
						user.token = "";
						//sp.hash('logout');
						user.loggedIn = 0;
						user.name = '';
						user.company = '';
						sp.staff.data.employees = {};
                        logUserOutClearData();
						//window.location.reload();
						return false;
					}
				});
				if (typeof callback == 'function') {
					callback.call(this, response);
				}
			},
            error: function(errData, t, m) {
                sp.hashChange = true;
                $('.bigLoader2').hide();
                console.log("############## Api connection Error in MULTI: " + JSON.stringify(errData) + ", t => " + JSON.stringify(t) + ", m => " + JSON.stringify(m));
                alert("############## Api connection Error in MULTI: " + JSON.stringify(errData) + ", t => " + JSON.stringify(t) + ", m => " + JSON.stringify(m));
            }
		});
	},
	api: function(module, method, arguments, callback, errorCallback) {
		var self = this;

		//check is same api call runing and if it's running don't alow new one
		var a = module + '.' + method + '.' + JSON.stringify(arguments);
		if (typeof this.apiCalls[a] != 'undefined' && this.apiCalls[a] != null) {
			//console.log("API call has already been sent. " + a);
			return false;
		}

		/** apiKey is defined in gapConfig.js */
		var data = {
		    key: apiKey,
			module: module,
			method: method
		};

        if ( user.token != "" ) {
            data.token = user.token;
		}

		$.each(arguments, function(index, item) {
			data[index] = item;
		});

        console.log("SINGLE REQUEST => " + JSON.stringify( data ) );
        data = encodeURIComponent(JSON.stringify( data ));

		this.apiCalls[a] = $.ajax({
			url: _server + 'index.php',
			dataType: 'json',
			type: 'post',
			data: "data="+data,
			cache: false,
			success: function(response) {
                console.log("SINGLE RESPONSE => " + JSON.stringify(response) );
				self.apiCalls[a] = null;
				var closeLoader = true;
				$.each(self.apiCalls, function(i, item) {
					if (item != null) {
						closeLoader = false;
					}
				});
				if (closeLoader) {
					//$('.bigLoader').hide();
					self.apiCalls = {};
				}
				if( response == null ){
					callback.call(this, "");
					return true;
				}
				if (response.status == 3) {
                    console.log("API STATUS => 3, RESPONSE => " +  JSON.stringify( response ) );
					//We are not logged in!
//					  sp.hash('logout');
                    window.localStorage.removeItem('shiftplanning_mobile_usertoken');
					setCookie('shiftplanning_mobile_usertoken', "", cookieExpire);
					user.token = "";
					user.loggedIn = 0;
					user.name = '';
					user.company = '';
					self.staff.data.employees = {};

                    logUserOutClearData();
				} else if (response.status == 1) {
					if (typeof callback == 'function') {
						if (response.data == false || response.data == null) {
							response.data = [];
						}
                        user.token = response.token;
                        callback.call(this, response);
                    }
				} else {
                    console.log("API STATUS != 1, RESPONSE => " +  JSON.stringify( response ) );
					if (typeof errorCallback == 'function') {
						errorCallback.call(this, response);
					}
				}
			},
			error: function(errData, t, m) {
				console.log("############## Api connection Error: " + JSON.stringify(errData) + ", t => " + JSON.stringify(t) + ", m => " + JSON.stringify(m));

                sp.hashChange = true;
                //alert("There has been a problem with an internet connection. Please check it and try again.");
                sp.showError(_s('There has been a problem with an internet connection. Please check it and try again.'));
				self.apiCalls[a] = null;
                $('.bigLoader2').hide();
				if (typeof errorCallback == 'function') {
					errorCallback.call(this, errData);
				}
				return false;
			}

		});
	},
	loadPage: function(page) {
		//Load the page from the module, handle this a little better
		if (user.loggedIn) {
			if (typeof this[page] != 'undefined') {
				$('#pages #' + page + ' > div').hide();
				$('#pages #' + page).show();
				$('.subNavigation > div').hide();
				$('.subNavigation > div.' + page).show();
				$('.subNavigation > div.' + page + ' li:first a').trigger(clickEvent);
				this[page].loadPage();
			} else {
                //console.log(page+ ' page does not exist.');
			}
		}
	},
	nl2br: function(str) {
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
	},
	map: function(data) {
		if (data == null) {
			return {};
		}
		var obj = {};
		$.each(data, function() {
			obj['' + this.id] = this;
		});
		return obj;
	},
	hash: function(newHash) {
		if (newHash == window.location.hash.substring(1)) {
			return window.location.hash.substring(1);
		}
		if (typeof newHash != 'undefined') {
			window.location.hash = newHash;
		}
		return window.location.hash.substring(1);
	},
	outerHtml: function(obj) {
		return $('<div>').append(obj.clone()).remove().html();
	},
	hasPermission: function(needed) {
		var perm = this.staff.admin.info.group;
		if (perm <= needed) {
			return true;
		} else {
			return false;
		}
	},
	currentTime: function() {
		var currentTime = new Date();
		return months[currentTime.getMonth()] + ' ' + currentTime.getDate() + ', ' + currentTime.getFullYear() + ' - ' + currentTime.getHours() + ':' + ((currentTime.getMinutes().length == 1) ? '0' + currentTime.getMinutes() : currentTime.getMinutes());
	},
	currentUnixTime: function() {
		var foo = new Date; // Generic JS date object
		var unixtime_ms = foo.getTime(); // Returns milliseconds since the epoch
		var unixtime = parseInt(unixtime_ms / 1000);
		return unixtime;
	},
	date: function(timestamp) {
		var d = new Date(timestamp);
		return d.getDate();
	},
	correctTime: function(time) {
		if (time < 10) {
			return '0' + time;
		} else {
			return time;
		}
	},
	strReplace: function(search, replace, subject, count) {
		var i = 0,
				j = 0,
				temp = '',
				repl = '',
				sl = 0,
				fl = 0,
				f = [].concat(search),
				r = [].concat(replace),
				s = subject,
				ra = Object.prototype.toString.call(r) === '[object Array]',
				sa = Object.prototype.toString.call(s) === '[object Array]';
		s = [].concat(s);
		if (count) {
			this.window[count] = 0;
		}

		for (i = 0, sl = s.length; i < sl; i++) {
			if (s[i] === '') {
				continue;
			}
			for (j = 0, fl = f.length; j < fl; j++) {
				temp = s[i] + '';
				repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
				s[i] = (temp).split(f[j]).join(repl);
				if (count && s[i] !== temp) {
					this.window[count] += (temp.length - s[i].length) / f[j].length;
				}
			}
		}
		return sa ? s : s[0];
	},
	getAvatar: function(id) {
		if (typeof id == 'undefined') {
			id = sp.staff.admin.info.id;
		}
		return (typeof sp.staff.data.employees[id] != 'undefined' && typeof sp.staff.data.employees[id].avatar != 'undefined' && sp.staff.data.employees[id].avatar != '' && typeof sp.staff.data.employees[id].avatar.small != 'undefined') ? sp.staff.data.employees[id].avatar.small : 'images/no-avatar.png';
	},
	isL: function(data) {
		if ($.trim(data).length > 0) {
			return true;
		} else {
			return false;
		}
	},
	isC: function(sel) {
		return $(sel).hasClass('check');
	},
	countObject: function(obj) {
		var c = 0;
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				c++;
			}
		}
		return c;
	},
	countResponse: function(res) {
		if (typeof res.length == 'undefined') {
			return this.countObject(res);
		} else {
			return res.length;
		}
	},
	objToArray: function(res) {
		if (typeof res == 'object') {
			var r = [];
			$.each(res, function(i, item) {
				r.push(item);
			})
			res = r;
		}

		return res;
	}
}


