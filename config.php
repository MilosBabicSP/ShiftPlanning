<?php
session_start();
//error_reporting(E_ALL);
//ini_set("display_errors", 1);

if (strpos($_SERVER['SERVER_NAME'], '192.168.1') !== false){
    define('_ext_' , $_SERVER['REQUEST_URI']);
} else {
    define('_ext_' , '');
}

define('_lang_', $_SERVER['DOCUMENT_ROOT']);



//



define('DEBUGGER', true);
define('_root_', dirname(__FILE__).'/');

//var_dump(_lang_);
define('_jsV_', 6);
define('WWW_PATH', 'http://'.$_SERVER['SERVER_NAME'].'/'._ext_);
define('LANG_PATH', 'http://'.$_SERVER['SERVER_NAME'].'/');
//define('API_KEY','49e4207b8459ef88e19de9b78b882ef15ec14d84');
//define('API_URL','http://www.dejan1-s.dev.shiftplanning.com/api/');

//define('API_KEY','18eb10a76f1e97fd20b0248fd5475bdbc8996c5e');
define('API_KEY','49e4207b8459ef88e19de9b78b882ef15ec14d84');
define('API_URL','http://www.translations-s.dev.shiftplanning.com/api/');
