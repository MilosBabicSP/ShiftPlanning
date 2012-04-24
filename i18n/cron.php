<?php

include 'config.php';
include 'lib/class.poParser.php';
include 'lib/class.i18n.php';

chdir(APP_PATH);
exec('php gettext.php fetch;');
i18n::parseFile('messages_php.pot','php');
i18n::parseFile('messages_js.pot','js');
i18n::processAll();
exec('php gettext.php compile;');
