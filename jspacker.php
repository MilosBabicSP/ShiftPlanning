<?php

class JSPacker {

    private $output = '';
    private $scripts = array();
    private $build = false;
    public $reset = false;
    public $_store = false;
    public $_type = 'js';

    function __construct($output, $type = 'js') {
	$this->output = $output;
	$this->_store = IS_TEST_SERVER;
        $this->_type = $type;
	$this->build = file_exists(_root_ . 'js/' . _jsV_ . $this->output) ? false : true;

	# WRITE TO SCREEN
    }

    function _dump() {
	//we check do we wanna create single file
	if ($this->_store) {
	    return $this->_toHtml();
	} else {
	    return $this->_build();
	}
    }

    function _add($file, $compress = false) {
	if (strpos($file, 'ttp:') || strpos($file, 'ttps:')) {
	    array_push($this->scripts, array('path' => $file, 'pack' => $compress));
	} else {
	    if (!IS_TEST_SERVER){
		$path = 'http://' . _cdn_ . '.' ._domain_ . '/' . _touch_ . '/' . $file;
	    } else {
		$path = WWW_PATH . $file;
	    }
	    array_push($this->scripts, array('path' => $path, 'pack' => $compress));
	}
    }

    function _toHtml() {
        if ($this->_type == 'js'){
            foreach ($this->scripts as $script) {
	    # REMOTE SCRIPT
                echo '<script type="text/javascript" src="' . $script['path'] . '"></script>';
            }
        } else {
            foreach ($this->scripts as $script) {
	    # REMOTE SCRIPT
                echo '<link rel="stylesheet" type="text/css" href="' . $script['path'] . '">';
            }
        }
	
    }

    function _build() {
	# FORCE BUILD
	if ($this->reset) {
	    $this->build = true;
	}

	if (is_array($this->scripts) && $this->build) {
	    # GRAB FILES
	    $output = array();
	    foreach ($this->scripts as $script) {
		$tmp = file_get_contents($script['path']);
		$output[] = $tmp;
		unset($tmp);
	    }
	    
	    # WRITE TO OUTPUT
	    
	    
	    # Fix permissions
	    chmod(_root_ . 'js', 0777);
	    if (file_exists(_root_ . 'js/' . _jsV_ . $this->output)){
		chmod(_root_ . 'js/' . _jsV_ . $this->output, 0777);
	    }
	    file_put_contents(_root_ . 'js/' . _jsV_ . $this->output, implode("\n ", $output));
	}
        if ($this->_type == 'js'){
            echo '<script type="text/javascript" src="' . _fCdnPath_ . 'js/' . _jsV_ . $this->output . '"></script>';
        } else {
            echo '<link rel="stylesheet" type="text/css" href="' . _fCdnPath_ . 'js/' . _jsV_ . $this->output . '">';
        }
	
    }
}

