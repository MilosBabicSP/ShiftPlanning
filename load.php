<?php
require_once('functions.php');
require_once('api.php');

$res = array();


/* fast hack for displaying correct time */
if (isset($_GET['timezone'])){
    echo Functions::getInstance()->getCurrentTime();
    die();
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

$res['firstLoad'] = '<script type="text/javascript">';
$res['firstLoad'] .= 'var googleIp = \'' . $googleIP . '\'';
$vtoken = _iapi(array('module' => 'api.vtoken', 'method' => 'GET', 'token' => $_SESSION['api']['token']), 'array');
if ($vtoken['data'] != '1') {
    unset($_SESSION['api']['token']);
    $res['firstLoad'] .= 'user.loggedIn = 0;';
} else {
    $res['firstLoad'] .= 'user.loggedIn = 1;';
}
$res['firstLoad'] .= 'user.name = \'' . (($_SESSION['api']['token']) ? $_SESSION['user']['employee']['name'] : ''). '\';';
$res['firstLoad'] .= 'user.company = ' . (($_SESSION['api']['token']) ? $_SESSION['user']['business']['name'] : '') . '\';';
$res['firstLoad'] .= 'user.phone = \'' . (($_SESSION['api']['token']) ? $_SESSION['user']['business']['phone'] : '') . '\';';
$res['firstLoad'] .= '</script>';

$res['firstLoad'] .= '<script type="text/javascript">';
$res['firstLoad'] .= 'function init(){';
if ($_SESSION['api']['token']) {
     $res['firstLoad'] .= 'sp.staff.raw.employees = ' . _iapi(array('module' => 'staff.employees', 'method' => 'GET'), 'json', true) .';';
     $res['firstLoad'] .= 'sp.staff.data.employees = sp.map(sp.staff.raw.employees);';
     $res['firstLoad'] .= 'sp.schedule.raw.schedules = ' ._iapi(array('module' => 'schedule.schedules', 'perms' => 1, 'method' => 'GET'), 'json', true) .';';
     $res['firstLoad'] .= 'sp.schedule.data.schedules = sp.map(sp.schedule.raw.schedules);';
     $res['firstLoad'] .= 'sp.staff.admin.settings = ' . _iapi(array('module' => 'admin.settings', 'method' => 'GET'), 'json', true).';';
     $res['firstLoad'] .= 'sp.staff.admin.info = ' . _iapi(array('module' => 'staff.employee', 'method' => 'GET', 'id' => $_SESSION['user']['employee']['id']), 'json', true) .';';
     $res['firstLoad'] .= 'sp.staff.admin.business = ' . _iapi(array('module' => 'admin.business', 'method' => 'GET'), 'json', true) .';';
     $res['firstLoad'] .= 'var lang = sp.staff.admin.info.language;';
     $res['firstLoad'] .= 'if (lang == null){';
     $res['firstLoad'] .= 'lang = sp.staff.admin.business.language;';
     $res['firstLoad'] .= '}';
     $res['firstLoad'] .= 'sp.staff.raw.skills = ' . _iapi(array('module' => 'staff.skills', 'method' => 'GET'), 'json', true) .';';
     $res['firstLoad'] .= 'sp.staff.data.skills = sp.map(sp.staff.raw.skills);';
     $res['firstLoad'] .= 'sp.staff.raw.locations = ' . _iapi(array('module' => 'location.locations', 'method' => 'GET'), 'json', true) .';';
     $res['firstLoad'] .= 'sp.staff.data.locations = sp.map(sp.staff.raw.locations);';
     $res['firstLoad'] .= 'sp.raw.config = ' . _iapi(array('module' => 'api.config', 'method' => 'GET'), 'json', true) .';';
     $res['firstLoad'] .= 'sp.schedule.dateId = sp.raw.config.today.id;';
     $res['firstLoad'] .= 'sp.staff.admin.info.dfAvatar = (typeof sp.staff.admin.info.avatar != \'undefined\' && typeof sp.staff.admin.info.avatar.small != \'undefined\') ? sp.staff.admin.info.avatar.small : \'images/no-avatar.png\';';
     $res['firstLoad'] .= 'sp.staff.prepareConfig();';
     $res['firstLoad'] .= '$(\'.userName\').html(user.name);';
     $res['firstLoad'] .= '$(\'company\').html(user.company);';
     $res['firstLoad'] .= 'spRanges.fixRanges();';
     $res['firstLoad'] .= 'sp.staff.fixed.employees = sp.permissions.fixStaffListing();';
     $res['firstLoad'] .= 'sp.raw.config.today.formatted = Date.parse(sp.raw.config.today.formatted).toString(cal.dformat);';
 }
$res['firstLoad'] .= '$(\'body\').css(\'display\', \'block\');';
$res['firstLoad'] .= '}';
$res['firstLoad'] .= '</script>';



echo $res['firstLoad'];

?>
