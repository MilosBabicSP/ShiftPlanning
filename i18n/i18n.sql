# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.0.51a-24+lenny5)
# Database: shiftplanning_25
# Generation Time: 2011-11-18 12:18:08 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table language
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lang_language`;

CREATE TABLE `lang_language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(16) NOT NULL,
  `header` text CHARACTER SET utf8 NOT NULL,
  `short_code` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table lang_original
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lang_original`;

CREATE TABLE `lang_original` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `hash` varchar(32) NOT NULL,
  `original` text CHARACTER SET utf8 NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `type` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hash` (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table lang_translation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lang_translation`;

CREATE TABLE `lang_translation` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `original_id` bigint(20) DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL,
  `translation` text,
  PRIMARY KEY (`id`),
  KEY `original_id` (`original_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `lang_translation_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `lang_language` (`id`),
  CONSTRAINT `lang_translation_ibfk_1` FOREIGN KEY (`original_id`) REFERENCES `lang_original` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `lang_language` (`id`, `name`, `code`, `header`, `short_code`)
VALUES
	(1, 'American English', 'en_US', '{\"Project-Id-Version\":\" PACKAGE VERSION\",\"Report-Msgid-Bugs-To\":\" \",\"POT-Creation-Date\":\" 2011-11-12 00:28+0100\",\"PO-Revision-Date\":\" YEAR-MO-DA HO:MI+ZONE\",\"Last-Translator\":\" FULL NAME <EMAIL@ADDRESS>\",\"Language-Team\":\" LANGUAGE <LL@li.org>\",\"Content-Type\":\" text\\/plain; charset=CHARSET\",\"Content-Transfer-Encoding\":\" 8bit\",\"Plural-Forms\":\" nplurals=2; plural=n != 1;\"}', 'en');



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
