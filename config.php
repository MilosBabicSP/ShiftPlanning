<?php
session_start();
//error_reporting(E_ALL);
//ini_set("display_errors", 1);
//check is it live server or dev.
define('IS_TEST_SERVER', (strpos($_SERVER['SERVER_NAME'], '.dev.') !== false || strpos($_SERVER['SERVER_NAME'], '192.168') !== false ) ? true : false);
define('_lang_', $_SERVER['DOCUMENT_ROOT']);
define('DEBUGGER', true);
define('_root_', dirname(__FILE__) . '/');
define('_ext_', $_SERVER['REQUEST_URI']);



if (IS_TEST_SERVER) {
    define('API_KEY', '49e4207b8459ef88e19de9b78b882ef15ec14d84');
    define('API_URL', 'http://www.production-s.dev.shiftplanning.com/api/');
} else {
    define('API_KEY', '79a331d71dc4d5edb4d7168f2de9c129bbf9e99a');
    define('API_URL', 'http://www.shiftplanning.com/api/');
}


define('_jsV_', 6);
define('WWW_PATH', 'http://' . $_SERVER['SERVER_NAME'] . '/' . _ext_);
define('LANG_PATH', 'http://' . $_SERVER['SERVER_NAME'] . '/');