<!DOCTYPE html>
<html style="height:100%;">
    <head>
        <title>ShiftPlanning</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;' name='viewport' />
        <meta name="viewport" content="width=device-width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Qwigley">
        <link rel="stylesheet" type="text/css" href="css/style.mobile.css" />
        <link rel="stylesheet" type="text/css" href="css/mobiscroll.css" />

        <link rel="shortcut icon" href="http://cdn.shiftplanning.com/app/layout/1/images/favicon.ico" type="image/x-icon" id="favicon">
        <link rel="apple-touch-startup-image" href="images/default.png" />

        <link rel="apple-touch-startup-image" href="images/sc/x320.png" media="screen and (max-device-width: 320px)" />
        <link rel="apple-touch-startup-image" media="(max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)" href="images/sc/x640.png" />

        <!-- For iPhone with high-resolution Retina display: -->
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/sc/iPhone-114x114.png">
        <!-- For first- and second-generation iPad: -->
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/sc/iPhone-72x72.png">
        <!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
        <link rel="apple-touch-icon-precomposed" href="images/sc/iPhone-57x57.png">
        <script type="text/javascript" id="prepLoadFiles">
            var gap = true;
        </script>
        <script src="i18n/gettext.js" type="text/javascript"></script>
        <script src="js/sp.user.js" type="text/javascript"></script>
        <script src="js/json2.js" type="text/javascript"></script>

        <!-- main jquery -->
        <script src="js/jquery/jquery-1.6.4.min.js" type="text/javascript"></script>
        <script src="js/jquery/jquery.timeago.js" type="text/javascript"></script>
        <script src="js/jquery/jquery.tmpl.js" type="text/javascript"></script>
        <script src="js/jquery/jquery.ba-hashchange.min.js" type="text/javascript"></script>
        <script src="js/jquery/jquery.contains.js" type="text/javascript"></script>

        <!-- specially for mobile device. -->
        <script src="js/plugins/mobiscroll.min.js" type="text/javascript"></script>

        <!-- models -->
        <script src="js/models/sp.schedule.model.js" type="text/javascript"></script>
        <script src="js/models/sp.requests.model.js" type="text/javascript"></script>
        <script src="js/models/sp.admin.model.js" type="text/javascript"></script>
        <script src="js/models/sp.messaging.model.js" type="text/javascript"></script>
        <script src="js/models/sp.timeclock.model.js" type="text/javascript"></script>
        <script src="js/models/sp.staff.model.js" type="text/javascript"></script>
        <script src="js/models/sp.payroll.model.js" type="text/javascript"></script>
        <script src="js/models/sp.location.model.js" type="text/javascript"></script>
        <script src="js/models/sp.training.model.js" type="text/javascript"></script>

        <!-- plugins -->
        <script src="js/plugins/date.js" type="text/javascript"></script>
        <script src="js/plugins/cookie.js" type="text/javascript"></script>
        <script src="js/plugins/sp.cache.js" type="text/javascript"></script>
        <script src="js/schedule/date.js" type="text/javascript"></script>
        <script src="js/schedule/date.extras.js" type="text/javascript"></script>
        <script src="js/plugins/objSort.js" type="text/javascript"></script>
        <script src="js/plugins/outerClick.js" type="text/javascript"></script>
        <script src="js/plugins/shorten.js" type="text/javascript"></script>

        <!-- system -->
        <script src="js/sp.common.js" type="text/javascript"></script>
        <script src="js/sp.model.js" type="text/javascript"></script>
        <script src="js/sp.view.js" type="text/javascript"></script>
        <script src="js/sp.ranges.js" type="text/javascript"></script>

        <!-- base -->
        <script src="js/sp.staff.js" type="text/javascript"></script>
        <script src="js/sp.schedule.js" type="text/javascript"></script>
        <script src="js/sp.dashboard.js" type="text/javascript"></script>
        <script src="js/sp.timeclock.js" type="text/javascript"></script>
        <script src="js/sp.reports.js" type="text/javascript"></script>
        <script src="js/sp.requests.js" type="text/javascript"></script>
        <script src="js/sp.location.js" type="text/javascript"></script>
        <script src="js/sp.permissions.js" type="text/javascript"></script>
        <script src="js/sp.training.js" type="text/javascript"></script>

        <!-- extension -->
        <script src="js/sp.staff.mobile.js" type="text/javascript"></script>
        <script src="js/sp.dashboard.mobile.js" type="text/javascript"></script>
        <script src="js/sp.timeclock.mobile.js" type="text/javascript"></script>
        <script src="js/sp.reports.mobile.js" type="text/javascript"></script>
        <script src="js/sp.requests.mobile.js" type="text/javascript"></script>
        <script src="js/sp.schedule.mobile.js" type="text/javascript"></script>
        <script src="js/sp.permissions.mobile.js" type="text/javascript"></script>
        <script src="js/sp.training.mobile.js" type="text/javascript"></script>

        <!-- Loader -->
        <script src="js/sp.common.mobile.js" type="text/javascript"></script>	

        <!-- specially for phonegap -->
        <script src="js/sp.common.mobile.gap.js" type="text/javascript"></script>

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
                        <div class="rButton">
                            <span class="checkbox fl">Remember me</span>
                        </div>
                        <button id="lo_b"><span>Login</span></button>
                    </form>
                    <div class="footerTxt">View in: Mobile | <a href="/app/?fullapp=true">Full Version</a><br/>
                        <a href="/terms/">Terms of Use</a> | <a href="/privacy/">Privacy Policy</a><br/>
                        &copy; 2012 ShiftPlanning
                    </div>
                </td>
            </tr>
        </table>
        <div class="applicationContainer">
            <div class="mainMenu hidden" id="menu">
                <a href="#">
                    <img height="61" width="190" src="images/logo.png" />
                </a>
                <ul class="mainNav">
                    <li id="menu_dashboard"><a class="dash" href="#" page="dashboard">Dashboard</a></li>
                    <li id="menu_timeClock"><a class="ticl" href="#" page="timeClock">Time Clock</a></li>
                    <li id="menu_schedule"><a class="sche" href="#" page="schedule">Schedule</a></li>
                    <li class="active" id="menu_requests"><a class="requ" href="#" page="requests">Requests</a>
                        <ul class="hidden">
                            <li><a href="#"><span>4</span>Vacation requests</a></li>
                            <li><a href="#"><span>208</span>Shift Approvals</a></li>
                            <li><a href="#"><span>126</span>Shifts Available</a></li>
                        </ul>
                    </li>
                    <li id="menu_staff"><a class="staf" href="#" page="staff" >Staff</a></li>
                    <li id="menu_training"><a class="trai" href="#" page="training">Training</a></li>				
                    <li id="menu_reports"><a class="repo" href="#" page="reports" >Reports</a></li>
                    <li id="menu_logout"><a class="exit" href="index.php?logout=true">Logout</a></li>
                </ul>
            </div>

            <div id="wrapper" class="wrapper">
                <div class="subNavigation">
                    <div class="dashboard">
                        <a href="#" class="toggleMenu">
                            <img width="24" height="24" src="images/ShowHideMenu.png" />
                        </a>
                        <div class="subWrapp">
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
                                <li id="da_up_fi_hide">
                                    <a href="#" subpage="files">
                                        <img width="16" height="16" src="images/uploaded-files.png" />
                                    </a>
                                </li>
                                <li class="hidden">
                                    <a href="#" subpage="whosonnow">
                                        <img width="16" height="16" src="images/Dashboard_whosonnow.png" />
                                    </a>
                                </li>            
                                <li>
                                    <a href="#" subpage="inbox">
                                        <img width="16" height="16" src="images/Dashboard_Inbox16x16.png" />
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" subpage="settings">
                                        <img width="16" height="16" src="images/Dashboard_Settings16x16.png" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="timeClock">
                        <a href="#" class="toggleMenu">
                            <img width="24" height="24" src="images/ShowHideMenu.png" />
                        </a>
                        <div class="subWrapp">
                            <ul class="subNav timeClock" page="timeClock">
                                <li class="first active">
                                    <a href="#" subpage="overview">
                                        <img width="16" height="16" src="images/timeclock_1.png" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" subpage="displayTimeSheets" id="tc_dts_sub_button">
                                        <img width="16" height="16" src="images/timeclock_5.png" />
                                    </a>
                                </li>            
                                <li>
                                    <a href="#" subpage="manageTimeSheets" id="tc_mts_sub_button">
                                        <img width="16" height="16" src="images/timeclock_2.png" />
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" subpage="addClockTime" id="tc_act_sub_button">
                                        <img width="16" height="16" src="images/timeclock_3.png" />
                                    </a>
                                </li>
                                <li class="hidden">
                                    <a href="#" subpage="editClockTime">
                                        <img width="16" height="16" src="images/timeclock_4.png" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="schedule">
                        <div class="subWrapp">
                            <a href="#" class="toggleMenu">
                                <img width="24" height="24" src="images/ShowHideMenu.png" />
                            </a>
                            <ul class="subNav schedule" page="schedule">
                                <li class="first active">
                                    <a href="#" subpage="today">
                                        <span>Today</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" subpage="day">
                                        <span>Day</span>
                                    </a>
                                </li>
                                <li class="last active">
                                    <a href="#" subpage="month">
                                        <span>Month</span>
                                    </a>
                                </li>
                            </ul>
                            <ul class="subMenu" id="sc_additional_menu">
                                <li class="first">
                                    <a href="#" id="sc_refresh">
                                        <img width="16" height="16" src="images/sch_ref.png">
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" id="sc_add">
                                        <img width="16" height="16" src="images/sch_add.png">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="requests">
                        <a href="#" class="toggleMenu">
                            <img width="24" height="24" src="images/ShowHideMenu.png" />
                        </a>
                        <div class="subWrapp">
                            <ul class="subNav fl" page="requests">
                                <li class="first active">
                                    <a href="#" subpage="overview">
                                        <img width="16" height="16" src="images/req_1.png" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" subpage="vacation">
                                        <img width="16" height="16" src="images/req_2.png" />
                                    </a>
                                </li>
                                <li class="hidden">
                                    <a href="#" subpage="openShifts">
                                        <img width="16" height="16" src="images/req_3.png" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" subpage="shiftTrades">
                                        <img width="16" height="16" src="images/req_4.png" />
                                    </a>
                                </li>
                                <li class="last ">
                                    <a href="#" subpage="shiftApprovals">
                                        <img width="16" height="16" src="images/req_5.png" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="staff">
                        <a href="#" class="toggleMenu">
                            <img width="24" height="24" src="images/ShowHideMenu.png" />
                        </a>
                        <div class="subWrapp" style="width:257px">
                            <ul class="subNav fl" page="staff">
                                <li class="first active">
                                    <a href="#" subpage="list">
                                        <img width="16" height="16" src="images/staff_1.png" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" subpage="addStaff">
                                        <img width="16" height="16" src="images/staff_2.png" />
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" subpage="fastAssignment">
                                        <img width="16" height="16" src="images/staff_3.png" />
                                    </a>
                                </li>
                            </ul>
                            <!-- staff filters -->
                            <ul class="subNav fr notMain"  page="staff" id="st_tp_menu">
                                <li class="first active">
                                    <a href="#" id="st_sn_ga">
                                        <img width="16" height="16" src="images/filterS.png" />
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" id="st_sn_li">
                                        <img width="16" height="16" src="images/filterL.png" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="reports">
                        <a href="#" class="toggleMenu">
                            <img width="24" height="24" src="images/ShowHideMenu.png" />
                        </a>
                        <div class="subWrapp" >
                            <ul class="subNav fl" page="reports">
                                <li class="first active">
                                    <a href="#" subpage="scheduledHours">
                                        <img width="16" height="16" src="images/rep_1.png" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" subpage="confirmedHours">
                                        <img width="16" height="16" src="images/rep_2.png" />
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" subpage="confirmedTimeSheets">
                                        <img width="16" height="16" src="images/rep_3.png" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="training">
                        <a href="#" class="toggleMenu">
                            <img width="24" height="24" src="images/ShowHideMenu.png" />
                        </a>
                        <div class="subWrapp">
                            <ul class="subNav training fr" page="training">
                                <li class="first active">
                                    <a subpage="sections" href="#">
                                        <img width="16" height="16" src="images/book-open-bookmark.png">
                                    </a>
                                </li>
                                <li class="hidden">
                                    <a subpage="statistic" href="#">
                                        <img width="16" height="16" src="images/stats.png">
                                    </a>
                                </li>
                            </ul>
                            <div class="trainingBar">
                                Progress: <span id="user_progress">0</span>%
                                <div class="barholder">
                                    <div class="progress" style="width:0%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="pages">
                    <div class="dashboard" id="dashboard">
                        <div class="search settings mainSub">
                            <ul class="filters" style="width:270px">
                                <li class="first active"><a href="#" subpage="overview">Overview</a></li>
                                <li><a href="#" subpage="edit">Edit</a></li>
                                <li><a href="#" subpage="recentShifts">Recent Shifts</a></li>
                                <li><a href="#" subpage="upcomingShifts">Upcoming Shifts</a></li>
                                <li class="last" ><a href="#" subpage="password">Password</a></li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub pingUser" id="pingUser">
                            <a class="backMenu" href="#">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                        </div>
                        <div class="main wall" id="da_wa">
                            <div class="welcome">
                                <p>Welcome Back,<br/>
                                    <span class="userName"></span> with <company></company>
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
                                    <span class="fr"><a href="#" id="da_wa_nm_sa"><span>Save Message</span></a></span>
                                    <span class="fl"><a href="#" id="da_wa_nm_ca">Cancel</a></span>
                                </div>
                            </div>
                            <ul class="msgWall" id="da_wa_li">

                            </ul>
                        </div>
                        <div class="main upcomingShifts" id="da_up">
                            <div class="title">
                                <h3>Upcoming Shifts</h3>
                            </div>
                            <ul class="timeSheet" id="da_up_li">

                            </ul>
                            <div class="notif hidden">You are not scheduled on any shifts.</div>
                        </div>
                        <div class="main files" id="da_fi">
                            <div class="title">
                                <h3>Uploaded files</h3>
                            </div>
                            <ul class="" id="da_fi_list">

                            </ul>
                            <form id="da_fi_form" class="hidden" method="post" action="api.php" target="_blank">
                                <input value="" name="id">
                                <input name="module" value="admin.file">
                                <input name="method" value="GET">
                                <input name="content" value="1">
                            </form>
                        </div>
                        <div class="main inbox" id="da_in">
                            <!-- Inbox -->
                            <div class="title wide">
                                <span class="fr"><a href="#" id="da_in_nm_b">New Message</a></span>
                                <h3>Inbox</h3>
                            </div>
                            <div class="newMsg hidden wide" id="da_in_nm_f">
                                <label>Subject</label>
                                <span class="input">
                                    <input type="text" name="" value="" id="da_in_nm_ti" />
                                </span>
                                <label>To:</label>
                                <span class="input">
                                    <select id="da_in_nm_to"></select>
                                </span>
                                <label>Message</label>
                                <span class="input">
                                    <textarea id="da_in_nm_me"></textarea>
                                </span>
                                <div class="title">
                                    <span class="fr"><a href="#" id="da_in_nm_sa"><span>Send Message</span></a></span>
                                    <span class="fl"><a href="#" id="da_in_nm_ca">Cancel</a></span>
                                </div>
                            </div>
                            <ul class="inbox" id="da_in_me">

                            </ul>
                        </div>
                        <div class="main settings" id="da_se">
                            <input type="hidden" id="da_se_cur_us_id" />
                            <div id="da_se_overview">
                                <ul class="detailsGrid">
                                    <li>
                                        <ul>    
                                            <li class="even">
                                                <div>
                                                    <label>Full name:</label>
                                                    <h4 id="da_se_ov_fn"></h4>
                                                </div>
                                            </li>
                                            <li class="odd">
                                                <div>
                                                    <label>ID:</label>
                                                    <h4 id="da_se_ov_id"></h4>
                                                </div>
                                            </li>
                                            <li class="even">
                                                <div>
                                                    <label>Username:</label>
                                                    <h4 id="da_se_ov_un"></h4>
                                                </div>
                                            </li>
                                            <li class="odd">
                                                <div>
                                                    <label>Mobile:</label>
                                                    <h4 id="da_se_ov_mo"></h4>
                                                </div>
                                            </li>
                                            <li class="even">
                                                <div>
                                                    <label>Home:</label>
                                                    <h4 id="da_se_ov_ho"></h4>
                                                </div>
                                            </li>
                                            <li class="odd">
                                                <div>
                                                    <label>Birthday:</label>
                                                    <h4 id="da_se_ov_bd"></h4>
                                                </div>
                                            </li>
                                            <li class="even">
                                                <div>
                                                    <label>Wage:</label>
                                                    <h4 id="da_se_ov_wa"></h4>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <label>Email:</label>
                                        <h4 id="da_se_ov_em"></h4>
                                    </li>
                                    <li>
                                        <label>Positions:</label>
                                        <h4 id="da_se_ov_pos"></h4> 
                                    </li>
                                </ul>
                                <div class="title">
                                    <h3 class="icoAdmAct">Admin Actions</h3>
                                </div>
                                <ul class="detailsGrid" id="da_se_ov_aa">
                                    <li>
                                        <label>Status:</label>
                                        <h4 id="da_se_ov_st"></h4>
                                    </li>
                                    <li>
                                        <label>Activation:</label>
                                        <h4 id="da_se_ov_ac"></h4>
                                    </li>
                                    <li>
                                        <a class="button fl" href="#" type="activate">Send Activation</a>
                                    </li>
                                    <li>
                                        <a class="button fl" href="#" type="manualyActivate">Manually Activate</a>
                                    </li>
                                    <li>
                                        <a class="button fl" href="#" type="deactivate">Disable User Account</a></li>
                                    <li>
                                        <a class="button fl" href="#" type="delete">Permanently Delete This Employee</a>
                                    </li>
                                </ul>
                                <div class="title aPerm">
                                    <h3 class="icoEmpPos">Employee Positions</h3>
                                </div>
                                <ul class="detailsGrid aPerm">
                                    <ul id="da_se_ov_po" class="positions">    

                                    </ul>
                                </ul>
                                <div class="title aPerm">
                                    <h3 class="icoEmpSki">Employee Skills</h3>
                                </div>
                                <ul class="detailsGrid aPerm">
                                    <li>
                                        <ul id="da_se_ov_sk" class="skills">    

                                        </ul>
                                    </li>
                                </ul>
                                <ul class="detailsGrid">
                                    <li>
                                        <label>'Notes'</label>
                                        <span class="input">
                                            <textarea id="da_se_ov_no">Write Notes...</textarea>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div id="da_se_edit">
                                <div class="title">
                                    <h3 class="icoEmpDet">Employee Details</h3>
                                </div>
                                <ul class="detailsGrid">
                                    <li>
                                        <div>
                                            <label>Name:</label>
                                            <span class="input">
                                                <input type="text" name="" value="" id="da_se_ed_na">
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label>Nick Name:</label>
                                            <span class="input">
                                                <input type="text" name="" value="" id="da_se_ed_nn">
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label>Email:</label>
                                            <span class="input">
                                                <input type="text" name="" value="" id="da_se_ed_em">
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label>Username:</label>
                                            <span class="input">
                                                <input type="text" name="" value="" id="da_se_ed_us">
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label>Mobile Phone:</label>
                                            <span class="input">
                                                <span style="width:40px; display:block; float:left; border-right:solid 1px #BBB;"><input style="text-align:center;" type="text" name="" value="" id="da_se_ed_mph_0"></span>
                                                <span style="width:40px; display:block; float:left; border-right:solid 1px #BBB;"><input style="text-align:center;" type="text" name="" value="" id="da_se_ed_mph_1"></span>
                                                <span style="margin:0 0 0 85px; display:block;"><input type="text" name="" value="" id="da_se_ed_mph_2"></span>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label>Home Phone:</label>
                                            <span class="input">
                                                <span style="width:40px; display:block; float:left; border-right:solid 1px #BBB;"><input style="text-align:center;" type="text" name="" value="" id="da_se_ed_hph_0"></span>
                                                <span style="width:40px; display:block; float:left; border-right:solid 1px #BBB;"><input style="text-align:center;" type="text" name="" value="" id="da_se_ed_hph_1"></span>
                                                <span style="margin:0 0 0 85px; display:block;"><input type="text" name="" value="" id="da_se_ed_hph_2"></span>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label>Address:</label>
                                            <span class="input">
                                                <input type="text" name="" value="" id="da_se_ed_ad" />
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label>City:</label>
                                            <span class="input">
                                                <input type="text" name="" value="" id="da_se_ed_ci" />
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label>State/Province:</label>
                                            <span class="input">
                                                <input type="text" name="" value="" id="da_se_ed_sp">
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label>Postal/Zip code:</label>
                                            <span class="input">
                                                <input type="text" name="" value="" id="da_se_ed_pz" />
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <label>Language</label>
                                            <span class="input">
                                                <select id="da_se_ed_lang"></select>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <ul>
                                            <li class="even">
                                                <div>
                                                    <label>Birthday:</label>
                                                    <span class="input">
                                                        <select id="da_se_ed_bday_m">
                                                            <option selected="" value="0">Select</option>
                                                            <option value="1">January</option>
                                                            <option value="2">February</option>
                                                            <option value="3">March</option>
                                                            <option value="4">April</option>
                                                            <option value="5">May</option>
                                                            <option value="6">June</option>
                                                            <option value="7">July</option>
                                                            <option value="8">August</option>
                                                            <option value="9">September</option>
                                                            <option value="10">October</option>
                                                            <option value="11">November</option>
                                                            <option value="12">December</option>
                                                        </select>
                                                    </span>
                                                </div>
                                            </li>
                                            <li class="odd">
                                                <div>
                                                    <label>&nbsp;</label>
                                                    <span class="input">
                                                        <select id="da_se_ed_bday_d">
                                                            <option selected="" value="0">Select</option>
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
                                        (Entering your birthday makes it public to other staff.)
                                    </li>

                                </ul>
                                <div class="title aPerm">
                                    <h3 class="icoEmpPos">Employee Positions</h3>
                                </div>
                                <ul class="detailsGrid aPerm">
                                    <ul id="da_se_ed_po" class="positions">    

                                    </ul>
                                </ul>
                                <div class="title aPerm">
                                    <h3 class="icoEmpSki">Employee Skills</h3>
                                </div>
                                <ul class="detailsGrid aPerm">
                                    <li>
                                        <ul id="da_se_ed_sk" class="skills">    

                                        </ul>
                                    </li>
                                </ul>
                                <ul class="detailsGrid">
                                    <li>
                                        <label>Notes</label>
                                        <span class="input">
                                            <textarea id="da_se_ed_no"></textarea>
                                        </span>
                                    </li>
                                </ul>
                                <div class="title">
                                    <span class="fr"><a id="da_se_ed_ue" href="#"><span>Update Employee</span></a></span>
                                </div>
                            </div>
                            <div id="da_se_password">
                                <div class="title">
                                    <h3 class="icoEmpDet">Employee Details</h3>
                                </div>
                                <ul class="detailsGrid">
                                    <li>
                                        <div>
                                            <label>Password:</label>
                                            <span class="input">
                                                <input type="password" name="" value="" id="da_se_pa_np">
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        * You only need to supply a password if you want to change it
                                    </li>
                                    <li>
                                        <div>
                                            <label>Confirm Password:</label>
                                            <span class="input">
                                                <input type="password" name="" value="" id="da_se_pa_cp">
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        * You only need to confirm your password if you changed it above
                                    </li>
                                </ul>
                                <div class="title">
                                    <span class="fr"><a id="da_se_pa_up" href="#">Update Employee</a></span>
                                </div>
                            </div>
                            <div id="da_se_recentShifts">
                                <div class="title">
                                    <h3>Recent shifts</h3>
                                </div>
                                <ul class="timeSheet" id="da_se_rs_li">

                                </ul>
                            </div>
                            <div id="da_se_upcomingShifts">
                                <div class="title">
                                    <h3>Upcoming shifts</h3>
                                </div>
                                <ul class="timeSheet" id="da_se_us_li">

                                </ul>
                            </div>
                        </div>
                        <div class="main whosonnow" id="da_wo">
                            <div class="title">
                                <h3>Who\'s on now</h3>
                            </div>
                            <ul class="timeSheet" id="da_wo_li">

                            </ul>

                        </div>
                        <div class="main pingUser" id="da_who_ping">

                        </div>
                    </div>
                    <div class="timeClock" id="timeClock">
                        <div class="subLevel mainSub displayTimeClock">
                            <a class="backMenu" href="#">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu" id="tc_dtc_buttons">
                                <li class="first">
                                    <a href="#" class="approve" id="tc_dtc_ap">
                                        <img width="16" height="16" src="images/tc_approve.png">
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="edit">
                                        <img width="16" height="16" src="images/tc_edit.png">
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" class="delete">
                                        <img width="16" height="16" src="images/tc_delete.png">
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="main overview" id="tc_ov">
                            <div class="title" id="tc_ov_cb">
                                <span class="fr"><a href="#" id="tc_ov_ci">Clock In</a></span>
                                <span class="fr"><a href="#" id="tc_ov_co">Clock Out</a></span>
                                <div class="icoClock fl">
                                    <time>january 8, 2012</time>
                                    <span>13:55</span>
                                </div>
                            </div>
                            <div class="newMsg hidden" id="tc_ov_cf">
                                <label>Schedule</label>
                                <span class="input">
                                    <select name="" id="tc_ov_ss">
                                    </select>
                                </span>
                                <label>Notes</label>
                                <span class="input">
                                    <textarea id="tc_ov_no"></textarea>
                                </span>

                                <div class="title">
                                    <span class="fr"><a href="#" id="tc_ov_ca">Cancel</a></span>
                                    <span class="fl"><a href="#" id="tc_ov_sa">Save</a></span>
                                </div>
                            </div>
                            <div class="additional" id="tc_ov_ad">
                                <p>You cannot Clock in/out from this mobile device. Management has restricted clock time to specific locations.</p>
                            </div>
                        </div>
                        <div class="main addClockTime" id="tc_act">
                            <div class="title">
                                <h3>Add Clock Time</h3>
                            </div>
                            <div class="newMsg">
                                <input type="hidden" id="tc_act_tc_id" />
                                <label>Employee</label>
                                <span class="input">
                                    <select id="tc_act_em">
                                    </select>
                                </span>
                                <label>Schedule</label>
                                <span class="input">
                                    <select id="tc_act_sc">
                                    </select>
                                </span>
                                <ul class="detailsGrid borTB">
                                    <li>
                                        <ul>                
                                            <li class="even">
                                                <div>
                                                    <label>Clock in</label>
                                                    <span class="input">
                                                        <input type="text" id="tc_act_tclin" />
                                                    </span>
                                                </div>
                                            </li>
                                            <li class="odd">
                                                <div>
                                                    <label>Clock out</label>
                                                    <span class="input">
                                                        <input type="text" id="tc_act_tclou" />
                                                    </span>
                                                </div>
                                            </li>
                                            <li class="even">
                                                <div>
                                                    <span class="input">
                                                        <input type="text" id="tc_act_c_cl_dp_i" />
                                                    </span>
                                                </div>
                                            </li>
                                            <li class="odd">
                                                <div>
                                                    <span class="input">
                                                        <input type="text" id="tc_act_c_co_dp_i" />
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <label>Notes</label>
                                <span class="input" >
                                    <textarea id="tc_act_no"></textarea>
                                </span>
                                <div class="title">
                                    <span class="fr hidden"><span class="checkbox" id="tc_act_onci">Only Clock In?</span></span>
                                    <span class="fl"><a href="#" id="tc_act_sa_b">Save</a></span>
                                </div>
                            </div>
                        </div>
                        <div class="main manageTimeSheets" id="tc_mts">
                            <div class="title">
                                <h3 class="fl">Manage Timesheets</h3>
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
                            <div class="additional hidden">
                                <p>No timesheets for selected filters.</p>
                            </div>
                        </div>
                        <div class="main displayTimeSheets" id="tc_dts">
                            <div class="title">
                                <h3>My Time Sheets</h3>
                            </div>
                            <ul class="detailsGrid">
                                <li>
                                    <ul>
                                        <li class="even">
                                            <div>
                                                <span class="input">
                                                    <select id="tc_dts_au">
                                                        <option value="0" selected="selected">All</option>
                                                        <option value="1" >Approved</option>
                                                        <option value="2" >Unapproved</option>
                                                    </select>
                                                </span>
                                            </div>
                                        </li>
                                        <li class="odd">
                                            <div>
                                                <span class="input">
                                                    <select id="tc_dts_tr">
                                                    </select>
                                                </span>
                                            </div>   
                                        </li>
                                    </ul>
                            </ul>
                            <ul class="timeSheet" id="tc_dts_ul">

                            </ul>
                            <div id="tc_dts_ul_msg">
                            </div> 
                        </div>

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
                                        <img width="16" height="16" src="images/sch_pre.png" />
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" id="sc_next_month">
                                        <img width="16" height="16" src="images/sch_nex.png" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <table class="calendar mainSub month" cellpadding="0" cellspacing="0" width="100%">
                            <thead>
                                <tr id="sc_ca_he">
                                    <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                                </tr>
                            </thead>
                            <tbody id="sc_ca_bo">
                            </tbody>
                        </table>
                        <div class="search mainSub today day" id="sc_days_m">
                            <div class="fl">
                                <span>Today</span>
                                <time id="sc_to_sub"></time>
                            </div>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" id="sc_prev_day">
                                        <img width="16" height="16" src="images/sch_pre.png">
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" id="sc_next_day">
                                        <img width="16" height="16" src="images/sch_nex.png">
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftDisplay" id="sc_sub_shift_display">
                            <a href="#" class="backMenu">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="single">
                                    <a href="#" class="icoReqWor publish">
                                        <span>Publish</span>
                                    </a>
                                </li>
                                <li class="single">
                                    <a href="#" class="icoReqEdi edit">
                                        <span>Edit</span>
                                    </a>
                                </li>
                                <li class="single">
                                    <a href="#" class="icoReqDel delete">
                                        <span>Delete</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub addShift" id="sc_edit_submenu">
                            <a href="#" class="backMenu">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="single hidden">
                                    <a href="#" class="icoReqWor">
                                        <span>Approve Shift</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="main today day month" id="sc_td">
                            <table class="day" cellpadding="0" cellspacing="0" width="100%">
                                <tbody id="sc_td_list">

                                </tbody>
                            </table>
                            <div class="loading"></div>
                            <div class="additional wide">
                                <p>No schedules for selected filters.</p>
                            </div>
                        </div>
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
                                        <h3 class="icoLoc">Work Sites</h3>
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
                                    <li>
                                        <ul>

                                        </ul>
                                    </li>
                                </ul>
                                <div type="available">
                                    <h3>Available</h3>
                                    <ul class="detailsGrid">
                                        <li>
                                            <ul>

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div type="vacation">
                                    <h3>Vacation</h3>
                                    <ul class="detailsGrid">
                                        <li>
                                            <ul>

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div type="sameday">
                                    <h3>Scheduled Today</h3>
                                    <ul class="detailsGrid">
                                        <li>
                                            <ul>

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div type="overlap">
                                    <h3>Overlapping shift</h3>
                                    <ul class="detailsGrid">
                                        <li>
                                            <ul>

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div type="mintime">
                                    <h3>Min time between shifts</h3>
                                    <ul class="detailsGrid">
                                        <li>
                                            <ul>

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div type="unavail">
                                    <h3>Unavailable</h3>
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
                                    <a href="#" id="sc_add_add">
                                        <span>Add Shift And Set Users</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div class="main shiftDisplay" id="sc_shift_display">

                        </div>
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
                        <div class="subLevel mainSub shiftTradeManager" id="rq_st_mts_sub">
                            <a class="backMenu" href="#" subpage="shiftTrades">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu" id="rq_st_mts_fm">
                                <li class="first">
                                    <a href="#" class="activate">
                                        <span><img width="16" height="16" src="images/request_1.png" /></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="deactivate">
                                        <span><img width="16" height="16" src="images/request_2.png" /></span>
                                    </a>
                                </li>
                                <li class="last">
                                    <a href="#" class="cancel">
                                        <span><img width="16" height="16" src="images/tc_delete.png" /></span>
                                    </a>
                                </li>
                            </ul>
                            <ul class="subMenu hidden" id="rq_st_mts_sm">
                                <li class="single">
                                    <a href="#" class="icoReqCan cancel">
                                        <span>Cancel</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftTradeManagerAP" id="rq_st_ap_sub">
                            <a class="backMenu" href="#" subpage="shiftTrades">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" class="accept">
                                        <span><img width="16" height="16" src="images/request_1.png" /></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="reject">
                                        <span><img width="16" height="16" src="images/request_2.png" /></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftTradeManagerIM">
                            <a class="backMenu" href="#" subpage="shiftTrades">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu" id="rq_st_im_sm">
                                <li class="single">
                                    <a href="#" class="icoReqCan cancel">
                                        <span>Cancel</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub openShiftsOpen" id="rq_os_sub">
                            <a class="backMenu" href="#" subpage="openShifts">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="single"><a class="icoReqWor" href="#" id="rq_os_rtw"><span>Request to work</span></a></li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub openShiftsRequest" id="rq_os_spr_sub">
                            <a class="backMenu" href="#" subpage="openShifts">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="first">
                                    <a href="#" class="accept">
                                        <span><img width="16" height="16" src="images/request_1.png" /></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="reject">
                                        <span><img width="16" height="16" src="images/request_2.png" /></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="subLevel mainSub shiftApprovalsSingle" id="rq_sa_sub">
                            <a href="#" class="backMenu" subpage="shiftApprovals">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu">
                                <li class="single"><a href="#" class="icoReqWor"><span>Save & Close</span></a></li>
                            </ul>
                        </div>
                        <div class="main overview" id="rq_ov">
                            <ul class="requests">
                                <li>
                                    <a class="fr" href="#" id="rq_rl_va" subpage="vacation"><img width="43" height="30" src="images/NextMenu.png"></a>
                                    <span>Vacation Requests</span>
                                <info>0</info> Vacation Request(s) needing approval
                                </li>
                                <li>
                                    <a class="fr" href="#" id="rq_rl_sp" subpage="shiftApprovals"><img width="43" height="30" src="images/NextMenu.png"></a>
                                    <span>Shift Approvals</span>
                                <info>0</info> Shift(s) needing approval
                                </li>
                                <li>
                                    <a class="fr" href="#" id="rq_rl_sr" subpage="openShifts"><img width="43" height="30" src="images/NextMenu.png"></a>
                                    <span>Shift Requests Waiting</span>
                                    There are <info>0</info> shift pickup request(s) waiting approval
                                </li>
                                <li>
                                    <a class="fr" href="#" id="rq_rl_ast" subpage="shiftTrades"><img width="43" height="30" src="images/NextMenu.png"></a>
                                    <span>Approve Shift Trades</span>
                                    There is <info>0</info> open trade request(s) needing approval
                                </li>
                                <li>
                                    <a class="fr" href="#" id="rq_rl_sv" subpage="openShifts"><img width="43" height="30" src="images/NextMenu.png"></a>
                                    <span>Shift Available</span>
                                    There is <info>0</info>  Shifts(s) available for pickup
                                </li>
                            </ul>
                            <ul class="requests hidden" id="rq_ov_hd">
                                <li>
                                    <span>No requests.</span>
                                </li>
                            </ul>
                        </div>
                        <div class="main vacation" id="rq_va">
                            <div class="title">
                                <h3>Vacation Management</h3>
                            </div>
                            <ul class="timeSheet" id="rq_va_rq">
                                <li class="loading">
                                </li>
                            </ul>
                            <div class="additional">
                                <p>No vacation requests awaiting approval.</p>
                            </div>
                            <div class="title">
                                <h3>Awaiting Approval</h3>
                            </div>
                            <ul class="requests" id="rq_va_aa">
                                <li class="loading">
                                </li>
                            </ul>
                            <div class="additional">
                                <p>You have no vacation requests awaiting approval.</p>
                            </div>
                            <div class="title">
                                <h3>Upcoming time off</h3>
                            </div>
                            <ul class="requests" id="rq_va_up">
                                <li class="loading">
                                </li>
                            </ul>
                            <div class="additional">
                                <p>You have no upcoming vacations.</p>
                            </div>
                            <div class="additional centered">
                                <p><a href="#" id="rq_va_spd">Show past dates</a></p>
                            </div>
                            <div class="newMsg">
                                <label>Employee</label>
                                <span class="input">
                                    <select id="rq_va_en">

                                    </select>
                                </span>
                                <ul class="detailsGrid borTB">
                                    <li>
                                        <ul>                
                                            <li class="even">
                                                <div>
                                                    <label>From</label>
                                                    <span class="input">
                                                        <input type="text" id="rq_va_fr" />
                                                    </span>
                                                </div>
                                            </li>
                                            <li class="odd">
                                                <div>
                                                    <label>To</label>
                                                    <span class="input">
                                                        <input type="text" id="rq_va_to" />
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <label>Comments</label>
                                        <span class="input">
                                            <textarea id="rq_va_wc"></textarea>
                                        </span>
                                    </li>
                                </ul>
                                <div class="title">
                                    <span class="fr"><a href="#" id="rq_va_sr"><span>Submit Request</span></a></span>
                                </div>
                            </div>
                        </div>
                        <div class="main openShifts" id="rq_os">
                            <div class="title">
                                <h3>Shift Pickup Requests Needing Approval</h3>
                            </div>
                            <ul id="rq_os_spr" class="requests">

                            </ul>
                            <div class="additional">
                                <p>There is currently no shift pickup requests needing approval.</p>
                            </div>
                            <div class="title">
                                <h3>Available Shifts</h3>
                            </div>
                            <ul class="requests" id="rq_os_os">

                            </ul>
                            <div class="additional">
                                <p>There is currently no shifts available for pick-up.</p>
                            </div>
                        </div>
                        <div class="main shiftTrades" id="rq_st">
                            <div class="title">
                                <h3>Manage Shift Trades</h3>
                            </div>
                            <ul class="timeSheet" id="rq_st_mst">

                            </ul>
                            <div class="additional">
                                <p>There are no shifts available for manage</p>
                            </div>
                            <div class="title">
                                <h3>Shifts Available to Pick-Up</h3>
                            </div>
                            <ul class="requests" id="rq_st_ap">

                            </ul>
                            <div class="additional">
                                <p>There are no shifts available for pick-up.</p>
                            </div>
                            <div class="title">
                                <h3>Shifts I'm trading</h3>
                            </div>
                            <ul class="requests" id="rq_st_im">

                            </ul>
                            <div class="additional">
                                <p>You have no shifts up for pick-up.</p>
                            </div>
                        </div>
                        <div class="main shiftApprovals" id="rq_sa">
                            <div class="title">
                                <h3>Shift Approvals</h3>
                            </div>
                            <ul class="detailsGrid">
                                <li>
                                    <ul>
                                        <li class="even">
                                            <div>
                                                <label>Filter By Position</label>
                                                <span class="input">
                                                    <select id="rq_sa_po">

                                                    </select>
                                                </span>
                                            </div>
                                        </li>
                                        <li class="odd">
                                            <div>
                                                <label>Filter By Employee</label>
                                                <span class="input">
                                                    <select id="rq_sa_em">

                                                    </select>
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div id="rq_sa_ho">

                            </div>
                        </div>
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
                                <input type="text" value="Search..." name="" onblur="if(this.value=='')this.value=this.defaultValue;" onfocus="if(this.value==this.defaultValue)this.value='';" id="st_li_se_te" />
                            </span>
                        </div>
                        <div class="main list" id="st_li">
                            <ul class="staff big" id="st_li_ga"> <!--big-->
                            </ul>
                            <div class="noResults hidden">There are no results for searched query.</div>
                        </div>
                        <div class="main addStaff">
                            <div class="title">
                                <h3 class="icoEmpAdd">Add New Employee</h3>
                            </div>
                            <ul class="detailsGrid">
                                <li>
                                    <div>
                                        <label>Name:</label>
                                        <span class="input">
                                            <input type="text" name="" value="" id="st_ae_i_n">
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label>Nick Name:</label>
                                        <span class="input">
                                            <input type="text" name="" value="" id="st_ae_i_nn">
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label>Email:</label>
                                        <span class="input">
                                            <input type="text" name="" value="" id="st_ae_i_e">
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label>Employee ID:</label>
                                        <span class="input">
                                            <input type="text" name="" value="" id="st_ae_i_eid">
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label>Username:</label>
                                        <span class="input">
                                            <input type="text" name="" value="" id="st_ae_i_un">
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label>Hourly Wage:</label>
                                        <span class="input">
                                            <input type="text" name="" value="" id="st_ae_i_hw">
                                        </span>
                                    </div>
                                </li>
                            </ul>
                            <ul class="detailsGrid">
                                <li>
                                    <div class="title">
                                        <h3 class="icoNot" >Notes</h3>
                                    </div>
                                </li>
                                <li>
                                    <span class="input">
                                        <textarea id="st_ae_i_no">Write Notes...</textarea>
                                    </span>
                                </li>
                            </ul>
                            <div class="title">
                                <h3 class="icoAct">Activation</h3>
                            </div>
                            <div class="title">
                                <span class="fl"><span class="checkbox" id="st_ae_sa">Send Activation</span></span>
                            </div>
                            <div class="additional">
                                <p>If this box is checked and account is setup with an e-mail address a welcome e-mail will be sent to this employee with their login instructions.</p>
                                <p>If left un-checked, they will be silently added to the system and can be sent their activation email or given their login details later.</p>
                            </div>
                            <div class="title">  
                                <span class="fr"><a href="#" id="st_ae_ce_b"><span>Create Employee</span></a></span>
                            </div>
                        </div>
                        <div class="main fastAssignment" id="st_fa">
                            <input type="hidden" value="" id="st_fa_cu" />
                            <div class="title">
                                <h3 class="icoSta">Fast Assignment</h3>
                            </div>
                            <ul class="detailsGrid">
                                <li>
                                    <label>Choose Employee</label>
                                    <span class="input">
                                        <select name="" id="st_fa_el">
                                        </select>
                                    </span>
                                </li>
                            </ul>
                            <div id="st_fa_po" class="hidden positions">
                                <div class="title">
                                    <h3 class="icoEmpPos">Positions</h3>
                                </div>
                                <ul class="detailsGrid">
                                    <ul>    

                                    </ul>
                                </ul>
                            </div>
                            <div id="st_fa_sk" class="hidden skills">
                                <div class="title">
                                    <h3 class="icoEmpSki">Skills</h3>
                                </div>
                                <ul class="detailsGrid">
                                    <li>
                                        <ul>

                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="reports" id="reports">
                        <div class="subLevel hidden mainSub singleViewDisplay" id="re_si_inf">
                            <a class="backMenu" href="#">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                        </div>
                        <div class="main scheduledHours" id="re_sh">
                            <div class="title">
                                <span class="fr"><a href="#" class="advancedButton">Advanced</a></span>
                                <div class="fl">
                                    <span>Payroll - Scheduled Hours</span>
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
                                                <label>From:</label>
                                                <span class="input">
                                                    <input type="text" class="timeFromSelector" />
                                                </span>
                                            </div>
                                        </li>
                                        <li class="odd">
                                            <div>
                                                <label>To:</label>
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
                                                <span class="checkbox re_showEmpty">Show Empty</span>  
                                            </div>
                                        </li>
                                        <li class="odd"> 
                                            <div>     
                                                <span class="checkbox re_groupResults">Group Results</span>
                                            </div>
                                        </li>
                                        <li class="even">
                                            <div>     
                                                <span class="checkbox re_deductBreaks">Deduct Breaks</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div class="title">
                                <h3>Report</h3>
                            </div>
                            <ul class="timeSheet listReports">
                            </ul>
                            <ul class="timeSheet totals">
                                <li class="TSregular">
                                    <span><b>Regular:</b> <span></span></span>
                                </li>
                                <li class="TSspecial">
                                    <span><b>Special:</b> <span></span></span>
                                </li>
                                <li class="TSovertime">
                                    <span><b>Overtime:</b> <span></span></span>
                                </li>
                                <li class="TStotal">
                                    <span><b>Total:</b> <span></span></span>
                                </li>
                                <li class="TScost">
                                    <span><b>Cost:</b> <span class="currency"></span><span></span></span>
                                </li>
                            </ul>
                            <div class="notif hidden">No data to display for selected filters.</div>
                        </div>
                        <div class="main confirmedHours" id="re_ch">
                            <div class="title">
                                <span class="fr"><a href="#" class="advancedButton">Advanced</a></span>
                                <div class="fl">
                                    <span>Payroll - Confirmed Hours</span>
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
                                                <label>From:</label>
                                                <span class="input">
                                                    <input type="text" class="timeFromSelector" />
                                                </span>
                                            </div>
                                        </li>
                                        <li class="odd">
                                            <div>
                                                <label>To:</label>
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
                                                <span class="checkbox re_showEmpty">Show Empty</span>  
                                            </div>
                                        </li>
                                        <li class="odd"> 
                                            <div>     
                                                <span class="checkbox re_groupResults">Group Results</span>
                                            </div>
                                        </li>
                                        <li class="even">
                                            <div>     
                                                <span class="checkbox re_deductBreaks">Deduct Breaks</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div class="title">
                                <h3>Report</h3>
                            </div>
                            <ul class="timeSheet listReports">
                            </ul>
                            <ul class="timeSheet totals">
                                <li class="TSregular">
                                    <span><b>Regular:</b> <span></span></span>
                                </li>
                                <li class="TSspecial">
                                    <span><b>Special:</b> <span></span></span>
                                </li>
                                <li class="TSovertime">
                                    <span><b>Overtime:</b> <span></span></span>
                                </li>
                                <li class="TStotal">
                                    <span><b>Total:</b> <span></span></span>
                                </li>
                                <li class="TScost">
                                    <span><b>Cost:</b> <span class="currency"></span><span></span></span>
                                </li>
                            </ul>
                            <div class="notif hidden">No data to display for selected filters.</div>
                        </div>
                        <div class="main confirmedTimeSheets" id="re_cts">
                            <div class="title">
                                <span class="fr"><a href="#" class="advancedButton">Advanced</a></span>
                                <div class="fl">
                                    <span>Payroll - Confirmed Time Sheets</span>
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
                                                <label>From:</label>
                                                <span class="input">
                                                    <input type="text" class="timeFromSelector" />
                                                </span>
                                            </div>
                                        </li>
                                        <li class="odd">
                                            <div>
                                                <label>To:</label>
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
                                                <span class="checkbox re_showEmpty">Show Empty</span>  
                                            </div>
                                        </li>
                                        <li class="odd"> 
                                            <div>     
                                                <span class="checkbox re_groupResults">Group Results</span>
                                            </div>
                                        </li>
                                        <li class="even">
                                            <div>     
                                                <span class="checkbox re_deductBreaks">Deduct Breaks</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div class="title">
                                <h3>Report</h3>
                            </div>
                            <ul class="timeSheet listReports">
                            </ul>
                            <ul class="timeSheet totals">
                                <li class="TSregular">
                                    <span><b>Regular:</b> <span></span></span>
                                </li>
                                <li class="TSspecial">
                                    <span><b>Special:</b> <span></span></span>
                                </li>
                                <li class="TSovertime">
                                    <span><b>Overtime:</b> <span></span></span>
                                </li>
                                <li class="TStotal">
                                    <span><b>Total:</b> <span></span></span>
                                </li>
                                <li class="TScost">
                                    <span><b>Cost:</b> <span class="currency"></span><span></span></span>
                                </li>
                            </ul>
                            <div class="notif hidden">No data to display for selected filters.</div>
                        </div>
                        <div class="main singleViewDisplay" id="re_di_item">

                        </div>		
                    </div>
                    <div class="training" id="training">
                        <div class="subLevel hidden mainSub singleSection" id="tr_si_se">
                            <a class="backMenu" href="#">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                        </div>
                        <div class="subLevel hidden mainSub singleModule" id="tr_si_se">
                            <a class="backMenu"  href="#" >
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                            <ul class="subMenu hidden" >
                                <li class="first">
                                    <a href="#" class="topic_stat" style="margin-right: 5px;"><img width="16" height="16" src="images/stats.png">Statistics</a>
                                </li>
                            </ul>							
                        </div>
                        <div class="subLevel hidden mainSub topicstatistic"  id="tr_to_st">
                            <a class="backMenu"  href="#">
                                <img width="41" height="30" src="images/BackMenu.png">
                            </a>
                        </div>						
                        <div class="main sections" id="tr_ov">
                            <div style="display: block;" class="title">
                                <h3 class="fl">Select section to start with.</h3>   
                            </div>
                            <ul class="timeSheet training_sections">
                            </ul>	
                        </div>
                        <div class="main singleModule" id="tr_mo">
                            <div class="training_module">
                            </div>	
                        </div>
                        <div class="main statistic" id="tr_stat" style="padding: 0px;">
                            <ul class="training_statistic staff big" >
                            </ul>	
                        </div>
                        <div class="main singleSection" id="tr_se">
                            <div style="display: block;" class="title">
                                <h3 id="section_name"></h3> 
                            </div>	
                            <ul class="timeSheet training_singleSection">
                            </ul>	
                        </div>
                        <div class="main topicstatistic" id="tr_top_stat" style="padding: 0px;">
                            <ul class="training_topic_stat staff big">
                            </ul>	
                        </div>						
                    </div>
                </div>
            </div>
        </div>
        <!-- ID rulez first is "te" shorten from template, next is 2 letter from module name, than 2 letter from page name, than 2 letters from page method -->
        <div id="templates">
            <script id="te_sc_usersU" type="text/x-jquery-tmpl">
                <li ><div><span class="checkbox disabled" user="${id}">${name}</span></div></li>
            </script>
            <script id="te_sc_usersW" type="text/x-jquery-tmpl">
                <li ><div><span class="checkbox check" user="${id}">${name}</span></div></li>
            </script>
            <script id="te_sc_users" type="text/x-jquery-tmpl">
                <li ><div><span class="checkbox" user="${id}">${name}</span></div></li>
            </script>
            <script id="te_sc_shifts_months" type="text/x-jquery-tmpl">
                <tr>
                    <td colspan="2" class="dTime" >${dateToday}</td>
                </tr>
                {{if typeof shifts != 'undefined'}}
                    {{tmpl(shifts) "#te_sc_shifts"}}
                {{/if}}
            </script>
            <script id="te_sc_shift_display_u" type="text/x-jquery-tmpl">
                <li>
                    <img src="${avatar}" />
                    <span>${name}</span>
                </li>
            </script>
            <script id="te_sc_shift_display" type="text/x-jquery-tmpl">
                <div id="te_sc_shift_display_info">
                    <div class="title1 wide" style="background-color: #${sp.schedule.getColorsBySchedule(schedule)[1]}; color: #${sp.schedule.getColorsBySchedule(schedule)[2]}">
                        <h3>${schedule_name}</h3>
                    </div>
                    <div class="title wide">
                        <div>
                            <span>${start_date.weekday}, ${start_date.formatted}</span>
                            ${start_time.time} - ${end_time.time}
                        </div>
                    </div>
                    {{if title.length > 0 }}
                    <div class="title1 regular wide">
                        <h3>Title</h3>
                    </div>
                    <div class="title wide">
                        ${title}
                    </div>
                    {{/if}}
                    {{if notes.length > 0 }}
                    <div class="title1 regular wide">
                        <h3>Notes></h3>
                    </div>
                    <div class="title wide">
                        ${notes}
                    </div>
                    {{/if}}
                        {{if location != 0}}
                            <div class="title1 regular wide" style="margin-left:-5px;">
                                    <h3 class="icoLoc">Remote site</h3>
                            </div>
                            <div class="title1 wide">
                                    <b>${location.name}</b>
                            </div>
                            <div class="title1 wide">
                                <div id="sc_location_iframe">

                                </div>
                                {{if location.notes.length > 0}}
                                    <br />
                                    ${location.notes}
                                {{/if}}
                            </div>
                            <div class="title1 wide">
                                    <a target="_blank" onclick = "void(0)" id="get_directions" href="http://${googleIp}/maps/?f=d&hl=en&geocode=&saddr=${user_location}&daddr=${location.address}&ie=UTF8&z=7&output=embed">Get directions</a>
                            </div>
                        {{/if}}
                    {{if employees.length > 0 }}
                    <div class="title1 regular wide">
                        <h3>Who 's Working</h3>
                    </div>
                    <ul class="acceptors wide">
                        {{tmpl(employees) "#te_sc_shift_display_u"}}
                    </ul>
                    {{/if}}
                </div>
                <div id="te_sc_shift_display_publish" class="hidden">
                    <div class="title1 regular wide">
                        <div>
                            <span class="radio" value="0">Don't notify Employees</span>
                        </div>
                    </div>
                    <div class="title1 regular wide">
                        <div>
                            <span class="radio check"  value="1">Send Notifications to Employees</span>
                        </div>
                    </div>
                    <div class="title1 regular wide"  value="2">
                        <div>
                            <span class="radio">Send Notifications to Employees & Managers</span>
                        </div>
                    </div>
                    <div class="title1 regular wide"  value="2">
                        <div>
                            <span class="checkbox">Include custom message in Notification></span>
                        </div>
                    </div>
                    <div class="title wide hidden" id="tc_sc_shift_display_publish_textarea">
                        <span class="input">
                            <textarea>

                            </textarea>
                        </span>
                    </div>
                                </div>

                    <div class="hidden" id="te_sc_shift_display_delete">
                         <div class="title1 regular wide">
                        <div>
                            <span class="radio check" value="">Only this Shift</span>
                        </div>
                    </div>
                    <div class="title1 regular wide">
                        <div>
                            <span class="radio"  value="following">This shift + All following</span>
                        </div>
                    </div>
                    <div class="title1 regular wide">
                        <div>
                            <span class="radio" value="all">All shifts in this series</span>
                        </div>
                    </div>
                </div>
            </script>
            <script id="te_sc_shifts_names" type="text/x-jquery-tmpl">
                <t>${name}, </t>
            </script>
            <script id="te_sc_shifts" type="text/x-jquery-tmpl">
                <tr shiftId="${id}" class="isShift">
                    <td class="dTime" style="background-color: #${sp.schedule.getColorsBySchedule(schedule)[1]}; color: #${sp.schedule.getColorsBySchedule(schedule)[2]}">${start_time.time} - ${end_time.time}</td>
                    <td class="dTitle {{if (published == 0 || (published < edited && published != 0)) && perms == 2 && sp.staff.admin.settings.draft == 1}}notPublished{{/if}}">${schedule_name}<br/>{{if employees != null}}<span>{{tmpl(employees) "#te_sc_shifts_names"}}</span>{{/if}}</td>
                </tr>
            </script>
            <script id="te_rq_sa_s_in" type="text/x-jquery-tmpl">
                <li shiftId="{{if typeof shift.id != 'undefined'}}${shift.id}{{else}}${shift.shift}{{/if}}" userId="${id}" class="save">
                    <span class="quarter">${name}</span>
                    <span class="quarter even">
                        <span class="input">
                            <input type="text" value="${shift.start_time.time}" class="shiftStartInput" />
                        </span>
                    </span>
                    <span class="quarter odd">
                        <span class="input">
                            <input type="text" value="${shift.end_time.time}" class="shiftEndInput" />
                        </span>
                    </span>
                    <span class="quarter"><span class="checkbox {{if shift.absent == 0}}check{{/if}}"></span></span>
                </li>
            </script>
            <script id="te_rq_sa_s" type="text/x-jquery-tmpl">
                <ul class="timeSheet">
                    <li><span class="date"><b>Shift:</b></span><span class="time">${start_time.time} - ${end_time.time}</span><span class="last">>Worked?</span></li>
                    {{if employees != null}}
                    {{tmpl(employees) "#te_rq_sa_s_in"}}
                    {{/if}}
                </ul>
            </script>
            <script id="te_rq_sa_in" type="text/x-jquery-tmpl">
                <li><span class="names">${schedule_name}</span><span class="time">${start_time.time} - ${end_time.time}</span><span class="last"><span class="checkbox" shiftId="${id}"></span></span></li>
            </script>
            <script id="te_rq_sa" type="text/x-jquery-tmpl">
                <div class="title">
                    <h3 class="fl">${shiftDate}</h3>
                </div>
                <ul class="timeSheet">
                    {{tmpl(shifts) "#te_rq_sa_in"}}
                </ul>
            </script>
            <script id="te_rq_os_spr_s" type="text/x-jquery-tmpl">
                <div class="title wide mar">
                    <div>
                        <img width="30" height="30" src="${avatar}">
                        <span>${user_name}</span>
                        ${start_date.formatted}
                    </div>
                </div>
                <div class="title1 wide mar">
                    <h3>${schedule_name}</h3>
                </div>
                <ul class="requests">
                    <li>
                        <span>${full.start_time.time} - ${full.end_time.time}</span>
                    </li>
                </ul>
                {{if notes.length > 0}}
                <div class="title1 regular wide">
                    <h3>Title / Notes></h3>
                </div>
                <div class="additional">
                    <p>${notes}</p>
                </div>
                {{/if}}
            </script>
            <script id="te_rq_os_spr" type="text/x-jquery-tmpl">
                <li>
                    <a href="#" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
                    <span>${start_date}</span>
                    ${schedule_name}<br/>
                    ${hours}
                </li>
            </script>
            <script id="te_rq_os_os_s" type="text/x-jquery-tmpl">
                <div class="title wide mar">
                    <div>
                        <span>${start_date.formatted}</span>
                    </div>
                </div>
                <div class="title1 wide mar">
                    <h3>${schedule_name}</h3>
                </div>
                <ul class="requests">
                    <li>
                        <span>${start_time.time} - ${end_time.time}</span>
                    </li>
                </ul>
                {{if notes.length > 0}}
                <div class="title1">
                    <h3>Title / Notes</h3>
                </div>
                <div class="additional">
                    <p>${notes}</p>
                </div>
                {{/if}}
            </script>
            <script id="te_rq_os_os" type="text/x-jquery-tmpl">
                <li>
                    <a href="#" rel="${rId}"><img width="43" height="30" src="<images/NextMenu.png"></a>
                    <span>${start_date.formatted}</span>
                    ${schedule_name}<br/>
                    ${start_time.time} - ${end_time.time}
                </li>
            </script>
            <script id="te_rq_st_im_s" type="text/x-jquery-tmpl">
                <div class="title">
                    <div>
                        <img width="30" height="30" src="${avatar}">
                        <span>${user_name}</span>
                        ${requested.formatted}
                    </div>
                </div>
                <div class="title1 sales">
                    <h3>${schedule_name}</h3>
                </div>
                <ul class="requests">
                    <li>
                        <span>${shift_start_time} - ${shift_end_time}</span> <span>${shift_start_date.formatted}</span>
                    </li>
                </ul>
                {{if reason.length > 0}}
                <div class="additional">
                    <p>${reason}</p>
                </div>
                {{/if}}
            </script>
            <script id="te_rq_st_ap_s" type="text/x-jquery-tmpl">
                <div class="title wide">
                    <div>
                        <img width="30" height="30" src="${avatar}">
                        <span>${user_name}</span>
                        ${requested.formatted}
                    </div>
                </div>
                <div class="title1 sales wide">
                    <h3>${schedule_name}</h3>
                </div>
                <ul class="requests">
                    <li>
                        <span>${shift_start_time} - ${shift_end_time}</span> <span>${shift_start_date.formatted}</span>
                    </li>
                </ul>
                {{if trade_reason.length > 0}}
                <div class="additional">
                    <p>${trade_reason}</p>
                </div>
                {{/if}}
                {{if confirmed.length == 1}}
                <div class="additional">
                    <p>Waiting for Manager to Approve.</p>
                </div>
                {{/if}}
            </script>
            <script id="te_rq_st_mst_s" type="text/x-jquery-tmpl">
                <div class="title wide mar">
                    <div>
                        <img width="30" height="30" src="${avatar}">
                        <span>${user_name}</span>
                        ${requested.formatted}
                    </div>
                </div>
                <div class="title1 sales wide mar">
                    <h3>${schedule_name}</h3>
                </div>
                <ul class="requests">
                    <li>
                        <span>${shift_start_time} - ${shift_end_time}</span> <span>${shift_start_date.formatted}</span>
                    </li>
                </ul>
                <div class="additional wide mar">
                    <p>${reason}</p>
                </div>
                <div class="title1 regular wide mar">
                    <h3>Potentional Acceptors></h3>
                </div>
                <div class="traders {{if confirm_before == 1}}confirmBefore{{/if}}">
                    {{tmpl(traders.data) "#te_rq_st_mst_s_l"}}
                </div>
            </script>
            <script id="te_rq_st_mst_s_l" type="text/x-jquery-tmpl">
                <div class="title">
                    {{if confirmed == 1 && approved == 0}}  
                    <ul class="subMenu">
                        <li><span>Accepted></span></li>
                        <li class="first">
                            <a href="#" tradeId="${trade_id}" userId="${user}" class="accept" >
                                <span><img width="16" height="16" src="images/request_1.png"></span>
                            </a>
                        </li>
                        <li class="last">
                            <a href="#" tradeId="${trade_id}" userId="${user}" class="reject" >
                                <span><img width="16" height="16" src="images/request_2.png"></span>
                            </a>
                        </li>
                    </ul>
                    {{/if}}
                    {{if (confirmed == -1 && approved == -1) || (confirmed == 1 && approved == -1)}}
                    <span class="fr">Rejected</span>
                    {{else}}
                    {{if confirmed == 0 && approved == 0}}
                    <span class="fr avaitingST">Awaiting response</span>
                    {{/if}}
                    {{/if}}
                    <div>
                        <img width="30" height="30" src="${avatar}">
                        <span>${user_name}</span>
                    </div>
                </div>
            </script>
            <script id="te_rq_st_ap" type="text/x-jquery-tmpl">
                <li>
                    <a href="#" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
                    <span>${schedule_name}</span>
                    ${shift_start_date.formatted} <br />
                    ${shift_start_time}
                </li>
            </script>
            <script id="te_rq_st_mst" type="text/x-jquery-tmpl">
                <li>
                    <a class="fr" href="#" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
                    <img width="30" height="30" src="${avatar}" />
                    <span class="twoLine">
                        ${user_name}
                        <br />
                        ${shift_start_date.formatted} &raquo; ${shift_start_time} - ${shift_end_time}
                    </span>
                </li>
            </script>
            <script id="te_rq_va_up" type="text/x-jquery-tmpl">
                <li {{if start_day.id < sp.raw.config.today.id}} class="hidden pastDate"{{/if}} id="rq_va_tb_tr_${id}">
                    {{if start_day.id >= sp.raw.config.today.id}}<a class="fr deleteVacation" href="#" rel="${id}"><img width="43" height="30" src="images/DelMenu.png"></a>{{/if}}
                    <span>${start_day.formatted} - ${end_day.formatted}</span>
                    ${total_days + 1} 'Day(s), Approved'>
                </li>
            </script>
            <script id="te_rq_va_aa" type="text/x-jquery-tmpl">
                <li id="rq_va_tb_tr_${id}">
                    <a class="fr deleteVacation" href="#" rel="${id}"><img width="43" height="30" src="images/DelMenu.png"></a>
                    <span>${start_day.formatted} - ${end_day.formatted}</span>
                    ${length} 'Day(s), Pending'>
                </li>
            </script>
            <script id="te_rq_va_ma_s" type="text/x-jquery-tmpl">
                <div class="title">
                    <div>
                        <img width="30" height="30" src="${avatar}">
                        <h3>${employee_name}</h3>
                    </div>
                </div>
                <ul class="multiInput">
                    <li class="even">
                        <div>
                            <b class="fromI">'From'></b><br/>
                            <span>${start_day.formatted}</span>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <b class="untilI">'Until'></b><br/>
                            <span>${end_day.formatted}</span>
                        </div>
                    </li>
                </ul>
                <div class="title1">
                    '<b>Status:</b> Pending'>
                </div>
                <div class="title1">
                    <b>'Conflicts':</b>
                    {{if conflicts.count > 0}}
                        <br />
                        {{tmpl(conflicts.data) "#te_rq_va_ma_co"}}
                    {{else}}
                        <br />
                    {{/if}}	
                </div>
            </script>
            <script id="te_rq_va_ma_co" type="text/x-jquery-tmpl">
                <a href="#" class="conflict" rel="${id}">${start_date.formatted}</a> <br />
            </script>
            <script id="te_rq_va_ma" type="text/x-jquery-tmpl">
                <li>
                    <a class="fr" href="#" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>
                    <span>
                        <img width="30" height="30" src="${avatar}">
                        ${employee_name}
                    </span>
                </li>
            </script>
            <script id="te_re_confirmedTimeSheets_1" type="text/x-jquery-tmpl">
                <div class="title">
                    <div>
                        <img width="30" height="30" src="${avatar}" />
                        <span>${employee}</span>
                        ${start_date.formatted} - ${end_date.formatted}
                    </div>
                </div>
                <ul class="multiInput">
                    <li class="even">
                        <div>
                            <label>'Eid'</label>
                            <b>${eid}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Ratecard'</label>
                            <b>{{if typeof hours.ratecard != 'undefined'}}${hours.ratecard.name}{{/if}}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Regular'</label>
                            <b>${hours.regular.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Special'></label>
                            <b>${hours.special.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Overtime'</label>
                            <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Total'</label>
                            <b>${hours.total.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Cost'></label>
                            <b><span class="currency">$</span>${hours.cost.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                </ul>
            </script>
            <script id="te_re_confirmedTimeSheets_0" type="text/x-jquery-tmpl">
                <div class="title">
                    <div>
                        <img width="30" height="30" src="${avatar}" />
                        <span>${employee}</span>
                        ${date.formatted}
                    </div>
                </div>
                <ul class="multiInput">
                    <li class="even">
                        <div>
                            <label>'Eid'</label>
                            <b>${eid}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Rate'></label>
                            <b>${hours.rate}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Regular'</label>
                            <b>${hours.regular.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Special'</label>
                            <b>${hours.special.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Overtime'</label>
                            <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Total'></label>
                            <b>${hours.total.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Cost'></label>
                            <b><span class="currency">$</span>${hours.cost.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                </ul>
            </script>
            <script id="te_re_confirmedHours_0" type="text/x-jquery-tmpl">
                <div class="title">
                    <div>
                        <img width="30" height="30" src="${avatar}" />
                        <span>${employee}</span>
                        ${date.formatted}
                    </div>
                </div>
                <ul class="multiInput">
                    <li class="even">
                        <div>
                            <label>'Eid'</label>
                            <b>${eid}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Position'></label>
                            <b>${position.name}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Location'></label>
                            <b>${hours.location.name}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Rate'></label>
                            <b>${hours.rate}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Ratecard'</label>
                            <b>{{if typeof hours.ratecard != 'undefined'}}${hours.ratecard.name}{{/if}}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Start Time'</label>
                            <b>${start_time.time}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'End Time'</label>
                            <b>${end_time.time}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Regular'</label>
                            <b>${hours.regular.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Special'</label>
                            <b>${hours.special.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Overtime'</label>
                            <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Total'</label>
                            <b>${hours.total.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Cost'</label>
                            <b><span class="currency">$</span>${hours.cost.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                </ul>
            </script>
            <script id="te_re_confirmedHours_1" type="text/x-jquery-tmpl">
                <div class="title">
                    <div>
                        <img width="30" height="30" src="${avatar}">
                        <span>${employee}</span>
                        ${start_date.formatted} - ${end_date.formatted}
                    </div>
                </div>
                <ul class="multiInput">
                    <li class="even">
                        <div>
                            <label>'Eid'</label>
                            <b>${eid}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Rate'</label>
                            <b>&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Regular'</label>
                            <b>${hours.regular.toFixed(2)}</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Special'</label>
                            <b>${hours.special.toFixed(2)}</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Overtime'</label>
                            <b>${hours.overtime.toFixed(2)}</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Total'</label>
                            <b>${hours.total.toFixed(2)}</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Cost'</label>
                            <b><span class="currency">$</span>${hours.cost.toFixed(2)}</b>
                        </div>
                    </li>
                </ul>
            </script>
            <script id="te_re_scheduledHours_0" type="text/x-jquery-tmpl">
                <div class="title">
                    <div>
                        <img width="30" height="30" src="${avatar}">
                        <span>${employee}</span>
                        ${date.formatted}
                    </div>
                </div>
                <ul class="multiInput">
                    <li class="even">
                        <div>
                            <label>'Eid'</label>
                            <b>${eid}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Position'</label>
                            <b>${position.name}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Location'</label>
                            <b>${hours.location.name}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Rate'</label>
                            <b>${hours.rate}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Ratecard'</label>
                            <b>{{if typeof hours.ratecard != 'undefined'}}${hours.ratecard.name}{{/if}}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Start Time'</label>
                            <b>${start_time.time}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'End Time'</label>
                            <b>${end_time.time}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Regular'</label>
                            <b>${hours.regular.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Special'</label>
                            <b>${hours.special.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Overtime'</label>
                            <b>${hours.overtime.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Total'</label>
                            <b>${hours.total.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Cost'</label>
                            <b><span class="currency">$</span>${hours.cost.toFixed(2)}&nbsp;</b>
                        </div>
                    </li>
                </ul>
            </script>
            <script id="te_re_scheduledHours_1" type="text/x-jquery-tmpl">
                <div class="title">
                    <div>
                        <img width="30" height="30" src="${avatar}">
                        <span>${employee}</span>
                        ${start_date.formatted} - ${end_date.formatted}
                    </div>
                </div>
                <ul class="multiInput">
                    <li class="even">
                        <div>
                            <label>'Eid'</label>
                            <b>${eid}&nbsp;</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Rate'</label>
                            <b>&nbsp;</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Regular'</label>
                            <b>${hours.regular.toFixed(2)}</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Special'</label>
                            <b>${hours.special.toFixed(2)}</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Overtime'</label>
                            <b>${hours.overtime.toFixed(2)}</b>
                        </div>
                    </li>
                    <li class="odd">
                        <div>
                            <label>'Total'</label>
                            <b>${hours.total.toFixed(2)}</b>
                        </div>
                    </li>
                    <li class="even">
                        <div>
                            <label>'Cost'</label>
                            <b><span class="currency">$</span>${hours.cost.toFixed(2)}</b>
                        </div>
                    </li>
                </ul>
            </script>
            <script id="te_re_info" type="text/x-jquery-tmpl">
                <li>
                    <a href="#" class="fr" rel="${rId}"><img width="43" height="30" src="images/NextMenu.png"></a>

                        <img width="30" height="30" src="${avatar}">
                        <span class="twoLine">
                        ${employee}<br/>
                        {{if typeof start_time == 'undefined'}}
                            ${start_date.formatted} - ${end_date.formatted}
                        {{else}}
                            {{if typeof start_time.time == 'undefined'}}
                                ${date.formatted} &raquo; ${start_time} - ${end_time}
                            {{else}}
                                ${date.formatted} &raquo; ${start_time.time} - ${end_time.time}
                            {{/if}}
                        {{/if}}
                    </span>
                </li>
            </script>
                <script id="te_tr_sections" type="text/x-jquery-tmpl">
                        <li class="idle">
                                                <div rel="${id}" onclick = "void(0)" id="tr_touch">
                                <div class="oneLine" style="width:80%;overflow:hidden">
                                    <b {{if notfinished_count > 0}}style="float:left"{{/if}} >${title}</b>{{if notfinished_count > 0}}<a style="padding-left:10px;"><img style="width:16px;height:16px;padding-bottom:5px;" src="images/req_1.png"></a> {{/if}}
                                </div>
                                                                </div>				
                        </li>
                </script>
                <script id="te_tr_statistic" type="text/x-jquery-tmpl">
                <li staffId="${id}" >
                    <img width="50" height="50" src="${avatar}" />
                    <span>${name} <b {{if stat < 30 }}style="color : #8C1919"{{else}}{{if stat < 100}}style="color : orange"{{else}}style="color : green"{{/if}} {{/if}}>${stat}%</b></span>
                </li>	
                </script>
                <script id="te_tr_topic_statistic" type="text/x-jquery-tmpl">
                <li staffId="${id}" >
                    <img width="50" height="50" src="${avatar}" />
                    <span>${name}{{if finished == null }} 
                                                                <b><img style="width:16px;height:16px" src="images/tc_delete.png"></b></span>
                                                         {{else}}
                                                                {{if typeof outdated != 'undefined' && outdated > 0 }}
                                                                        <b><img style="width:16px;height:16px" src="images/req_1.png"></b></span>
                                                                {{else}}
                                                                        <b><img style="width:16px;height:16px" src="images/tc_approve.png"></b></span>
                                                                {{/if}}								
                                                        {{/if}}
                                </span>
                </li>	
                </script>	
                <script id="te_tr_singleSection" type="text/x-jquery-tmpl">
                        <li class="idle">
                                                <div rel="${id}" onclick = "void(0)" id="tr_touch">
                                <div class="oneLine" style="width:80%;overflow:hidden;">
                                    <b {{if finished_flag != -99}}style="float:left"{{/if}}>${title}</b>{{if finished_flag == 99 || finished_flag == 0}}<a style="padding-left:10px;"><img style="width:16px;height:16px;padding-bottom:5px;" src="images/req_1.png"></a> 
                                                                                                        {{else}}{{if finished_flag == 1 }} <a style="padding-left:10px;"><img style="width:16px;height:16px;padding-bottom:3px;" src="images/tc_approve.png"></a> {{/if}}
                                                                                                {{/if}}
                                </div>
                                                                </div>	
                </script>
                <script id="te_tr_module" type="text/x-jquery-tmpl">
                        <div class="title" style="display: block;">
                                <h3 class="fl">${title}{{if duedate != 0 }} {{if finished_flag == 0 || finished_flag == 99 }}<br><a style="color:${color}">Due date: ${duedate_formated}</a> {{/if}}{{/if}} 
                                {{if est_time > 0}} 		
                                        <br/>	
                                        <a style="color:green">Est. time : ${est_time} min</a>		
                                {{/if}}	
                                </h3>

                        </div>
                        <div class="wys" contents="content_${id}" style="border-bottom: 1px solid #DBDBDB; padding-bottom: 10px;">
                                ${contents}
                                        &ltbr/&gt
                                        {{if video != null && video.length > 0}}
                                                &ltdiv class="codebox"&gt
                                                &ltb&gt Video &lt/b&gt&ltbr/&gt
                                                &lta target="_blank" href="http://www.youtube.com/v/${video}"&gt Click to watch&lt/a&gt
                                                &lt/div&gt
                                        {{/if}}			
                                        {{if files!= null && files.length > 0}}
                                                &ltdiv class="codebox"&gt
                                                &ltb&gt Attachments &lt/b&gt&ltbr/&gt
                                                {{each files}}
                                                        &lta target="_blank" href="${$value.secureurl}"&gt${$value.filename}&lt/a&gt (${$value.file_size})&ltbr/&gt
                                                {{/each}}
                                        &lt/div&gt
                                        {{/if}}
                                        &ltbr/&gt
                                        {{if finished_flag == 99 }}
                                                &lta class="confirm" rel="${id}"&gt I've Reviewed this &lt/a&gt
                                        {{else}}
                                                        {{if finished_flag == 0}}
                                                                &lta class="confirm" rel="${id}"&gt I've Finished this &lt/a&gt
                                                        {{else}}
                                                                        {{if finished_flag == -99}}
                                                                        &ltb&gt You are not required to complete this topic &lt/b&gt
                                                                        {{else}}
                                                                                        {{if finished_flag == 1}}
                                                                                        &ltb&gt You completed this topic &lt/b&gt
                                                                                        {{/if}}
                                                                        {{/if}}
                                                        {{/if}}
                                        {{/if}}

                        </div>
                        {{if typeof signatures != 'undefined' }}
                        {{each signatures}}
                        <div class="title1 regular wide" sign="sign">
                                        <img width="40" height="40" src="${$value.avatar}" /><span style="margin-left:10px;font-family: 'Qwigley',cursive,Arial;font-size:24px;">${$value.text}</span>
                        </div>
                        {{/each}}
                                {{if finished_flag == 99 || finished_flag == 0 }}
                                <br/>
                                        <div class="dig_signature">
                                                <p>Sign here:</p>
                                                <input type="text" id="digi_text">
                                                <span>By entering your name into this box you are confirming that you have read and agreed to the above.</span>
                                        </div>
                                        <div class="title">
                                        <span class="fr">
                                                <a id="tr_send_signature" onclick = "void(0)" rel="${id}"><span>Sign</span></a>
                                        </span>
                                        </div>
                                {{/if}}
                        {{/if}}

                        {{if typeof comments !='undefined' }}
                                <div class="title">
                                        <h4>Comments</h4>
                                </div>
                                {{each comments}}
                                <div class="title1 regular wide">
                                        <img width="40" height="40" src="${$value.avatar}" /><b style="margin-left:5px;">${$value.name}</b>
                                </div>
                                <div class="title1 wide"><span style="padding-left:45px;">${$value.text}</span></div>
                                {{/each}}
                                <br/>
                                <span class="input">
                                        <textarea id="tr_comment" style="width: 1243px; height: 44px;"></textarea>
                                </span>
                                <div class="title">
                                <span class="fr">
                                        <a id="tr_send_comment" onclick = "void(0)"><span>Comment</span></a>
                                </span>
                                </div>
                        {{/if}}

                </script>
            <script id="te_da_ping" type="text/x-jquery-tmpl">
                <div class="title1 wide" style="background-color: #ebefd6; color: #565551;">
                    <div>
                        <h3>'Ping ${name} via Email & SMS'</h3>
                    </div>
                </div>
                <span class="input" >
                    <textarea id="da_who_txt" maxlength=140></textarea>
                </span>
                </br>
                <div id="da_who_tmpl">
                    <div class="title1 regular wide">
                    'Late':
                    <span>'You 're late for a shift. Please contact us right away.' {{if company_phone.length != 0}} 'Phone' : ${company_phone}{{/if}}</span>
                </div>

                <div class="title1 regular wide">
                    'P. Contact':
                    <span>'Please contact ${name} right away.' {{if cell_phone.length != 0}}'Cell phone' : ${cell_phone}{{/if}} </span>
                </div>

                <div class="title1 regular wide">
                    'B. Contact':
                    <span>'Please contact ${company} right away.' {{if company_phone.length != 0}} 'Phone' : ${company_phone}{{/if}}</span>
                </div>

                <div class="title1 regular wide">
                    Birthday:
                    <span>Happy Birthday from everyone at ${company}.</span>
                </div>

                <div class="title">
                    <span class="fr">
                        <a id="da_who_send" href="#">
                            <span>Send Ping</span>
                        </a>
                    </span>
                </div>
                </div>
            </script>

                <script id="te_da_se_rs" type="text/x-jquery-tmpl">
                    <li>
                        <span class="names">
                         ${start_date.mname} ${start_date.day}
                    </span>
                        <span class="time">
                        ${start_time.time} - ${end_time.time}
                    </span>
                    <a class="fr" shiftId="${id}" href="#">
                        <img height="30" width="43" src="images/NextMenu.png">
                    </a>
                </li>
            </script>
                <script id="te_da_onnow" type="text/x-jquery-tmpl">
                <li>
                    <a href="#" class="fr" userID="${userID}"><img width="43" height="30" src="images/NextMenu.png"></a>

                        <img width="30" height="30" src="${avatar}">
                        <span class="twoLine">
                        ${name}<br/>
                        ${position} &raquo; ${start_time} - ${end_time}
                    </span>
                </li>
            </script>
            <script id="te_st_list" type="text/x-jquery-tmpl">
                <li staffId="${id}">
                    {{if typeof avatar.medium != 'undefined'}}
                    <img src="${avatar.medium}" />
                    {{else}}
                    <img src="images/no-avatar.png" />
                    {{/if}}
                    <span>${name}</span>
                </li>
            </script>
            <script id="te_tc_dtc" type="text/x-jquery-tmpl">
                <div class="title">
                    <div>
                        <img width="30" height="30" src="${employee.avatar}">
                        <span>${employee.name}</span>
                        {{if schedule != null}}
                            ${schedule.name}
                        {{/if}}
                    </div>
                </div>
                <div class="title">
                    <div>                 
                        <span>In time</span>
                        ${in_time.day} <br/>
                        ${in_time.time}
                    </div>         
                </div>
                <div class="title">
                    <div>                 
                        <span>Out time</span>
                        ${out_time.day} <br/>
                        ${out_time.time}
                    </div>         
                </div>
                <div class="title">
                    <div>                 
                        <span>Length')</span>
                        ${length.total_hours}h
                    </div>         
                </div>
                <div class="title">
                    <div>                 
                        <span>In location</span>
                        ${in_location}
                    </div>         
                </div>
                <div class="title">
                    <div>                 
                        <span>Out location</span>
                        ${out_location}
                    </div>         
                </div>
                {{if notes != null}}
                    <div class="additional">
                        <p>${notes}</p>
                    </div>
                {{/if}}
            </script>
            <script id="te_tc_mts_li_in" type="text/x-jquery-tmpl">
                <li class="s_${status} e_${user} sc_${schedule}" timeclockId="${id}">
                    <span class="names">${name}</span>
                    <span class="time">
                        <span class="tStart">${st.time}</span>
                        <img width="16" height="16" src="images/tc_sm_clock.png" />
                        {{if length.total_hours == ""}}
                            <span class="tPending" user="${user}">Clock Out</span>
                        {{else}}
                            <span class="tEnd">${out.time}</span>
                        {{/if}}

                    </span>
                    <span class="last">${length.hours}h, ${length.mins}min</span></li>
            </script>
            <script id="te_tc_dts_li" type="text/x-jquery-tmpl">
                <li class="app_${approved_by}">
                    <span class="names"><b>${in_time.day}</b></span>
                    <span class="time">
                        <span class="tStart">${in_time.time}</span>
                        {{if out_time.time != ""}}
                            <img width="16" height="16" src="images/tc_sm_clock.png" />
                            <span class="tEnd">${out_time.time}</span>                                       
                        {{/if}}
                    </span>
                    {{if length.hours != ""}}
                        <span class="last">${length.hours}h, ${length.mins} min</span>
                        {{else}}{{if length.mins != ""}}
                        <span class="last">${length.mins} min</span>
                        {{/if}}
                    {{/if}}    
                </li>
            </script>
            <script id="te_tc_mts_li" type="text/x-jquery-tmpl">
                <div class="title">
                    <h3 class="fl">${month}</h3>
                </div>
                <ul class="timeSheet">
                    {{tmpl(rest) "#te_tc_mts_li_in"}}
                </ul>
            </script>
            <script id="te_da_up_li" type="text/x-jquery-tmpl">
                <li>
                    <a class="fr" href="#" rel="${id}">
                        <img width="43" height="30" src="images/NextMenu.png" />
                    </a>
                    <span class="names">${start_date.formatted}</span>
                    <span class="time">${start_time.time} - ${end_time.time}</span>
                </li>
            </script>
                <script id="te_da_fi_list" type="text/x-jquery-tmpl">
                        <li>
                                <div class="title1 wide ${extraclass}" onclick="void(0)" >
                                        <a target="_blank" rel="${id}"> ${filename}</a> (${file_size})
                                </div>
                        </li>
                </script>
            <script id="te_da_wa_in" type="text/x-jquery-tmpl">
                <li id="da_in_msg_${id}" class="{{if date_read == 0}}unread{{/if}}">
                    <div class="msgHead" messageId="${id}">
                        <h5>${subject}</h5>
                        <p><span class="fr">${date_sent_formatted.formatted}</span>From: ${from.name}</p>
                    </div>
                    <div class="msgBody">
                        <p>{{html message_formatted}}</p>
                        <div class="newMsg hidden">
                            <input type="hidden" value="${from.id}" />
                            <label>Subject</label>
                            <span class="input">
                                <input type="text" name="" value=""/>
                            </span>
                            <label>Message</label>
                            <span class="input">
                                <textarea></textarea>
                            </span>
                            <div class="title">
                                <span class="fr"><a href="#"><span>Send Message</span></a></span>
                                <span class="fl"><a href="#">Cancel</a></span>
                            </div>
                        </div>
                        <div class="title">
                            <span class="fr"><a class="butDel" href="#" rel="${id}"><span>Delete</span></a></span>
                            <span class="fl"><a class="butRpl" href="#" rel="${id}">Reply</a></span>
                        </div>
                    </div>
                </li>
            </script>
            <script id="te_da_wa_me" type="text/x-jquery-tmpl">
                <li id="da_wa_msg_${id}">
                    <img width="50" height="50" title="user name" src="${avatar}" />
                    <div class="msg">
                        <h4>${userName}</h4>
                        {{if title.length > 0}}<p>${title}<br /><p><p>{{/if}}{{html post}}</p>
                        <span>${time}</span>
                    </div>
                    {{if owner}}
                        <a href="#" class="msgDel" rel="${id}"></a>
                    {{/if}}
                    <a href="#" class="msgRpl" rel="${id}"></a>
                    {{if comments.length > 0}}
                    <a href="#" class="cmtCount" rel="${id}"><span class="ico">${comments.length} Comments</span><span class="tip"></span></a>
                    {{/if}}
                    <ul class="cmts">
                        {{tmpl(comments) "#te_da_wa_me_co"}}
                        <li class="last">
                            <input type="submit" value="" rel="${id}" />
                            <span class="input">
                                <input type="text" name="" value="Write a comment..." />
                            </span>
                        </li>
                    </ul>
                </li>
            </script>
            <script id="te_da_wa_me_co" type="text/x-jquery-tmpl">
                <li class="first">
                    <img width="50" height="50" title="user name" src="${avatar}" />
                    <div class="msg">
                        <h4>${userName}</h4>
                        <p>{{html comment}}</p>
                        <span>${time}</span>
                    </div>
                    {{if full && owner}}
                    <a href="#" class="msgDel comment" rel="${id}"></a>
                    {{/if}}
                </li>
            </script>
        </div>

    </body>
</html>

