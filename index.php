<?php
require_once('functions.php');
require_once('api.php');

/* fast hack for displaying correct time */
if (isset($_GET['timezone'])){
    echo Functions::getInstance()->getCurrentTime();
    die();
}

if (isset($_GET['logout'])){
    _iapi(array('module' => 'staff.logout', 'method' => 'GET'), 'json', true);
    $fixed = substr(WWW_PATH, 7);
    $fixed = str_replace('//', '/', $fixed);
    $fixed = str_replace('index.php?logout=true', ' ', $fixed);
	
	$ccks = array(
		'shiftplanning_mobile_rememberme',
		'shiftplanning_mobile_usertoken',
		'shiftplanning_mobile_username',
		'shiftplanning_mobile_userid',
		'shiftplanning_mobile_usercompany',
		'shiftplanning_mobile_userphone'
		);
	
	if (isset($_SERVER['HTTP_COOKIE'])) {
		$cookies = explode(';', $_SERVER['HTTP_COOKIE']);
		foreach ($cookies as $cookie) {
			$parts = explode('=', $cookie);
			$name = trim($parts[0]);
			if(in_array($name, $ccks)){
				setcookie($name, '', time() - 1000);
				setcookie($name, '', time() - 1000, '/');
			}
		}
	}
    header('Location: ' . 'http://' . $fixed);
}

require_once('jspacker.php');
include 'i18n/lib/class.i18n.php';
if (Functions::getInstance()->getCurrentLang() != 'en_US'):
     i18n::setLanguage(Functions::getInstance()->getCurrentLang(), _lang_ . '/lang/');
endif;

$jse = new JSPacker('sp.js');
$cse = new JSPacker('sp.css', 'css');
if(DEBUGGER){
	$encrypt = false;
} else {
	$encrypt = true;
}

if (Functions::getInstance()->isRememberMe()){
    $_SESSION['api']['token']		    = Functions::getInstance()->getCookie('shiftplanning_mobile_usertoken');
    $_SESSION['user']['employee']['name']   = Functions::getInstance()->getCookie('shiftplanning_mobile_username');
    $_SESSION['user']['employee']['id']	    = Functions::getInstance()->getCookie('shiftplanning_mobile_userid');
    $_SESSION['user']['business']['name']   = Functions::getInstance()->getCookie('shiftplanning_mobile_usercompany');
    $_SESSION['user']['business']['phone']  = Functions::getInstance()->getCookie('shiftplanning_mobile_userphone');
}


//Get google IP
$googleIP = gethostbyname('www.google.com');

?>
<!DOCTYPE html>
<html style="height:100%;">
    <head>
        <title>ShiftPlanning</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;' name='viewport' />
        <meta name="viewport" content="width=device-width" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Qwigley">
        <?php
        $cse->_add('css/style.mobile.css', $encrypt);
	
	//main jquery
	$cse->_add('css/mobiscroll.css', $encrypt);
        
        $cse->_dump();
        ?>
	
	<link rel="shortcut icon" href="http://cdn.shiftplanning.com/app/layout/1/images/favicon.ico" type="image/x-icon" id="favicon">
	<link rel="apple-touch-startup-image" href="<?php echo _fCdnPath_;?>images/default.png" />
	
	<link rel="apple-touch-startup-image" href="<?php echo _fCdnPath_;?>images/sc/x320.png" media="screen and (max-device-width: 320px)" />
	<link rel="apple-touch-startup-image" media="(max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)" href="<?php echo _fCdnPath_;?>images/sc/x640.png" />

	<!-- For iPhone with high-resolution Retina display: -->
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo _fCdnPath_;?>images/sc/iPhone-114x114.png">
	<!-- For first- and second-generation iPad: -->
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo _fCdnPath_;?>images/sc/iPhone-72x72.png">
	<!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
	<link rel="apple-touch-icon-precomposed" href="<?php echo _fCdnPath_;?>images/sc/iPhone-57x57.png">
	
	<?php if (Functions::getInstance()->getCurrentLang() != 'en_US'):?>
	    <link rel="gettext" href="<?php echo LANG_PATH;?>lang/<?php echo Functions::getInstance()->getCurrentLang();?>/LC_MESSAGES/ShiftPlanning.json" />
	<?php endif;?>
	
	
	<script src="<?php echo _fCdnPath_;?>i18n/gettext.js" type="text/javascript"></script>
        <script src="<?php echo _fCdnPath_;?>js/sp.user.js" type="text/javascript"></script>
        <script type="text/javascript">
            var googleIp = '<?php echo $googleIP;?>';
<?
$vtoken = _iapi(array('module' => 'api.vtoken', 'method' => 'GET', 'token' => $_SESSION['api']['token']), 'array');
if ($vtoken['data'] != '1') {
    unset($_SESSION['api']['token']);
    ?>
            user.loggedIn = 0;
    <?
} else {
    ?>
            user.loggedIn = 1;
<? } ?>
    user.name = '<?= ($_SESSION['api']['token']) ? $_SESSION['user']['employee']['name'] : '' ?>';
    user.company = '<?= ($_SESSION['api']['token']) ? $_SESSION['user']['business']['name'] : '' ?>';
    user.phone = '<?= ($_SESSION['api']['token']) ? $_SESSION['user']['business']['phone'] : '' ?>';
            
        </script>

        <!-- Core Parts -->

        <!-- jQuery -->
	<?php 
        //json obj 
        $jse->_add('js/json2.js', $encrypt);
	
	//main jquery
	$jse->_add('js/jquery/jquery-1.6.4.min.js', $encrypt);
	$jse->_add('js/jquery/jquery.timeago.js', $encrypt);
	$jse->_add('js/jquery/jquery.tmpl.js', $encrypt);
	$jse->_add('js/jquery/jquery.ba-hashchange.min.js', $encrypt);
	$jse->_add('js/jquery/jquery.contains.js', $encrypt);
	
	//specially for mobile device.
	$jse->_add('js/plugins/mobiscroll.min.js', $encrypt);
	
	//models
	$jse->_add('js/models/sp.schedule.model.js', $encrypt);
	$jse->_add('js/models/sp.requests.model.js', $encrypt);
	$jse->_add('js/models/sp.admin.model.js', $encrypt);
	$jse->_add('js/models/sp.messaging.model.js', $encrypt);
	$jse->_add('js/models/sp.timeclock.model.js', $encrypt);
	$jse->_add('js/models/sp.staff.model.js', $encrypt);
	$jse->_add('js/models/sp.payroll.model.js', $encrypt);
	$jse->_add('js/models/sp.location.model.js', $encrypt);
	$jse->_add('js/models/sp.training.model.js',$encrypt);
	
	//plugins
	$jse->_add('js/plugins/date.js', $encrypt);
	$jse->_add('js/plugins/cookie.js', $encrypt);
	$jse->_add('js/plugins/sp.cache.js', $encrypt);
	$jse->_add('js/schedule/date.js', $encrypt);
	$jse->_add('js/schedule/date.extras.js', $encrypt);
	$jse->_add('js/plugins/objSort.js', $encrypt);
	$jse->_add('js/plugins/outerClick.js', $encrypt);
        $jse->_add('js/plugins/shorten.js', $encrypt);
	
	//system
	$jse->_add('js/sp.common.js', $encrypt);
	$jse->_add('js/sp.model.js', $encrypt);
	$jse->_add('js/sp.view.js', $encrypt);
	$jse->_add('js/sp.ranges.js', $encrypt);
	
	//base
	$jse->_add('js/sp.staff.js', $encrypt);
	$jse->_add('js/sp.schedule.js', $encrypt);
	$jse->_add('js/sp.dashboard.js', $encrypt);
	$jse->_add('js/sp.timeclock.js', $encrypt);
	$jse->_add('js/sp.reports.js', $encrypt);
	$jse->_add('js/sp.requests.js', $encrypt);
	$jse->_add('js/sp.location.js', $encrypt);
	$jse->_add('js/sp.permissions.js', $encrypt);
	$jse->_add('js/sp.training.js',$encrypt);
	
	//extension
	$jse->_add('js/sp.staff.mobile.js', $encrypt);
	$jse->_add('js/sp.dashboard.mobile.js', $encrypt);
	$jse->_add('js/sp.timeclock.mobile.js', $encrypt);
	$jse->_add('js/sp.reports.mobile.js', $encrypt);
	$jse->_add('js/sp.requests.mobile.js', $encrypt);
	$jse->_add('js/sp.schedule.mobile.js', $encrypt);
	$jse->_add('js/sp.permissions.mobile.js', $encrypt);
	$jse->_add('js/sp.training.mobile.js', $encrypt);
	
	//Loader
	$jse->_add('js/sp.common.mobile.js', $encrypt);
	
	$jse->_dump();
	
	?>
        <script type="text/javascript">
            function init(){
		<? if ($_SESSION['api']['token']) { ?>
			    sp.staff.raw.employees = <?= _iapi(array('module' => 'staff.employees', 'method' => 'GET'), 'json', true) ?>;
			    sp.staff.data.employees = sp.map(sp.staff.raw.employees);
			    sp.schedule.raw.schedules = <?= _iapi(array('module' => 'schedule.schedules', 'perms' => 1, 'method' => 'GET'), 'json', true) ?>;
			    sp.schedule.data.schedules = sp.map(sp.schedule.raw.schedules);
			    sp.staff.admin.settings = <?= _iapi(array('module' => 'admin.settings', 'method' => 'GET'), 'json', true) ?>;
			    sp.staff.admin.info = <?= _iapi(array('module' => 'staff.employee', 'method' => 'GET', 'id' => $_SESSION['user']['employee']['id']), 'json', true) ?>;
			    sp.staff.admin.business = <?= _iapi(array('module' => 'admin.business', 'method' => 'GET'), 'json', true) ?>;
			    var lang = sp.staff.admin.info.language;
			    if (lang == null){
				lang = sp.staff.admin.business.language;
			    }
			    if (lang != '<?php echo Functions::getInstance()->getCurrentLang();?>'){
				setCookie('shiftplanning_mobile_lang', lang, cookieExpire);
				window.location.reload();
			    }
			    sp.staff.raw.skills = <?= _iapi(array('module' => 'staff.skills', 'method' => 'GET'), 'json', true) ?>;
			    sp.staff.data.skills = sp.map(sp.staff.raw.skills);
			    sp.staff.raw.locations = <?= _iapi(array('module' => 'location.locations', 'method' => 'GET'), 'json', true) ?>;
			    sp.staff.data.locations = sp.map(sp.staff.raw.locations);
			    sp.raw.config = <?= _iapi(array('module' => 'api.config', 'method' => 'GET'), 'json', true) ?>;
			    sp.schedule.dateId = sp.raw.config.today.id;
			    sp.staff.admin.info.dfAvatar = (typeof sp.staff.admin.info.avatar != 'undefined' && typeof sp.staff.admin.info.avatar.small != 'undefined') ? sp.staff.admin.info.avatar.small : 'images/no-avatar.png';
			    sp.staff.prepareConfig();
			    $('.userName').html(user.name);
			    $('company').html(user.company);
			    spRanges.fixRanges();
			    sp.staff.fixed.employees = sp.permissions.fixStaffListing();
			    sp.raw.config.today.formatted = Date.parse(sp.raw.config.today.formatted).toString(cal.dformat);
		<? } ?>
    $('body').css('display', 'block');
    }
        </script>
	
	<script type="text/javascript">
            if ('standalone' in navigator && !navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion)) {
                    var addToHomeConfig = {
                            animationIn:'bubble',		// Animation In
                            animationOut:'drop',		// Animation Out
                            lifespan:10000,				// The popup lives 10 seconds
                            expire:2,					// The popup is shown only once every 2 minutes
                            touchIcon:true
                    };

                    document.write('<link rel="stylesheet" href="css\/add2home.css">');
                    document.write('<script type="application\/javascript" src="js\/plugins\/add2home.js" charset="utf-8"><\/s' + 'cript>');
            }
	</script>
    </head>
    <body onload="setTimeout(function() { window.scrollTo(0, 1) }, 100);" class="login">
        <div class="notification error"></div>
        <table height="100%" class="loginContainer" width="100%">
            <tr>
                <td width="100%">
                    <img class="logo" src="<?php echo _fCdnPath_;?>images/logo1.png" alt="ShiftPlanning" />

                    <form class="loginForm" method="post" id="lo_f" onsubmit="return false;">
                        <label><?=_s('Email or Username');?></label>
                        <div class="holder">
                            <input autocorrect="off" autocapitalize="off" type="text" name="username" id="lo_u" />
                        </div>
                        <label><?=_s('Password');?></label>
                        <div class="holder">
                            <input type="password" name="password" id="lo_p"/>
                        </div>
			<div class="rButton">
			    <span class="checkbox fl <?php echo (Functions::getInstance()->isRememberMe()) ? 'check' : ''?>"><?=_s('Remember me?');?></span>
			</div>
                        <button id="lo_b"><span><?=_s('Login');?></span></button>
                    </form>
                    <div class="footerTxt"><?=_s('View in: Mobile |')?> <a href="/app/?fullapp=true"><?=_s('Full Version')?></a><br/>
                        <a href="/terms/"><?=_s('Terms of Use')?></a> | <a href="/privacy/"><?=_s('Privacy Policy')?></a><br/>
                        &copy; <?php echo date('Y'); ?> ShiftPlanning</div>
		    
		    
                </td>
            </tr>
        </table>
        <div class="applicationContainer">
            <div class="mainMenu hidden" id="menu">
                <a href="#">
                    <img height="61" width="190" src="<?php echo _fCdnPath_;?>images/logo.png" />
                </a>
                <ul class="mainNav">
                    <li id="menu_dashboard"><a class="dash" href="#" page="dashboard"><?=_s('Dashboard')?></a></li>
                    <li id="menu_timeClock"><a class="ticl" href="#" page="timeClock"><?=_s('Time Clock')?></a></li>
                    <li id="menu_schedule"><a class="sche" href="#" page="schedule"><?=_s('Schedule')?></a></li>
                    <li class="active" id="menu_requests"><a class="requ" href="#" page="requests"><?=_s('Requests')?></a>
                        <ul class="hidden">
                            <li><a href="#"><span>4</span><?=_s('Vacation requests')?></a></li>
                            <li><a href="#"><span>208</span><?=_s('Shift Approvals')?></a></li>
                            <li><a href="#"><span>126</span><?=_s('Shifts Available')?></a></li>
                        </ul>
                    </li>
                    <li id="menu_staff"><a class="staf" href="#" page="staff" ><?=_s('Staff')?></a></li>
                    <li id="menu_training"><a class="trai" href="#" page="training"><?=_s('Training')?></a></li>				
                    <li id="menu_reports"><a class="repo" href="#" page="reports" ><?=_s('Reports')?></a></li>
                    <li id="menu_settings"><a class="sett" href="#" page="settings" ><?=_s('Settings')?></a></li>
                    <li id="menu_logout"><a class="exit" href="index.php?logout=true"><?=_s('Logout')?></a></li>
                </ul>
            </div>
			
            <div id="wrapper" class="wrapper">
                <div class="blackMask"></div>
                <div class="subNavigation">
                    <?php Functions::getInstance()->loadFile('menus/dashboard') ?>
                    <?php Functions::getInstance()->loadFile('menus/timeclock') ?>
                    <?php Functions::getInstance()->loadFile('menus/schedule') ?>
                    <?php Functions::getInstance()->loadFile('menus/requests') ?>
                    <?php Functions::getInstance()->loadFile('menus/staff') ?>
                    <?php Functions::getInstance()->loadFile('menus/reports') ?>
					<?php Functions::getInstance()->loadFile('menus/training')?>
                </div>
                <div id="pages">
                    <div class="bigLoader">
                        Loading...
                    </div>
                    <div class="dashboard" id="dashboard">
                        <div class="search settings mainSub">
                            <ul class="filters" style="width:270px">
                                <li class="first active"><a href="#" subpage="overview"><?=_s('Overview');?></a></li>
                                <li><a href="#" subpage="edit"><?=_s('Edit');?></a></li>
                                <li><a href="#" subpage="recentShifts"><?=_s('Recent Shifts');?></a></li>
                                <li><a href="#" subpage="upcomingShifts"><?=_s('Upcoming Shifts');?></a></li>
                                <li class="last" ><a href="#" subpage="password"><?=_s('Password');?></a></li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub pingUser" id="pingUser">
                            <a class="backMenu" href="#">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                        </div>
                        <?php Functions::getInstance()->loadFile('dashboard_widgets'); ?>
                        <?php Functions::getInstance()->loadFile('dashboard_wall') ?>
                        <?php Functions::getInstance()->loadFile('dashboard_upcomingShifts'); ?>
                        <?php Functions::getInstance()->loadFile('dashboard_files'); ?>
                        <?php Functions::getInstance()->loadFile('dashboard_inbox') ?>
                        <?php Functions::getInstance()->loadFile('dashboard_settings'); ?>
                        <?php Functions::getInstance()->loadFile('dashboard_whosonnow'); ?>
                        <div class="main pingUser" id="da_who_ping">
                                                    
                        </div>
                    </div>
                    <div class="timeClock" id="timeClock">
                        <div class="subLevel mainSub displayTimeClock">
                            <a class="backMenu" href="#">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                            <ul class="subMenu" id="tc_dtc_buttons">
                                <li class="first">
                                    <a href="#" class="approve" id="tc_dtc_ap">
                                        <img width="16" height="16" src="<?php echo _fCdnPath_;?>images/tc_approve.png">
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="edit">
                                        <img width="16" height="16" src="<?php echo _fCdnPath_;?>images/tc_edit.png">
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" class="delete">
                                        <img width="16" height="16" src="<?php echo _fCdnPath_;?>images/tc_delete.png">
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <?php Functions::getInstance()->loadFile('timeClock_overview'); ?>
                        <?php Functions::getInstance()->loadFile('timeClock_addClockTime'); ?>
                        <?php Functions::getInstance()->loadFile('timeClock_manageTimeSheets'); ?>
                        <?php Functions::getInstance()->loadFile('timeClock_displayTimeSheets'); ?>
                        <div class="main displayTimeClock" id="tc_dtc">
                            
                        </div>
                    </div>
                    <div class="schedule" id="schedule">
                        <div class="myHiddenStash">
                            <input type="hidden" id="sc_start_day" />
                            <input type="hidden" id="sc_end_day" />
                            <input type="hidden" id="sc_mode" />
                            <input type="hidden" id="sc_schedule" />
                        </div>
                        <div class="search today day month mainSub" style="display: block;">
                            <span class="input">
                                <select id="sc_fl"></select>
                            </span>
                        </div>
                        <div class="search mainSub month">
                            <div class="fl ver">
                                <span id="sc_mo_di">January 2012</span>
                            </div>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" id="sc_prev_month">
                                        <img width="16" height="16" src="<?php echo _fCdnPath_;?>images/sch_pre.png" />
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" id="sc_next_month">
                                        <img width="16" height="16" src="<?php echo _fCdnPath_;?>images/sch_nex.png" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <table class="calendar mainSub month" cellpadding="0" cellspacing="0" width="100%">
                            <thead>
                                <tr id="sc_ca_he">
                                    <th><?=_s('Sun');?></th><th><?=_s('Mon');?></th><th><?=_s('Tue');?></th><th><?=_s('Wed');?></th><th><?=_s('Thu');?></th><th><?=_s('Fri');?></th><th><?=_s('Sat');?></th>
                                </tr>
                            </thead>
                            <tbody id="sc_ca_bo">
                            </tbody>
                        </table>
                        <div class="search mainSub today day" id="sc_days_m">
                            <div class="fl">
                                <span><?=_s('Today')?></span>
                                <time id="sc_to_sub"></time>
                            </div>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" id="sc_prev_day">
                                        <img width="16" height="16" src="<?php echo _fCdnPath_;?>images/sch_pre.png">
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" id="sc_next_day">
                                        <img width="16" height="16" src="<?php echo _fCdnPath_;?>images/sch_nex.png">
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftDisplay" id="sc_sub_shift_display">
                            <a href="#" class="backMenu">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="single">
                                    <a href="#" class="icoReqWor publish">
                                        <span><?=_s('Publish')?></span>
                                    </a>
                                </li>
                                <li class="single">
                                    <a href="#" class="icoReqEdi edit">
                                        <span><?=_s('Edit')?></span>
                                    </a>
                                </li>
                                <li class="single">
                                    <a href="#" class="icoReqDel delete">
                                        <span><?= _s('Delete') ?></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub addShift" id="sc_edit_submenu">
                            <a href="#" class="backMenu">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="single hidden">
                                    <a href="#" class="icoReqWor">
                                        <span><?=_s('Approve Shift')?></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <?php Functions::getInstance()->loadFile('schedule_today'); ?>
                        <?php Functions::getInstance()->loadFile('schedule_day'); ?>
                        <div class="main shiftDisplay" id="sc_shift_display">

                        </div>
                    </div>
                    <div class="requests" id="requests">
                        <div class="subLevel mainSub vacationRequestManage">
                            <a class="backMenu" href="#" subpage="vacation">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png" />
                            </a>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" id="rq_va_ma_acp">
                                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/request_1.png" /></span>
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" id="rq_va_ma_dec">
                                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/request_2.png" /></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftTradeManager" id="rq_st_mts_sub">
                            <a class="backMenu" href="#" subpage="shiftTrades">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                            <ul class="subMenu" id="rq_st_mts_fm">
                                <li class="first">
                                    <a href="#" class="activate">
                                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/request_1.png" /></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="deactivate">
                                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/request_2.png" /></span>
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" class="cancel">
                                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/tc_delete.png" /></span>
                                    </a>
                                </li>
                            </ul>
                            <ul class="subMenu hidden" id="rq_st_mts_sm">
                                <li class="single">
                                    <a href="#" class="icoReqCan cancel">
                                        <span><?=_s('Cancel')?></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftTradeManagerAP" id="rq_st_ap_sub">
                            <a class="backMenu" href="#" subpage="shiftTrades">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" class="accept">
                                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/request_1.png" /></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="reject">
                                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/request_2.png" /></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftTradeManagerIM">
                            <a class="backMenu" href="#" subpage="shiftTrades">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                            <ul class="subMenu" id="rq_st_im_sm">
                                <li class="single">
                                    <a href="#" class="icoReqCan cancel">
                                        <span><?=_s('Cancel')?></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub openShiftsOpen" id="rq_os_sub">
                            <a class="backMenu" href="#" subpage="openShifts">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="single"><a class="icoReqWor" href="#" id="rq_os_rtw"><span><?=_s('Request to work')?></span></a></li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub openShiftsRequest" id="rq_os_spr_sub">
                            <a class="backMenu" href="#" subpage="openShifts">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" class="accept">
                                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/request_1.png" /></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="reject">
                                        <span><img width="16" height="16" src="<?php echo _fCdnPath_;?>images/request_2.png" /></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftApprovalsSingle" id="rq_sa_sub">
                            <a href="#" class="backMenu" subpage="shiftApprovals">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="single"><a href="#" class="icoReqWor"><span><?=_s('Save & Close')?></span></a></li>
                            </ul>
                        </div>
                        <?php Functions::getInstance()->loadFile('requests_overview'); ?>
                        <?php Functions::getInstance()->loadFile('requests_vacation'); ?>
                        <?php Functions::getInstance()->loadFile('requests_openShifts'); ?>
                        <?php Functions::getInstance()->loadFile('requests_shiftTrades'); ?>
                        <?php Functions::getInstance()->loadFile('requests_shiftApprovals'); ?>
                        <div class="main openShiftsOpen" id="rq_os_os_s">

                        </div>
                        <div class="main openShiftsRequest" id="rq_os_spr_s">

                        </div>
                        <div class="main vacationRequestManage" id="rq_va_ma_s">

                        </div>
                        <div class="main shiftTradeManager" id="rq_st_mst_s">

                        </div>
                        <div class="main shiftTradeManagerAP" id="rq_st_ap_s">

                        </div>
                        <div class="main shiftTradeManagerIM" id="rq_st_im_s">

                        </div>
                        <div class="main shiftApprovalsSingle" id="rq_sa_s">

                        </div>
                    </div>
                    <div class="staff" id="staff">
                        <div class="search list mainSub">
                            <input type="submit" value="search" id="st_li_se_b" />
                            <span class="input">
                                <input type="text" value="<?=_s('Search...')?>" name="" onblur="if(this.value=='')this.value=this.defaultValue;" onfocus="if(this.value==this.defaultValue)this.value='';" id="st_li_se_te" />
                            </span>
                        </div>
                        <?php Functions::getInstance()->loadFile('staff_list'); ?>
                        <?php Functions::getInstance()->loadFile('staff_addStaff'); ?>
                        <?php Functions::getInstance()->loadFile('staff_fastAssignment'); ?>
                    </div>
                    <div class="reports" id="reports">
                        <div class="subLevel hidden mainSub singleViewDisplay" id="re_si_inf">
                            <a class="backMenu" href="#">
                                <img width="41" height="30" src="<?php echo _fCdnPath_;?>images/BackMenu.png">
                            </a>
                        </div>
                        <?php Functions::getInstance()->loadFile('reports_scheduleHours'); ?>
                        <?php Functions::getInstance()->loadFile('reports_confirmedHours'); ?>
                        <?php Functions::getInstance()->loadFile('reports_confirmedTimeSheets'); ?>
                        <div class="main singleViewDisplay" id="re_di_item">

                        </div>
						
                    </div>
					<div class="training" id="training">
						<div class="subLevel hidden mainSub singleSection" id="tr_si_se">
                            <a class="backMenu" href="#">
                                <img width="41" height="30" src="<?php echo _fCdnPath_; ?>images/BackMenu.png">
                            </a>
                        </div>
						<div class="subLevel hidden mainSub singleModule" id="tr_si_se">
                            <a class="backMenu"  href="#" >
                                <img width="41" height="30" src="<?php echo _fCdnPath_; ?>images/BackMenu.png">
                            </a>
                            <ul class="subMenu hidden" >
                                <li class="first">
                                    <a href="#" class="topic_stat" style="margin-right: 5px;">
                                        <img width="16" height="16" src="<?php echo _fCdnPath_;?>images/stats.png">
										<?=_s('Statistics')?>										
                                    </a>
                                </li>
                            </ul>							
                        </div>
						<div class="subLevel hidden mainSub topicstatistic"  id="tr_to_st">
                            <a class="backMenu"  href="#">
                                <img width="41" height="30" src="<?php echo _fCdnPath_; ?>images/BackMenu.png">
                            </a>
                        </div>						
						<?php Functions::getInstance()->loadFile('training_overview')?>
						<?php Functions::getInstance()->loadFile('training_singleModule')?>
						<?php Functions::getInstance()->loadFile('training_statistic')?>
						<?php Functions::getInstance()->loadFile('training_singleSection')?>
						<div class="main topicstatistic" id="tr_top_stat" style="padding: 0px;">
							<ul class="training_topic_stat staff big">
							</ul>	
						</div>						
					</div>
				
                </div>
            </div>
        </div>
        <?php Functions::getInstance()->loadFile('templates'); ?>
    </body>
</html>

