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

        <link rel="stylesheet" type="text/css" href="css/style.mobile.css" />
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
        <!-- Specially for mobile devices -->

        <!-- Models -->
        <!-- Models -->
        <script src="js/models/sp.schedule.model.js" type="text/javascript"></script>
        <script src="js/models/sp.requests.model.js" type="text/javascript"></script>
        <script src="js/models/sp.admin.model.js" type="text/javascript"></script>
        <script src="js/models/sp.messaging.model.js" type="text/javascript"></script>

        <!-- Plugins -->
        <script src="js/plugins/date.js" type="text/javascript"></script>
        <script src="js/plugins/sp.cache.js" type="text/javascript"></script>
        <script src="js/schedule/date.js" type="text/javascript"></script>
        <script src="js/schedule/date.extras.js" type="text/javascript"></script>

        <!-- System -->
        <script src="js/sp.common.js" type="text/javascript"></script>
        <script src="js/sp.model.js" type="text/javascript"></script>

        <!-- Base -->
        <script src="js/sp.staff.js" type="text/javascript"></script>
        <script src="js/sp.schedule.js" type="text/javascript"></script>
        <script src="js/sp.dashboard.js" type="text/javascript"></script>

        <!-- Extension -->
        <script src="js/sp.staff.mobile.js" type="text/javascript"></script>
        <script src="js/sp.dashboard.mobile.js" type="text/javascript"></script>


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
        <table height="100%" class="loginContainer" width="100%">
            <tr>
                <td width="100%">
                    <img class="logo" src="images/logo.png" alt="ShiftPlanning" />
                    <div class="error"></div>
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
                    <div class="footerTxt">View in: Mobile | <a href="/app/?fullapp=true">Full Version</a><br>
                        <a href="/terms/">Terms of Use</a> | <a href="/privacy/">Privacy Policy</a><br>
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
                    <div class="dashboard">
                        <a href="#" class="toggleMenu">
                            <img width="24" height="24" src="images/ShowHideMenu.png" />
                        </a>
                        <ul class="subNav" page="dashboard">
                            <li class="first active">
                                <a href="#" subpage="wall">
                                    <img width="16" height="16" src="images/Dashboard_Home16x16.png" />
                                </a>
                            </li>
                            <li>
                                <a href="#" subpage="upcomingShifts">
                                    <img width="16" height="16" src="images/Dashboard_UpcomingShifts16x16.png" />
                                </a>
                            </li>
                            <li>
                                <a href="#" subpage="inbox">
                                    <img width="16" height="16" src="images/Dashboard_Inbox16x16.png" />
                                </a>
                            </li>
                            <li>
                                <a href="#" subpage="settings">
                                    <img width="16" height="16" src="images/Dashboard_Settings16x16.png" />
                                </a>
                            </li>
                            <li class="last">
                                <a href="#" subpage="logout">
                                    <img width="16" height="16" src="images/Dashboard_Logout16x16.png" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="pages">
                    <div class="dashboard" id="dashboard">
                        <div class="main wall" id="da_wa">
                            <div class="welcome">
                                <p>Welcome Back,<br/>
                                    <span>Ryan Fyfe</span> with ShiftPlanning Inc.
                                </p>
                            </div>
                            <div class="title">
                                <span class="fr"><a href="#" id="da_wa_nm_b">New Message</a></span>
                                <h3>Message Wall</h3>
                            </div>
                            <div class="newMsg hidden" id="da_wa_nm_f">
                                <label>Title</label>
                                <span class="input">
                                    <input type="text" name="" value="" id="da_wa_nm_ti" />
                                </span>
                                <label>Message</label>
                                <span class="input">
                                    <textarea id="da_wa_nm_me"></textarea>
                                </span>

                                <div class="title">
                                    <span class="fr"><a href="#" id="da_wa_nm_sa">Save Message</a></span>
                                    <span class="fl"><a href="#" id="da_wa_nm_ca">Cancel</a></span>
                                </div>
                            </div>
                            <ul class="msgWall" id="da_wa_li">
                                
                            </ul>
                        </div>
                        <div class="main upcomingShifts" id="da_up">
                            asdf
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php Functions::getInstance()->loadFile('templates') ?>
    </body>
</html>

