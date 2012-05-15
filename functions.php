<?php
class Functions{
    
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
	return (isset($_SESSION['lang'])) ? $_SESSION['lang'] : (!$this->getCookie('shiftplanning_mobile_lang')) ? 'en_US' : $this->getCookie('shiftplanning_mobile_lang');
    }
    
    function getSettingsWithFixedTime(){
	$data = _iapi(array('module' => 'admin.settings', 'method' => 'GET'), 'json', true);
	
	return $data;
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