<?php
session_start();
//error_reporting(E_ALL);
//ini_set("display_errors", 1);
//check is it live server or dev.


/* fix some vars */


//if (!isset($_POST['module'])){
//    $_POST['module'] = null;
//}
//
//if (!isset($_POST['multi'])){
//    $_POST['multi'] = null;
//}




define('IS_TEST_SERVER', (strpos($_SERVER['SERVER_NAME'], '.dev.') !== false || strpos($_SERVER['SERVER_NAME'], '192.168') !== false) ? true : false);
define('_lang_', $_SERVER['DOCUMENT_ROOT']);
define('DEBUGGER', true);
define('_root_', dirname(__FILE__) . '/');
define('_ext_', $_SERVER['REQUEST_URI']);
define('_domain_', 'shiftplanning.com');
define('_cdn_', 'cdn');
define('_touch_', 'app/iphone');



if (IS_TEST_SERVER) {
//    define('API_KEY', '79a331d71dc4d5edb4d7168f2de9c129bbf9e99a');
//    define('API_URL', 'http://www.shiftplanning.com/api/');
    define('API_KEY', '49e4207b8459ef88e19de9b78b882ef15ec14d84');
    define('API_URL', 'http://www.openshiftzohan-s.dev.shiftplanning.com/api/');
} else {
    if (!isset($_POST['application'])) {
        //web mobile app
        define('API_KEY', '859e49ab47bb3e6a9002f2053f43fa8110ce7f8e');
    } else if ($_POST['application'] == 'android') {
        //andorid phone gap
        define('API_KEY', '1b1933e7e0a9fdeca1be7801ada2e04ad1719454');
    } else if ($_POST['application'] == 'apple') {
        //Phone Gap Iphone/Ipod App key:
        define('API_KEY', '08b5181033e32284bb4f62b40ba00b721ed6282b'); 
    } else if ($_POST['application'] == 'bb') {
        define('API_KEY', '08b5181033e32284bb4f62b40ba00b721ed6282b'); 
    } else {
        define('API_KEY', '79a331d71dc4d5edb4d7168f2de9c129bbf9e99a');
    }
    
    define('API_URL', 'http://www.shiftplanning.com/api/');
}


define('_jsV_', 18);
define('WWW_PATH', 'http://' . $_SERVER['SERVER_NAME'] . '/' . _ext_);
define('LANG_PATH', 'http://' . $_SERVER['SERVER_NAME'] . '/');

define('_fCdnPath_', (IS_TEST_SERVER) ? WWW_PATH : 'http://' . _cdn_ . '.' ._domain_ . '/' . _touch_ . '/');
