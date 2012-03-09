<div class="main manageTimeSheets" id="tc_mts">
    <div class="title">
        <h3 class="fl">My Timesheet</h3>
        <span class="fr"><a id="tc_mts_adv" href="#" style="display: block;">Advanced</a></span>
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
                        <label>From:</label>
                        <span class="input">
                            <input id="tc_mts_sd_i" type="text" />
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <label>To:</label>
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
    <div class="subLevel">
        <a class="backMenu" href="#">
            <img width="41" height="30" src="images/BackMenu.png">
        </a>
        <ul class="subMenu">
            <li class="first">
                <a href="#">
                    <img width="16" height="16" src="images/tc_approve.png">
                </a>
            </li>
            <li>
                <a href="#">
                    <img width="16" height="16" src="images/tc_edit.png">
                </a>
            </li>
            <li class="last">
                <a href="#">
                    <img width="16" height="16" src="images/tc_delete.png">
                </a>
            </li>
        </ul>
    </div>
    <div class="title">
        <div>
            <img width="30" height="30" src="images/staff.jpg">
            <span>Danijel Zec</span>
            Board Test
        </div>
    </div>
    <div class="additional">
        <p>Notes go here.</p>
    </div>
</div>