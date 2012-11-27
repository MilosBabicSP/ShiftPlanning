<div class="main addShift normal">
    <div class="title">
        <h3 class="icoSch"><?= _s('Schedule') ?></h3>
    </div>
    <input type="hidden" value="" id="sc_edit_id" />
    <ul class="detailsGrid">
        <li>
            <span class="input">
                <select id="sc_add_sc">

                </select>
            </span>
        </li>
        <li>
            <label><?= _s('Title') ?></label>
            <span class="input">
                <input type="text" name="" id="sc_add_ti" />
            </span>
        </li>
    </ul>
    <div class="title">
        <h3 class="icoDat"><?= _s('Date') ?></h3>
    </div>
    <ul class="detailsGrid">
        <li>
            <ul>                
                <li class="even">
                    <div>
                        <label><?= _s('Start Date') ?></label>
                        <span class="input">
                            <input type="text" id="sc_date_st" readonly="" class="scroller">
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <label><?= _s('End Date') ?></label>
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
    </ul>
    <div class="title">
        <h3 class="icoLoc"><?= _s('Work Sites') ?></h3>
    </div>
    <ul class="detailsGrid">
        <li>
            <span class="input">
                <select id="sc_add_lo" class="locations">

                </select>
            </span>
        </li>
    </ul>
    <div class="title">
        <h3 class="icoNot"><?= _s('Notes') ?></h3>
    </div>
    <ul class="detailsGrid">
        <li>
            <span class="input">
                <textarea id="sc_add_no"></textarea>
            </span>
        </li>
    </ul>
    <div id="sc_add_user" class="hidden">
        <h3><?= _s("Who's working") ?></h3>
        <ul class="detailsGrid working">
            <li>
                <ul>

                </ul>
            </li>
        </ul>
        <div type="available">
            <h3><?= _s('Available') ?></h3>
            <ul class="detailsGrid">
                <li>
                    <ul>

                    </ul>
                </li>
            </ul>
        </div>
        <div type="vacation">
            <h3><?= _s('Vacation') ?></h3>
            <ul class="detailsGrid">
                <li>
                    <ul>

                    </ul>
                </li>
            </ul>
        </div>
        <div type="sameday">
            <h3><?= _s('Scheduled Today') ?></h3>
            <ul class="detailsGrid">
                <li>
                    <ul>

                    </ul>
                </li>
            </ul>
        </div>
        <div type="overlap">
            <h3><?= _s('Overlapping shift') ?></h3>
            <ul class="detailsGrid">
                <li>
                    <ul>

                    </ul>
                </li>
            </ul>
        </div>
        <div type="mintime">
            <h3><?= _s(' Min time between shifts') ?></h3>
            <ul class="detailsGrid">
                <li>
                    <ul>

                    </ul>
                </li>
            </ul>
        </div>
        <div type="unavail">
            <h3><?= _s('Unavailable') ?></h3>
            <ul class="detailsGrid">
                <li>
                    <ul>

                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="title">
        <span class="fr">
            <a href="#" id="sc_add_add" class="greenB">
                <span><?= _s('Add Shift And Set Users') ?></span>
            </a>
        </span>
    </div>
</div>