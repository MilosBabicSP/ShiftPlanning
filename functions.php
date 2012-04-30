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
	} else return '';
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

?>