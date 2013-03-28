<?php

if(!defined(')root_')) define('_root_', dirname(__FILE__) . '/');
include(_root_ . 'config.php');


/**
 * Class AssetsPacker
 * 
 * - cron-like assets packer
 */

class AssetsPacker {
	
	private $_output = "";
	private $_scripts  = array();
	private $_build = false;
	private $_build_path = "static/";
	
	public $reset = false;
	public $store = false;
	public $type = "js";
	
	
	function __construct($output = "") {
		
	}
	
	
	public function build() {
		
	}	
	
	
}
