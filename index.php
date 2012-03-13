<?php
require_once('config.php');
require_once('api.php');
require_once('functions.php');
//$api = new api(null, null, true);
?>
<!DOCTYPE html>
<html style="height:100%;">
    <head>
        <title>ShiftPlanning</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;' name='viewport' />
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" type="text/css" href="css/style.mobile.css" />
        <link rel="stylesheet" type="text/css" href="css/mobiscroll.css" />
        <script src="js/sp.user.js" type="text/javascript"></script>
        <script type="text/javascript">
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
        <script src="js/jquery/jquery-1.6.4.min.js" type="text/javascript"></script>
        <script src="js/jquery/jquery.timeago.js" type="text/javascript"></script>
        <script src="js/jquery/jquery.tmpl.js" type="text/javascript"></script>
        <script src="js/jquery/jquery.ba-hashchange.min.js" type="text/javascript"></script>
        <script src="js/jquery/jquery.contains.js" type="text/javascript"></script>


        <!-- Specially for mobile devices -->
        <script src="js/plugins/mobiscroll.js" type="text/javascript"></script>


        <!-- Models -->
        <script src="js/models/sp.schedule.model.js" type="text/javascript"></script>
        <script src="js/models/sp.requests.model.js" type="text/javascript"></script>
        <script src="js/models/sp.admin.model.js" type="text/javascript"></script>
        <script src="js/models/sp.messaging.model.js" type="text/javascript"></script>
        <script src="js/models/sp.timeclock.model.js" type="text/javascript"></script>
        <script src="js/models/sp.staff.model.js" type="text/javascript"></script>
        <script src="js/models/sp.payroll.model.js" type="text/javascript"></script>

        <!-- Plugins -->
        <script src="js/plugins/date.js" type="text/javascript"></script>
        <script src="js/plugins/sp.cache.js" type="text/javascript"></script>
        <script src="js/schedule/date.js" type="text/javascript"></script>
        <script src="js/schedule/date.extras.js" type="text/javascript"></script>
        <script src="js/plugins/objSort.js" type="text/javascript"></script>

        <!-- System -->
        <script src="js/sp.common.js" type="text/javascript"></script>
        <script src="js/sp.model.js" type="text/javascript"></script>
        <script src="js/sp.view.js" type="text/javascript"></script>
        <script src="js/sp.ranges.js" type="text/javascript"></script>

        <!-- Base -->
        <script src="js/sp.staff.js" type="text/javascript"></script>
        <script src="js/sp.schedule.js" type="text/javascript"></script>
        <script src="js/sp.dashboard.js" type="text/javascript"></script>
        <script src="js/sp.timeclock.js" type="text/javascript"></script>
        <script src="js/sp.reports.js" type="text/javascript"></script>
        <script src="js/sp.requests.js" type="text/javascript"></script>

        <!-- Extension -->
        <script src="js/sp.staff.mobile.js" type="text/javascript"></script>
        <script src="js/sp.dashboard.mobile.js" type="text/javascript"></script>
        <script src="js/sp.timeclock.mobile.js" type="text/javascript"></script>
        <script src="js/sp.reports.mobile.js" type="text/javascript"></script>
        <script src="js/sp.requests.mobile.js" type="text/javascript"></script>


        <!-- Loader -->
        <script src="js/sp.common.mobile.js" type="text/javascript"></script>
        <script type="text/javascript">
            function init(){
<? if ($_SESSION['api']['token']) { ?>
            sp.staff.raw.employees = <?= _iapi(array('module' => 'staff.employees', 'method' => 'GET'), 'json', true) ?>;
            sp.staff.data.employees = sp.map(sp.staff.raw.employees);
            sp.schedule.raw.schedules = <?= _iapi(array('module' => 'schedule.schedules', 'perms' => 1, 'method' => 'GET'), 'json', true) ?>;
            sp.schedule.data.schedules = sp.map(sp.schedule.raw.schedules);
            sp.staff.admin.settings = <?= _iapi(array('module' => 'admin.settings', 'method' => 'GET'), 'json', true) ?>;
            sp.staff.admin.info = <?= _iapi(array('module' => 'staff.employee', 'method' => 'GET', 'id' => $_SESSION['user']['employee']['id']), 'json', true) ?>;
            sp.staff.raw.skills = <?= _iapi(array('module' => 'staff.skills', 'method' => 'GET'), 'json', true) ?>;
            sp.staff.data.skills = sp.map(sp.staff.raw.skills);
            sp.staff.raw.locations = <?= _iapi(array('module' => 'location.locations', 'method' => 'GET'), 'json', true) ?>;
            sp.staff.data.locations = sp.map(sp.staff.raw.locations);
            sp.raw.config = <?= _iapi(array('module' => 'api.config', 'method' => 'GET'), 'json', true) ?>;
            sp.staff.admin.info.dfAvatar = (typeof sp.staff.admin.info.avatar != 'undefined' && typeof sp.staff.admin.info.avatar.small != 'undefined') ? sp.staff.admin.info.avatar.small : 'images/no-avatar.png';
<? } ?>
    }
        </script>
    </head>
    <body onload="setTimeout(function() { window.scrollTo(0, 1) }, 100);" class="login">
        <div class="notification error"></div>
        <table height="100%" class="loginContainer" width="100%">
            <tr>
                <td width="100%">
                    <img class="logo" src="images/logo1.png" alt="ShiftPlanning" />

                    <form class="loginForm" method="post" id="lo_f" onsubmit="return false;">
                        <label>Email or Username</label>
                        <div class="holder">
                            <input autocorrect="off" autocapitalize="off" type="text" name="username" id="lo_u" />
                        </div>
                        <label>Password</label>
                        <div class="holder">
                            <input type="password" name="password" id="lo_p"/>
                        </div>
                        <button id="lo_b">Login</button>
                    </form>
                    <div class="footerTxt">View in: Mobile | <a href="/app/?fullapp=true">Full Version</a><br/>
                        <a href="/terms/">Terms of Use</a> | <a href="/privacy/">Privacy Policy</a><br/>
                        &copy; <?php echo date('Y'); ?> ShiftPlanning</div>
                </td>
            </tr>
        </table>
        <div class="applicationContainer">
            <div class="mainMenu hidden" id="menu">
                <a href="#">
                    <img height="61" width="190" src="images/logo.png" />
                </a>
                <ul class="mainNav">
                    <li><a class="dash" href="#" page="dashboard">Dashboard</a></li>
                    <li><a class="ticl" href="#" page="timeClock">Time Clock</a></li>
                    <li><a class="sche" href="#" page="schedule">Schedule</a></li>
                    <li class="active"><a class="requ" href="#" page="requests">Requests</a>
                        <ul>
                            <li><a href="#"><span>4</span>Vacation requests</a></li>
                            <li><a href="#"><span>208</span>Shift Approvals</a></li>
                            <li><a href="#"><span>126</span>Shifts Available</a></li>
                        </ul>
                    </li>
                    <li><a class="staf" href="#" page="staff">Staff</a></li>
                    <li><a class="repo" href="#" page="reports">Reports</a></li>
                </ul>
            </div>
            <div id="wrapper" class="wrapper">
                <div class="subNavigation">
                    <?php Functions::getInstance()->loadFile('menus/dashboard') ?>
                    <?php Functions::getInstance()->loadFile('menus/timeclock') ?>
                    <?php Functions::getInstance()->loadFile('menus/schedule') ?>
                    <?php Functions::getInstance()->loadFile('menus/requests') ?>
                    <?php Functions::getInstance()->loadFile('menus/staff') ?>
                    <?php Functions::getInstance()->loadFile('menus/reports') ?>
                </div>
                <div id="pages">
                    <div class="dashboard" id="dashboard">
                        <div class="search settings mainSub">
                            <ul class="filters" style="width:270px">
                                <li class="first active"><a href="#" subpage="overview">Overview</a></li>
                                <li><a href="#" subpage="edit">Edit</a></li>
                                <li class="last" ><a href="#" subpage="password">Password</a></li>
                            </ul>
                        </div>
                        <?php Functions::getInstance()->loadFile('dashboard_wall') ?>
                        <?php Functions::getInstance()->loadFile('dashboard_upcomingShifts'); ?>
                        <?php Functions::getInstance()->loadFile('dashboard_inbox') ?>
                        <?php Functions::getInstance()->loadFile('dashboard_settings'); ?>
                    </div>
                    <div class="timeClock" id="timeClock">
                        <?php Functions::getInstance()->loadFile('timeClock_overview'); ?>
                        <?php Functions::getInstance()->loadFile('timeClock_addClockTime'); ?>
                        <?php Functions::getInstance()->loadFile('timeClock_manageTimeSheets'); ?>
                    </div>
                    <div class="schedule" id="schedule">
                        <?php Functions::getInstance()->loadFile('schedule_today'); ?>
                    </div>
                    <div class="requests" id="requests">
                        <div class="subLevel mainSub vacationRequestManage">
                            <a class="backMenu" href="#" subpage="vacation">
                                <img width="41" height="30" src="images/BackMenu.png" />
                            </a>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" id="rq_va_ma_acp">
                                        <span><img width="16" height="16" src="images/request_1.png" /></span>
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" id="rq_va_ma_dec">
                                        <span><img width="16" height="16" src="images/request_2.png" /></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftTradeManager">
                            <a class="backMenu" href="#" subpage="shiftTrades">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" id="rq_st_mts_acp">
                                        <span><img width="16" height="16" src="images/request_1.png" /></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" id="rq_st_mts_dec">
                                        <span><img width="16" height="16" src="images/request_2.png" /></span>
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" id="rq_st_mts_can">
                                        <span><img width="16" height="16" src="images/tc_delete.png" /></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftTradeManagerAP">
                            <a class="backMenu" href="#" subpage="shiftTrades">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" id="rq_st_ap_acp">
                                        <span><img width="16" height="16" src="images/request_1.png" /></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" id="rq_st_ap_dec">
                                        <span><img width="16" height="16" src="images/request_2.png" /></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel">
                            <a class="backMenu" href="#">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="single"><a class="icoReqWor" href="#">Request to work</a></li>
                            </ul>
                        </div>
                        <?php Functions::getInstance()->loadFile('requests_overview'); ?>
                        <?php Functions::getInstance()->loadFile('requests_vacation'); ?>
                        <?php Functions::getInstance()->loadFile('requests_openShifts'); ?>
                        <?php Functions::getInstance()->loadFile('requests_shiftTrades'); ?>
                        <?php Functions::getInstance()->loadFile('requests_shiftApprovals'); ?>
                        <div class="main vacationRequestManage" id="rq_va_ma_s">
                            
                        </div>
                        <div class="main shiftTradeManager" id="rq_st_mst_s">
                            
                        </div>
                        <div class="main shiftTradeManagerAP" id="rq_st_ap_s">
                            
                        </div>
                    </div>
                    <div class="staff" id="staff">
                        <div class="search list mainSub">
                            <input type="submit" value="search" id="st_li_se_b" />
                            <span class="input">
                                <input type="text" value="Search..." name="" onblur="if(this.value=='')this.value=this.defaultValue;" onfocus="if(this.value==this.defaultValue)this.value='';" id="st_li_se_te" />
                            </span>
                        </div>
                        <?php Functions::getInstance()->loadFile('staff_list'); ?>
                        <?php Functions::getInstance()->loadFile('staff_addStaff'); ?>
                        <?php Functions::getInstance()->loadFile('staff_fastAssignment'); ?>
                    </div>
                    <div class="reports" id="reports">
                        <div class="subLevel hidden mainSub singleViewDisplay" id="re_si_inf">
                            <a class="backMenu" href="#">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                        </div>
                        <?php Functions::getInstance()->loadFile('reports_scheduleHours'); ?>
                        <?php Functions::getInstance()->loadFile('reports_confirmedHours'); ?>
                        <?php Functions::getInstance()->loadFile('reports_confirmedTimeSheets'); ?>
                        <div class="main singleViewDisplay" id="re_di_item">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php Functions::getInstance()->loadFile('templates'); ?>
    </body>
</html>

