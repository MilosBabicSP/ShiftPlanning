<div class="main addShift normal">
    <input type="hidden" value="" id="sc_edit_id" />
    <ul class="detailsGrid">
        <li>
            <div class="title">
                <h3 class="icoSch">Schedule</h3>
            </div>
        </li>
        <li>
            <span class="input">
                <select id="sc_add_sc">

                </select>
            </span>
        </li>
        <li>
            <label>Title</label>
            <span class="input">
                <input type="text" name="" id="sc_add_ti" />
            </span>
        </li>
        <li>
            <div class="title">
                <h3 class="icoDat">Date</h3>
            </div>
        </li>
        <li>
            <ul>                
                <li class="even">
                    <div>
                        <label>Start Date</label>
                        <span class="input">
                            <input type="text" id="sc_date_st" readonly="" class="scroller">
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <label>End Date</label>
                        <span class="input">
                            <input type="text" id="sc_date_et" readonly="" class="scroller">
                        </span>
                    </div>
                </li>
                <li class="even">
                    <div>
                        <span class="input">
                            <input type="text" id="sc_date_sd" readonly="" class="scroller">
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <span class="input">
                            <input type="text" id="sc_date_ed" readonly="" class="scroller">
                        </span>
                    </div>
                </li>
            </ul>
        </li>
        <li>
            <div class="title">
                <h3 class="icoLoc">Location</h3>
            </div>
        </li>
        <li>
            <span class="input">
                <select id="sc_add_lo" class="locations">

                </select>
            </span>
        </li>
        <li>
            <div class="title">
                <h3 class="icoNot">Notes</h3>
            </div>
        </li>
        <li>
            <span class="input">
                <textarea id="sc_add_no"></textarea>
            </span>
        </li>
    </ul>
    <div id="sc_add_user" class="hidden">
        <h3>Who's working</h3>
        <ul class="detailsGrid working">
            <ul>

            </ul>
        </ul>
        <h3>Available</h3>
        <ul class="detailsGrid available">
            <ul>

            </ul>
        </ul>
        <h3>Unavailable</h3>
        <ul class="detailsGrid unavailable">
            <ul>

            </ul>
        </ul>
    </div>
    <div class="title">
        <span class="fl">
            <a href="#" id="sc_add_ca">
                <span>Cancel</span>
            </a>
        </span>
        <span class="fr">
            <a href="#" id="sc_add_add">
                <span>Add Shift And Set Users</span>
            </a>
        </span>
    </div>
</div>