<div class="main scheduledHours" id="re_sh">
    <div class="title">
        <span class="fr"><a href="#" class="advancedButton"><?=_s('Advanced')?></a></span>
        <div class="fl">
            <span><?=_s('Payroll - Scheduled Hours')?></span>
            <time class="from"></time> - <time class="to"></time>
        </div>
    </div>
    <ul class="detailsGrid">
        <li>
            <ul>
                <li class="even">
                    <div>
                        <span class="input">
                            <select class="timeSelector">

                            </select>
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <span class="input">
                            <select class="employeeSelector">

                            </select>
                        </span>
                    </div>
                </li>
            </ul>
        </li>
        <li class="advancedMenu hidden">
            <ul>
                <li class="even">
                    <div>
                        <span class="input">
                            <select class="positionsSelector">

                            </select>
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <span class="input">
                            <select class="skillsSelector">

                            </select>
                        </span>
                    </div>
                </li>
                <li class="even">
                    <div>
                        <label><?=_s('From')?>:</label>
                        <span class="input">
                            <input type="text" class="timeFromSelector" />
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <label><?=_s('To')?>:</label>
                        <span class="input">
                            <input type="text" class="timeToSelector" />
                        </span>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
    <ul class="detailsGrid">
        <li>
            <ul>
                <li class="even">
                    <div>
                        <span class="checkbox re_showEmpty"><?=_s('Show Empty')?></span>  
                    </div>
                </li>
                <li class="odd"> 
                    <div>     
                        <span class="checkbox re_groupResults"><?=_s('Group Results')?></span>
                    </div>
                </li>
                <li class="even">
                    <div>     
                        <span class="checkbox re_deductBreaks"><?=_s('Deduct Breaks')?></span>
                    </div>
                </li>
            </ul>
        </li>
    </ul>
    <div class="title">
        <h3><?=_s('Report')?></h3>
    </div>
    <ul class="timeSheet listReports">
    </ul>
    <ul class="timeSheet totals">
        <li class="TSregular">
            <span><b><?=_s('Regular')?>:</b> <span></span></span>
        </li>
        <li class="TSspecial">
            <span><b><?=_s('Special')?>:</b> <span></span></span>
        </li>
        <li class="TSovertime">
            <span><b><?=_s('Overtime')?>:</b> <span></span></span>
        </li>
        <li class="TStotal">
            <span><b><?=_s('Total')?>:</b> <span></span></span>
        </li>
        <li class="TScost">
            <span><b><?=_s('Cost')?>:</b> <span class="currency"></span><span></span></span>
        </li>
    </ul>
    <div class="notif hidden"><?=_s('No data to display for selected filters.')?></div>
</div>
