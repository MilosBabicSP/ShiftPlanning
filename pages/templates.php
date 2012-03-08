
<!-- ID rulez first is "te" shorten from template, next is 2 letter from module name, than 2 letter from page name, than 2 letters from page method -->
<div id="templates">
    <script id="te_re_info" type="text/x-jquery-tmpl">
        <li>
            <a href="#" class="fr"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span>
                <img width="30" height="30" src="images/staff.jpg">
                Mike
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
