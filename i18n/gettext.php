#!/usr/bin/php
<?php
if ($argc < 2) {
    echo "Valid parameters are: create, createall, fetch, merge, compile\n";
} else {
    switch ($argv[1]) {
        case 'fetch':
            //Use find to put all php and js files into the lists
            exec('find /home/spr1/public_html/ -iname "why_n.php" > filelist_php');
            exec('find . -iname "*.js" | grep -v \'gettext.js\' > filelist_js');
            //Then use these lists to extract strings to the po template files, with modified keywords
            exec('xgettext --files-from=filelist_php --force-po --keyword="_sd:1c,2" --keyword="_pd:1c,2,3" --keyword="_p:1,2" --keyword="_s:1" -L PHP --from-code=UTF-8 -o messages_php.pot');
            exec('xgettext --files-from=filelist_js --force-po --keyword="_sd:1c,2" --keyword="_pd:1c,2,3" --keyword="_p:1,2" --keyword="_s:1" -L Python --from-code=UTF-8 -o messages_js.pot'); //Using python as a type is a hack since javascript parser doesn't exist, but this works
            break;
        case 'merge':
            //traverse lang folders, create po files if they don't exist, 
            $dir = 'lang';
            if (is_dir($dir)) {
                if ($dh = opendir($dir)) {
                    while (($file = readdir($dh)) !== false) {
                        echo $file;
                        if ($file != '.' && $file != '..' && $file != '.svn' && $file != '.git') {
                            if (file_exists($dir . '/' . $file . '/LC_MESSAGES/ShiftPlanning.po')) {
                                exec('msgmerge lang/' . $file . '/LC_MESSAGES/ShiftPlanning.po messages_php.pot -o lang/' . $file . '/LC_MESSAGES/ShiftPlanning.po');
                                exec('msgmerge lang/' . $file . '/LC_MESSAGES/ShiftPlanning_js.po messages_js.pot -o lang/' . $file . '/LC_MESSAGES/ShiftPlanning_js.po');
                            } else {
                                //create
                                file_put_contents('lang/' . $file . '/LC_MESSAGES/ShiftPlanning.po', '');
                                file_put_contents('lang/' . $file . '/LC_MESSAGES/ShiftPlanning_js.po', '');
                                exec('msgmerge lang/' . $file . '/LC_MESSAGES/ShiftPlanning.po messages_php.pot -o lang/' . $file . '/LC_MESSAGES/ShiftPlanning.po');
                                exec('msgmerge lang/' . $file . '/LC_MESSAGES/ShiftPlanning_js.po messages_js.pot -o lang/' . $file . '/LC_MESSAGES/ShiftPlanning_js.po');
                            }
                        }
                    }
                    closedir($dh);
                }
            }
            break;
        case 'compile':
            $dir = 'lang';
            if (is_dir($dir)) {
                if ($dh = opendir($dir)) {
                    while (($file = readdir($dh)) !== false) {
                        if ($file != '.' && $file != '..' && $file != '.svn') {
                            //Compile main translations
                            exec('msgfmt lang/' . $file . '/LC_MESSAGES/ShiftPlanning.po -o lang/' . $file . '/LC_MESSAGES/ShiftPlanning.mo');
                            //Compile js translations, for js gettext, needs to be in json format
                            exec('perl po2json -p lang/' . $file . '/LC_MESSAGES/ShiftPlanning_js.po > lang/' . $file . '/LC_MESSAGES/ShiftPlanning.json');
                        }
                    }
                    closedir($dh);
                }
            }


            break;

        case 'create': //Just creates the directory structure
            mkdir('lang/' . $argv[3] . '/LC_MESSAGES', 0777, true);
            include('config.php');
            include('lib/class.i18n.php');
            i18n::addLanguage($argv[2], $argv[3]);
            break;
        
        case 'createall':
            include('config.php');
            include('lib/class.i18n.php');
            $languages = i18n::getLanguages();
            foreach($languages as $key=>$value){
                
                mkdir('lang/' . $value['code'] . '/LC_MESSAGES', 0777, true);
                
                i18n::addLanguage($value['name'], $value['code']);
            }
            
    }
}
?>
