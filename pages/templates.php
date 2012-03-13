
<!-- ID rulez first is "te" shorten from template, next is 2 letter from module name, than 2 letter from page name, than 2 letters from page method -->
<div id="templates">
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
                    <b class="from">From</b><br/>
                    <span>${start_day.formatted}</span>
                </div>
            </li>
            <li class="odd">
                <div>
                    <b class="until">Until</b><br/>
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
            <img width="30" height="30" src="${avatar}" />
            <span>${employee}</span>
            ${start_date.formatted} - ${end_date.formatted}
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
                    <b>${hours.regular}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Special</label>
                    <b>${hours.special}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Total</label>
                    <b>${hours.total}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Cost</label>
                    <b>$${hours.cost}&nbsp;</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_confirmedTimeSheets_0" type="text/x-jquery-tmpl">
        <div class="title">
            <img width="30" height="30" src="${avatar}" />
            <span>${employee}</span>
            ${date.formatted}
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
                    <b>${hours.regular}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Special</label>
                    <b>${hours.special}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Total</label>
                    <b>${hours.total}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Cost</label>
                    <b>$${hours.cost}&nbsp;</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_confirmedHours_0" type="text/x-jquery-tmpl">
        <div class="title">
            <img width="30" height="30" src="${avatar}" />
            <span>${employee}</span>
            ${date.formatted}
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
                    <b>${hours.regular}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Special</label>
                    <b>${hours.special}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Total</label>
                    <b>${hours.total}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Cost</label>
                    <b>$${hours.cost}&nbsp;</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_confirmedHours_1" type="text/x-jquery-tmpl">
        <div class="title">
            <img width="30" height="30" src="${avatar}">
            <span>${employee}</span>
            ${start_date.formatted} - ${end_date.formatted}
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
                    <b>${hours.regular}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Special</label>
                    <b>${hours.special}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Total</label>
                    <b>${hours.total}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Cost</label>
                    <b>$${hours.cost}</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_scheduledHours_0" type="text/x-jquery-tmpl">
        <div class="title">
            <img width="30" height="30" src="${avatar}">
            <span>${employee}</span>
            ${date.formatted}
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
                    <b>${hours.regular}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Special</label>
                    <b>${hours.special}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime}&nbsp;</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Total</label>
                    <b>${hours.total}&nbsp;</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Cost</label>
                    <b>$${hours.cost}&nbsp;</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_scheduledHours_1" type="text/x-jquery-tmpl">
        <div class="title">
            <img width="30" height="30" src="${avatar}">
            <span>${employee}</span>
            ${start_date.formatted} - ${end_date.formatted}
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
                    <b>${hours.regular}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Special</label>
                    <b>${hours.special}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Overtime</label>
                    <b>${hours.overtime}</b>
                </div>
            </li>
            <li class="odd">
                <div>
                    <label>Total</label>
                    <b>${hours.total}</b>
                </div>
            </li>
            <li class="even">
                <div>
                    <label>Cost</label>
                    <b>$${hours.cost}</b>
                </div>
            </li>
        </ul>
    </script>
    <script id="te_re_info" type="text/x-jquery-tmpl">
        <li>
            <a href="#" class="fr" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span>
                <img width="30" height="30" src="${avatar}">
                ${employee}
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
    <script id="te_tc_mts_li_in" type="text/x-jquery-tmpl">
        <li class="s_${status} e_${user} sc_${schedule}"><span class="names">${name}</span><span class="time"><span class="tStart">${st.time}</span><img width="16" height="16" src="images/tc_sm_clock.png"><span class="tEnd">${out.time}</span></span><span class="last">2h, 34min</span></li>
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
            <a class="fr" href="#">
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
                <p><span class="fr">Oct 15</span>From: ${from.name}</p>
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
                        <span class="fr"><a href="#">Send Message</a></span>
                        <span class="fl"><a href="#">Cancel</a></span>
                    </div>
                </div>
                <div class="title">
                    <span class="fr"><a class="butDel" href="#" rel="${id}">Delete</a></span>
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
                <p>${title}<br />${post}</p>
                <span>${time}</span>
            </div>
            <a href="#" class="msgDel" rel="${id}"></a>
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
                <p>${comment}</p>
                <span>${time}</span>
            </div>
            {{if full}}
            <a href="#" class="msgDel comment" rel="${id}"></a>
            {{/if}}
        </li>
    </script>
</div>
