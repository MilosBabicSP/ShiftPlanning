<?php
if(isset($_GET['l'])){
    $l = $_GET['l'];
} else {
    $l = 'en_US';
}
?>
<html>
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="gettext" href="lang/<?=$l?>/LC_MESSAGES/ShiftPlanning.json" />

        <script src="gettext.js"></script>
        <script src="test.js"></script>
    </head>
    
    <body>
<?php
include 'config.php';
include 'lib/class.i18n.php';

echo _sd('Test desc', 'Test string');
echo '<br />';
echo _s('Test string');
echo '<br />';
echo i18n::singular('Test "Quoted"', 'Test "Quoted"');
echo '<br />';
echo i18n::format(_pd('Test plural','Singular {number}d', 'Plural {number}d',  1), array('number'=>1));
echo i18n::format(_p('Singular {number}', 'Plural {number}',  1), array('number'=>1));
echo '<br />';
echo i18n::format(i18n::plural('Test plural', 'Singular {number}', 'Plural {number}', 2), array('number'=>2));
echo '<br />';

i18n::setLanguage($l);

echo i18n::singular('Test string', 'Test');
echo '<br />';
echo i18n::singular('Test "Quoted"', 'Test "Quoted"');
echo '<br />';
echo i18n::format(i18n::plural('Test plural', 'Singular {number}', 'Plural {number}', 1), array('number'=>1));
echo '<br />';
echo i18n::format(i18n::plural('Test plural', 'Singular {number}', 'Plural {number}', 2), array('number'=>2));
?>
</body>
</html>