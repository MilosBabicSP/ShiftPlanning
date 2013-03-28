<?php

if(!defined('_root_')) define('_root_', dirname(__FILE__) . '/');
include(_root_ . 'config.php');

//var_dump($packer);

/**
 * Class AssetsPacker
 *
 */

class AssetsPacker {
	
	private $_output = "";
	private $_build = false;
	
	private $_build_path = "static/";
	private $build_file_path;

	public $assets;
	public $type;
	
	
	function __construct($assets = array(), $type = array()) {
		$this->assets = $assets;
		$this->type = $type;
		
		//define build file path
		$this->build_file_path = _root_ . $this->_build_path . _jsV_;
		
		//check what to build
		if( in_array('css', $this->type) ) {
			$this->buildCssAssets( $this->assets );
		}
		
		if( in_array('js', $this->type) ) {
			$this->buildJsAssets( $this->assets );
		}
		
	}
	
	
	/**
	* Build CSS assets method
	* 
	*/
	
	public function buildCssAssets($assets=array()) {
		
		
		if(!file_exists($this->build_file_path . '.build')){
			
			//file_put_contents($this->build_file_path, ''); //create file
			
			if(!empty($assets)) {
				
				foreach($assets['css'] as $packedName => $list){
					
					$packed = array();
					
					foreach($list as $script) {
						
						if(strpos($script, 'ttp:') || strpos($script, 'ttps:')) {
						
							$tmp = file_get_contents($script);
							
						} else {
							
							ob_start();
							include(_root_ . $script);
							$tmp = ob_get_contents();
							ob_end_clean();
							
						}
						
						$tmp .= "\n\n";
						$packed[] = $tmp;
					}
					
					$this->_output = str_replace(array("\r\n", "\n", "\r"), '', implode(' ', $packed));
					//cache output name
					$output_name = $this->build_file_path . $packedName;
					file_put_contents($output_name . '.css', $this->_output);
					file_put_contents($output_name . '.tmp.css', $this->_output);
					
					printf("Css file(s) written in {$output_name}.css \n");
					
				}
				
			} else {
				
				throw new Exception("Your assets array is empty. Nothing to build.");
			
			}
			
		}
		
	}
	
	/**
	 *Build JS assets method
	 *
	 */
	
	public function buildJsAssets( $assets=array() ) {
		
		if(!file_exists($this->build_file_path . '.build')){
			
			if(!empty($assets)) {
				
				foreach ($assets['js'] as $packedName => $list) {
					
					foreach ($list as $script) {
						
						if(strpos($script, 'ttp:') || strpos($script, 'ttps:')){
							
							$tmp = file_get_contents($script);
							
						} else {
							
							ob_start();
							include(_root_ . $script);
							$tmp = ob_get_contents();
							ob_end_clean();
					
						}
						
						$tmp .= "\n\n";
						var_dump($script);
						$packed[$packedName][] = $tmp;
						
					}
					
					$output_name = $this->build_file_path . $packedName;
					file_put_contents($output_name . '.tmp.js', implode(' ', $packed[$packedName]));
					printf("JS file(s) written in {$output_name}.tmp.js \n");
					
				}
				
				//TODO - Closure compiler 
				
			} else {
				
				throw new Exception("Your assets array is empty. Nothing to build.");
			
			}
			
		}
		
	}
	
	
}

$assets_to_pack = array('css', 'js');
$ap = new AssetsPacker($packer, $assets_to_pack);
//$ap->build($packer);