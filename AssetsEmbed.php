<?php

if(!defined('_root_')) define('_root_', dirname(__FILE__) . '/');
include(_root_ . 'config.php');

require('AssetsPacker.php');

class AssetsEmbed extends AssetsPacker {
	
	private $set;
	private $static_path;
	
	public function __construct($type="", $set="") {
		//define assets array 
		$this->assets = $GLOBALS['packer_sets'];
		$this->type = $type;
		//set packing set
		$this->set = $set;
		
		//set static path
		$this->static_path = IS_TEST_SERVER ? WWW_PATH : 'http://www.' ._domain_ . '/' . _touch_ . '/';
		
		$this->build_file_path = parent::getBuildPath();
	
	
		//run embed method
		$this->embed();
	}
	
	public function embed(){
		
		if(IS_TEST_SERVER) {
			
			if( $this->type == "css" ) {
				
				foreach($this->assets['css'][$this->set] as $file){
					if(strpos($file, 'http') !== 0) {
						$file = $this->static_path . $file;
					}
					
					echo('<link rel="stylesheet" type="text/css" media="screen" href="' . $file . '" />');
				}
				
			}
			
			if( $this->type == "js" ) {
				
				foreach($this->assets['js'][$this->set] as $file){
					if(strpos($file, 'http') !== 0) {
						$file = $this->static_path . $file;
					}
					
					 echo('<script type="text/javascript" src="' . $file . '"></script>');
				}
				
			}
			
		} else {
			
			if( $this->type == "css" ) {
				if(!file_exists($this->build_file_path . $this->set . '.css')){
					echo '<link rel="stylesheet" type="text/css" media="screen" href="' . _fCdnPath_ . $this->_build_path . _jsV_ . $this->set . '.tmp.css" />';
				} else {
					echo '<link rel="stylesheet" type="text/css" media="screen" href="' . _fCdnPath_ . $this->_build_path . _jsV_ . $this->set . '.css" />';
				}
				
			}
			
			if( $this->type == "js" ) {
				if(!file_exists($this->build_file_path . $this->set . '.js')){
					echo '<script type="text/javascript" src="' . _fCdnPath_ . $this->_build_path . _jsV_ . $this->set . '.tmp.js" ></script>';
				} else {
					echo '<script type="text/javascript" src="' . _fCdnPath_ . $this->_build_path . _jsV_ . $this->set . '.js" ></script>';
				}
			}
		}
	}
}





//$test = new AssetsEmbed("js", 'mobile');