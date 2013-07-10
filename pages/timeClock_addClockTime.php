<div class="main addClockTime" id="tc_act">
    <div class="title">
        <h3><?= _s('Add Clock Time') ?></h3>
    </div>
    <div class="newMsg wide">
        <input type="hidden" id="tc_act_tc_id" />
        <label><?= _s('Employee') ?></label>
        <span class="input">
            <select id="tc_act_em">
            </select>
        </span>
        <label><?= _s('Schedule') ?></label>
        <span class="input">
            <select id="tc_act_sc">
            </select>
        </span>
		<label><?=_s('Remote Site')?></label>
		<span class="input">
			<select id="tc_act_loc">				
			</select>
		</span>
        <div>
            <ul class="detailsGrid borTB" id="tc_act_date">
                <li>
                    <ul>                
                        <li class="even">
                            <div>
                                <label><?= _s('Clock in') ?></label>
                                <span class="input">
                                    <input type="text" id="tc_act_tclin" />
                                </span>
                            </div>
                        </li>
                        <li class="odd">
                            <div>
                                <label><?= _s('Clock out') ?></label>
                                <span class="input">
                                    <input type="text" id="tc_act_tclou" />
                                </span>
                            </div>
                        </li>
                        <li class="even">
                            <div>
                                <span class="input">
                                    <input type="text" id="tc_act_c_cl_dp_i" />
                                </span>
                            </div>
                        </li>
                        <li class="odd">
                            <div>
                                <span class="input">
                                    <input type="text" id="tc_act_c_co_dp_i" />
                                </span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <label><?= _s('Notes') ?></label>
        <span class="input" >
            <textarea id="tc_act_no"></textarea>
        </span>
    </div>
    <ul class="step">
        <li>
            <div>
                <a href="#" id="tc_act_sa_b" class="green"><?= _s('Save') ?></a>
            </div>
        </li>
        <li>
            <div>
                <span class="fr"><span class="checkbox" id="tc_act_onci"><?= _s('Only Clock In?') ?></span></span>
            </div>
        </li>
    </ul>
</div>