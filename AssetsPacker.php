<?php

/**
 * Class AssetsPacker
 *
 */

class AssetsPacker {
	
	private $_build = false;
	
	protected $_build_path = "js/";
	protected $build_file_path;

	public $assets;
	public $type;
	
	
	function __construct($assets = array(), $type = array()) {
		
		$this->assets = $assets;
		$this->type = $type;
		
		//define build file path
		$this->build_file_path = $this->getBuildPath();
		
		//build all assets
		$this->buildAssets();
		
	}
	
	/**
	 * Getter build file path method
	 * constructs filepath
	 * @return string;
	 */
	protected function getBuildPath() {
		return _root_ . $this->_build_path . _jsV_;
	}
	
	/**
	 * BuildAssets method
	 *
	 */
	
	public function buildAssets() {
		
		if(!file_exists($this->build_file_path . '.build')){
			
			//create .build file
			file_put_contents($this->build_file_path . '.build', '');
			
			//check what to build
			if( in_array('css', $this->type) ) {
				$this->buildCssAssets();
			}
			
			if( in_array('js', $this->type) ) {
				$this->buildJsAssets();
			}
			
		}
	}
	
	
	/**
	* Build CSS assets method
	* Gets CSS files from array and concatinates to one file,
	* writes file in a predefined folder
	* 
	*/
	
	public function buildCssAssets() {
			
		if(!empty($this->assets)) {
			
			foreach($this->assets['css'] as $packedName => $list){
				
				$packed = array();
				
				foreach($list as $script) {
					
					if(strpos($script, 'ttp:') || strpos($script, 'ttps:')) {
					
						$tmp = file_get_contents($script);
						
					} else {
						
						$tmp = $this->_outputBufferedFile($script);
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
	
	/**
	 *Build JS assets method
	 *
	 */
	
	public function buildJsAssets() {
		
		if(!empty($this->assets)) {
			
			foreach ($this->assets['js'] as $packedName => $list) {
				
				foreach ($list as $script) {
					
					if(strpos($script, 'ttp:') || strpos($script, 'ttps:')){
						
						$tmp = file_get_contents($script);
						
					} else {
						
						$tmp = $this->_outputBufferedFile($script);
				
					}
					
					$tmp .= "\n\n";
					//var_dump($script);
					$packed[$packedName][] = $tmp;
					
				}
				
				$output_name = $this->build_file_path . $packedName;
				file_put_contents($output_name . '.tmp.js', implode(' ', $packed[$packedName]));
				printf("JS file(s) written in {$output_name}.tmp.js \n");
				
			}
			
			//TODO - Closure compiler
			foreach( $packed as $name => $content ) {
				$this->closure_compile($this->build_file_path . $name . '.tmp.js', $this->build_file_path . $name . '.js' );			
			}
			
			file_put_contents($this->build_file_path . '.compiled', '');
			
			die();
			
		} else {
			
			throw new Exception("Your assets array is empty. Nothing to build.");
		
		}
		
	}
	
	/**
	 *
	 *	@return String 
	 */
	
	private function _outputBufferedFile( $file ) {
		
		
		if(file_exists( $file )) {
		
			ob_start();
			include(_root_ . $file);
			$tmp = ob_get_contents();
			ob_end_clean();
			
			return $tmp;
		
		} else {
			
			throw new Exception("Your {$file} file doesn't exist");
		
		}
		
	}
	
	private function closure_compile( $input_file, $output_file ) {
		
		exec('java -jar ' . _root_ . 'includes/closure/compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js ' . $input_file . ' --js_output_file ' . $output_file);
		
	}
	
	
}

