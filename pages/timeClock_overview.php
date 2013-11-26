<div class="main overview" id="tc_ov">
    <div class="title" id="tc_ov_cb">
        <span class="fr"><a href="#" id="tc_ov_way" class="greenB marginLeft10"><?=_s('I\'m on my way')?></a></span>
        <span class="fr"><a href="#" id="tc_ov_ci" class="greenB"><?=_s('Clock In')?></a></span>
        <span class="fr"><a href="#" id="tc_ov_co" class="greyB"><?=_s('Clock Out')?></a></span>
		<span class="fr"><a href="#" id="tc_ov_cn" class="greyB"><?=_s('Continue')?></a></span>
        <div class="icoClock fl">
            <time>january 8, 2012</time>
            <span>13:55</span>
        </div>
    </div>
	<div class="title" id="tc_ov_note">Please enable GPS on your device, if it's not already turned ON, because it is required for clocking In and Out</div>
    <div class="noticeDiv hidden" id="tc_ov_way_msg">
        <p><?= _s('You are on Your way since'); ?> <span class="sc_way_time_since"></span></p>
    </div>
    <div class="hidden" id="tc_ov_cf">
        
		<div class="newMsg wide" id="tc_ov_cf">
			<span><a href="#" id="tc_ov_cba" class="greyB"><?=_s('Break')?></a></span>
            <label><?=_s('Schedule')?></label>
            <span class="input">
                <select name="" id="tc_ov_ss">
                </select>
            </span>
			<label><?=_s('Remote Location')?></label>
            <span class="input">
                <select name="" id="tc_ov_remote">
                </select>
            </span>
            <label><?=_s('Notes')?></label>
            <span class="input">
                <textarea id="tc_ov_no"></textarea>
            </span>
        </div>
        <ul class="step">
            <li>
                <div>
                    <a href="#" id="tc_ov_ca" class="grey"><?=_s('Remove')?></a>
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