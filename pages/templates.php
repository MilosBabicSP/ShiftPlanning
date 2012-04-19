
<!-- ID rulez first is "te" shorten from template, next is 2 letter from module name, than 2 letter from page name, than 2 letters from page method -->
<div id="templates">
    <script id="te_sc_usersU" type="text/x-jquery-tmpl">
        <li ><div><span class="checkbox disabled" user="${id}">${name}</span></div></li>
    </script>
    <script id="te_sc_usersW" type="text/x-jquery-tmpl">
        <li ><div><span class="checkbox check" user="${id}">${name}</span></div></li>
    </script>
    <script id="te_sc_users" type="text/x-jquery-tmpl">
        <li ><div><span class="checkbox" user="${id}">${name}</span></div></li>
    </script>
    <script id="te_sc_shifts_months" type="text/x-jquery-tmpl">
        <tr>
            <td colspan="2" class="dTime" >${dateToday}</td>
        </tr>
        {{if typeof shifts != 'undefined'}}
            {{tmpl(shifts) "#te_sc_shifts"}}
        {{/if}}
    </script>
    <script id="te_sc_shift_display_u" type="text/x-jquery-tmpl">
        <li>
            <img src="${avatar}" />
            <span>${name}</span>
        </li>
    </script>
    <script id="te_sc_shift_display" type="text/x-jquery-tmpl">
        <div class="title1 wide" style="background-color: #${sp.schedule.getColorsBySchedule(schedule)[1]}; color: #${sp.schedule.getColorsBySchedule(schedule)[2]}">
            <h3>${schedule_name}</h3>
        </div>
        <div class="title wide">
            <div>
                <span>${start_date.weekday}, ${start_date.formatted}</span>
                ${start_time.time} - ${end_time.time}
            </div>
        </div>
        {{if title.length > 0 }}
        <div class="title1 regular wide">
            <h3>Title</h3>
        </div>
        <div class="title wide">
            ${title}
        </div>
        {{/if}}
        {{if notes.length > 0 }}
        <div class="title1 regular wide">
            <h3>Notes</h3>
        </div>
        <div class="title wide">
            ${notes}
        </div>
        {{/if}}
        {{if employees.length > 0 }}
        <div class="title1 regular wide">
            <h3>Who's Working</h3>
        </div>
        <ul class="acceptors wide">
            {{tmpl(employees) "#te_sc_shift_display_u"}}
        </ul>
        {{/if}}
    </script>
    <script id="te_sc_shifts_names" type="text/x-jquery-tmpl">
        <t>${name}, </t>
    </script>
    <script id="te_sc_shifts" type="text/x-jquery-tmpl">
        <tr shiftId="${id}" class="isShift">
            <td class="dTime" style="background-color: #${sp.schedule.getColorsBySchedule(schedule)[1]}; color: #${sp.schedule.getColorsBySchedule(schedule)[2]}">${start_time.time} - ${end_time.time}</td>
            <td class="dTitle {{if published == 0 && perms == 2}}notPublished{{/if}}">${schedule_name}<br/>{{if employees != null}}<span>{{tmpl(employees) "#te_sc_shifts_names"}}</span>{{/if}}</td>
        </tr>
    </script>
    <script id="te_rq_sa_s_in" type="text/x-jquery-tmpl">
        <li shiftId="{{if typeof shift.id != 'undefined'}}${shift.id}{{else}}${shift.shift}{{/if}}" userId="${id}" class="save">
            <span class="quarter">${name}</span>
            <span class="quarter even">
                <span class="input">
                    <input type="text" value="${shift.start_time.time}" class="shiftStartInput" />
                </span>
            </span>
            <span class="quarter odd">
                <span class="input">
                    <input type="text" value="${shift.end_time.time}" class="shiftEndInput" />
                </span>
            </span>
            <span class="quarter"><span class="checkbox {{if shift.absent == 0}}check{{/if}}"></span></span>
        </li>
    </script>
    <script id="te_rq_sa_s" type="text/x-jquery-tmpl">
        <ul class="timeSheet">
            <li><span class="date"><b>Shift:</b></span><span class="time">${start_time.time} - ${end_time.time}</span><span class="last">Worked?</span></li>
            {{if employees != null}}
            {{tmpl(employees) "#te_rq_sa_s_in"}}
            {{/if}}
        </ul>
    </script>
    <script id="te_rq_sa_in" type="text/x-jquery-tmpl">
        <li><span class="names">${schedule_name}</span><span class="time">${start_time.time} - ${end_time.time}</span><span class="last"><span class="checkbox" shiftId="${id}"></span></span></li>
    </script>
    <script id="te_rq_sa" type="text/x-jquery-tmpl">
        <div class="title">
            <h3 class="fl">${shiftDate}</h3>
        </div>
        <ul class="timeSheet">
            {{tmpl(shifts) "#te_rq_sa_in"}}
        </ul>
    </script>
    <script id="te_rq_os_spr_s" type="text/x-jquery-tmpl">
        <div class="title wide mar">
            <div>
                <img width="30" height="30" src="${avatar}">
                <span>${user_name}</span>
                ${start_date.formatted}
            </div>
        </div>
        <div class="title1 wide mar">
            <h3>${schedule_name}</h3>
        </div>
        <ul class="requests">
            <li>
                <span>${full.start_time.time} - ${full.end_time.time}</span>
            </li>
        </ul>
        {{if notes.length > 0}}
        <div class="title1 regular wide">
            <h3>Title / Notes</h3>
        </div>
        <div class="additional">
            <p>${notes}</p>
        </div>
        {{/if}}
    </script>
    <script id="te_rq_os_spr" type="text/x-jquery-tmpl">
        <li>
            <a href="#" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span>${start_date}</span>
            ${schedule_name}<br/>
            ${hours}
        </li>
    </script>
    <script id="te_rq_os_os_s" type="text/x-jquery-tmpl">
        <div class="title wide mar">
            <div>
                <span>${start_date.formatted}</span>
            </div>
        </div>
        <div class="title1 wide mar">
            <h3>${schedule_name}</h3>
        </div>
        <ul class="requests">
            <li>
                <span>${start_time.time} - ${end_time.time}</span>
            </li>
        </ul>
        {{if notes.length > 0}}
        <div class="title1">
            <h3>Title / Notes</h3>
        </div>
        <div class="additional">
            <p>${notes}</p>
        </div>
        {{/if}}
    </script>
    <script id="te_rq_os_os" type="text/x-jquery-tmpl">
        <li>
            <a href="#" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span>${start_date.formatted}</span>
            ${schedule_name}<br/>
            ${start_time.time} - ${end_time.time}
        </li>
    </script>
    <script id="te_rq_st_im_s" type="text/x-jquery-tmpl">
        <div class="title">
            <div>
                <img width="30" height="30" src="${avatar}">
                <span>${user_name}</span>
                ${requested.formatted}
            </div>
        </div>
        <div class="title1 sales">
            <h3>${schedule_name}</h3>
        </div>
        <ul class="requests">
            <li>
                <span>${shift_start_time} - ${shift_end_time}</span> <span>${shift_start_date.formatted}</span>
            </li>
        </ul>
        {{if reason.length > 0}}
        <div class="additional">
            <p>${reason}</p>
        </div>
        {{/if}}
    </script>
    <script id="te_rq_st_ap_s" type="text/x-jquery-tmpl">
        <div class="title wide">
            <div>
                <img width="30" height="30" src="${avatar}">
                <span>${user_name}</span>
                ${requested.formatted}
            </div>
        </div>
        <div class="title1 sales wide">
            <h3>${schedule_name}</h3>
        </div>
        <ul class="requests">
            <li>
                <span>${shift_start_time} - ${shift_end_time}</span> <span>${shift_start_date.formatted}</span>
            </li>
        </ul>
        {{if trade_reason.length > 0}}
        <div class="additional">
            <p>${trade_reason}</p>
        </div>
        {{/if}}
        {{if confirmed.length == 1}}
        <div class="additional">
            <p>Waiting for Manager to Approve. </p>
        </div>
        {{/if}}
    </script>
    <script id="te_rq_st_mst_s" type="text/x-jquery-tmpl">
        <div class="title wide mar">
            <div>
                <img width="30" height="30" src="${avatar}">
                <span>${user_name}</span>
                ${requested.formatted}
            </div>
        </div>
        <div class="title1 sales wide mar">
            <h3>${schedule_name}</h3>
        </div>
        <ul class="requests">
            <li>
                <span>${shift_start_time} - ${shift_end_time}</span> <span>${shift_start_date.formatted}</span>
            </li>
        </ul>
        <div class="additional wide mar">
            <p>${reason}</p>
        </div>
        <div class="title1 regular wide mar">
            <h3>Potentional Acceptors</h3>
        </div>
        <div class="traders {{if confirm_before == 1}}confirmBefore{{/if}}">
            {{tmpl(traders.data) "#te_rq_st_mst_s_l"}}
        </div>
    </script>
    <script id="te_rq_st_mst_s_l" type="text/x-jquery-tmpl">
        <div class="title">
            {{if confirmed == 1 && approved == 0}}  
            <ul class="subMenu">
                <li><span>Accepted</span></li>
                <li class="first">
                    <a href="#" tradeId="${trade_id}" userId="${user}" class="accept" >
                        <span><img width="16" height="16" src="images/request_1.png"></span>
                    </a>
                </li>
                <li class="last">
                    <a href="#" tradeId="${trade_id}" userId="${user}" class="reject" >
                        <span><img width="16" height="16" src="images/request_2.png"></span>
                    </a>
                </li>
            </ul>
            {{/if}}
            {{if (confirmed == -1 && approved == -1) || (confirmed == 1 && approved == -1)}}
            <span class="fr">Rejected</span>
            {{else}}
            {{if confirmed == 0 && approved == 0}}
            <span class="fr avaitingST">Awaiting response</span>
            {{/if}}
            {{/if}}
            <div>
                <img width="30" height="30" src="${avatar}">
                <span>${user_name}</span>
            </div>
        </div>
    </script>
    <script id="te_rq_st_ap" type="text/x-jquery-tmpl">
        <li>
            <a href="#" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span>${schedule_name}</span>
            ${shift_start_date.formatted} <br />
            ${shift_start_time}
        </li>
    </script>
    <script id="te_rq_st_mst" type="text/x-jquery-tmpl">
        <li>
            <a class="fr" href="#" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
            <img width="30" height="30" src="${avatar}" />
            <span class="twoLine">
                ${user_name}
                <br />
                ${shift_start_date.formatted} &raquo; ${shift_start_time} - ${shift_end_time}
            </span>
        </li>
    </script>
    <script id="te_rq_va_up" type="text/x-jquery-tmpl">
        <li {{if start_day.id < sp.raw.config.today.id}} class="hidden pastDate"{{/if}} id="rq_va_tb_tr_${id}">
            {{if start_day.id >= sp.raw.config.today.id}}<a class="fr deleteVacation" href="#" rel="${id}"><img width="43" height="30" src="images/DelMenu.png"></a>{{/if}}
            <span>${start_day.formatted} - ${end_day.formatted}</span>
            ${total_days} Day(s), Approved
        </li>
    </script>
    <script id="te_rq_va_aa" type="text/x-jquery-tmpl">
        <li id="rq_va_tb_tr_${id}">
            <a class="fr deleteVacation" href="#" rel="${id}"><img width="43" height="30" src="images/DelMenu.png"></a>
            <span>${start_day.formatted} - ${end_day.formatted}</span>
            ${length} Day(s), Pending
        </li>
    </script>
    <script id="te_rq_va_ma_s" type="text/x-jquery-tmpl">
        <div class="title">
            <div>
                <img width="30" height="30" src="${avatar}">
                <h3>${employee_name}</h3>
            </div>
        </div>
        <ul class="multiInput">
            <li class="even">
                <div>
                    <b class="fromI">From</b><br/>
                    <span>${start_day.formatted}</span>
                </div>
            </li>
            <li class="odd">
                <div>
                    <b class="untilI">Until</b><br/>
                    <span>${end_day.formatted}</span>
                </div>
            </li>
        </ul>
        <div class="title1">
            <b>Status:</b> Pending
        </div>
        <div class="title1">
            <b>Conflicts:</b> <a href="#">${conflicts.count}</a>
        </div>
    </script>
    <script id="te_rq_va_ma" type="text/x-jquery-tmpl">
        <li>
            <a class="fr" href="#" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span>
                <img width="30" height="30" src="${avatar}">
                ${employee_name}
            </span>
        </li>
    </script>
    <script id="te_re_confirmedTimeSheets_1" type="text/x-jquery-tmpl">
        <div class="title">
            <div>
                <img width="30" height="30" src="${avatar}" />
                <span>${employee}</span>
                ${start_date.formatted} - ${end_date.formatted}
            </div>
        </div>
        <ul class="multiInput">
            <li class="even">
                <div>
                    <label>Eid</label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Ratecard</label>
                    <b>{{if typeof hours.ratecard != 'undefined'}}${hours.ratecard.name}{{/if}}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Regular</label>
                    <b>${hours.regular.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Special</label>
                    <b>${hours.special.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Total</label>
                    <b>${hours.total.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Cost</label>
                    <b><span class="currency">$</span>${hours.cost.toFixed(2)}&nbsp;</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_confirmedTimeSheets_0" type="text/x-jquery-tmpl">
        <div class="title">
            <div>
                <img width="30" height="30" src="${avatar}" />
                <span>${employee}</span>
                ${date.formatted}
            </div>
        </div>
        <ul class="multiInput">
            <li class="even">
                <div>
                    <label>Eid</label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Rate</label>
                    <b>${hours.rate}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Regular</label>
                    <b>${hours.regular.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Special</label>
                    <b>${hours.special.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Total</label>
                    <b>${hours.total.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Cost</label>
                    <b><span class="currency">$</span>${hours.cost.toFixed(2)}&nbsp;</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_confirmedHours_0" type="text/x-jquery-tmpl">
        <div class="title">
            <div>
                <img width="30" height="30" src="${avatar}" />
                <span>${employee}</span>
                ${date.formatted}
            </div>
        </div>
        <ul class="multiInput">
            <li class="even">
                <div>
                    <label>Eid</label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Position</label>
                    <b>${position.name}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Location</label>
                    <b>${hours.location.name}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Rate</label>
                    <b>${hours.rate}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Ratecard</label>
                    <b>{{if typeof hours.ratecard != 'undefined'}}${hours.ratecard.name}{{/if}}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Start Time</label>
                    <b>${start_time.time}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>End Time</label>
                    <b>${end_time.time}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Regular</label>
                    <b>${hours.regular.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Special</label>
                    <b>${hours.special.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Total</label>
                    <b>${hours.total.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Cost</label>
                    <b><span class="currency">$</span>${hours.cost.toFixed(2)}&nbsp;</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_confirmedHours_1" type="text/x-jquery-tmpl">
        <div class="title">
            <div>
                <img width="30" height="30" src="${avatar}">
                <span>${employee}</span>
                ${start_date.formatted} - ${end_date.formatted}
            </div>
        </div>
        <ul class="multiInput">
            <li class="even">
                <div>
                    <label>Eid</label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Rate</label>
                    <b>&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Regular</label>
                    <b>${hours.regular.toFixed(2)}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Special</label>
                    <b>${hours.special.toFixed(2)}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime.toFixed(2)}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Total</label>
                    <b>${hours.total.toFixed(2)}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Cost</label>
                    <b><span class="currency">$</span>${hours.cost.toFixed(2)}</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_scheduledHours_0" type="text/x-jquery-tmpl">
        <div class="title">
            <div>
                <img width="30" height="30" src="${avatar}">
                <span>${employee}</span>
                ${date.formatted}
            </div>
        </div>
        <ul class="multiInput">
            <li class="even">
                <div>
                    <label>Eid</label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Position</label>
                    <b>${position.name}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Location</label>
                    <b>${hours.location.name}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Rate</label>
                    <b>${hours.rate}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Ratecard</label>
                    <b>{{if typeof hours.ratecard != 'undefined'}}${hours.ratecard.name}{{/if}}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Start Time</label>
                    <b>${start_time.time}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>End Time</label>
                    <b>${end_time.time}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Regular</label>
                    <b>${hours.regular.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Special</label>
                    <b>${hours.special.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Total</label>
                    <b>${hours.total.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Cost</label>
                    <b><span class="currency">$</span>${hours.cost.toFixed(2)}&nbsp;</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_scheduledHours_1" type="text/x-jquery-tmpl">
        <div class="title">
            <div>
                <img width="30" height="30" src="${avatar}">
                <span>${employee}</span>
                ${start_date.formatted} - ${end_date.formatted}
            </div>
        </div>
        <ul class="multiInput">
            <li class="even">
                <div>
                    <label>Eid</label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Rate</label>
                    <b>&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Regular</label>
                    <b>${hours.regular.toFixed(2)}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Special</label>
                    <b>${hours.special.toFixed(2)}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime.toFixed(2)}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Total</label>
                    <b>${hours.total.toFixed(2)}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Cost</label>
                    <b><span class="currency">$</span>${hours.cost.toFixed(2)}</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_info" type="text/x-jquery-tmpl">
        <li>
            <a href="#" class="fr" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
            
                <img width="30" height="30" src="${avatar}">
                <span class="twoLine">
                ${employee}<br/>
                {{if typeof start_time == 'undefined'}}
                    ${start_date.formatted} - ${end_date.formatted}
                {{else}}
		    {{if typeof start_time.time == 'undefined'}}
			${date.formatted} &raquo; ${start_time} - ${end_time}
		    {{else}}
			${date.formatted} &raquo; ${start_time.time} - ${end_time.time}
		    {{/if}}
                {{/if}}
            </span>
        </li>
    </script>
    <script id="te_st_list" type="text/x-jquery-tmpl">
        <li staffId="${id}">
            {{if typeof avatar.medium != 'undefined'}}
            <img src="${avatar.medium}" />
            {{else}}
            <img src="images/no-avatar.png" />
            {{/if}}
            <span>${name}</span>
        </li>
    </script>
    <script id="te_tc_dtc" type="text/x-jquery-tmpl">
        <div class="title">
            <div>
                <img width="30" height="30" src="${employee.avatar}">
                <span>${employee.name}</span>
                {{if schedule != null}}
                    ${schedule.name}
                {{/if}}
            </div>
        </div>
	<div class="title">
	    <div>                 
		<span>In time</span>
		${in_time.day} <br/>
		${in_time.time}
	    </div>         
	</div>
	<div class="title">
	    <div>                 
		<span>Out time</span>
		${out_time.day} <br/>
		${out_time.time}
	    </div>         
	</div>
	<div class="title">
	    <div>                 
		<span>Length</span>
		${length.total_hours}h
	    </div>         
	</div>
	<div class="title">
	    <div>                 
		<span>In location</span>
		${in_location}
	    </div>         
	</div>
	<div class="title">
	    <div>                 
		<span>Out location</span>
		${out_location}
	    </div>         
	</div>
        {{if notes != null}}
            <div class="additional">
                <p>${notes}</p>
            </div>
        {{/if}}
    </script>
    <script id="te_tc_mts_li_in" type="text/x-jquery-tmpl">
        <li class="s_${status} e_${user} sc_${schedule}" timeclockId="${id}">
            <span class="names">${name}</span>
            <span class="time">
                <span class="tStart">${st.time}</span>
                <img width="16" height="16" src="images/tc_sm_clock.png" />
                {{if length.total_hours == ""}}
                    <span class="tPending" user="${user}">Clock Out</span>
                {{else}}
                    <span class="tEnd">${out.time}</span>
                {{/if}}
                
            </span>
            <span class="last">${length.hours}h, ${length.mins}min</span></li>
    </script>
    <script id="te_tc_mts_li" type="text/x-jquery-tmpl">
        <div class="title">
            <h3 class="fl">${month}</h3>
        </div>
        <ul class="timeSheet">
            {{tmpl(rest) "#te_tc_mts_li_in"}}
        </ul>
    </script>
    <script id="te_da_up_li" type="text/x-jquery-tmpl">
        <li>
            <a class="fr" href="#" rel="${id}">
                <img width="43" height="30" src="images/NextMenu.png" />
            </a>
            <span class="names">${start_date.formatted}</span>
            <span class="time">${start_time.time} - ${end_time.time}</span>
        </li>
    </script>
    <script id="te_da_wa_in" type="text/x-jquery-tmpl">
        <li id="da_in_msg_${id}" class="{{if date_read == 0}}unread{{/if}}">
            <div class="msgHead" messageId="${id}">
                <h5>${subject}</h5>
                <p><span class="fr">${date_sent_formatted.formatted}</span>From: ${from.name}</p>
            </div>
            <div class="msgBody">
                <p>{{html message_formatted}}</p>
                <div class="newMsg hidden">
                    <input type="hidden" value="${from.id}" />
                    <label>Subject</label>
                    <span class="input">
                        <input type="text" name="" value=""/>
                    </span>
                    <label>Message</label>
                    <span class="input">
                        <textarea></textarea>
                    </span>
                    <div class="title">
                        <span class="fr"><a href="#"><span>Send Message</span></a></span>
                        <span class="fl"><a href="#">Cancel</a></span>
                    </div>
                </div>
                <div class="title">
                    <span class="fr"><a class="butDel" href="#" rel="${id}"><span>Delete</span></a></span>
                    <span class="fl"><a class="butRpl" href="#" rel="${id}">Reply</a></span>
                </div>
            </div>
        </li>
    </script>
    <script id="te_da_wa_me" type="text/x-jquery-tmpl">
        <li id="da_wa_msg_${id}">
            <img width="50" height="50" title="user name" src="${avatar}" />
            <div class="msg">
                <h4>${userName}</h4>
                <p>${title}<br /><p>{{html post}}</p></p>
                <span>${time}</span>
            </div>
            {{if owner}}
                <a href="#" class="msgDel" rel="${id}"></a>
            {{/if}}
            <a href="#" class="msgRpl" rel="${id}"></a>
            {{if comments.length > 0}}
            <a href="#" class="cmtCount" rel="${id}"><span class="ico">${comments.length} Comments</span><span class="tip"></span></a>
            {{/if}}
            <ul class="cmts">
                {{tmpl(comments) "#te_da_wa_me_co"}}
                <li class="last">
                    <input type="submit" value="send" rel="${id}" />
                    <span class="input">
                        <input type="text" name="" value="Write a comment..." />
                    </span>
                </li>
            </ul>
        </li>
    </script>
    <script id="te_da_wa_me_co" type="text/x-jquery-tmpl">
        <li class="first">
            <img width="50" height="50" title="user name" src="${avatar}" />
            <div class="msg">
                <h4>${userName}</h4>
                <p>{{html comment}}</p>
                <span>${time}</span>
            </div>
            {{if full && owner}}
            <a href="#" class="msgDel comment" rel="${id}"></a>
            {{/if}}
        </li>
    </script>
</div>
