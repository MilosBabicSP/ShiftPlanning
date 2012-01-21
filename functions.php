<?php
class Functions{
    
    function loadFile($file){
        require_once ('pages/'.$file.'.php');
    }
    
    /**
     *
     * @var Functions
     */
    protected static $_instance;

    /**
     *
     * @return Admin
     */
    public static function getInstance() {
        if (null == self::$_instance) {
            self::$_instance = new Functions();
        }
        return self::$_instance;
    }
}

?>