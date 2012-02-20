
<!-- ID rulez first is "te" shorten from template, next is 2 letter from module name, than 2 letter from page name, than 2 letters from page method -->
<div id="templates">
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
