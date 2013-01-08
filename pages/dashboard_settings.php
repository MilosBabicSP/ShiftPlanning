<!--<div class="main overview" id="da_se">-->
<div style="display: none;" class="search settings mainSub">
    <a class="backMenu" href="#">
        <img width="16" height="16" src="<?php echo _fCdnPath_; ?>images/arrow_back.png">
    </a>
    <ul class="subNav">
        <li class="first active">
            <a href="#" subpage="overview">
                <img width="16" height="17" src="<?php echo _fCdnPath_; ?>images/sett_1.png">
            </a>
        </li>
        <li class="hideEm">
            <a href="#" subpage="edit">
                <img width="16" height="17" src="<?php echo _fCdnPath_; ?>images/sett_2.png">
            </a>
        </li>
        <li class="hideEm" >
            <a href="#" subpage="recentShifts">
                <img width="16" height="17" src="<?php echo _fCdnPath_; ?>images/sett_3.png">
            </a>
        </li>
        <li class="hideEm">
            <a href="#" subpage="upcomingShifts">
                <img width="16" height="17" src="<?php echo _fCdnPath_; ?>images/sett_4.png">
            </a>
        </li>            
        <li class="hideEm">
            <a href="#" subpage="password">
                <img width="16" height="17" src="<?php echo _fCdnPath_; ?>images/sett_5.png">
            </a>
        </li>
    </ul>
</div>
<input type="hidden" id="da_se_cur_us_id" />
<div id="da_se_overview" class="main overview">
    <div>
        <ul class="detailsGrid">
            <li>
                <ul>    
                    <li class="even">
                        <div>
                            <label><?= _s('Full name') ?>:</label>
                            <h4 id="da_se_ov_fn"></h4>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label><?= _s('ID') ?>:</label>
                            <h4 id="da_se_ov_id"></h4>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label><?= _s('Username') ?>:</label>
                            <h4 id="da_se_ov_un"></h4>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label><?= _s('Mobile') ?>:</label>
                            <h4 id="da_se_ov_mo"></h4>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label><?= _s('Home') ?>:</label>
                            <h4 id="da_se_ov_ho"></h4>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label><?= _s('Birthday') ?>:</label>
                            <h4 id="da_se_ov_bd"></h4>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label><?= _s('Wage') ?>:</label>
                            <h4 id="da_se_ov_wa"></h4>
                        </div>
                    </li>
                </ul>
            </li>
            <li style="padding-left:20px;">
                <label><?= _s('Email') ?>:</label>
                <h4 id="da_se_ov_em"></h4>
            </li>
            <li style="padding-left:20px;">
                <label><?= _s('Positions') ?>:</label>
                <h4 id="da_se_ov_pos"></h4> 
            </li>
        </ul>
    </div>
    <div class="title">
        <h3 class="icoAdmAct"><?= _s('Admin Actions') ?></h3>
    </div>
    <ul class="detailsGrid" id="da_se_ov_aa">
        <li>
            <label><?= _s('Status') ?>:</label>
            <h4 id="da_se_ov_st"></h4>
        </li>
        <li>
            <label><?= _s('Activation') ?>:</label>
            <h4 id="da_se_ov_ac"></h4>
        </li>
        <li>
            <a class="button fl" href="#" type="activate"><?= _s('Send Activation') ?></a>
        </li>
        <li>
            <a class="button fl" href="#" type="manualyActivate"><?= _s('Manually Activate') ?></a>
        </li>
        <li>
            <a class="button fl" href="#" type="deactivate"><?= _s('Disable User Account') ?></a></li>
        <li>
            <a class="button fl" href="#" type="delete"><?= _s('Permanently Delete This Employee') ?></a>
        </li>
    </ul>
    <div class="title aPerm"><!-- begin of da_se_ov_cu -->
        <h3 class="icoCusFie"><?= _s('Custom Fields') ?></h3>
    </div>
    <ul class="detailsGrid aPerm">
        <li>
            <ul id="da_se_ov_cu">

            </ul>
        </li>
    </ul><!-- end of da_se_ov_cu -->
    <div class="title aPerm">
        <h3 class="icoEmpPos"><?= _s('Employee Positions') ?></h3>
    </div>
    <div>
        <ul class="detailsGrid aPerm">
            <li>
                <ul id="da_se_ov_po" class="positions">    

                </ul>
            </li>
        </ul>
    </div>
    <div class="title aPerm">
        <h3 class="icoEmpSki"><?= _s('Employee Skills') ?></h3>
    </div>
    <div>
        <ul class="detailsGrid aPerm">
            <li>
                <ul id="da_se_ov_sk" class="skills">    

                </ul>
            </li>
        </ul>
    </div>
    <ul class="detailsGrid">
        <li>
            <label><?= _s('Notes') ?></label>
            <span class="input">
                <textarea id="da_se_ov_no"><?= _s('Write Notes...') ?></textarea>
            </span>
        </li>
    </ul>
</div>
<div id="da_se_edit" class="main edit">
    <div class="title">
        <h3 class="icoEmpDet"><?= _s('Employee Details') ?></h3>
    </div>
    <ul class="detailsGrid">
        <li>
            <div>
                <label><?= _s('Name') ?>:</label>
                <span class="input">
                    <input type="text" name="" value="" id="da_se_ed_na">
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?= _s('Nick Name') ?>:</label>
                <span class="input">
                    <input type="text" name="" value="" id="da_se_ed_nn">
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?= _s('Email') ?>:</label>
                <span class="input">
                    <input type="text" name="" value="" id="da_se_ed_em">
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?= _s('Username') ?>:</label>
                <span class="input">
                    <input type="text" name="" value="" id="da_se_ed_us">
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?= _s('Mobile Phone') ?>:</label>
                <span class="input">
                    <span style="width:40px; display:block; float:left; border-right:solid 1px #BBB;"><input style="text-align:center;" type="text" name="" value="" id="da_se_ed_mph_0"></span>
                    <span style="width:40px; display:block; float:left; border-right:solid 1px #BBB;"><input style="text-align:center;" type="text" name="" value="" id="da_se_ed_mph_1"></span>
                    <span style="margin:0 0 0 85px; display:block;"><input type="text" name="" value="" id="da_se_ed_mph_2"></span>
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?= _s('Home Phone') ?>:</label>
                <span class="input">
                    <span style="width:40px; display:block; float:left; border-right:solid 1px #BBB;"><input style="text-align:center;" type="text" name="" value="" id="da_se_ed_hph_0"></span>
                    <span style="width:40px; display:block; float:left; border-right:solid 1px #BBB;"><input style="text-align:center;" type="text" name="" value="" id="da_se_ed_hph_1"></span>
                    <span style="margin:0 0 0 85px; display:block;"><input type="text" name="" value="" id="da_se_ed_hph_2"></span>
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?= _s('Address') ?>:</label>
                <span class="input">
                    <input type="text" name="" value="" id="da_se_ed_ad" />
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?= _s('City:') ?></label>
                <span class="input">
                    <input type="text" name="" value="" id="da_se_ed_ci" />
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?= _s('State/Province') ?>:</label>
                <span class="input">
                    <input type="text" name="" value="" id="da_se_ed_sp">
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?= _s('Postal/Zip code') ?>:</label>
                <span class="input">
                    <input type="text" name="" value="" id="da_se_ed_pz" />
                </span>
            </div>
        </li>
        <li>
            <div>
                <label><?= _s('Language') ?></label>
                <span class="input">
                    <select id="da_se_ed_lang"></select>
                </span>
            </div>
        </li>
        <li>
            <ul id="da_se_ed_bd_sel">
                <li class="even">
                    <div>
                        <label><?= _s('Birthday') ?>:</label>
                        <span class="input">
                            <select id="da_se_ed_bday_m">
                                <option selected="" value="0"><?= _s('Select'); ?></option>
                                <option value="1"><?= _s('January') ?></option>
                                <option value="2"><?= _s('February') ?></option>
                                <option value="3"><?= _s('March') ?></option>
                                <option value="4"><?= _s('April') ?></option>
                                <option value="5"><?= _s('May') ?></option>
                                <option value="6"><?= _s('June') ?></option>
                                <option value="7"><?= _s('July') ?></option>
                                <option value="8"><?= _s('August') ?></option>
                                <option value="9"><?= _s('September') ?></option>
                                <option value="10"><?= _s('October') ?></option>
                                <option value="11"><?= _s('November') ?></option>
                                <option value="12"><?= _s('December') ?></option>
                            </select>
                        </span>
                    </div>
                </li>
                <li class="odd">
                    <div>
                        <label>&nbsp;</label>
                        <span class="input">
                            <select id="da_se_ed_bday_d">
                                <option selected="" value="0"><?= _s('Select'); ?></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                        </span>
                    </div>
                </li>
            </ul>
        </li>
        <li>
            <?= _s('(Entering your birthday makes it public to other staff.)') ?> 
        </li>

    </ul>
    <div class="title aPerm"><!-- begin of da_se_ov_cu in edit subpage -->
        <h3 class="icoCusFie"><?= _s('Custom Fields') ?></h3>
    </div>
    <ul class="detailsGrid aPerm" id="da_se_ed_cu">
    </ul><!-- end of da_se_ov_cu in edit subpage -->
    <div class="title aPerm">
        <h3 class="icoEmpPos"><?= _s('Employee Positions') ?></h3>
    </div>
    <div>
        <ul class="detailsGrid aPerm">
            <li>
                <ul id="da_se_ed_po" class="positions">    

                </ul>
            </li>
        </ul>
    </div>
    <div class="title aPerm">
        <h3 class="icoEmpSki"><?= _s('Employee Skills') ?></h3>
    </div>
    <div>
        <ul class="detailsGrid aPerm">
            <li>
                <ul id="da_se_ed_sk" class="skills">    

                </ul>
            </li>
        </ul>
    </div>        
    <ul class="detailsGrid">
        <li>
            <label><?= _s('Notes') ?></label>
            <span class="input">
                <textarea id="da_se_ed_no"></textarea>
            </span>
        </li>
    </ul>
    <div class="title">
        <span class="fr"><a id="da_se_ed_ue" href="#" class="greenB"><span><?= _s('Update Employee') ?></span></a></span>
    </div>
</div>
<div id="da_se_password" class="main password">
    <div class="title">
        <h3 class="icoEmpDet"><?= _s('Employee Details') ?></h3>
    </div>
    <ul class="detailsGrid">
        <li>
            <div>
                <label><?= _s('Password:') ?></label>
                <span class="input">
                    <input type="password" name="" value="" id="da_se_pa_np">
                </span>
            </div>
        </li>
        <li>
            <?= _s('* You only need to supply a password if you want to change it') ?>
        </li>
        <li>
            <div>
                <label><?= _s('Confirm Password') ?>:</label>
                <span class="input">
                    <input type="password" name="" value="" id="da_se_pa_cp">
                </span>
            </div>
        </li>
        <li>
            <?= _s('* You only need to confirm your password if you changed it above') ?>
        </li>
    </ul>
    <div class="title">
        <span class="fr"><a id="da_se_pa_up" href="#" class="greenB"><?= _s('Update Employee') ?></a></span>
    </div>
</div>
<div id="da_se_recentShifts" class="main recentShifts">
    <div class="title">
        <h3><?= _s('Recent shifts'); ?></h3>
    </div>
    <ul class="timeSheet" id="da_se_rs_li">

    </ul>
</div>
<div id="da_se_upcomingShifts" class="main upcomingShifts">
    <div class="title">
        <h3><?= _s('Upcoming shifts'); ?></h3>
    </div>
    <ul class="timeSheet" id="da_se_us_li">

    </ul>
</div>
<!--</div>-->