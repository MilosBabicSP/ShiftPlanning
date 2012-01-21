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
        <!-- Specialy for mobile devices -->
        
        <!-- Plugins -->
        <script src="js/plugins/date.js" type="text/javascript"></script>
        <script src="js/plugins/sp.cache.js" type="text/javascript"></script>
        <script src="js/schedule/date.js" type="text/javascript"></script>
        <script src="js/schedule/date.extras.js" type="text/javascript"></script>
        
        <!-- System -->
        <script src="js/sp.common.js" type="text/javascript"></script>
        
        <script src="js/sp.staff.js" type="text/javascript"></script>
        <script src="js/sp.staff.mobile.js" type="text/javascript"></script>
 
        
        <!-- Loader -->
        <script src="js/sp.common.mobile.js" type="text/javascript"></script>
<?if (0){ //not needed yet?>        
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
                    sp.raw.config = <?= _iapi(array('module' => 'api.config', 'method' => 'GET'),'json',true) ?>;
        <? } ?>
            }
        </script>
<?}?>
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
                    &copy; <?php echo date('Y');?> ShiftPlanning</div>
                </td>
            </tr>
        </table>
        <div class="applicationContainer">
            <ul id="menu">
                <li class="active first" page="dashboard"><div class="icon iDashboard"></div><div class="title">Dashboard</div></li>
                <li page="timeClock" ><div class="icon iTimeClock"></div><div class="title">Time Clock</div></li>
                <li page="schedule" ><div class="icon iSchedule"></div><div class="title">Schedule</div></li>
                <li page="staff" ><div class="icon iStaff"></div><div class="title">Staff</div></li>
                <li page="reports"><div class="icon iReports"></div><div class="title">Reports</div></li>
            </ul>
            <div id="content">
                <div class="dashboard" id="dashboard">
                    <div class="header">
                        <div class="icon menu">click to open menu</div>
                        <ul class="tMenu">
                            <li>Icon</li>
                            <li>Icon</li>
                            <li>Icon</li>
                            <li>Icon</li>
                            <li>Icon</li>
                        </ul>
                    </div>
                    <div class="pages">
                        <div class="wall">
                            text
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>

