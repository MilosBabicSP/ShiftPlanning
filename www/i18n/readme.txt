*** Required software:
gettext library
gettext php module
gettext utilities
perl
JSON perl module
Locale::PO perl module

*** How this stuff works?
i18n module utilizes gettext for translation support.
When a new language is added, new directory is created which will hold generated .po/.mo/.json files, and it is added to the database.
Cron job is then using helper tool gettext.php to scan all files for strings, and adds new ones to the database, and marks deleted strings. 
After that, it sends untranslated strings to the google translate api, and writes the translations to the database. 
Using the translations in the database, .po files are generated for each language, excluding the deleted strings.
Translations are now getting compiled to .mo/.json using gettext.php tool.

*** Setup:
gettext.php, po2json, config.php, lib should be located in the application root directory (important because of the way it's scanning for strings)
cron.php can be located anywhere where it can be ran by a crontab, however the paths (to the config/classes) need to be adjusted accordingly.
Database connection and path can be configured in config.php.
Database dump is inside 'i18n.sql' file.
i18n::setLanguage($languageCode) has to be called before outputting any string.

*** Usage:
See comments for singular and plural functions inside 'lib/class.i18n.php' file.

*** Creating a language:
In order to be able to translate to a new language, it needs to be created in the filesystem and in the database with the following command:
php gettext.php create [language name] [locale code]
for example:
php gettext.php create "Polish" pl_PL

*** Troubleshooting:
Plural forms are not getting to the .pot/.po files - Make sure gettext version is at least 0.18
New strings are not translated on the site - Restart apache
