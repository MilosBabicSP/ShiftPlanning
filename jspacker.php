<?php

class JSPacker {

    private $output = '';
    private $scripts = array();
    private $build = false;
    public $reset = false;
    public $_store = false;

    function __construct($output) {
	$this->output = $output;
	$this->build = file_exists(_root_ . 'js/' . _jsV_ . $this->output) ? false : true;

	# WRITE TO SCREEN
    }

    function _dump() {
	//we check do we wanna create single file
	if ($this->_store) {
	    $this->_toHtml();
	} else {
	    $this->_build();
	}
    }

    function _add($file, $compress = false) {
	if (strpos($file, 'ttp:') || strpos($file, 'ttps:')) {
	    array_push($this->scripts, array('path' => $file, 'pack' => $compress));
	} else {
	    array_push($this->scripts, array('path' => WWW_PATH . $file, 'pack' => $compress));
	}
    }

    function _toHtml() {
	foreach ($this->scripts as $script) {
	    # REMOTE SCRIPT
	    echo '<script type="text/javascript" src="' . $script['path'] . '"></script>';
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
	
	
	echo '<script type="text/javascript" src="' . WWW_PATH . 'js/' . _jsV_ . $this->output . '"></script>';
    }
}

