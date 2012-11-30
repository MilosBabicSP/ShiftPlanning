<div class="main displayTimeSheets" id="tc_dts">
    <div class="title">
        <h3><?= _s('My Time Sheets'); ?></h3>
    </div>
    <div>
        <ul class="detailsGrid">
            <li>
                <ul>
                    <li class="even">
                        <div>
                            <span class="input">
                                <select id="tc_dts_au">
                                    <option value="0" selected="selected"><?= _s('All'); ?></option>
                                    <option value="1" ><?= _s('Approved'); ?></option>
                                    <option value="2" ><?= _s('Unapproved'); ?></option>
                                </select>
                            </span>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <span class="input">
                                <select id="tc_dts_tr">
                                </select>
                            </span>
                        </div>   
                    </li>
                </ul>
            </li>
        </ul>
    </div>            
    <ul class="timeSheet" id="tc_dts_ul">

    </ul>
    <div id="tc_dts_ul_msg">
    </div> 
</div>
