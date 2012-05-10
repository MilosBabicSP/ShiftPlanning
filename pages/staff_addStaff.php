<div class="main addStaff">
    <div class="title">
        <h3 class="icoEmpAdd"><?=_s('Add New Employee')?></h3>
    </div>
    <ul class="detailsGrid">
        <li>
            <div>
                <label><?=_s('Name:')?></label>
                <span class="input">
                    <input type="text" name="" value="" id="st_ae_i_n">
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?=_s('Nick Name:')?></label>
                <span class="input">
                    <input type="text" name="" value="" id="st_ae_i_nn">
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?=_s('Email:')?></label>
                <span class="input">
                    <input type="text" name="" value="" id="st_ae_i_e">
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?=_s('Employee ID:')?></label>
                <span class="input">
                    <input type="text" name="" value="" id="st_ae_i_eid">
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?=_s('Username:')?></label>
                <span class="input">
                    <input type="text" name="" value="" id="st_ae_i_un">
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?=_s('Hourly Wage:')?></label>
                <span class="input">
                    <input type="text" name="" value="" id="st_ae_i_hw">
                </span>
            </div>
        </li>
    </ul>
    <ul class="detailsGrid">
        <li>
            <div class="title">
                <h3 class="icoNot" ><?=_s('Notes')?></h3>
            </div>
        </li>
        <li>
            <span class="input">
                <textarea id="st_ae_i_no"><?=_s('Write Notes...')?></textarea>
            </span>
        </li>
    </ul>
    <div class="title">
        <h3 class="icoAct"><?=_s('Activation')?></h3>
    </div>
    <div class="title">
        <span class="fl"><span class="checkbox" id="st_ae_sa"><?=_s('Send Activation')?></span></span>
    </div>
    <div class="additional">
        <p><?=_s('If this box is checked and account is setup with an e-mail address a welcome e-mail will be sent to this employee with their login instructions.')?></p>
        <p><?=_s('If left un-checked, they will be silently added to the system and can be sent their activation email or given their login details later.')?></p>
    </div>
    <div class="title">  
        <span class="fr"><a href="#" id="st_ae_ce_b"><span><?=_s('Create Employee')?></span></a></span>
    </div>
</div>