<div class="main vacation" id="rq_va">
    <div class="title">
        <h3><?=_s('Vacation Management')?></h3>
    </div>
    <ul class="timeSheet" id="rq_va_rq">
        <li class="loading">
        </li>
    </ul>
    <div class="additional">
        <p><?=_s('No vacation requests awaiting approval.')?></p>
    </div>
    <div class="title">
        <h3><?=_s('Awaiting Approval')?></h3>
    </div>
    <ul class="requests" id="rq_va_aa">
        <li class="loading">
        </li>
    </ul>
    <div class="additional">
        <p><?=_s('You have no vacation requests awaiting approval.')?></p>
    </div>
    <div class="title">
        <h3><?=_s('Upcoming time off')?></h3>
    </div>
    <ul class="requests" id="rq_va_up">
        <li class="loading">
        </li>
    </ul>
    <div class="additional">
        <p><?=_s('You have no upcoming vacations.')?></p>
    </div>
    <div class="additional centered">
        <p><a href="#" id="rq_va_spd"><?=_s('Show past dates')?></a></p>
    </div>
    <div class="newMsg wide">
        <label><?=_s('Employee')?></label>
        <span class="input">
            <select id="rq_va_en">
                
            </select>
        </span>
        <ul class="detailsGrid borTB" id="rq_va_date">
            <li>
                <ul>                
                    <li class="even">
                        <div>
                            <label><?=_s('From')?></label>
                            <span class="input">
                                <input type="text" id="rq_va_fr" />
                            </span>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label><?=_s('To')?></label>
                            <span class="input">
                                <input type="text" id="rq_va_to" />
                            </span>
                        </div>
                    </li>
                </ul>
            </li>
            <li>
                <label><?=_s('Comments')?></label>
                <span class="input">
                    <textarea id="rq_va_wc"></textarea>
                </span>
            </li>
        </ul>
    </div>
    <ul class="step">
        <li>
            <div>
                <a href="#" id="rq_va_sr" class="green"><span><?=_s('Submit Request')?></span></a>
            </div>
        </li>
    </ul>
</div>