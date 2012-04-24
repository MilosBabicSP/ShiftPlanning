<div class="main manageTimeSheets" id="tc_mts">
    <div class="title">
        <h3 class="fl"><?=_s('Manage Timesheets')?></h3>
        <span class="fr"><a id="tc_mts_adv" href="#" style="display: block;"><?=_s('Advanced')?></a></span>
    </div>
    <ul class="detailsGrid">
        <li>
            <ul>
                <li class="even">
                    <div>
                        <span class="input">
                            <select id="tc_mts_au">
                                <option value="0" >All</option>
                                <option value="1" >Approved</option>
                                <option value="2" selected="selected">Unapproved</option>
                            </select>
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <span class="input">
                            <select id="tc_mts_tr">

                            </select>
                        </span>
                    </div>
                </li>
            </ul>
            <ul class="hidden" id="tc_mts_hiin">
                <li class="even">
                    <div>
                        <span class="input">
                            <select id="tc_mts_eml">
                            </select>
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <span class="input">
                            <select id="tc_mts_scl">
                            </select>
                        </span>
                    </div>
                </li>
                <li class="even">
                    <div>
                        <label><?=_s('From:')?></label>
                        <span class="input">
                            <input id="tc_mts_sd_i" type="text" />
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <label><?=_s('To:')?></label>
                        <span class="input">
                            <input id="tc_mts_ed_i"  type="text" />
                        </span>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
    <div id="tc_mts_sh">

    </div>
    <div class="additional hidden">
        <p><?=_s('No timesheets for selected filters.')?></p>
    </div>
</div>