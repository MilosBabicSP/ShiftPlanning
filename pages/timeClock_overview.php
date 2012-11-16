<div class="main overview" id="tc_ov">
    <div class="title" id="tc_ov_cb">
        <span class="fr"><a href="#" id="tc_ov_ci"><?=_s('Clock In')?></a></span>
        <span class="fr"><a href="#" id="tc_ov_co"><?=_s('Clock Out')?></a></span>
        <div class="icoClock fl">
            <time>january 8, 2012</time>
            <span>13:55</span>
        </div>
    </div>
    <div class="hidden" id="tc_ov_cf">
        <div class="newMsg hidden wide" id="tc_ov_cf">
            <label><?=_s('Schedule')?></label>
            <span class="input">
                <select name="" id="tc_ov_ss">
                </select>
            </span>
            <label><?=_s('Notes')?></label>
            <span class="input">
                <textarea id="tc_ov_no"></textarea>
            </span>
            <div class="title">
                <span class="fr"><a href="#" id="tc_ov_ca"><?=_s('Cancel')?></a></span>
                <span class="fl"><a href="#" id="tc_ov_sa"><?=_s('Save')?></a></span>
            </div>
        </div>
        <ul class="step">
            <li>
                <div>
                    <a href="#" id="tc_ov_ca" class="grey"><?=_s('Cancel')?></a>
                </div>
            </li>
            <li>
                <div>
                    <a href="#" id="tc_ov_sa" class="green"><?=_s('Save')?></a>
                </div>
            </li>
        </ul>
    </div>
    <div class="additional" id="tc_ov_ad">
	<p><?=_s('You cannot Clock in/out from this mobile device. Management has restricted clock time to specific locations.');?></p>
    </div>
</div>