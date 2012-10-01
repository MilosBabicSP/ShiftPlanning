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
	$lang = (isset($_SESSION['lang'])) ? $_SESSION['lang'] : (!$this->getCookie('shiftplanning_mobile_lang')) ? 'en_US' : $this->getCookie('shiftplanning_mobile_lang');
	return ($lang == 'null') ? 'en_US' : $lang;
    }
    
    function getSettingsWithFixedTime(){
	$data = _iapi(array('module' => 'admin.settings', 'method' => 'GET'), 'json', true);
	
	return $data;
    }
    
    function timezone(){
	$this->settings = json_decode(_iapi(array('module' => 'admin.settings', 'method' => 'GET'), 'json', true), true);
        $employee = json_decode(_iapi(array('module' => 'staff.employee', 'method' => 'GET', 'id' => $_GET['id']), 'json', true), true);
        
        //print_r($employee);
	$timezones['-12:00,0'] = '(-12:00) International Date Line West';
	$tzPhp_val['-12:00,0'] = 'Etc/GMT+12';

	$timezones['-11:00,0'] = '(-11:00) Midway Island, Samoa';
	$tzPhp_val['-11:00,0'] = 'Pacific/Samoa';

	$timezones['-10:00,0'] = '(-10:00) Hawaii';
	$tzPhp_val['-10:00,0'] = 'Pacific/Honolulu';

	$timezones['-09:00,1'] = '(-09:00) Alaska';
	$tzPhp_val['-09:00,1'] = 'America/Anchorage';

	$timezones['-08:00,1'] = '(-08:00) Pacific Time (US & Canada)';
	$tzPhp_val['-08:00,1'] = 'America/Los_Angeles';

	$timezones['-07:00,0'] = '(-07:00) Arizona';
	$tzPhp_val['-07:00,0'] = 'America/Phoenix';

	$timezones['-07:00,1'] = '(-07:00) Mountain Time (US & Canada)';
	$tzPhp_val['-07:00,1'] = 'America/Edmonton';

	$timezones['-06:00,0'] = '(-06:00) Central America';
	$tzPhp_val['-06:00,0'] = 'America/Winnipeg';

	$timezones['-06:00,1'] = '(-06:00) Central Time (US & Canada)';
	$tzPhp_val['-06:00,1'] = 'America/Winnipeg';
	#$tzPhp_val['-06:00,1'] = 'America/Mexico_City';

	$timezones['-06:00,2'] = '(-06:00) Saskatchewan';
	$tzPhp_val['-06:00,2'] = 'America/Regina';

	$timezones['-05:00,0'] = '(-05:00) Indiana, Bogota, Lima, Quito, Rio Branco';
	$tzPhp_val['-05:00,0'] = 'America/Bogota';

	$timezones['-05:00,1'] = '(-05:00) Eastern time (US & Canada)';
	$tzPhp_val['-05:00,1'] = 'America/New_York';

	$timezones['-04:00,1'] = '(-04:00) Atlantic time (Canada), Manaus, Santiago';
	$tzPhp_val['-04:00,1'] = 'America/Halifax';

	$timezones['-04:00,0'] = '(-04:00) Caracas, La Paz';
	$tzPhp_val['-04:00,0'] = 'America/Caracas';

	$timezones['-03:30,1'] = '(-03:30) Newfoundland';
	$tzPhp_val['-03:30,1'] = 'America/St_Johns';

	$timezones['-03:00,1'] = '(-03:00) Greenland, Brasilia, Montevideo';
	$tzPhp_val['-03:00,1'] = 'America/Montevideo';

	$timezones['-03:00,0'] = '(-03:00) Buenos Aires, Georgetown';
	$tzPhp_val['-03:00,0'] = 'America/Argentina/Buenos_Aires';

	$timezones['-02:00,1'] = '(-02:00) Mid-Atlantic';
	$tzPhp_val['-02:00,1'] = 'Atlantic/South_Georgia';

	$timezones['-01:00,1'] = '(-01:00) Azores';
	$tzPhp_val['-01:00,1'] = 'Atlantic/Azores';

	$timezones['-01:00,0'] = '(-01:00) Cape Verde Is.';
	$tzPhp_val['-01:00,0'] = 'Atlantic/Cape_Verde';

	$timezones['00:00,0'] = '(00:00) Casablanca, Monrovia, Reykjavik';
	$tzPhp_val['00:00,0'] = 'Africa/Monrovia';

	$timezones['00:00,1'] = '(00:00) GMT: Dublin, Edinburgh, Lisbon, London';
	$tzPhp_val['00:00,1'] = 'Europe/London';

	$timezones['+01:00,1'] = '(+01:00) Amsterdam, Berlin, Rome, Vienna, Prague, Brussels';
	$tzPhp_val['+01:00,1'] = 'Europe/Amsterdam';

	$timezones['+01:00,0'] = '(+01:00) West Central Africa';
	$tzPhp_val['+01:00,0'] = '(Africa/Lagos';

	$timezones['+02:00,1'] = '(+02:00) Amman, Athens, Istanbul, Beirut, Cairo, Jerusalem';
	$tzPhp_val['+02:00,1'] = 'Europe/Athens';

	$timezones['+02:00,0'] = '(+02:00) Harare, Pretoria';
	$tzPhp_val['+02:00,0'] = 'Africa/Harare';

	$timezones['+03:00,1'] = '(+03:00) Baghdad, Moscow, St. Petersburg, Volgograd';
	$tzPhp_val['+03:00,1'] = 'Asia/Baghdad';

	$timezones['+03:00,0'] = '(+03:00) Kuwait, Riyadh, Nairobi, Tbilisi';
	$tzPhp_val['+03:00,0'] = 'Asia/Kuwait';

	$timezones['+03:30,0'] = '(+03:30) Tehran';
	$tzPhp_val['+03:30,0'] = 'Asia/Tehran';

	$timezones['+04:00,0'] = '(+04:00) Abu Dhadi, Muscat';
	$tzPhp_val['+04:00,0'] = 'Asia/Muscat';

	$timezones['+04:00,1'] = '(+04:00) Baku, Yerevan';
	$tzPhp_val['+04:00,1'] = 'Asia/Baku';

	$timezones['+04:30,0'] = '(+04:30) Kabul';
	$tzPhp_val['+04:30,0'] = 'Asia/Kabul';

	$timezones['+05:00,1'] = '(+05:00) Ekaterinburg';
	$tzPhp_val['+05:00,1'] = 'Asia/Yekaterinburg';

	$timezones['+05:00,0'] = '(+05:00) Islamabad, Karachi, Tashkent';
	$tzPhp_val['+05:00,0'] = 'Asia/Karachi';

	$timezones['+05:30,0'] = '(+05:30) Chennai, Kolkata, Mumbai, New Delhi, Sri Jayawardenepura';
	$tzPhp_val['+05:30,0'] = 'Asia/Colombo';

	$timezones['+05:45,0'] = '(+05:45) Kathmandu';
	$tzPhp_val['+05:45,0'] = 'Asia/Kathmandu';

	$timezones['+06:00,0'] = '(+06:00) Astana, Dhaka';
	$tzPhp_val['+06:00,0'] = 'Asia/Dhaka';

	$timezones['+06:00,1'] = '(+06:00) Almaty, Nonosibirsk';
	$tzPhp_val['+06:00,1'] = 'Asia/Almaty';

	$timezones['+06:30,0'] = '(+06:30) Yangon (Rangoon)';
	$tzPhp_val['+06:30,0'] = 'Asia/Rangoon';

	$timezones['+07:00,1'] = '(+07:00) Krasnoyarsk';
	$tzPhp_val['+07:00,1'] = 'Asia/Krasnoyarsk';

	$timezones['+07:00,0'] = '(+07:00) Bangkok, Hanoi, Jakarta';
	$tzPhp_val['+07:00,0'] = 'Asia/Bangkok';

	$timezones['+08:00,0'] = '(+08:00) Beijing, Hong Kong, Singapore, Taipei';
	$tzPhp_val['+08:00,0'] = 'Asia/Hong_Kong';

	$timezones['+08:00,1'] = '(+08:00) Irkutsk, Ulaan Bataar, Perth';
	$tzPhp_val['+08:00,1'] = 'Asia/Irkutsk';

	$timezones['+09:00,1'] = '(+09:00) Yakutsk';
	$tzPhp_val['+09:00,1'] = 'Asia/Yakutsk';

	$timezones['+09:00,0'] = '(+09:00) Seoul, Osaka, Sapporo, Tokyo';
	$tzPhp_val['+09:00,0'] = 'Asia/Seoul';

	$timezones['+09:30,0'] = '(+09:30) Darwin';
	$tzPhp_val['+09:30,0'] = 'Australia/Darwin';

	$timezones['+09:30,1'] = '(+09:30) Adelaide';
	$tzPhp_val['+09:30,1'] = 'Australia/Adelaide';

	$timezones['+10:00,0'] = '(+10:00) Brisbane, Guam, Port Moresby';
	$tzPhp_val['+10:00,0'] = 'Australia/Brisbane';

	$timezones['+10:00,1'] = '(+10:00) Canberra, Melbourne, Sydney, Hobart, Vladivostok';
	$tzPhp_val['+10:00,1'] = 'Australia/Canberra';

	$timezones['+11:00,0'] = '(+11:00) Magadan, Solomon Is., New Caledonia';
	$tzPhp_val['+11:00,0'] = 'Asia/Magadan';

	$timezones['+12:00,1'] = '(+12:00) Auckland, Wellington';
	$tzPhp_val['+12:00,1'] = 'Pacific/Auckland';

	$timezones['+12:00,0'] = '(+12:00) Fiji, Kamchatka, Marshall Is.';
	$tzPhp_val['+12:00,0'] = 'Pacific/Fiji';

	$timezones['+13:00,0'] = '(+13:00) Nuku\'alofa';
	$tzPhp_val['+13:00,0'] = 'Pacific/Tongatapu';
	
	
	date_default_timezone_set($tzPhp_val[$this->settings['timezone']]);
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