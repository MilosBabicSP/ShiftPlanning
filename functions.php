<?php
class Functions{
    
    private $settings;
    
    function loadFile($file){
        require_once ('pages/'.$file.'.php');
    }
    
    function isRememberMe(){
	return (isset($_COOKIE['shiftplanning_mobile_rememberme']) && $_COOKIE['shiftplanning_mobile_rememberme'] == 1);
    }
    
    function getCookie($val){
	if (isset($_COOKIE[$val])){
	    return $_COOKIE[$val]; 
	} else return false;
    }
    
    
    //lang functions
    function getCurrentLang(){
	$lang = (isset($_SESSION['lang'])) ? $_SESSION['lang'] : (!$this->getCookie('shiftplanning_mobile_lang') || $this->getCookie('shiftplanning_mobile_lang') == 'undefined') ? 'en_US' : $this->getCookie('shiftplanning_mobile_lang');
	return ($lang == 'null') ? 'en_US' : $lang;
    }
    
    function getSettingsWithFixedTime(){
	$data = _iapi(array('module' => 'admin.settings', 'method' => 'GET'), 'json', true);
	
	return $data;
    }
    
    function timezone(){
	$this->settings = json_decode(_iapi(array('module' => 'admin.settings', 'method' => 'GET'), 'json', true), true);
        $employee = json_decode(_iapi(array('module' => 'staff.employee', 'method' => 'GET', 'id' => $_GET['id']), 'json', true), true);
	date_default_timezone_set($employee['timezone_info']['name']);
    }
    
    function getCurrentTime(){
	$this->timezone();
	return '<time>' . date($this->settings['date']) . '</time><span>' .  date(($this->settings['24hr'] == 1) ? "H:i" : "g:ia") . '</span>';
    }
    
    
    
    
    /**
     *
     * @var Functions
     */
    protected static $_instance;

    /**
     *
     * @return Functions
     */
    public static function getInstance() {
        if (null == self::$_instance) {
            self::$_instance = new Functions();
        }
        return self::$_instance;
    }
}


function debug($data){
    echo '<pre>';
    print_r($data);
    echo '</pre>';
}

?>