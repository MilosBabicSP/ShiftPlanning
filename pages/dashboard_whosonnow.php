<div class="main whosonnow" id="da_wo">
    <div class="title">
        <h3>Who's on now</h3>
    </div>
    <ul class="timeSheet" id="da_wo_li">

    </ul>

</div>
<div class="ping content">
    <div class="rounder ping" >
        <div class="mContent">
            <div class="head">
                <div class="icon commentI"></div>
                <div class="title">Ping ${name} via Email & SMS</div>
            </div>
            <div class="body">
                <div class="m">
                    <div class="icon noteI fl" style="margin:10px 0px;"></div>
                    <div class="fl">
                        <textarea id="mo_pi_te" style="width:513px;"></textarea>
                        <input type="hidden" value="${id}" id="mo_pi_id" />
                    </div>
                </div>
                <div class="b ofH">
                    <div class="icon informationI fl">140 Characters Max</div>
                    <a class="button fr" type="pingTemplates">Templates</a>
                    <a class="button fr" type="pingHelp">Help</a>
                </div>
                <div class="b">
                    <div id="mo_pi_tp" class="hide">
                        <div>
                            Late: <span>You're late for a shift. Please contact us right away. ${info.phone}</span>
                        </div>
                        -- 
                        <div>
                            P. Contact: <span>Please contact ${info.name} right away. ${info.cp}</span>
                        </div>
                        -- 
                        <div>
                            B. Contact: <span>Please contact ${info.company} right away. ${info.phone}</span>
                        </div>
                        -- 
                        <div>
                            Birthday: <span>Happy Birthday from everyone at ${info.company}</span>
                        </div>
                    </div>
                    <div id="mo_pi_he" class="hide">
                        <span>
                            'Pinging' an employee allows you to instantly send them a message via e-mail & sms to alert them of something or to get in contact quickly. 
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="bHolder fr ofH">
        <a class="send gButton fr" href="#">Send</a>
        <a class="close rButton fr" href="#">Close</a>
    </div>    
</div>
