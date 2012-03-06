<div class="main addClockTime" id="tc_act">
    <div class="title">
        <h3>Add Clock Time</h3>
    </div>
    <div class="newMsg">
        <input type="hidden" id="tc_act_tc_id" />
        <label>Employee</label>
        <span class="input">
            <select id="tc_act_em">
            </select>
        </span>
        <label>Schedule</label>
        <span class="input">
            <select id="tc_act_sc">
            </select>
        </span>
        <ul class="detailsGrid borTB">
            <li>
                <ul>                
                    <li class="even">
                        <div>
                            <label>Clock in</label>
                            <span class="input">
                                <input type="text" id="tc_act_tclin" />
                            </span>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>Clock out</label>
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
        <label>Notes</label>
        <span class="input" >
            <textarea id="tc_act_no"></textarea>
        </span>
        <div class="title">
            <span class="fr"><span class="checkbox" id="tc_act_onci">Only Clock In?</span></span>
            <span class="fl"><a href="#" id="tc_act_sa_b">Save</a></span>
        </div>
    </div>
</div>