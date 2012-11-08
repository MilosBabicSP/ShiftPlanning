<!-- ID rulez first is "te" shorten from template, next is 2 letter from module name, than 2 letter from page name, than 2 letters from page method -->
<div id="templates">
    <script id="te_da_widget_shift" type="text/x-jquery-tmpl">
        <li style="border-color:#${sp.schedule.getColorsBySchedule(schedule)[schedule_color]}">
            <a href="#">
                <span class="fr">
                    <p>${start_date.formatted}</p>
                    <p>${start_time.time} - ${end_time.time}</p> 
                </span>
                <b>${schedule_name}</b><br/>
                <p>${title}</p>
            </a>
        </li>
    </script>
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
	<div id="te_sc_shift_display_info">
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
		<h3><?=_s('Title');?></h3>
	    </div>
	    <div class="title wide">
		${title}
	    </div>
	    {{/if}}
	    {{if notes.length > 0 }}
	    <div class="title1 regular wide">
		<h3><?=_s('Notes');?></h3>
	    </div>
	    <div class="title wide">
		${notes}
	    </div>
	    {{/if}}
		{{if location != 0}}
                    <div class="title1 regular wide" style="margin-left:-5px;">
                            <h3 class="icoLoc"><?=_s('Remote site');?>:</h3>
                    </div>
                    <div class="title1 wide">
                            <b>${location.name}</b>
                    </div>
                    <div class="title1 wide">
                        <div id="sc_location_iframe">

                        </div>
                        {{if location.notes.length > 0}}
                            <br />
                            ${location.notes}
                        {{/if}}
                    </div>
                    <div class="title1 wide">
                            <a target="_blank" onclick = "void(0)" id="get_directions" href="http://${googleIp}/maps/?f=d&hl=en&geocode=&saddr=${user_location}&daddr=${location.address}&ie=UTF8&z=7&output=embed">Get directions</a>
                    </div>
		{{/if}}
	    {{if employees.length > 0 }}
	    <div class="title1 regular wide">
		<h3><?=_s('Who\'s Working');?></h3>
	    </div>
	    <ul class="acceptors wide">
		{{tmpl(employees) "#te_sc_shift_display_u"}}
	    </ul>
	    {{/if}}
	</div>
	<div id="te_sc_shift_display_publish" class="hidden">
	    <div class="title1 regular wide">
		<div>
		    <span class="radio" value="0"><?=_s('Don\'t notify Employees');?></span>
		</div>
	    </div>
	    <div class="title1 regular wide">
		<div>
		    <span class="radio check"  value="1"><?=_s('Send Notifications to Employees');?></span>
		</div>
	    </div>
	    <div class="title1 regular wide"  value="2">
		<div>
		    <span class="radio"><?=_s('Send Notifications to Employees & Managers');?></span>
		</div>
	    </div>
	    <div class="title1 regular wide"  value="2">
		<div>
		    <span class="checkbox"><?=_s('Include custom message in Notification');?></span>
		</div>
	    </div>
	    <div class="title wide hidden" id="tc_sc_shift_display_publish_textarea">
		<span class="input">
		    <textarea>

		    </textarea>
		</span>
	    </div>
                        </div>

            <div class="hidden" id="te_sc_shift_display_delete">
                 <div class="title1 regular wide">
		<div>
		    <span class="radio check" value=""><?=_s('Only this Shift');?></span>
		</div>
	    </div>
	    <div class="title1 regular wide">
		<div>
		    <span class="radio"  value="following"><?=_s('This shift + All following');?></span>
		</div>
	    </div>
	    <div class="title1 regular wide"  >
		<div>
		    <span class="radio" value="all"><?=_s('All shifts in this series');?></span>
		</div>
	    </div>
	</div>
    </script>
    <script id="te_sc_shifts_names" type="text/x-jquery-tmpl">
        <t>${name}, </t>
    </script>
    <script id="te_sc_shifts" type="text/x-jquery-tmpl">
        <tr shiftId="${id}" class="isShift">
            <td class="dTime" style="background-color: #${sp.schedule.getColorsBySchedule(schedule)[1]}; color: #${sp.schedule.getColorsBySchedule(schedule)[2]}">${start_time.time} - ${end_time.time}</td>
            <td class="dTitle {{if (published == 0 || (published < edited && published != 0)) && perms == 2 && sp.staff.admin.settings.draft == 1}}notPublished{{/if}}">${schedule_name}<br/>{{if typeof employees != 'undefined' && employees != null}}<span>{{tmpl(employees) "#te_sc_shifts_names"}}</span>{{/if}}</td>
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
            <li><span class="date"><b>Shift:</b></span><span class="time">${start_time.time} - ${end_time.time}</span><span class="last"<?=_s('>Worked?');?></span></li>
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
            <h3><?=_s('Title / Notes');?></h3>
        </div>
        <div class="additional">
            <p>${notes}</p>
        </div>
        {{/if}}
    </script>
    <script id="te_rq_os_spr" type="text/x-jquery-tmpl">
        <li>
            <a href="#" rel="${rId}"><img width="43" height="30" src="<?php echo _fCdnPath_;?>images/NextMenu.png"></a>
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
            <h3><?=_s('Title / Notes');?></h3>
        </div>
        <div class="additional">
            <p>${notes}</p>
        </div>
        {{/if}}
    </script>
    <script id="te_rq_os_os" type="text/x-jquery-tmpl">
        <li>
            <a href="#" rel="${rId}"><img width="43" height="30" src="<?php echo _fCdnPath_;?>images/NextMenu.png"></a>
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
            <p><?=_s('Waiting for Manager to Approve.');?></p>
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
            <h3><?=_s('Potentional Acceptors');?></h3>
        </div>
        <div class="traders {{if confirm_before == 1}}confirmBefore{{/if}}">
            {{tmpl(traders.data) "#te_rq_st_mst_s_l"}}
        </div>
    </script>
    <script id="te_rq_st_mst_s_l" type="text/x-jquery-tmpl">
        <div class="title">
            {{if confirmed == 1 && approved == 0}}  
            <ul class="subMenu">
                <li><span><?=_s('Accepted');?></span></li>
                <li class="first">
                    <a href="#" tradeId="${trade_id}" userId="${user}" class="accept" >
                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/request_1.png"></span>
                    </a>
                </li>
                <li class="last">
                    <a href="#" tradeId="${trade_id}" userId="${user}" class="reject" >
                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/request_2.png"></span>
                    </a>
                </li>
            </ul>
            {{/if}}
            {{if (confirmed == -1 && approved == -1) || (confirmed == 1 && approved == -1)}}
            <span class="fr"><?=_s('Rejected');?></span>
            {{else}}
            {{if confirmed == 0 && approved == 0}}
            <span class="fr avaitingST"><?=_s('Awaiting response');?></span>
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
            <a href="#" rel="${rId}"><img width="43" height="30" src="<?php echo _fCdnPath_;?>images/NextMenu.png"></a>
            <span>${schedule_name}</span>
            ${shift_start_date.formatted} <br />
            ${shift_start_time}
        </li>
    </script>
    <script id="te_rq_st_mst" type="text/x-jquery-tmpl">
        <li>
            <a class="fr" href="#" rel="${rId}"><img width="43" height="30" src="<?php echo _fCdnPath_;?>images/NextMenu.png"></a>
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
            {{if start_day.id >= sp.raw.config.today.id}}<a class="fr deleteVacation" href="#" rel="${id}"><img width="43" height="30" src="<?php echo _fCdnPath_;?>images/DelMenu.png"></a>{{/if}}
            <span>${start_day.formatted} - ${end_day.formatted}</span>
            ${total_days + 1} <?=_s('Day(s), Approved');?>
        </li>
    </script>
    <script id="te_rq_va_aa" type="text/x-jquery-tmpl">
        <li id="rq_va_tb_tr_${id}">
            <a class="fr deleteVacation" href="#" rel="${id}"><img width="43" height="30" src="<?php echo _fCdnPath_;?>images/DelMenu.png"></a>
            <span>${start_day.formatted} - ${end_day.formatted}</span>
            ${length} <?=_s('Day(s), Pending');?>
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
                    <b class="fromI"><?=_s('From');?></b><br/>
                    <span>${start_day.formatted}</span>
                </div>
            </li>
            <li class="odd">
                <div>
                    <b class="untilI"><?=_s('Until');?></b><br/>
                    <span>${end_day.formatted}</span>
                </div>
            </li>
        </ul>
        <div class="title1">
            <?=_s('<b>Status:</b> Pending');?>
        </div>
        <div class="title1">
            <b><?=_s('Conflicts');?>:</b>
	    {{if conflicts.count > 0}}
		<br />
		{{tmpl(conflicts.data) "#te_rq_va_ma_co"}}
	    {{else}}
		<br />
		<?php echo _s('No conflicts');?>
	    {{/if}}	
        </div>
    </script>
    <script id="te_rq_va_ma_co" type="text/x-jquery-tmpl">
        <a href="#" class="conflict" rel="${id}">${start_date.formatted}</a> <br />
    </script>
    <script id="te_rq_va_ma" type="text/x-jquery-tmpl">
        <li>
            <a class="fr" href="#" rel="${rId}"><img width="43" height="30" src="<?php echo _fCdnPath_;?>images/NextMenu.png"></a>
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
                    <label><?=_s('Eid');?></label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Ratecard');?></label>
                    <b>{{if typeof hours.ratecard != 'undefined'}}${hours.ratecard.name}{{/if}}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Regular');?></label>
                    <b>${hours.regular.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Special');?></label>
                    <b>${hours.special.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Overtime');?></label>
                    <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Total');?></label>
                    <b>${hours.total.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Cost');?></label>
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
                    <label><?=_s('Eid');?></label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Rate');?></label>
                    <b>${hours.rate}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Regular');?></label>
                    <b>${hours.regular.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Special');?></label>
                    <b>${hours.special.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Overtime');?></label>
                    <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Total');?></label>
                    <b>${hours.total.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Cost');?></label>
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
                    <label><?=_s('Eid');?></label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Position');?></label>
                    <b>${position.name}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Location');?></label>
                    <b>${hours.location.name}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Rate');?></label>
                    <b>${hours.rate}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Ratecard');?></label>
                    <b>{{if typeof hours.ratecard != 'undefined'}}${hours.ratecard.name}{{/if}}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Start Time');?></label>
                    <b>${start_time.time}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('End Time');?></label>
                    <b>${end_time.time}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Regular');?></label>
                    <b>${hours.regular.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Special');?></label>
                    <b>${hours.special.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label<?=_s('>Overtime');?></label>
                    <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Total');?></label>
                    <b>${hours.total.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Cost');?></label>
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
                    <label><?=_s('Eid');?></label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Rate');?></label>
                    <b>&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Regular');?></label>
                    <b>${hours.regular.toFixed(2)}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Special');?></label>
                    <b>${hours.special.toFixed(2)}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Overtime');?></label>
                    <b>${hours.overtime.toFixed(2)}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Total');?></label>
                    <b>${hours.total.toFixed(2)}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Cost');?></label>
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
                    <label><?=_s('Eid');?></label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Position');?></label>
                    <b>${position.name}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Location');?></label>
                    <b>${hours.location.name}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Rate');?></label>
                    <b>${hours.rate}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Ratecard');?></label>
                    <b>{{if typeof hours.ratecard != 'undefined'}}${hours.ratecard.name}{{/if}}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Start Time');?></label>
                    <b>${start_time.time}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('End Time');?></label>
                    <b>${end_time.time}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Regular');?></label>
                    <b>${hours.regular.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Special');?></label>
                    <b>${hours.special.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Overtime');?></label>
                    <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Total');?></label>
                    <b>${hours.total.toFixed(2)}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Cost');?></label>
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
                    <label><?=_s('Eid');?></label>
                    <b>${eid}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Rate');?></label>
                    <b>&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Regular');?></label>
                    <b>${hours.regular.toFixed(2)}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Special');?></label>
                    <b>${hours.special.toFixed(2)}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Overtime');?></label>
                    <b>${hours.overtime.toFixed(2)}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label><?=_s('Total');?></label>
                    <b>${hours.total.toFixed(2)}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label><?=_s('Cost');?></label>
                    <b><span class="currency">$</span>${hours.cost.toFixed(2)}</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_info" type="text/x-jquery-tmpl">
        <li>
            <a href="#" class="fr" rel="${rId}"><img width="43" height="30" src="<?php echo _fCdnPath_;?>images/NextMenu.png"></a>
            
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
	<script id="te_tr_sections" type="text/x-jquery-tmpl">
		<li class="idle">
					<div rel="${id}" onclick = "void(0)" id="tr_touch">
			<div class="oneLine" style="width:80%;overflow:hidden">
                            <b {{if notfinished_count > 0}}style="float:left"{{/if}} >${title}</b>{{if notfinished_count > 0}}<a style="padding-left:10px;"><img style="width:16px;height:16px;padding-bottom:5px;" src="<?php echo _fCdnPath_;?>images/req_1.png"></a> {{/if}}
			</div>
							</div>				
		</li>
	</script>
	<script id="te_tr_statistic" type="text/x-jquery-tmpl">
        <li staffId="${id}" >
            <img width="50" height="50" src="${avatar}" />
            <span>${name} <b {{if stat < 30 }}style="color : #8C1919"{{else}}{{if stat < 100}}style="color : orange"{{else}}style="color : green"{{/if}} {{/if}}>${stat}%</b></span>
        </li>	
	</script>
	<script id="te_tr_topic_statistic" type="text/x-jquery-tmpl">
        <li staffId="${id}" >
            <img width="50" height="50" src="${avatar}" />
            <span>${name}{{if finished == null }} 
							<b><img style="width:16px;height:16px" src="<?php echo _fCdnPath_;?>images/tc_delete.png"></b></span>
						 {{else}}
							{{if typeof outdated != 'undefined' && outdated > 0 }}
								<b><img style="width:16px;height:16px" src="<?php echo _fCdnPath_;?>images/req_1.png"></b></span>
							{{else}}
								<b><img style="width:16px;height:16px" src="<?php echo _fCdnPath_;?>images/tc_approve.png"></b></span>
							{{/if}}								
						{{/if}}
			</span>
        </li>	
	</script>	
	<script id="te_tr_singleSection" type="text/x-jquery-tmpl">
		<li class="idle">
					<div rel="${id}" onclick = "void(0)" id="tr_touch">
			<div class="oneLine" style="width:80%;overflow:hidden;">
                            <b {{if finished_flag != -99}}style="float:left"{{/if}}>${title}</b>{{if finished_flag == 99 || finished_flag == 0}}<a style="padding-left:10px;"><img style="width:16px;height:16px;padding-bottom:5px;" src="<?php echo _fCdnPath_;?>images/req_1.png"></a> 
												{{else}}{{if finished_flag == 1 }} <a style="padding-left:10px;"><img style="width:16px;height:16px;padding-bottom:3px;" src="<?php echo _fCdnPath_;?>images/tc_approve.png"></a> {{/if}}
											{{/if}}
			</div>
							</div>	
	</script>
	<script id="te_tr_module" type="text/x-jquery-tmpl">
		<div class="title" style="display: block;">
			<h3 class="fl">${title}{{if duedate != 0 }} {{if finished_flag == 0 || finished_flag == 99 }}<br><a style="color:${color}">Due date: ${duedate_formated}</a> {{/if}}{{/if}} 
			{{if est_time > 0}} 		
				<br/>	
				<a style="color:green">Est. time : ${est_time} min</a>		
			{{/if}}	
			</h3>
		
		</div>
		<div class="wys" contents="content_${id}" style="border-bottom: 1px solid #DBDBDB; padding-bottom: 10px;">
			${contents}
				&ltbr/&gt
				{{if video != null && video.length > 0}}
					&ltdiv class="codebox"&gt
					&ltb&gt Video &lt/b&gt&ltbr/&gt
					&lta target="_blank" href="http://www.youtube.com/v/${video}"&gt Click to watch&lt/a&gt
					&lt/div&gt
				{{/if}}			
				{{if files!= null && files.length > 0}}
					&ltdiv class="codebox"&gt
					&ltb&gt Attachments &lt/b&gt&ltbr/&gt
					{{each files}}
						&lta target="_blank" href="${$value.secureurl}"&gt${$value.filename}&lt/a&gt (${$value.file_size})&ltbr/&gt
					{{/each}}
				&lt/div&gt
				{{/if}}
				&ltbr/&gt
				{{if finished_flag == 99 }}
					&lta class="confirm" rel="${id}"&gt I've Reviewed this &lt/a&gt
				{{else}}
						{{if finished_flag == 0}}
							&lta class="confirm" rel="${id}"&gt I've Finished this &lt/a&gt
						{{else}}
								{{if finished_flag == -99}}
                                                                &ltb&gt You are not required to complete this topic &lt/b&gt
								{{else}}
										{{if finished_flag == 1}}
                                                                                &ltb&gt You completed this topic &lt/b&gt
										{{/if}}
								{{/if}}
						{{/if}}
				{{/if}}

		</div>
		{{if typeof signatures != 'undefined' }}
		{{each signatures}}
		<div class="title1 regular wide" sign="sign">
				<img width="40" height="40" src="${$value.avatar}" /><span style="margin-left:10px;font-family: 'Qwigley',cursive,Arial;font-size:24px;">${$value.text}</span>
		</div>
		{{/each}}
			{{if finished_flag == 99 || finished_flag == 0 }}
			<br/>
				<div class="dig_signature">
					<p>Sign here:</p>
					<input type="text" id="digi_text">
					<span>By entering your name into this box you are confirming that you have read and agreed to the above.</span>
				</div>
				<div class="title">
				<span class="fr">
					<a id="tr_send_signature" onclick = "void(0)" rel="${id}"><span>Sign</span></a>
				</span>
				</div>
			{{/if}}
		{{/if}}
		
		{{if typeof comments !='undefined' }}
			<div class="title">
				<h4>Comments</h4>
			</div>
			{{each comments}}
			<div class="title1 regular wide">
				<img width="40" height="40" src="${$value.avatar}" /><b style="margin-left:5px;">${$value.name}</b>
			</div>
			<div class="title1 wide"><span style="padding-left:45px;">${$value.text}</span></div>
			{{/each}}
			<br/>
			<span class="input">
				<textarea id="tr_comment" style="width: 1243px; height: 44px;"></textarea>
			</span>
			<div class="title">
			<span class="fr">
				<a id="tr_send_comment" onclick = "void(0)"><span>Comment</span></a>
			</span>
			</div>
		{{/if}}

	</script>
    <script id="te_da_ping" type="text/x-jquery-tmpl">
        <div class="title1 wide" style="background-color: #ebefd6; color: #565551;">
            <div>
                <h3><?=_s('Ping ${name} via Email & SMS');?></h3>
            </div>
        </div>
        <span class="input" >
            <textarea id="da_who_txt" maxlength=140></textarea>
        </span>
        </br>
        <div id="da_who_tmpl">
            <div class="title1 regular wide">
            <?=_s('Late');?>:
            <span><?=_s('You\'re late for a shift. Please contact us right away.');?> {{if company_phone.length != 0}} <?=_s('Phone');?> : ${company_phone}{{/if}}</span>
        </div>

        <div class="title1 regular wide">
            <?=_s('P. Contact');?>:
            <span><?=_s('Please contact ${name} right away.');?> {{if cell_phone.length != 0}}<?=_s('Cell phone');?> : ${cell_phone}{{/if}} </span>
        </div>

        <div class="title1 regular wide">
            <?=_s('B. Contact');?>:
            <span><?=_s('Please contact ${company} right away.');?> {{if company_phone.length != 0}} <?=_s('Phone');?> : ${company_phone}{{/if}}</span>
        </div>

        <div class="title1 regular wide">
            <?=_s('Birthday');?>:
            <span><?=_s('Happy Birthday from everyone at ${company}.');?></span>
        </div>

        <div class="title">
            <span class="fr">
                <a id="da_who_send" href="#">
                    <span><?=_s('Send Ping');?></span>
                </a>
            </span>
        </div>
        </div>
    </script>
    
        <script id="te_da_se_rs" type="text/x-jquery-tmpl">
            <li>
                <span class="names">
                 ${start_date.mname} ${start_date.day}
            </span>
                <span class="time">
                ${start_time.time} - ${end_time.time}
            </span>
            <a class="fr" shiftId="${id}" href="#">
                <img height="30" width="43" src="<?php echo _fCdnPath_;?>images/NextMenu.png">
            </a>
        </li>
    </script>
        <script id="te_da_onnow" type="text/x-jquery-tmpl">
        <li>
            <a href="#" class="fr" userID="${userID}"><img width="43" height="30" src="<?php echo _fCdnPath_;?>images/NextMenu.png"></a>
            
                <img width="30" height="30" src="${avatar}">
                <span class="twoLine">
                ${name}<br/>
                ${position} &raquo; ${start_time} - ${end_time}
            </span>
        </li>
    </script>
    <script id="te_st_list" type="text/x-jquery-tmpl">
        <li staffId="${id}">
            {{if typeof avatar.medium != 'undefined'}}
            <img src="${avatar.medium}" />
            {{else}}
            <img src="<?php echo _fCdnPath_;?>images/no-avatar.png" />
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
		<span><?=_s('In time');?></span>
		${in_time.day} <br/>
		${in_time.time}
	    </div>         
	</div>
	<div class="title">
	    <div>                 
		<span><?=_s('Out time');?></span>
		${out_time.day} <br/>
		${out_time.time}
	    </div>         
	</div>
	<div class="title">
	    <div>                 
		<span><?=_s('Length');?></span>
		${length.total_hours}h
	    </div>         
	</div>
	<div class="title">
	    <div>                 
		<span><?=_s('In location');?></span>
		${in_location}
	    </div>         
	</div>
	<div class="title">
	    <div>                 
		<span><?=_s('Out location');?></span>
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
                <img width="16" height="16" src="<?php echo _fCdnPath_;?>images/tc_sm_clock.png" />
                {{if length.length == 0 }}
                    <span class="tPending" user="${user}">Clock Out</span>
                {{else}}
                    <span class="tEnd">${out.time}</span>
                {{/if}}                
            </span>
			{{if length.length != 0 }}
				<span class="last">${length.hours}h, ${length.mins}min</span>
			{{/if}}
		</li>
    </script>
    <script id="te_tc_dts_li" type="text/x-jquery-tmpl">
        <li class="app_${approved_by}">
            <span class="names"><b>${in_time.day}</b></span>
            <span class="time">
                <span class="tStart">${in_time.time}</span>
                {{if out_time.length != 0 }}
                    <img width="16" height="16" src="<?php echo _fCdnPath_;?>images/tc_sm_clock.png" />
                    <span class="tEnd">${out_time.time}</span>                                       
                {{/if}}
            </span>
            {{if length.length != 0 }}
                <span class="last">${length.hours}h, ${length.mins} min</span>
                {{else}}{{if length.mins != "" && length.length != 0}}
                <span class="last">${length.mins} min</span>
                {{/if}}
            {{/if}}    
        </li>
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
                <img width="43" height="30" src="<?php echo _fCdnPath_;?>images/NextMenu.png" />
            </a>
            <span class="names">${start_date.formatted}</span>
            <span class="time">${start_time.time} - ${end_time.time}</span>
        </li>
    </script>
	<script id="te_da_fi_list" type="text/x-jquery-tmpl">
		<li>
			<div class="title1 wide ${extraclass}" onclick="void(0)" >
				<a target="_blank" rel="${id}"> ${filename}</a> (${file_size})
			</div>
		</li>
	</script>
    <script id="te_da_wa_in" type="text/x-jquery-tmpl">
        <li id="da_in_msg_${id}" class="{{if date_read == 0}}unread{{/if}}">
            <div class="msgHead" messageId="${id}">
                <h5>${subject}</h5>
                <p><span class="fr">${date_sent_formatted.formatted}</span><?=_s('From');?>: ${from.name}</p>
            </div>
            <div class="msgBody">
                <p>{{html message_formatted}}</p>
                <div class="newMsg hidden">
                    <input type="hidden" value="${from.id}" />
                    <label><?=_s('Subject');?></label>
                    <span class="input">
                        <input type="text" name="" value=""/>
                    </span>
                    <label><?=_s('Message');?></label>
                    <span class="input">
                        <textarea></textarea>
                    </span>
                    <div class="title">
                        <span class="fr"><a href="#"><span><?=_s('Send Message');?></span></a></span>
                        <span class="fl"><a href="#"><?=_s('Cancel');?></a></span>
                    </div>
                </div>
                <div class="title">
                    <span class="fr"><a class="butDel" href="#" rel="${id}"><span><?=_s('Delete');?></span></a></span>
                    <span class="fl"><a class="butRpl" href="#" rel="${id}"><?=_s('Reply');?></a></span>
                </div>
            </div>
        </li>
    </script>
    <script id="te_da_wa_me" type="text/x-jquery-tmpl">
        <li id="da_wa_msg_${id}">
            <img width="50" height="50" title="user name" src="${avatar}" />
            <div class="msg">
                <h4>${userName}</h4>
                {{if title.length > 0}}<p>{{html title}}<br /><p><p>{{/if}}{{html post}}</p>
                <span>${time}</span>
            </div>
            {{if owner}}
                <a href="#" class="msgDel" rel="${id}"></a>
            {{/if}}
            <a href="#" class="msgRpl" rel="${id}"></a>
            {{if comments.length > 0}}
            <a href="#" class="cmtCount" rel="${id}"><span class="ico">${comments.length} <?=_s('Comments');?></span><span class="tip"></span></a>
            {{/if}}
            <ul class="cmts">
                {{tmpl(comments) "#te_da_wa_me_co"}}
                <li class="last">
                    <input type="submit" value="" rel="${id}" />
                    <span class="input">
                        <input type="text" name="" value="<?=_s('Write a comment...');?>" />
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
