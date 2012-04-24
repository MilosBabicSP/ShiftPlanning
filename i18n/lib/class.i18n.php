<?php

class i18n {
    /**
     *  Translate singular text
     *  @param string $description Text description (Helps translators a lot)
     *  @param string $text Text to be translated
     *  @example i18n::singular('Open a file', 'Open');
     *  @return string Translated text
     */
    public static function singular($description,$text) {
        if($description!=''){
            $contextString = "{$description}\004{$text}";
            $translation = dcgettext('ShiftPlanning', $contextString,LC_MESSAGES);

        } else {
            $contextString = $text;
            $translation = dgettext('ShiftPlanning', $contextString);

        }
        if ($translation == $contextString) {
            return $text;
        } else {
            return $translation;
        }
    }

    /**
     *  Translate plural text
     *  @param string $description Text description (Helps translators a lot)
     *  @param string $text1 Singular text
     *  @param string $text2 Plural text
     *  @param integer $count Count of subjects
     *  @example i18n::format(i18n::plural('User count', '{count} User', '{count} Users', $count),array('count' => $count));
     *  @return string Translated text
     */
    public static function plural($description,$text1,$text2,$count){
        if($description!=''){
            $contextStringSingular = "{$description}\004{$text1}";
            $contextStringPlural = "{$description}\004{$text2}";
            $translation = dcngettext('ShiftPlanning', $contextStringSingular,$contextStringPlural,$count,LC_MESSAGES);
        } else {
            $contextStringSingular = $text1;
            $contextStringPlural = $text2;
            $translation = dngettext('ShiftPlanning', $contextStringSingular,$contextStringPlural,$count);
        }
        if ($translation == $contextStringSingular) {
            return $text1;
        } else if ($translation == $contextStringPlural) {
            return $text2;
        } else {
         return $translation;
        }
    }
  
    /**
     *  Sprintf replacement with named variables
     *  @param string $string Text
     *  @param array $variables Array with replacement variables where key corresponds to the variable name
     *  @example see plural
     *  @return string Formatted text
     */
    public static function format($string,$variables){
        $toReplace = array();
        foreach ($variables as $key => $value) {
            $toReplace['{' . $key . '}'] = $value;
        }
        return str_replace(array_keys($toReplace),array_values($toReplace),$string);
    }

    /**
     *  Switch to the selected language
     *  @param string $languageCode Language Code
     *  @return void
     */
    public static function setLanguage($languageCode) {
        setlocale(LC_ALL, $languageCode);
        putenv('LC_ALL='.$languageCode);
	bindtextdomain('ShiftPlanning', APP_PATH.'lang');

	textdomain('ShiftPlanning');
	bind_textdomain_codeset('ShiftPlanning','UTF-8');
    }
    
    /**
     *  Connect to the database 
     */
    public static function dbConnect(){
        //include('config.php'); //hardcoded for now, move to global config file
        mysql_connect(DB_HOST,DB_USER,DB_PASS) or die('Unable to connect to the database');
        mysql_select_db(DB_NAME) or die('Unable to select a database');
        mysql_query('SET NAMES utf8');
    }
    
    
    public static function getLanguages(){
        return array(
            'af'    => array('code' => 'af_ZA', 'name' => 'Afrikaans'),
            'sq'    => array('code' => 'sq_AL', 'name' => 'Albanian'),
            'ar'    => array('code' => 'ar_AR', 'name' => 'Arabic'),
            'be'    => array('code' => 'be_BY', 'name' => 'Belarusian'),
            'bg'    => array('code' => 'bg_BG', 'name' => 'Bulgarian'),
            'ca'    => array('code' => 'ca_AD', 'name' => 'Catalan'),
            'zh-CN' => array('code' => 'zh_CN', 'name' => 'Chinese Simplified'),
            'zh-TW' => array('code' => 'zh_TW', 'name' => 'Chinese Traditional'),
            'hr'    => array('code' => 'hr_HR', 'name' => 'Croatian'),
            'cs'    => array('code' => 'cs_CZ', 'name' => 'Czech'),
            'da'    => array('code' => 'da_DK', 'name' => 'Danish'),
            'nl'    => array('code' => 'nl_NL', 'name' => 'Dutch'),
            'en'    => array('code' => 'en_US', 'name' => 'English'),
            'et'    => array('code' => 'et_EE', 'name' => 'Estonian'),
            'tl'    => array('code' => 'tl_PH', 'name' => 'Filipino'),
            'fi'    => array('code' => 'fi_FI', 'name' => 'Finnish'),
            'fr'    => array('code' => 'fr_FR', 'name' => 'French'),
            'gl'    => array('code' => 'gl_ES', 'name' => 'Galician'),
            'de'    => array('code' => 'de_DE', 'name' => 'German'),
            'el'    => array('code' => 'el_GR', 'name' => 'Greek'),
            'iw'    => array('code' => 'iw_IL', 'name' => 'Hebrew'),
            'hi'    => array('code' => 'hi_IN', 'name' => 'Hindi'),
            'hu'    => array('code' => 'hu_HU', 'name' => 'Hungarian'),
            'is'    => array('code' => 'is_IS', 'name' => 'Icelandic'),
            'ga'    => array('code' => 'ga_IE', 'name' => 'Irish'),
            'it'    => array('code' => 'it_IT', 'name' => 'Italian'),
            'ja'    => array('code' => 'ja_JP', 'name' => 'Japanese'),
            'ko'    => array('code' => 'ko_KR', 'name' => 'Korean'),
            'lv'    => array('code' => 'lv_LV', 'name' => 'Latvian'),
            'lt'    => array('code' => 'lt_LT', 'name' => 'Lithuanian'),
            'mk'    => array('code' => 'mk_MK', 'name' => 'Macedonian'),
            'ms'    => array('code' => 'ms_MY', 'name' => 'Malay'),
            'mt'    => array('code' => 'mt_MT', 'name' => 'Maltese'),
            'nb'    => array('code' => 'nb_NO', 'name' => 'Norwegian'),
            'fa'    => array('code' => 'fa_IR', 'name' => 'Persian'),
            'pl'    => array('code' => 'pl_PL', 'name' => 'Polish'),
            'pt'    => array('code' => 'pt_PT', 'name' => 'Portuguese'),
            'ro'    => array('code' => 'ro_RO', 'name' => 'Romanian'),
            'ru'    => array('code' => 'ru_RU', 'name' => 'Russian'),
            'sr'    => array('code' => 'sr_RS', 'name' => 'Serbian'),
            'sk'    => array('code' => 'sk_SK', 'name' => 'Slovak'),
            'sl'    => array('code' => 'sl_SI', 'name' => 'Slovenian'),
            'es'    => array('code' => 'es_ES', 'name' => 'Spanish'),
            'sw'    => array('code' => 'sw_KE', 'name' => 'Swahili'),
            'sv'    => array('code' => 'sv_SE', 'name' => 'Swedish'),
            'th'    => array('code' => 'th_TH', 'name' => 'Thai'),
            'tr'    => array('code' => 'tr_TR', 'name' => 'Turkish'),
            'uk'    => array('code' => 'uk_UA', 'name' => 'Ukrainian'),
            'vi'    => array('code' => 'vi_VN', 'name' => 'Vietnamese'),
            'cy'    => array('code' => 'cy_GB', 'name' => 'Welsh'),
            'yi'    => array('code' => 'yi_US', 'name' => 'Yiddish')

        );
    }
    
    public static function addLanguage($name,$code){
        
        $codeParts = explode('_', $code);
        //Exception for Norwegian
        if($codeParts[0] == 'nb'){
            $codeParts[0] = 'no';
        }
        if($code == 'zh_CN') {
            $codeParts[0] = 'zh-CN';
        }
        
        if($code == 'zh_TW') {
            $codeParts[0] = 'zh-TW';
        }
        //Known plural forms according to http://www.gnu.org/s/hello/manual/gettext/Plural-forms.html
        switch($codeParts[0]){
            case 'ja': //japanese
            case 'vi': //vietnamese
            case 'ko': //korean
                $pluralForms = 'nplurals=1; plural=0;';
                break;
            case 'en': //english
            case 'de': //german
            case 'nl': //dutch
            case 'sv': //swedish
            case 'da': //danish
            case 'no': //norwegian
            case 'es': //spanish
            case 'pt': //portuguese
            case 'it': //italian
            case 'bg': //bulgarian
            case 'el': //greek
            case 'fi': //finnish
            case 'et': //estonian
            case 'iw': //hebrew
            case 'hu': //hungarian
            case 'tr': //turkish
                $pluralForms = 'nplurals=2; plural=n>1;';
                break;
            case 'lv': //latvian
                $pluralForms = 'nplurals=3; plural=n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2;';
                break;
            case 'ga': //irish
                $pluralForms = 'nplurals=3; plural=n==1 ? 0 : n==2 ? 1 : 2;';
                break;
            case 'ro': //romanian
                $pluralForms = 'nplurals=3; plural=n==1 ? 0 : (n==0 || (n%100 > 0 && n%100 < 20)) ? 1 : 2;';
                break;
            case 'lt': //lithuanian
                $pluralForms = 'nplurals=3; plural=n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2;';
                break;
            case 'ru': //russian
            case 'uk': //ukrainian
            case 'sr': //serbian
            case 'hr': //croatian
                $pluralForms = 'nplurals=3; plural=n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2;';
                break;
            case 'cs': //czech
            case 'sk': //slovak
                $pluralForms = 'nplurals=3; plural=(n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2;';
                break;
            case 'pl': //polish
                $pluralForms = 'nplurals=3; plural=n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2;';
                break;
            case 'sl': //slovenian
                $pluralForms = 'nplurals=4; lpural=n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3;';
                break;
            default:
                $pluralForms = 'nplurals=2; plural=n>1;';
                
        }
        
        $header = array(
            'Project-Id-Version'        => ' 1.0',
            'Report-Msgid-Bugs-To'      => ' ',
            'POT-Creation-Date'         => ' 2011-11-16 16:07+0100',
            'PO-Revision-Date'          => ' 2011-11-16 16:07+0100',
            'Last-Translator'           => ' ShiftPlanning <info@shiftplanning.com>',
            'Language-Team'             => ' ShiftPlanning <info@shiftplanning.com>',
            'Language'                  => ' '.$code,
            'MIME-Version'              => ' ',
            'Content-Type'              => ' text/plain; charset=UTF-8',
            'Content-Transfer-Encoding' => ' 8bit',
            'Plural-Forms'              => ' '.$pluralForms
        );
        self::dbConnect();
        $query = mysql_query("SELECT * FROM `".DB_PREFIX."language` WHERE `code` = '".mysql_real_escape_string($code)."';");
        if(mysql_num_rows($query) == 0){
            mysql_query("INSERT INTO `".DB_PREFIX."language` (`id`,`name`,`code`,`header`,`short_code`) VALUES (NULL,'" . mysql_real_escape_string($name) . "','" . mysql_real_escape_string($code) . "','" . mysql_real_escape_string(json_encode($header)) . "','" . mysql_real_escape_string($codeParts[0]) . "');");
        }
    }
    
    /**
     * Parse the pot file and save it to the database
     * @param string $potFile path to the pot file
     * @param string $type php or js
     */
    public static function parseFile($potFile,$type){
        self::dbConnect();
        //include('class.poParser.php');
        $parser = new POParser();
        $file = $parser->parse($potFile);
        
        //Keep the header, just in case
        $header = $file[0];

        //Make a hashed array to check for deleted data
        $hashedarray = array();
        foreach($file[1] as $value){
            //Prepare data
            
            $hashdata = array();
            $hashdata = $value;
            unset($hashdata['references']);
            
            //Calculate hash
            $hash = md5(json_encode($hashdata));
            $hashedarray[$hash] = $hashdata;
            //Check if string exists
            $query = mysql_query("SELECT `id` FROM `".DB_PREFIX."original` WHERE `hash` = '" . mysql_real_escape_string($hash) . "';");
            if(mysql_num_rows($query) == 0){
                //Insert it
                mysql_query("INSERT INTO `".DB_PREFIX."original` (`id`,`hash`,`original`,`deleted`,`type`) VALUES (NULL,'" . mysql_real_escape_string($hash) . "','" . mysql_real_escape_string(json_encode($hashdata)) . "',0,'" . $type . "');");
                echo mysql_error();
            }
            
        }
        
        $query = mysql_query("SELECT * FROM `".DB_PREFIX."original` WHERE `type` = '" . mysql_real_escape_string($type) . "'");
        while($row = mysql_fetch_assoc($query)){
            
            if(array_key_exists($row['hash'],$hashedarray)){
                if($row['deleted']){
                    mysql_query("UPDATE `".DB_PREFIX."original` SET `deleted` = 0 WHERE `type` = '" . mysql_real_escape_string($type) . "' AND `hash` = '" . mysql_real_escape_string($row['hash']) . "';");
                }
            } else {
                mysql_query("UPDATE `".DB_PREFIX."original` SET `deleted` = 1 WHERE `type` = '" . mysql_real_escape_string($type) . "' AND `hash` = '" . mysql_real_escape_string($row['hash']) . "';");
            }
        }

    }

    public static function googleTranslate($languageId){
        self::dbConnect();
        //Get language data
        $query = mysql_query("SELECT * FROM `".DB_PREFIX."language` WHERE `id` = " . (int)$languageId);
        $language = mysql_fetch_assoc($query);
        
        //Get header
        $header = json_decode($language['header'],true);
        $pf = array();
        
        //Get number of plural forms
        preg_match_all('/nplurals=(.+);/U',$header['Plural-Forms'],$pf);
        $plurals = (int)$pf[1][0];
        
        //Get all strings
        $query = mysql_query("SELECT *,`o`.`id` AS `oid` FROM `".DB_PREFIX."original` `o` LEFT JOIN `".DB_PREFIX."translation` `t` ON `t`.`language_id` = " . (int)$languageId . " AND `t`.`original_id` = `o`.`id` WHERE `o`.`deleted` = 0 GROUP BY `o`.`id`");
        while($row = mysql_fetch_assoc($query)){
            //Only translate if untranslated
            if(is_null($row['translation'])){
                $data = json_decode($row['original'],true);
                $strings = array($data['msgid']);
                //Hack to disable google translating our variables
                //$replacements = array();
                //$replacement = array();
                $vars = array();
                $split = array();
                $split[0] = preg_split('/\{(.*)\}/U', $strings[0]);
                $m = preg_match_all('/\{(.*)\}/U',$strings[0],$vars[0]);

                if(isset($data['msgid_plural'])){
                    $split[1] = preg_split('/\{(.*)\}/U', $data['msgid_plural']);
                    $m = preg_match_all('/\{(.*)\}/U',$data['msgid_plural'],$vars[1]);

                }
                
                
                /*
                $m = preg_match_all('/\{(.*)\}/U',$strings[0],$replacement);
                if($m > 0){
                    foreach($replacement[0] as $value){
                        $replacements[0][':000'.rand(50000,90000).'999:'] = $value;
                    }
                    $strings[0] = str_replace(array_values($replacements[0]),array_keys($replacements[0]),$strings[0]);
                }
                if(isset($data['msgid_plural'])){
                    $strings[] = $data['msgid_plural'];
                
                
                
                    $m = preg_match_all('/\{(.*)\}/U',$strings[1],$replacement);
                    if($m > 0){
                        foreach($replacement[0] as $value){
                            $replacements[1][':000'.rand(50000,90000).'999:'] = $value;
                        }
                        $strings[1] = str_replace(array_values($replacements[1]),array_keys($replacements[1]),$strings[1]);
                    }
                }
                $c = 0;
                $translations = array();
                die();
                 
                 */
                //Use google translate api to translate
   
                $c = 0;
                $translations = array();
                foreach($split as $s){
                    $translations[$c] = '';
                    foreach($s as $key=>$value){
                        $ch = curl_init('https://www.googleapis.com/language/translate/v2?key=AIzaSyDhWnLxh5qVKOF-HRjwKpcpRnIjjHefqYI&source=en&target='.$language['short_code'].'&q='.  urlencode($value));
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
                        curl_setopt($ch, CURLOPT_HEADER, 0);
                        $response = curl_exec($ch);
                        $t = json_decode($response,true);
                        /*
                        if(isset($replacements[$c])){
                            $translatedText = str_replace(array_keys($replacements[$c]),array_values($replacements[$c]),$t['data']['translations'][0]['translatedText']);
                        } else {
                            $translatedText = $t['data']['translations'][0]['translatedText'];
                        }
                        $translations[] = $translatedText;
                        $c++;
                         
                         */
                        if(isset($vars[$c][0][$key])){
                            $glue = $vars[$c][0][$key];
                        } else {
                            $glue = '';
                        }
                        $spaceb = '';
                        $spacea = '';
                        if(isset($value[0]) && $value[0] == ' ') $spaceb = ' ';
                        if(isset($value[strlen($value)-1]) && $value[strlen($value)-1] == ' ') $spacea = ' ';
                        $translations[$c].= $spaceb.$t['data']['translations'][0]['translatedText'].$spacea.$glue;
                    }
                    $c++;
                }
                //Make all plural forms the same, as translate api doesn't know the number. These has to be adjusted by a human translator later.
                while(count($translations) < $plurals && count($strings) > 1){
                    $translations[] = $translations[1];
                }
                //Write it to the database
                mysql_query("INSERT INTO `".DB_PREFIX."translation` (`id`,`original_id`,`language_id`,`translation`) VALUES (NULL," . (int)$row['oid'] . "," . (int)$languageId . ",'" . mysql_real_escape_string(json_encode($translations)) . "')");
            }
        }
    }
    
    public static function createFile($languageId,$type){
        self::dbConnect();
        $file = array();
        //Get language data
        $query = mysql_query("SELECT * FROM `".DB_PREFIX."language` WHERE `id` = " . (int)$languageId);
        $language = mysql_fetch_assoc($query);
        
        //Get number of plural forms
        $header = json_decode($language['header'],true);
        $pf = array();
        preg_match_all('/nplurals=(.+);/U',$header['Plural-Forms'],$pf);
        $plurals = (int)$pf[1][0];
        date_default_timezone_set("GMT");
        //Generate header
        $file[] = '# ShiftPlanning '.$language['name'].' translation file.';
        $file[] = '# Copyright (C) '.date('Y').' ShiftPlanning Inc.';
        $file[] = '# ShiftPlanning <info@shiftplanning.com>, '.date('Y').'.';
        $file[] = '#';
        $file[] = '#, fuzzy';
        $file[] = 'msgid ""';
        $file[] = 'msgstr ""';
        
        foreach($header as $key=>$value){
            $file[] = '"' . $key .': ' . $value . '\n"';
        }
        
        //Get all strings
        $query = mysql_query("SELECT *,`o`.`id` AS `oid` FROM `".DB_PREFIX."original` `o` LEFT JOIN `".DB_PREFIX."translation` `t` ON `t`.`language_id` = " . (int)$languageId . " AND `o`.`type` = '" . mysql_real_escape_string($type) . "' AND `t`.`original_id` = `o`.`id` WHERE `o`.`deleted` = 0 GROUP BY `o`.`id`");
        while($row = mysql_fetch_assoc($query)){
            //String is not translated
            if(is_null($row['translation'])){
                //Do not even add it to the .po file
            } else { //String is translated
                $file[] = '';
                $original = json_decode($row['original'],true);
                $translation = json_decode($row['translation'],true);
                if($original['msgid'] != ''){
                    if(isset($original['msgctxt'])){
                        $file[] = 'msgctxt "' . str_replace('"','\"',$original['msgctxt']) . '"';
                    }
                    $file[] = 'msgid "' . str_replace('"','\"',$original['msgid']) . '"';
                    //Is it plural?
                    if(isset($original['msgid_plural'])){
                        $file[] = 'msgid_plural "' . str_replace('"','\"',$original['msgid_plural']) . '"';
                        foreach($translation as $key => $value){
                            $file[] = 'msgstr[' . $key . '] "' . str_replace('"','\"',$value) . '"';
                        }
                    } else {
                        $file[] = 'msgstr "' . str_replace('"','\"',$translation[0]) . '"';
                    }
                }
            }
        }
        $file[] = '';
        $filename = '';
        if($type == 'php'){
            $filename = 'ShiftPlanning.po';
        } else {
            $filename = 'ShiftPlanning_js.po';
        }
        file_put_contents(APP_PATH . 'lang/' .  $language['code'] .'/LC_MESSAGES/' . $filename, implode("\n",$file));
    }
    
    public static function processAll(){
        self::dbConnect();
        $query = mysql_query("SELECT * FROM `".DB_PREFIX."language` WHERE `id` > 1");
        while($language = mysql_fetch_assoc($query)){
            self::googleTranslate($language['id']);
            self::createFile($language['id'], 'php');
            self::createFile($language['id'], 'js');
        }
    }
    

}

//Aliases
function _s($text){
    return i18n::singular('', $text);
}

function _p($singular,$plural,$count){
    return i18n::plural('', $singular, $plural, $count);
}

function _sd($description,$text){
    return i18n::singular($description, $text);
}

function _pd($description,$singular,$plural,$count){
    return i18n::plural($description, $singular, $plural, $count);
}