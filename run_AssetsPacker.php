<?php

if(!defined('_root_')) define('_root_', dirname(__FILE__) . '/');
include(_root_ . 'config.php');

require('AssetsPacker.php');

//define what you need to pack
$assets_to_pack = array('css', 'js');

$ap = new AssetsPacker($packer, $assets_to_pack);

